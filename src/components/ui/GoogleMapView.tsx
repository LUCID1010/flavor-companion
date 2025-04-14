
import React, { useState, useEffect } from 'react';
import { 
  APIProvider, 
  Map, 
  Marker, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';
import { Restaurant } from '@/types';
import { calculateDistance } from '@/utils/recommendationEngine';

// Your Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY_HERE";

interface GoogleMapViewProps {
  restaurants: Restaurant[];
  userLocation?: { lat: number; lng: number };
  onSelectRestaurant?: (id: string) => void;
  className?: string;
}

const GoogleMapView: React.FC<GoogleMapViewProps> = ({
  restaurants,
  userLocation,
  onSelectRestaurant,
  className = 'h-[500px]'
}) => {
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState<boolean>(false);
  
  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };
  
  const handleInfoWindowClose = () => {
    setSelectedRestaurant(null);
  };
  
  const handleRestaurantSelect = (id: string) => {
    if (onSelectRestaurant) {
      onSelectRestaurant(id);
    }
  };

  // Calculate map bounds to fit all markers
  const getBounds = () => {
    if (!restaurants.length) return { center: { lat: 28.6139, lng: 77.2090 }, zoom: 10 }; // Default to Delhi
    
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
    
    // Add padding
    const latPadding = (maxLat - minLat) * 0.1;
    const lngPadding = (maxLng - minLng) * 0.1;
    
    // Calculate center
    const center = { 
      lat: (minLat + maxLat) / 2, 
      lng: (minLng + maxLng) / 2 
    };
    
    // Calculate appropriate zoom level
    const latDiff = (maxLat - minLat) + 2 * latPadding;
    const lngDiff = (maxLng - minLng) + 2 * lngPadding;
    const maxDiff = Math.max(latDiff, lngDiff);
    
    // Simple formula to estimate zoom level
    const zoom = Math.round(14 - Math.log2(maxDiff * 100));
    
    return { center, zoom: Math.min(Math.max(zoom, 10), 15) }; // Keep zoom between 10 and 15
  };
  
  const mapSettings = getBounds();
  
  return (
    <div className={`relative rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      <APIProvider 
        apiKey={GOOGLE_MAPS_API_KEY}
        onLoad={() => {
          setIsApiLoaded(true);
          console.log('Google Maps API loaded successfully');
        }}
        onError={(error) => {
          console.error('Error loading Google Maps API:', error);
          toast.error('Failed to load Google Maps');
        }}
      >
        <Map
          defaultCenter={mapSettings.center}
          defaultZoom={mapSettings.zoom}
          mapId="foodie-map"
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {/* User location marker */}
          {userLocation && (
            <Marker 
              position={userLocation}
              title="Your location"
              icon={{
                path: 0, // Use a circle
                scale: 8,
                fillColor: '#2563eb',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />
          )}
          
          {/* Restaurant markers */}
          {restaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              position={{
                lat: restaurant.location.lat,
                lng: restaurant.location.lng
              }}
              onClick={() => handleMarkerClick(restaurant)}
              title={restaurant.name}
              icon={{
                path: 0, // Use a circle
                scale: 8,
                fillColor: '#E11D48',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 2,
              }}
            />
          ))}
          
          {/* Info window for selected restaurant */}
          {selectedRestaurant && (
            <InfoWindow
              position={{
                lat: selectedRestaurant.location.lat,
                lng: selectedRestaurant.location.lng
              }}
              onCloseClick={handleInfoWindowClose}
            >
              <div className="p-2 max-w-[200px]">
                <h3 className="font-medium text-gray-900">{selectedRestaurant.name}</h3>
                <div className="text-sm text-gray-500">
                  {selectedRestaurant.cuisine.join(', ')}
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">⭐ {selectedRestaurant.rating}</span>
                  <span className="text-gray-500">({selectedRestaurant.reviewCount})</span>
                </div>
                {userLocation && (
                  <div className="text-xs text-gray-500 mt-1">
                    {calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      selectedRestaurant.location.lat,
                      selectedRestaurant.location.lng
                    ).toFixed(1)} km away
                  </div>
                )}
                <button
                  className="mt-2 px-2 py-1 bg-foodie-500 text-white text-xs rounded-md w-full"
                  onClick={() => handleRestaurantSelect(selectedRestaurant.id)}
                >
                  View Details
                </button>
              </div>
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
      
      {!isApiLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foodie-500"></div>
            <span className="mt-2 text-sm text-gray-600">Loading map...</span>
          </div>
        </div>
      )}
      
      {/* Fallback for no API key */}
      {GOOGLE_MAPS_API_KEY === "YOUR_API_KEY_HERE" && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md max-w-md text-center">
            <h3 className="font-medium text-gray-900 mb-2">Google Maps API Key Required</h3>
            <p className="text-sm text-gray-600">
              To see the map, please add your Google Maps API key in the GoogleMapView component.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleMapView;
