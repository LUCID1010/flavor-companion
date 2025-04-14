
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

    // Sort by distance
    filtered.sort((a, b) => a.distanceKm - b.distanceKm);

    // Limit by locality
    const localities = new Map<string, number>();
    const limitedByLocality = filtered.filter(restaurant => {
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
