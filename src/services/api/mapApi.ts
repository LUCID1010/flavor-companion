
import { toast } from "sonner";
import { Restaurant } from "@/types";
import { getAllRestaurants, calculateDistance } from "./restaurantApi";

// Interface for location data
export interface UserLocation {
  lat: number;
  lng: number;
}

// Get nearby restaurants within a given radius
export const getNearbyRestaurants = (
  userLocation: UserLocation, 
  radius: number = 5 // Default 5km radius
): Restaurant[] => {
  try {
    const restaurants = getAllRestaurants();
    
    // Calculate distances and filter by radius
    return restaurants.filter(restaurant => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        restaurant.location.lat,
        restaurant.location.lng
      );
      
      return distance <= radius;
    }).sort((a, b) => {
      // Sort by distance
      const distA = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        a.location.lat,
        a.location.lng
      );
      
      const distB = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        b.location.lat,
        b.location.lng
      );
      
      return distA - distB;
    });
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
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};

// Search for restaurants by location name
export const searchRestaurantsByLocation = (locationName: string): Restaurant[] => {
  try {
    const restaurants = getAllRestaurants();
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
    const restaurants = getAllRestaurants();
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

// Generate a static map URL for a specific location
// In a real app this would use Google Maps or similar API
export const getStaticMapUrl = (
  latitude: number, 
  longitude: number,
  width: number = 400,
  height: number = 300,
  zoom: number = 15
): string => {
  // This is a placeholder - in a real app you would use Google Maps or similar service
  // return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`;
  
  // For now, return a placeholder map image
  return `https://via.placeholder.com/${width}x${height}?text=Map+Location+(${latitude.toFixed(4)},${longitude.toFixed(4)})`;
};
