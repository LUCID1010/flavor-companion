
import { useQuery } from "@tanstack/react-query";
import { 
  fetchLanguages, 
  searchRestaurants, 
  getRestaurantDetails,
  searchLocations
} from "@/services/restaurantApi";

/**
 * Hook to fetch supported languages
 */
export const useLanguages = () => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: fetchLanguages,
  });
};

/**
 * Hook to search for restaurants by location
 */
export const useRestaurantSearch = (locationId: string, offset: number = 0, limit: number = 20) => {
  return useQuery({
    queryKey: ['restaurants', locationId, offset, limit],
    queryFn: () => searchRestaurants(locationId, offset, limit),
    enabled: !!locationId, // Only run query if locationId exists
  });
};

/**
 * Hook to get restaurant details
 */
export const useRestaurantDetails = (restaurantId: string) => {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurantDetails(restaurantId),
    enabled: !!restaurantId, // Only run query if restaurantId exists
  });
};

/**
 * Hook to search for locations
 */
export const useLocationSearch = (query: string) => {
  return useQuery({
    queryKey: ['locations', query],
    queryFn: () => searchLocations(query),
    enabled: !!query && query.length > 2, // Only search when query is at least 3 characters
  });
};
