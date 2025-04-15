
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { CuisineType, FilterOptions, PriceRange, Restaurant } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { MapPin, List } from 'lucide-react';
import { getCurrentUserLocation } from '@/services/api/mapApi';
import LeafletMap from '@/components/ui/LeafletMap';
import { getAllZomatoRestaurants } from '@/utils/zomatoData';
import { getRestaurantRecommendations } from '@/utils/recommendationEngine';

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
    // Load Zomato restaurant data
    try {
      const zomatoRestaurants = getAllZomatoRestaurants();
      setRestaurants(zomatoRestaurants);
      setFilteredRestaurants(zomatoRestaurants);
      
      // Group restaurants by city
      const restaurantsByCity: Record<string, Restaurant[]> = {};
      
      availableCities.forEach(city => {
        if (city !== 'All') {
          restaurantsByCity[city] = zomatoRestaurants.filter(r => r.city === city);
        }
      });
      
      setCityRestaurants(restaurantsByCity);
      
      // Get user location
      const fetchLocation = async () => {
        try {
          const location = await getCurrentUserLocation();
          setUserLocation(location);
          
          // Default to Chandigarh location if no restaurants found near user
          const chandigarhLocation = { lat: 30.7333, lng: 76.7794 };
          
          // Generate recommendations based on Chandigarh location
          const recommended = getRestaurantRecommendations(
            zomatoRestaurants,
            chandigarhLocation.lat,
            chandigarhLocation.lng,
            undefined, // No cuisine filter initially
            3.5, // Min rating
            5, // Max distance km
            10, // Top N results
            2 // Max per locality
          );
          
          setRecommendedRestaurants(recommended);
          setUserLocation(chandigarhLocation); // Set to Chandigarh for map display
        } catch (error) {
          console.error('Error getting user location:', error);
          // Default to Chandigarh, India
          const chandigarhLocation = { lat: 30.7333, lng: 76.7794 };
          setUserLocation(chandigarhLocation);
          
          // Generate recommendations based on Chandigarh location
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
      
      // Apply filters from URL params
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
      
      // Check for city param
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
    
    // First filter by selected city
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
    
    // Add distance if user location is available
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
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams);
    if (city === 'All') {
      newSearchParams.delete('city');
    } else {
      newSearchParams.set('city', city);
    }
    navigate(`?${newSearchParams.toString()}`);
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Earth's radius in km
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
            
            {/* City selector */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex space-x-2">
                {availableCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityChange(city)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      selectedCity === city
                        ? 'bg-foodie-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Featured restaurants for each city */}
            {selectedCity === 'All' && !isLoading && (
              <div className="space-y-10">
                {availableCities.filter(city => city !== 'All').map((city) => (
                  cityRestaurants[city] && cityRestaurants[city].length > 0 && (
                    <div key={city} className="mb-10">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-medium text-gray-900">
                          Top Restaurants in {city}
                        </h2>
                        <button
                          onClick={() => handleCityChange(city)}
                          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                          See all in {city}
                        </button>
                      </div>
                      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {cityRestaurants[city]
                          .sort((a, b) => b.rating - a.rating)
                          .slice(0, 4)
                          .map((restaurant) => (
                            <RestaurantCard
                              key={restaurant.id}
                              restaurant={restaurant}
                              isFavorite={isFavorite(restaurant.id)}
                              onFavoriteToggle={toggleFavorite}
                            />
                          ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
            
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                    viewMode === 'list' 
                      ? 'bg-foodie-50 text-foodie-600' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List size={18} />
                  <span>List</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                    viewMode === 'map' 
                      ? 'bg-foodie-50 text-foodie-600' 
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <MapPin size={18} />
                  <span>Map</span>
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                >
                  <option value="relevance">Relevance</option>
                  <option value="rating">Rating</option>
                  <option value="reviews">Review Count</option>
                  <option value="distance">Distance</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                </select>
              </div>
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
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRestaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isFavorite={isFavorite(restaurant.id)}
                        onFavoriteToggle={toggleFavorite}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No restaurants found</h3>
                    <p className="text-gray-600">Try adjusting your filters or selecting a different city.</p>
                  </div>
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

