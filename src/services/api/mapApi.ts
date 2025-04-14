import { toast } from "sonner";
import { Restaurant } from "@/types";
import { getAllZomatoRestaurants } from "@/utils/zomatoData";
import { getRestaurantRecommendations, getPersonalizedRecommendations } from "@/utils/recommendationEngine";

// Interface for location data
export interface UserLocation {
  lat: number;
  lng: number;
}

// Get nearby restaurants within a given radius
export const getNearbyRestaurants = (
  userLocation: UserLocation, 
  radius: number = 5, // Default 5km radius
  cuisineKeyword?: string,
  minRating: number = 3.5,
  favoriteIds?: string[]
): Restaurant[] => {
  try {
    const restaurants = getAllZomatoRestaurants();
    
    // Use personalized recommendations if favorites are provided
    if (favoriteIds && favoriteIds.length > 0) {
      return getPersonalizedRecommendations(
        restaurants,
        userLocation.lat,
        userLocation.lng,
        favoriteIds,
        20 // Return more results for personalized recommendations
      );
    }
    
    // Otherwise use standard recommendations
    return getRestaurantRecommendations(
      restaurants,
      userLocation.lat,
      userLocation.lng,
      cuisineKeyword,
      minRating,
      radius,
      20, // Return more results
      3 // Allow more per locality
    );
  } catch (error) {
    console.error("Error getting nearby restaurants:", error);
    toast.error("Failed to find nearby restaurants");
    return [];
  }
};

// Get current user location with geolocation API
export const getCurrentUserLocation = (): Promise<UserLocation> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      reject(new Error("Geolocation not supported"));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        resolve(userLocation);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to retrieve your location");
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
};

// Search for restaurants by location name
export const searchRestaurantsByLocation = (locationName: string): Restaurant[] => {
  try {
    const restaurants = getAllZomatoRestaurants();
    const searchTerm = locationName.toLowerCase();
    
    return restaurants.filter(restaurant => 
      restaurant.city.toLowerCase().includes(searchTerm) ||
      restaurant.state.toLowerCase().includes(searchTerm) ||
      restaurant.address.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error("Error searching restaurants by location:", error);
    toast.error("Failed to search restaurants by location");
    return [];
  }
};

// Get distance between user and restaurant
export const getDistanceToRestaurant = (
  userLocation: UserLocation,
  restaurantId: string
): number | null => {
  try {
    const restaurants = getAllZomatoRestaurants();
    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (!restaurant) return null;
    
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      restaurant.location.lat,
      restaurant.location.lng
    );
  } catch (error) {
    console.error("Error calculating distance to restaurant:", error);
    return null;
  }
};

// Calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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

// Convert degrees to radians
const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};
