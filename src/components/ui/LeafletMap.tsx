
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'sonner';
import { Restaurant } from '@/types';
import { calculateDistance } from '@/utils/recommendationEngine';

interface LeafletMapProps {
  restaurants: Restaurant[];
  userLocation?: { lat: number; lng: number };
  onSelectRestaurant?: (id: string) => void;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  restaurants,
  userLocation,
  onSelectRestaurant,
  className = 'h-[500px]'
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      // Set default view to a central location in India if no restaurants or user location
      let initialView = { lat: 20.5937, lng: 78.9629 }; // Center of India
      let initialZoom = 5;

      // If we have user location, use that
      if (userLocation) {
        initialView = { lat: userLocation.lat, lng: userLocation.lng };
        initialZoom = 13;
      } 
      // Otherwise if we have restaurants, fit to their bounds
      else if (restaurants.length > 0) {
        const lats = restaurants.map(r => r.location.lat);
        const lngs = restaurants.map(r => r.location.lng);
        
        const center = { 
          lat: (Math.max(...lats) + Math.min(...lats)) / 2,
          lng: (Math.max(...lngs) + Math.min(...lngs)) / 2
        };
        
        initialView = center;
        initialZoom = 12;
      }

      // Create map
      const map = L.map(mapContainerRef.current).setView(
        [initialView.lat, initialView.lng],
        initialZoom
      );

      // Add OpenStreetMap tiles (free to use)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;
      setIsMapLoaded(true);
      
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to load map');
    }
    
    // Cleanup function to remove map when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Fix Leaflet icon issue
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Add markers when restaurants or user location changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;
    
    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Popup) {
        map.removeLayer(layer);
      }
    });

    // Add base tile layer back if it was removed
    if (!map.hasLayer(L.TileLayer)) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }

    // Add user location marker
    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div style="background-color: #2563eb; width: 15px; height: 15px; border-radius: 50%; border: 2px solid white;"></div>`,
        className: 'user-location-marker',
        iconSize: [15, 15],
        iconAnchor: [7.5, 7.5]
      });
      
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('Your location')
        .openPopup();
    }

    // Add restaurant markers
    restaurants.forEach(restaurant => {
      // Custom icon for restaurants
      const restaurantIcon = L.divIcon({
        html: `<div style="background-color: #e11d48; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white;"></div>`,
        className: 'restaurant-marker',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
      
      const marker = L.marker(
        [restaurant.location.lat, restaurant.location.lng],
        { icon: restaurantIcon }
      ).addTo(map);
      
      // Create popup content
      let popupContent = `
        <div style="max-width: 200px; padding: 8px;">
          <h3 style="font-weight: 500; margin: 0 0 5px;">${restaurant.name}</h3>
          <div style="font-size: 12px; color: #666;">${restaurant.cuisine.join(', ')}</div>
          <div style="display: flex; align-items: center; font-size: 12px; margin-top: 3px;">
            <span style="font-weight: 500;">⭐ ${restaurant.rating}</span>
            <span style="color: #666; margin-left: 3px;">(${restaurant.reviewCount})</span>
          </div>
      `;
      
      // Add distance if user location available
      if (userLocation) {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.location.lat,
          restaurant.location.lng
        );
        
        popupContent += `
          <div style="font-size: 12px; color: #666; margin-top: 3px;">${distance.toFixed(1)} km away</div>
        `;
      }
      
      // Add button to view details
      popupContent += `
          <button 
            id="view-${restaurant.id}" 
            style="width: 100%; margin-top: 8px; padding: 4px; background: #e11d48; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;"
          >
            View Details
          </button>
        </div>
      `;
      
      const popup = L.popup().setContent(popupContent);
      marker.bindPopup(popup);
      
      // Handle clicks on the view details button
      marker.on('popupopen', () => {
        setTimeout(() => {
          const button = document.getElementById(`view-${restaurant.id}`);
          if (button) {
            button.addEventListener('click', () => {
              if (onSelectRestaurant) {
                onSelectRestaurant(restaurant.id);
              }
            });
          }
        }, 0);
      });
    });
    
    // Fit bounds if we have restaurants
    if (restaurants.length > 0) {
      const bounds = L.latLngBounds(restaurants.map(r => [r.location.lat, r.location.lng]));
      
      // Add user location to bounds if available
      if (userLocation) {
        bounds.extend([userLocation.lat, userLocation.lng]);
      }
      
      // Add some padding
      map.fitBounds(bounds, { padding: [50, 50] });
    } 
    // Or center on user location with appropriate zoom
    else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
    
  }, [restaurants, userLocation, isMapLoaded, onSelectRestaurant]);
  
  return (
    <div className={`relative rounded-lg border border-gray-200 shadow-md overflow-hidden ${className}`}>
      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foodie-500"></div>
            <span className="mt-2 text-sm text-gray-600">Loading map...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
