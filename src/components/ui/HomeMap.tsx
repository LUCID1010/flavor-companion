
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { Restaurant } from '@/types';
import { getNearbyRestaurants, getCurrentUserLocation, UserLocation } from '@/services/api/mapApi';

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
        } catch (err) {
          console.log('Using default location (Mumbai)');
          setUserLocation(location);
        }
        
        // Get nearby restaurants
        const nearby = getNearbyRestaurants(location, 20); // 20km radius
        setRestaurants(nearby);
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
      
      // Update restaurants based on new location
      const nearby = getNearbyRestaurants(location, 20);
      setRestaurants(nearby);
      toast.success('Location updated successfully');
    } catch (error) {
      console.error('Error getting location:', error);
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
  
  // Simple map visualization for demonstration
  // In a real app, this would use a mapping library like Leaflet or Google Maps
  const renderMap = () => {
    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-50">
          <Loader2 className="h-8 w-8 animate-spin text-foodie-500" />
          <p className="mt-2 text-sm text-gray-600">Finding nearby restaurants...</p>
        </div>
      );
    }
    
    if (error || !userLocation) {
      return (
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
      );
    }
    
    return (
      <div className="relative h-full overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gray-100">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        
        {/* User location */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center">
            <div className="h-5 w-5 rounded-full bg-blue-500 ring-4 ring-blue-300">
              <div className="h-5 w-5 animate-ping rounded-full bg-blue-500 opacity-75"></div>
            </div>
            <span className="mt-1 rounded bg-white px-2 py-0.5 text-xs font-medium shadow-sm">
              You are here
            </span>
          </div>
        </div>
        
        {/* Restaurants */}
        {restaurants.map(restaurant => (
          <div 
            key={restaurant.id}
            className="absolute cursor-pointer transform"
            style={{ 
              left: `${50 + (restaurant.location.lng - userLocation.lng) * 100}%`, 
              top: `${50 - (restaurant.location.lat - userLocation.lat) * 100}%` 
            }}
            onClick={() => handleSelectRestaurant(restaurant.id)}
          >
            <div className="flex flex-col items-center">
              <MapPin size={24} className="text-foodie-500 fill-foodie-100" />
              <span className="mt-1 rounded bg-white px-2 py-0.5 text-xs font-medium shadow-sm truncate max-w-[150px]">
                {restaurant.name}
              </span>
            </div>
          </div>
        ))}
        
        {/* Refresh location button */}
        <button
          onClick={handleGetLocation}
          className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-md hover:bg-gray-50"
        >
          <Navigation size={16} className="text-foodie-500" />
          <span>Update Location</span>
        </button>
      </div>
    );
  };

  return (
    <div className={`relative rounded-lg border border-gray-200 shadow-md overflow-hidden ${className}`}>
      {renderMap()}
    </div>
  );
};

export default HomeMap;
