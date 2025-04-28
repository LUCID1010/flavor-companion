import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import { CuisineType, PriceRange, Restaurant } from '@/types';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import LeafletMap from '@/components/ui/LeafletMap';
import { FilterOptions } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { getCurrentUserLocation } from '@/services/api/mapApi';
import { getAllZomatoRestaurants } from '@/utils/zomatoData';
import { getRestaurantRecommendations } from '@/utils/recommendationEngine';
import CitySelector from '@/components/restaurant/CitySelector';
import ViewModeToggle from '@/components/restaurant/ViewModeToggle';
import SortingControl from '@/components/restaurant/SortingControl';
import RestaurantGrid from '@/components/restaurant/RestaurantGrid';
import CitySection from '@/components/restaurant/CitySection';
import NoRestaurantsFound from '@/components/restaurant/NoRestaurantsFound';

const RestaurantList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState<Restaurant[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [cityRestaurants, setCityRestaurants] = useState<Record<string, Restaurant[]>>({});
  
  const availableCities = [
    'All', 
    'Chandigarh', 
    'Mumbai', 
    'New Delhi', 
    'Bangalore', 
    'Pune', 
    'Agra', 
    'Chennai', 
    'Lucknow', 
    'Jaipur'
  ];

  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: [],
    price: [],
    features: [],
    openNow: false,
  });
  
  const [sortBy, setSortBy] = useState('relevance');
  
  useEffect(() => {
    try {
      const zomatoRestaurants = getAllZomatoRestaurants();
      setRestaurants(zomatoRestaurants);
      setFilteredRestaurants(zomatoRestaurants);
      
      const restaurantsByCity: Record<string, Restaurant[]> = {};
      
      availableCities.forEach(city => {
        if (city !== 'All') {
          restaurantsByCity[city] = zomatoRestaurants.filter(r => r.city === city);
        }
      });
      
      setCityRestaurants(restaurantsByCity);
      
      const fetchLocation = async () => {
        try {
          const location = await getCurrentUserLocation();
          setUserLocation(location);
          
          const chandigarhLocation = { lat: 30.7333, lng: 76.7794 };
          
          const recommended = getRestaurantRecommendations(
            zomatoRestaurants,
            chandigarhLocation.lat,
            chandigarhLocation.lng,
            undefined,
            3.5,
            5,
            10,
            2
          );
          
          setRecommendedRestaurants(recommended);
          setUserLocation(chandigarhLocation);
        } catch (error) {
          console.error('Error getting user location:', error);
          const chandigarhLocation = { lat: 30.7333, lng: 76.7794 };
          setUserLocation(chandigarhLocation);
          
          const recommended = getRestaurantRecommendations(
            zomatoRestaurants,
            chandigarhLocation.lat,
            chandigarhLocation.lng
          );
          
          setRecommendedRestaurants(recommended);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchLocation();
      
      const cuisineParam = searchParams.get('cuisine');
      if (cuisineParam) {
        setFilters(prev => ({
          ...prev,
          cuisine: [cuisineParam as CuisineType]
        }));
      }
      
      const priceParam = searchParams.get('price');
      if (priceParam) {
        setFilters(prev => ({
          ...prev,
          price: [priceParam as PriceRange]
        }));
      }
      
      const sortParam = searchParams.get('sort');
      if (sortParam) {
        setSortBy(sortParam);
      }
      
      const cityParam = searchParams.get('city');
      if (cityParam && availableCities.includes(cityParam)) {
        setSelectedCity(cityParam);
      }
      
    } catch (error) {
      console.error("Error loading restaurant data:", error);
      toast.error("Failed to load restaurant data");
      setIsLoading(false);
    }

    toast.info("Showing Indian restaurants across popular cities");
  }, [searchParams]);
  
  useEffect(() => {
    if (!restaurants.length) return;
    
    let result = [...restaurants];
    
    if (selectedCity !== 'All') {
      result = result.filter(restaurant => restaurant.city === selectedCity);
    }
    
    if (filters.cuisine.length > 0) {
      result = result.filter(restaurant => 
        restaurant.cuisine.some(cuisine => filters.cuisine.includes(cuisine as CuisineType))
      );
    }
    
    if (filters.price.length > 0) {
      result = result.filter(restaurant => 
        filters.price.includes(restaurant.priceRange)
      );
    }

    if (filters.features.length > 0) {
      result = result.filter(restaurant => 
        restaurant.features.some(feature => filters.features.includes(feature))
      );
    }

    if (filters.openNow) {
      const day = new Date().toLocaleDateString('en-US', { weekday: 'long' });
      result = result.filter(restaurant => 
        restaurant.hours && restaurant.hours[day] && 
        restaurant.hours[day].open && restaurant.hours[day].close
      );
    }
    
    if (userLocation) {
      result = result.map(restaurant => ({
        ...restaurant,
        distance: calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurant.location.lat,
          restaurant.location.lng
        )
      }));
    }
    
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'distance':
        if (userLocation) {
          result.sort((a, b) => {
            const distanceA = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              a.location.lat,
              a.location.lng
            );
            
            const distanceB = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              b.location.lat,
              b.location.lng
            );
            
            return distanceA - distanceB;
          });
        }
        break;
      case 'priceAsc':
        result.sort((a, b) => {
          const priceToNum = (p: PriceRange) => p.length;
          return priceToNum(a.priceRange) - priceToNum(b.priceRange);
        });
        break;
      case 'priceDesc':
        result.sort((a, b) => {
          const priceToNum = (p: PriceRange) => p.length;
          return priceToNum(b.priceRange) - priceToNum(a.priceRange);
        });
        break;
    }
    
    setFilteredRestaurants(result);
  }, [restaurants, filters, sortBy, userLocation, selectedCity]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleRestaurantSelect = (id: string) => {
    navigate(`/restaurant/${id}`);
  };
  
  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    const newSearchParams = new URLSearchParams(searchParams);
    if (city === 'All') {
      newSearchParams.delete('city');
    } else {
      newSearchParams.set('city', city);
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  const handleViewModeChange = (mode: 'list' | 'map') => {
    setViewMode(mode);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="bg-white py-8">
          <div className="foodie-container">
            <h1 className="mb-6 text-2xl font-semibold text-gray-900 sm:text-3xl">
              {selectedCity === 'All' 
                ? 'Indian Restaurants Across Popular Cities' 
                : `Indian Restaurants in ${selectedCity}`}
            </h1>
            
            <div className="mb-8">
              <SearchBar showButton />
            </div>
            
            <CitySelector 
              selectedCity={selectedCity}
              availableCities={availableCities}
              onCityChange={handleCityChange}
            />
            
            {selectedCity === 'All' && !isLoading && (
              <div className="space-y-10">
                {availableCities.filter(city => city !== 'All').map((city) => (
                  cityRestaurants[city] && cityRestaurants[city].length > 0 && (
                    <CitySection
                      key={city}
                      city={city}
                      restaurants={cityRestaurants[city]}
                      isFavorite={isFavorite}
                      onFavoriteToggle={toggleFavorite}
                      onViewAllClick={handleCityChange}
                    />
                  )
                ))}
              </div>
            )}
            
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <ViewModeToggle
                viewMode={viewMode}
                onViewModeChange={handleViewModeChange}
              />
              
              <SortingControl
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>
            
            <div className="grid gap-8 lg:grid-cols-4">
              <div className="lg:col-span-1">
                <FilterPanel 
                  onFilterChange={handleFilterChange}
                  filters={filters}
                />
              </div>
              
              <div className="lg:col-span-3">
                {viewMode === 'map' && userLocation ? (
                  <div className="mb-6">
                    <LeafletMap 
                      restaurants={filteredRestaurants} 
                      userLocation={userLocation}
                      onSelectRestaurant={handleRestaurantSelect} 
                      className="h-[500px]"
                      showPopupOnLoad={filteredRestaurants.length <= 10}
                    />
                  </div>
                ) : null}
                
                {filteredRestaurants.length > 0 ? (
                  <RestaurantGrid 
                    restaurants={filteredRestaurants}
                    isFavorite={isFavorite}
                    onFavoriteToggle={toggleFavorite}
                  />
                ) : (
                  <NoRestaurantsFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantList;
