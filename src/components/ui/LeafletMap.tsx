
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
  
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    try {
      let initialView = { lat: 30.7333, lng: 76.7794 };
      let initialZoom = 12;

      if (userLocation) {
        initialView = { lat: userLocation.lat, lng: userLocation.lng };
        initialZoom = 13;
      } else if (restaurants.length > 0) {
        const lats = restaurants.map(r => r.location.lat);
        const lngs = restaurants.map(r => r.location.lng);
        
        const center = { 
          lat: (Math.max(...lats) + Math.min(...lats)) / 2,
          lng: (Math.max(...lngs) + Math.min(...lngs)) / 2
        };
        
        initialView = center;
        initialZoom = 12;
      }

      const map = L.map(mapContainerRef.current).setView(
        [initialView.lat, initialView.lng],
        initialZoom
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;
      setIsMapLoaded(true);
      
    } catch (error) {
      console.error('Error initializing map:', error);
      toast.error('Failed to load map');
    }
    
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
  }, []);

  // Enhanced function to get cuisine-specific images with more variety for Indian dishes
  const getCuisineImage = (restaurant: Restaurant) => {
    const cuisine = restaurant.cuisine[0]?.toLowerCase() || '';
    const restaurantName = restaurant.name.toLowerCase();
    const city = restaurant.city.toLowerCase();
    const random = Math.floor(Math.random() * 5) + 1; // Add variety to images
    
    // More specific Indian cuisine categories for better image matching
    if (cuisine.includes('north indian') || restaurantName.includes('punjabi')) {
      return `https://source.unsplash.com/random/800x600/?north,indian,food,curry,butter,chicken,${random}`;
    } else if (cuisine.includes('south indian') || restaurantName.includes('dosa')) {
      return `https://source.unsplash.com/random/800x600/?south,indian,dosa,idli,sambar,${random}`;
    } else if (cuisine.includes('chinese')) {
      return `https://source.unsplash.com/random/800x600/?chinese,noodles,dimsum,${random}`;
    } else if (cuisine.includes('italian')) {
      return `https://source.unsplash.com/random/800x600/?italian,pasta,pizza,${random}`;
    } else if (cuisine.includes('continental')) {
      return `https://source.unsplash.com/random/800x600/?continental,steak,${random}`;
    } else if (cuisine.includes('punjabi') || restaurantName.includes('dhaba')) {
      return `https://source.unsplash.com/random/800x600/?punjabi,food,butter,chicken,lassi,${random}`;
    } else if (cuisine.includes('cafe')) {
      return `https://source.unsplash.com/random/800x600/?cafe,coffee,pastry,${random}`;
    } else if (cuisine.includes('fast food')) {
      return `https://source.unsplash.com/random/800x600/?fast,food,burger,${random}`;
    } else if (cuisine.includes('bakery')) {
      return `https://source.unsplash.com/random/800x600/?bakery,bread,cake,${random}`;
    } else if (cuisine.includes('mughlai')) {
      return `https://source.unsplash.com/random/800x600/?mughlai,biryani,kebab,${random}`;
    } else if (cuisine.includes('street food')) {
      return `https://source.unsplash.com/random/800x600/?indian,street,food,chaat,${random}`;
    } else if (cuisine.includes('seafood')) {
      return `https://source.unsplash.com/random/800x600/?seafood,fish,curry,${random}`;
    } else if (cuisine.includes('goan')) {
      return `https://source.unsplash.com/random/800x600/?goan,fish,curry,${random}`;
    } else if (cuisine.includes('kashmiri')) {
      return `https://source.unsplash.com/random/800x600/?kashmiri,food,rogan,josh,${random}`;
    } else if (cuisine.includes('hyderabadi')) {
      return `https://source.unsplash.com/random/800x600/?hyderabadi,biryani,haleem,${random}`;
    } else if (cuisine.includes('rajasthani')) {
      return `https://source.unsplash.com/random/800x600/?rajasthani,dal,baati,${random}`;
    } else if (cuisine.includes('bengali')) {
      return `https://source.unsplash.com/random/800x600/?bengali,fish,curry,${random}`;
    } else if (city === 'mumbai' || city === 'pune') {
      return `https://source.unsplash.com/random/800x600/?maharashtrian,pav,bhaji,vada,${random}`;
    } else if (city === 'delhi' || city === 'new delhi') {
      return `https://source.unsplash.com/random/800x600/?delhi,street,food,chole,bhature,${random}`;
    } else if (city === 'bangalore') {
      return `https://source.unsplash.com/random/800x600/?bangalore,karnataka,food,${random}`;
    } else if (city === 'chandigarh') {
      return `https://source.unsplash.com/random/800x600/?chandigarh,punjabi,food,${random}`;
    } else {
      // More specific request to ensure we get food images
      return `https://source.unsplash.com/random/800x600/?indian,restaurant,food,dish,${restaurant.name.split(' ')[0]}`;
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !isMapLoaded) return;
    
    map.eachLayer(layer => {
      if (layer instanceof L.Marker || layer instanceof L.Popup) {
        map.removeLayer(layer);
      }
    });

    markersRef.current = {};

    if (!map.hasLayer(L.TileLayer)) {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);
    }

    if (userLocation) {
      // Enhance user location marker with a pulsing effect
      const userIcon = L.divIcon({
        html: `
          <div class="relative">
            <div class="absolute inset-0 rounded-full bg-blue-500 opacity-30 animate-ping"></div>
            <div class="relative bg-blue-600 w-6 h-6 rounded-full border-2 border-white"></div>
          </div>
        `,
        className: 'user-location-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      
      const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map);
        
      userMarker.bindPopup(
        `<div class="text-center font-medium">You are here</div>`
      ).openPopup();
    }

    restaurants.forEach(restaurant => {
      const isHighlighted = highlightedRestaurantId && highlightedRestaurantId === restaurant.id;
      
      // Use different colors for different cities
      let iconColor = '#e11d48'; // Default (red)
      
      // Assign colors based on city
      if (restaurant.city === 'Chandigarh') {
        iconColor = '#ff4500'; // Orange-red
      } else if (restaurant.city === 'Mumbai' || restaurant.city === 'Pune') {
        iconColor = '#2563eb'; // Blue
      } else if (restaurant.city === 'Delhi' || restaurant.city === 'New Delhi') {
        iconColor = '#16a34a'; // Green
      } else if (restaurant.city === 'Bangalore') {
        iconColor = '#9333ea'; // Purple
      }
      
      const iconSize = isHighlighted ? 20 : 14;
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
      
      const restaurantImage = restaurant.photos && restaurant.photos.length > 0 
        ? restaurant.photos[0] 
        : getCuisineImage(restaurant);
      
      let popupContent = `
        <div style="max-width: 220px; padding: 0; border-radius: 8px; overflow: hidden;">
          <div style="height: 100px; overflow: hidden;">
            <img src="${restaurantImage}" alt="${restaurant.name}" 
              style="width: 100%; height: 100%; object-fit: cover;" 
              onerror="this.onerror=null; this.src='${getCuisineImage(restaurant)}';"
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
      
      popupContent += `
        <div style="font-size: 12px; color: #6B7280; margin-top: 3px;">
          <strong>${restaurant.city}</strong> - ${restaurant.address.split(',')[0]}
        </div>
      `;
      
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
      
      popupContent += `
        <button 
          id="view-${restaurant.id}" 
          style="width: 100%; margin-top: 8px; padding: 6px; background: ${iconColor}; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 13px;"
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
      
      if (isHighlighted || (showPopupOnLoad && restaurants.length <= 5)) {
        marker.openPopup();
      }
      
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
    
    if (restaurants.length > 0) {
      const bounds = L.latLngBounds(restaurants.map(r => [r.location.lat, r.location.lng]));
      
      if (userLocation) {
        bounds.extend([userLocation.lat, userLocation.lng]);
      }
      
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (userLocation) {
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
      
      {isMapLoaded && restaurants.length > 0 && (
        <div className="absolute top-3 left-3 z-10 bg-white rounded-lg px-3 py-2 text-xs font-medium shadow-md">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#ff4500]"></span>
            <span>Chandigarh Restaurants</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#2563eb]"></span>
            <span>Mumbai/Pune Restaurants</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#16a34a]"></span>
            <span>Delhi Restaurants</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#9333ea]"></span>
            <span>Bangalore Restaurants</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="inline-block w-3 h-3 rounded-full bg-[#e11d48]"></span>
            <span>Other Restaurants</span>
          </div>
          {userLocation && (
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block w-3 h-3 rounded-full bg-blue-600"></span>
              <span>Your Location</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
