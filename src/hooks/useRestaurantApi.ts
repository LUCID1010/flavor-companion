
import { useQuery } from "@tanstack/react-query";
import { 
  fetchLanguages, 
  searchRestaurants, 
  getRestaurantDetails,
  searchLocations
} from "@/services/restaurantApi";
import { getAllZomatoRestaurants } from "@/utils/zomatoData";
import { Restaurant } from "@/types";

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

/**
 * Hook to get all restaurants by city
 */
export const useRestaurantsByCity = (city?: string) => {
  return useQuery({
    queryKey: ['restaurants-by-city', city],
    queryFn: () => {
      const allRestaurants = getAllZomatoRestaurants();
      // Filter out non-Indian restaurants
      const indianRestaurants = allRestaurants.filter(restaurant => 
        restaurant.country === 'India' || 
        ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur'].includes(restaurant.city)
      );
      
      if (!city || city === 'All') {
        return indianRestaurants;
      }
      return indianRestaurants.filter(restaurant => restaurant.city === city);
    },
  });
};

/**
 * Hook to get top-rated restaurants across all cities
 */
export const useTopRatedRestaurants = (limit: number = 10) => {
  return useQuery({
    queryKey: ['top-rated-restaurants', limit],
    queryFn: () => {
      const allRestaurants = getAllZomatoRestaurants();
      // Filter out non-Indian restaurants
      const indianRestaurants = allRestaurants.filter(restaurant => 
        restaurant.country === 'India' || 
        ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur'].includes(restaurant.city)
      );
      
      return indianRestaurants
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
    },
  });
};

/**
 * Hook to get restaurants grouped by city
 */
export const useRestaurantsGroupedByCity = () => {
  return useQuery({
    queryKey: ['restaurants-grouped-by-city'],
    queryFn: () => {
      const allRestaurants = getAllZomatoRestaurants();
      // Filter out non-Indian restaurants
      const indianRestaurants = allRestaurants.filter(restaurant => 
        restaurant.country === 'India' || 
        ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur'].includes(restaurant.city)
      );
      
      // Sort cities alphabetically but ensure our targeted Indian cities come first
      const targetCities = ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur'];
      const cities = [...new Set(indianRestaurants.map(r => r.city))];
      const sortedCities = [...targetCities.filter(city => cities.includes(city))];
      
      // Add any remaining Indian cities
      cities.forEach(city => {
        if (!sortedCities.includes(city)) {
          sortedCities.push(city);
        }
      });
      
      const groupedRestaurants: Record<string, Restaurant[]> = {};
      
      sortedCities.forEach(city => {
        groupedRestaurants[city] = indianRestaurants.filter(r => r.city === city);
      });
      
      return {
        cities: sortedCities,
        restaurantsByCity: groupedRestaurants
      };
    },
  });
};
