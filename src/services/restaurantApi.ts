
import { toast } from "sonner";

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY || ""; // Get API key from environment variable
const RAPIDAPI_HOST = "worldwide-restaurants.p.rapidapi.com";

/**
 * Base API configuration for Worldwide Restaurants API
 */
const apiConfig = {
  baseUrl: 'https://worldwide-restaurants.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': RAPIDAPI_HOST,
    'x-rapidapi-key': RAPIDAPI_KEY,
    'content-type': 'application/json'
  }
};

/**
 * Fetches supported languages from the API
 */
export const fetchLanguages = async () => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/languages`, {
      method: 'GET',
      headers: apiConfig.headers
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    if (response.status === 403) {
      throw new Error("Access denied. Check API key or quota.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    toast.error("Failed to fetch language data");
    throw error;
  }
};

/**
 * Search restaurants by location
 */
export const searchRestaurants = async (locationId: string, offset: number = 0, limit: number = 20) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/search`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        language: "en_US",
        limit,
        location_id: locationId,
        currency: "INR", // Changed to Indian Rupees
        offset
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching restaurants:", error);
    toast.error("Failed to search restaurants");
    throw error;
  }
};

/**
 * Get restaurant details by ID
 */
export const getRestaurantDetails = async (restaurantId: string) => {
  try {
    const response = await fetch(`${apiConfig.baseUrl}/detail`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        language: "en_US",
        currency: "INR", // Changed to Indian Rupees
        location_id: restaurantId
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    toast.error("Failed to load restaurant details");
    throw error;
  }
};

/**
 * Search for locations (cities, neighborhoods) to get locationId
 * Focuses on Indian cities by default
 */
export const searchLocations = async (query: string) => {
  try {
    // Append "India" to the query if it doesn't already contain it
    const modifiedQuery = query.toLowerCase().includes('india') ? query : `${query}, India`;
    
    const response = await fetch(`${apiConfig.baseUrl}/typeahead`, {
      method: 'POST',
      headers: apiConfig.headers,
      body: JSON.stringify({
        language: "en_US",
        q: modifiedQuery
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error searching locations:", error);
    toast.error("Failed to search locations");
    throw error;
  }
};
