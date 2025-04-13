
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface Restaurant {
  id: string;
  name: string;
  location: Location;
}

interface LocationMapProps {
  restaurants: Restaurant[];
  userLocation?: Location;
  onSelectRestaurant?: (id: string) => void;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ 
  restaurants, 
  userLocation, 
  onSelectRestaurant,
  className = 'h-[400px]'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  // In a real application, this would use the Google Maps API
  // For this demo, we'll create a simple visual representation
  
  // Calculate bounds to display all restaurants
  const getBounds = () => {
    if (!restaurants.length) return { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 };
    
    let minLat = restaurants[0].location.lat;
    let maxLat = restaurants[0].location.lat;
    let minLng = restaurants[0].location.lng;
    let maxLng = restaurants[0].location.lng;
    
    restaurants.forEach(r => {
      minLat = Math.min(minLat, r.location.lat);
      maxLat = Math.max(maxLat, r.location.lat);
      minLng = Math.min(minLng, r.location.lng);
      maxLng = Math.max(maxLng, r.location.lng);
    });
    
    // Add some padding
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;
    
    return { 
      minLat: minLat - latPadding, 
      maxLat: maxLat + latPadding, 
      minLng: minLng - lngPadding, 
      maxLng: maxLng + lngPadding 
    };
  };
  
  // Convert geo coordinates to pixel coordinates
  const geoToPixel = (lat: number, lng: number) => {
    const bounds = getBounds();
    
    // Map to percentage across the bounds
    const xPercent = (lng - bounds.minLng) / (bounds.maxLng - bounds.minLng);
    const yPercent = 1 - (lat - bounds.minLat) / (bounds.maxLat - bounds.minLat); // Invert Y
    
    // Get container size
    const container = mapRef.current;
    if (!container) return { x: 0, y: 0 };
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Convert to pixels (adding some padding)
    const padding = 30;
    const x = padding + xPercent * (width - 2 * padding);
    const y = padding + yPercent * (height - 2 * padding);
    
    return { x, y };
  };
  
  useEffect(() => {
    if (restaurants.length > 0) {
      setIsMapLoaded(true);
    } else {
      setMapError("No restaurant locations available");
    }
  }, [restaurants]);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setMapError("Geolocation is not supported by your browser");
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // In a real app, we would update the user's location and refetch nearby restaurants
        console.log("User location:", position.coords.latitude, position.coords.longitude);
        // In this mock, we'd pass this up to the parent component
      },
      () => {
        setMapError("Unable to retrieve your location");
      }
    );
  };

  return (
    <div className={`relative overflow-hidden rounded-lg border border-gray-200 bg-gray-100 ${className}`}>
      <div ref={mapRef} className="relative h-full w-full">
        {isMapLoaded ? (
          <>
            {/* Simple map background */}
            <div className="absolute inset-0 bg-gray-200 opacity-50">
              {/* Grid lines */}
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            {/* Plot restaurants */}
            {restaurants.map(restaurant => {
              const { x, y } = geoToPixel(restaurant.location.lat, restaurant.location.lng);
              return (
                <div 
                  key={restaurant.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${x}px`, top: `${y}px` }}
                  onClick={() => onSelectRestaurant?.(restaurant.id)}
                  title={restaurant.name}
                >
                  <div className="flex flex-col items-center">
                    <MapPin size={24} className="text-foodie-500 fill-foodie-100" />
                    <span className="mt-1 bg-white px-2 py-0.5 rounded text-xs font-medium shadow-sm">
                      {restaurant.name}
                    </span>
                  </div>
                </div>
              );
            })}
            
            {/* User location */}
            {userLocation && (
              <div 
                className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ 
                  left: `${geoToPixel(userLocation.lat, userLocation.lng).x}px`, 
                  top: `${geoToPixel(userLocation.lat, userLocation.lng).y}px` 
                }}
              >
                <div className="h-4 w-4 bg-blue-500 rounded-full animate-pulse">
                  <div className="h-4 w-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                </div>
                <span className="mt-1 bg-white px-2 py-0.5 rounded text-xs font-medium shadow-sm">
                  You are here
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            {mapError ? (
              <div className="text-center">
                <p className="text-gray-500">{mapError}</p>
                {mapError.includes("location") && (
                  <button
                    onClick={handleGetLocation}
                    className="mt-4 rounded-lg bg-foodie-500 px-4 py-2 text-white hover:bg-foodie-600"
                  >
                    Allow Location Access
                  </button>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Loading map...</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationMap;
