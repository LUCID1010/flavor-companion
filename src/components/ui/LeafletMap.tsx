
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
  showPopupOnLoad?: boolean;
  highlightedRestaurantId?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  restaurants,
  userLocation,
  onSelectRestaurant,
  className = 'h-[500px]',
  showPopupOnLoad = false,
  highlightedRestaurantId
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const markersRef = useRef<Record<string, L.Marker>>({});
  
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

    // Reset markers ref
    markersRef.current = {};

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
      const isHighlighted = highlightedRestaurantId && highlightedRestaurantId === restaurant.id;
      
      const iconSize = isHighlighted ? 18 : 12;
      const iconColor = isHighlighted ? '#ff4500' : '#e11d48';
      const borderWidth = isHighlighted ? 3 : 2;
      
      const restaurantIcon = L.divIcon({
        html: `<div style="background-color: ${iconColor}; width: ${iconSize}px; height: ${iconSize}px; border-radius: 50%; border: ${borderWidth}px solid white;"></div>`,
        className: 'restaurant-marker',
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize/2, iconSize/2]
      });
      
      const marker = L.marker(
        [restaurant.location.lat, restaurant.location.lng],
        { icon: restaurantIcon }
      ).addTo(map);
      
      markersRef.current[restaurant.id] = marker;
      
      // Get the primary image for restaurant
      const restaurantImage = restaurant.photos && restaurant.photos.length > 0 
        ? restaurant.photos[0] 
        : `https://source.unsplash.com/random/100x100/?indian,food,${restaurant.cuisine[0]}`;
      
      // Create popup content with image
      let popupContent = `
        <div style="max-width: 220px; padding: 0; border-radius: 8px; overflow: hidden;">
          <div style="height: 100px; overflow: hidden;">
            <img src="${restaurantImage}" alt="${restaurant.name}" 
              style="width: 100%; height: 100%; object-fit: cover;" 
              onerror="this.onerror=null; this.src='https://source.unsplash.com/random/100x100/?restaurant,food';"
            />
          </div>
          <div style="padding: 8px 12px;">
            <h3 style="font-weight: 600; margin: 0 0 5px; color: #111827;">${restaurant.name}</h3>
            <div style="font-size: 12px; color: #6B7280;">${restaurant.cuisine.join(', ')}</div>
            <div style="display: flex; align-items: center; font-size: 12px; margin-top: 5px;">
              <span style="font-weight: 500; color: #000;">⭐ ${restaurant.rating}</span>
              <span style="color: #6B7280; margin-left: 3px;">(${restaurant.reviewCount})</span>
              <span style="margin-left: auto; color: #6B7280;">${restaurant.priceRange}</span>
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
          <div style="font-size: 12px; color: #6B7280; margin-top: 3px;">${distance.toFixed(1)} km away</div>
        `;
      }
      
      // Add button to view details
      popupContent += `
          <button 
            id="view-${restaurant.id}" 
            style="width: 100%; margin-top: 8px; padding: 6px; background: #e11d48; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 13px;"
          >
            View Details
          </button>
        </div>
      </div>
      `;
      
      const popup = L.popup({
        closeButton: false,
        className: 'restaurant-popup'
      }).setContent(popupContent);
      
      marker.bindPopup(popup);
      
      // Auto-open popup for highlighted restaurant
      if (isHighlighted) {
        marker.openPopup();
      } else if (showPopupOnLoad && restaurants.length === 1) {
        // If only one restaurant and showPopupOnLoad is true, open it
        marker.openPopup();
      }
      
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
    
  }, [restaurants, userLocation, isMapLoaded, onSelectRestaurant, highlightedRestaurantId, showPopupOnLoad]);
  
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
      
      {isMapLoaded && restaurants.length === 0 && (
        <div className="absolute bottom-4 left-0 right-0 mx-auto w-max bg-white px-4 py-2 rounded-full shadow-md text-sm">
          No restaurants found in this area
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
