import { Restaurant } from "@/types";

/**
 * Calculates the Haversine distance between two geographical points
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in km
  
  return distance;
};

/**
 * Converts degrees to radians
 */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

/**
 * Gets restaurant recommendations based on user location and preferences
 * Enhanced with personalization and location awareness
 */
export const getRestaurantRecommendations = (
  restaurants: Restaurant[],
  userLat: number,
  userLon: number,
  cuisineKeyword?: string,
  minRating: number = 4.0,
  maxDistanceKm: number = 5,
  topN: number = 10,
  maxPerLocality: number = 2
): Restaurant[] => {
  try {
    // Calculate distance and add it to restaurants
    const restaurantsWithDistance = restaurants.map(restaurant => ({
      ...restaurant,
      distanceKm: calculateDistance(
        userLat, 
        userLon, 
        restaurant.location.lat, 
        restaurant.location.lng
      )
    }));

    // Sort by distance first to get closest restaurants
    restaurantsWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);

    // Filter by rating and distance
    let filtered = restaurantsWithDistance.filter(restaurant => 
      restaurant.rating >= minRating && restaurant.distanceKm <= maxDistanceKm
    );

    // Filter by cuisine if provided
    if (cuisineKeyword) {
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.some(cuisine => 
          cuisine.toLowerCase().includes(cuisineKeyword.toLowerCase())
        )
      );
    }

    // If there are too few results, loosen the rating constraint but keep distance constraint
    if (filtered.length < 5) {
      filtered = restaurantsWithDistance.filter(restaurant => 
        restaurant.rating >= minRating - 0.5 && restaurant.distanceKm <= maxDistanceKm
      );
      
      if (cuisineKeyword) {
        filtered = filtered.filter(restaurant => 
          restaurant.cuisine.some(cuisine => 
            cuisine.toLowerCase().includes(cuisineKeyword.toLowerCase())
          )
        );
      }
    }

    // Calculate score based on rating and distance
    const scoredRestaurants = filtered.map(restaurant => {
      // Distance score (0-1, closer is better)
      // Within 5km, closer gets higher score
      const distanceScore = 1 - (restaurant.distanceKm / maxDistanceKm); 
      
      // Rating score (0-1, higher rating is better)
      const ratingScore = (restaurant.rating - minRating) / (5 - minRating); 
      
      // Popularity score (0-1, more reviews is better)
      const popularityScore = Math.min(restaurant.reviewCount / 1000, 1); 
      
      // Weight factors: distance (50%), rating (30%), popularity (20%)
      // Distance is weighted highest since we want nearby restaurants
      const score = (distanceScore * 0.5) + (ratingScore * 0.3) + (popularityScore * 0.2);
      
      return {
        ...restaurant,
        score
      };
    });

    // Sort by combined score
    scoredRestaurants.sort((a, b) => b.score - a.score);

    // Limit by locality to ensure diversity
    const localities = new Map<string, number>();
    const limitedByLocality = scoredRestaurants.filter(restaurant => {
      const locality = restaurant.city;
      const count = localities.get(locality) || 0;
      
      if (count < maxPerLocality) {
        localities.set(locality, count + 1);
        return true;
      }
      
      return false;
    });

    // Return top N results
    return limitedByLocality.slice(0, topN);
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return [];
  }
};

// Function to get personalized recommendations based on user history
export const getPersonalizedRecommendations = (
  restaurants: Restaurant[],
  userLat: number,
  userLon: number,
  favoriteRestaurantIds: string[] = [],
  topN: number = 10
): Restaurant[] => {
  try {
    // Get favorite restaurants
    const favoriteRestaurants = restaurants.filter(r => 
      favoriteRestaurantIds.includes(r.id)
    );
    
    // If no favorites, return standard recommendations with 5km radius
    if (favoriteRestaurants.length === 0) {
      return getRestaurantRecommendations(
        restaurants, 
        userLat, 
        userLon, 
        undefined, 
        3.5, 
        5,
        topN
      );
    }
    
    // Extract favorite cuisines
    const favoriteCuisines = new Map<string, number>();
    favoriteRestaurants.forEach(restaurant => {
      restaurant.cuisine.forEach(cuisine => {
        const count = favoriteCuisines.get(cuisine) || 0;
        favoriteCuisines.set(cuisine, count + 1);
      });
    });
    
    // Sort cuisines by frequency
    const sortedCuisines = [...favoriteCuisines.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([cuisine]) => cuisine);
    
    // Get top cuisine
    const topCuisine = sortedCuisines[0];
    
    // Get recommendations based on top cuisine preference within 5km
    const cuisineRecommendations = getRestaurantRecommendations(
      restaurants,
      userLat,
      userLon,
      topCuisine,
      3.5,
      5,
      topN / 2,
      2
    );
    
    // Get general recommendations excluding those in cuisine recommendations
    const cuisineRecommendationIds = cuisineRecommendations.map(r => r.id);
    const otherRestaurants = restaurants.filter(r => 
      !cuisineRecommendationIds.includes(r.id) && !favoriteRestaurantIds.includes(r.id)
    );
    
    const generalRecommendations = getRestaurantRecommendations(
      otherRestaurants,
      userLat,
      userLon,
      undefined,
      4.0,
      5,
      topN / 2,
      1
    );
    
    // Combine recommendations
    return [...cuisineRecommendations, ...generalRecommendations].slice(0, topN);
  } catch (error) {
    console.error("Error generating personalized recommendations:", error);
    return getRestaurantRecommendations(restaurants, userLat, userLon);
  }
};
