
import { toast } from "sonner";
import { Restaurant, FilterOptions, SortOption, CuisineType, PriceRange } from "@/types";
import { mockRestaurants } from "@/utils/mockData";
import { importRestaurants } from "@/utils/importRestaurantData";

// Load restaurants from local storage or initial data
const RESTAURANTS_STORAGE_KEY = 'foodiefinder_restaurants';
const FEATURED_RESTAURANTS_KEY = 'foodiefinder_featured';
const POPULAR_RESTAURANTS_KEY = 'foodiefinder_popular';

// Get all restaurants from database (localStorage in this case)
export const getAllRestaurants = (): Restaurant[] => {
  const storedRestaurants = localStorage.getItem(RESTAURANTS_STORAGE_KEY);
  
  if (storedRestaurants) {
    return JSON.parse(storedRestaurants);
  } else {
    // Initialize with mock data + imported data
    const importedRestaurants = importRestaurants();
    const allRestaurants = [...mockRestaurants, ...importedRestaurants];
    
    // Remove duplicates if any (based on ID)
    const uniqueRestaurants = allRestaurants.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as Restaurant[]);

    // Add Indian cuisines to all restaurants
    const indianCuisines: CuisineType[] = [
      'North Indian', 'South Indian', 'Bengali', 'Punjabi', 'Gujarati',
      'Rajasthani', 'Goan', 'Kashmiri', 'Mughlai', 'Kerala',
      'Andhra', 'Hyderabadi', 'Chettinad', 'Maharashtrian', 'Karnataka'
    ];
    
    const indianRestaurants = uniqueRestaurants.map(restaurant => ({
      ...restaurant,
      cuisine: [
        indianCuisines[Math.floor(Math.random() * indianCuisines.length)],
        indianCuisines[Math.floor(Math.random() * indianCuisines.length)],
      ].filter((value, index, self) => self.indexOf(value) === index) as CuisineType[],
      features: [...restaurant.features, 'Indian Cuisine'],
    }));
    
    // Save to local storage
    localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(indianRestaurants));
    
    return indianRestaurants;
  }
};

// Save restaurants to database
export const saveRestaurants = (restaurants: Restaurant[]): void => {
  localStorage.setItem(RESTAURANTS_STORAGE_KEY, JSON.stringify(restaurants));
};

// Get restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  const restaurants = getAllRestaurants();
  return restaurants.find(restaurant => restaurant.id === id);
};

// Add new restaurant
export const addRestaurant = (restaurant: Omit<Restaurant, 'id'>): Restaurant => {
  const restaurants = getAllRestaurants();
  const newRestaurant = {
    ...restaurant,
    id: Date.now().toString(),
  };
  
  restaurants.push(newRestaurant);
  saveRestaurants(restaurants);
  toast.success('Restaurant added successfully!');
  
  return newRestaurant;
};

// Update restaurant
export const updateRestaurant = (id: string, data: Partial<Restaurant>): Restaurant => {
  const restaurants = getAllRestaurants();
  const index = restaurants.findIndex(restaurant => restaurant.id === id);
  
  if (index === -1) {
    toast.error('Restaurant not found');
    throw new Error('Restaurant not found');
  }
  
  const updatedRestaurant = { ...restaurants[index], ...data };
  restaurants[index] = updatedRestaurant;
  saveRestaurants(restaurants);
  
  toast.success('Restaurant updated successfully!');
  return updatedRestaurant;
};

// Delete restaurant
export const deleteRestaurant = (id: string): boolean => {
  const restaurants = getAllRestaurants();
  const filteredRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
  
  if (filteredRestaurants.length === restaurants.length) {
    toast.error('Restaurant not found');
    return false;
  }
  
  saveRestaurants(filteredRestaurants);
  toast.success('Restaurant deleted successfully!');
  return true;
};

// Filter and sort restaurants
export const filterRestaurants = (
  filters: FilterOptions,
  sortBy: SortOption = 'relevance',
  searchTerm?: string
): Restaurant[] => {
  let restaurants = getAllRestaurants();
  
  // Apply search term filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    restaurants = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(term) ||
      restaurant.description.toLowerCase().includes(term) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(term)) ||
      restaurant.city.toLowerCase().includes(term)
    );
  }
  
  // Apply cuisine filter
  if (filters.cuisine && filters.cuisine.length > 0) {
    restaurants = restaurants.filter(restaurant => 
      restaurant.cuisine.some(cuisine => filters.cuisine.includes(cuisine))
    );
  }
  
  // Apply price filter
  if (filters.price && filters.price.length > 0) {
    restaurants = restaurants.filter(restaurant => 
      filters.price.includes(restaurant.priceRange)
    );
  }

  // Apply features filter
  if (filters.features && filters.features.length > 0) {
    restaurants = restaurants.filter(restaurant => 
      restaurant.features.some(feature => filters.features.includes(feature))
    );
  }

  // Apply open now filter
  if (filters.openNow) {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    restaurants = restaurants.filter(restaurant => {
      if (!restaurant.hours || !restaurant.hours[day]) return false;
      
      const { open, close } = restaurant.hours[day];
      return open <= time && time <= close;
    });
  }

  // Apply distance filter if user location and max distance are provided
  if (filters.distance && filters.userLocation) {
    restaurants = restaurants.filter(restaurant => {
      const distance = calculateDistance(
        filters.userLocation.lat,
        filters.userLocation.lng,
        restaurant.location.lat,
        restaurant.location.lng
      );
      
      return distance <= filters.distance;
    });
  }
  
  // Apply sorting
  switch (sortBy) {
    case 'rating':
      restaurants.sort((a, b) => b.rating - a.rating);
      break;
      
    case 'reviews':
      restaurants.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
      
    case 'distance':
      if (filters.userLocation) {
        restaurants.sort((a, b) => {
          const distanceA = calculateDistance(
            filters.userLocation.lat,
            filters.userLocation.lng,
            a.location.lat,
            a.location.lng
          );
          
          const distanceB = calculateDistance(
            filters.userLocation.lat,
            filters.userLocation.lng,
            b.location.lat,
            b.location.lng
          );
          
          return distanceA - distanceB;
        });
      }
      break;
      
    case 'priceAsc':
      restaurants.sort((a, b) => a.priceRange.length - b.priceRange.length);
      break;
      
    case 'priceDesc':
      restaurants.sort((a, b) => b.priceRange.length - a.priceRange.length);
      break;
      
    case 'relevance':
    default:
      // Default sorting logic
      break;
  }
  
  return restaurants;
};

// Get featured restaurants
export const getFeaturedRestaurants = (count: number = 3): Restaurant[] => {
  const storedFeatured = localStorage.getItem(FEATURED_RESTAURANTS_KEY);
  
  if (storedFeatured) {
    const featured = JSON.parse(storedFeatured);
    return featured.slice(0, count);
  } else {
    // Get random restaurants for featured section
    const restaurants = getAllRestaurants();
    const shuffled = [...restaurants].sort(() => 0.5 - Math.random());
    const featured = shuffled.slice(0, count);
    
    localStorage.setItem(FEATURED_RESTAURANTS_KEY, JSON.stringify(featured));
    return featured;
  }
};

// Get popular restaurants by rating
export const getPopularRestaurants = (count: number = 4): Restaurant[] => {
  const storedPopular = localStorage.getItem(POPULAR_RESTAURANTS_KEY);
  
  if (storedPopular) {
    const popular = JSON.parse(storedPopular);
    return popular.slice(0, count);
  } else {
    const restaurants = getAllRestaurants();
    const popular = [...restaurants].sort((a, b) => b.rating - a.rating).slice(0, count);
    
    localStorage.setItem(POPULAR_RESTAURANTS_KEY, JSON.stringify(popular));
    return popular;
  }
};

// Calculate distance in kilometers between two coordinates
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
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
