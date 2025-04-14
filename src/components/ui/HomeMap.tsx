
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { Restaurant } from '@/types';
import { getCurrentUserLocation, UserLocation } from '@/services/api/mapApi';
import { getAllZomatoRestaurants } from '@/utils/zomatoData';
import { getRestaurantRecommendations } from '@/utils/recommendationEngine';
import LeafletMap from './LeafletMap';

interface HomeMapProps {
  className?: string;
  onSelectRestaurant?: (id: string) => void;
}

const HomeMap: React.FC<HomeMapProps> = ({ 
  className = 'h-[400px]',
  onSelectRestaurant
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get user location and nearby restaurants
  useEffect(() => {
    const fetchUserLocationAndRestaurants = async () => {
      setIsLoading(true);
      try {
        // Default location (Mumbai, India) in case user doesn't share location
        let location: UserLocation = { lat: 19.0760, lng: 72.8777 };
        
        try {
          const userLoc = await getCurrentUserLocation();
          location = userLoc;
          setUserLocation(userLoc);
          toast.success('Found your location');
        } catch (err) {
          console.log('Using default location (Mumbai)');
          setUserLocation(location);
          toast.info('Using Mumbai as default location');
        }
        
        // Get Zomato restaurants
        const allRestaurants = getAllZomatoRestaurants();
        
        // Get nearby restaurants within 5km radius
        const nearby = getRestaurantRecommendations(
          allRestaurants,
          location.lat,
          location.lng,
          undefined, // No cuisine filter
          3.0, // Min rating - lowered to show more restaurants
          5, // 5km radius as requested
          15, // Top 15 results
          3 // Max 3 per locality
        );
        
        setRestaurants(nearby);
        
        if (nearby.length === 0) {
          toast.info("No restaurants found within 5km. Expanding search radius.");
          // If no restaurants nearby, expand the search radius
          const expandedSearch = getRestaurantRecommendations(
            allRestaurants,
            location.lat,
            location.lng,
            undefined,
            3.0,
            10, // Expanded to 10km
            10,
            2
          );
          
          setRestaurants(expandedSearch);
          
          if (expandedSearch.length === 0) {
            toast.info("Still no restaurants found. Showing random selections.");
            // If still no restaurants, show some random ones
            const randomRestaurants = allRestaurants
              .sort(() => 0.5 - Math.random())
              .slice(0, 8);
            setRestaurants(randomRestaurants);
          }
        } else {
          toast.success(`Found ${nearby.length} restaurants within 5km`);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Could not load restaurant data');
        toast.error('Failed to load nearby restaurants');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserLocationAndRestaurants();
  }, []);
  
  const handleGetLocation = async () => {
    try {
      setIsLoading(true);
      const location = await getCurrentUserLocation();
      setUserLocation(location);
      
      // Update restaurants based on new location with 5km radius
      const allRestaurants = getAllZomatoRestaurants();
      const nearby = getRestaurantRecommendations(
        allRestaurants,
        location.lat,
        location.lng,
        undefined,
        3.0,
        5, // 5km radius as requested
        15,
        3
      );
      
      setRestaurants(nearby);
      
      if (nearby.length === 0) {
        toast.info("No restaurants found within 5km. Expanding search radius.");
        // If no restaurants nearby, expand the search radius
        const expandedSearch = getRestaurantRecommendations(
          allRestaurants,
          location.lat,
          location.lng,
          undefined,
          3.0,
          10, // Expanded to 10km
          10,
          2
        );
        
        setRestaurants(expandedSearch);
      } else {
        toast.success(`Found ${nearby.length} restaurants within 5km`);
      }
      
    } catch (error) {
      console.error('Error getting location:', error);
      toast.error('Could not access your location');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectRestaurant = (id: string) => {
    if (onSelectRestaurant) {
      onSelectRestaurant(id);
    } else {
      navigate(`/restaurant/${id}`);
    }
  };
  
  if (isLoading) {
    return (
      <div className={`relative rounded-lg border border-gray-200 shadow-md overflow-hidden ${className}`}>
        <div className="flex h-full flex-col items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-foodie-500" />
          <p className="mt-2 text-sm text-gray-600">Finding nearby restaurants...</p>
        </div>
      </div>
    );
  }
  
  if (error || !userLocation) {
    return (
      <div className={`relative rounded-lg border border-gray-200 shadow-md overflow-hidden ${className}`}>
        <div className="flex h-full flex-col items-center justify-center bg-gray-50">
          <p className="text-center text-gray-600">{error || 'Location access required to show nearby restaurants'}</p>
          <button
            onClick={handleGetLocation}
            className="mt-4 flex items-center gap-2 rounded-full bg-foodie-500 px-4 py-2 font-medium text-white hover:bg-foodie-600"
          >
            <Navigation size={18} />
            <span>Share My Location</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`relative rounded-lg border border-gray-200 shadow-md overflow-hidden ${className}`}>
      <LeafletMap 
        restaurants={restaurants}
        userLocation={userLocation}
        onSelectRestaurant={handleSelectRestaurant}
        className="h-full"
        showPopupOnLoad={restaurants.length <= 5} // Show popups if only a few restaurants
      />
      {restaurants.length > 0 && (
        <div className="absolute bottom-3 left-3 z-10 bg-white rounded-full px-3 py-1 text-xs font-medium shadow-md">
          {restaurants.length} restaurant{restaurants.length > 1 ? 's' : ''} found
          {restaurants[0].distanceKm !== undefined && ` within ${Math.ceil(restaurants[0].distanceKm > 5 ? 10 : 5)}km radius`}
        </div>
      )}
      
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleGetLocation}
          className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-md hover:bg-gray-50"
        >
          <Navigation size={14} className="text-foodie-500" />
          <span>Update Location</span>
        </button>
      </div>
    </div>
  );
};

export default HomeMap;
