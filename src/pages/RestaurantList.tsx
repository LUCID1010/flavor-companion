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
      
      // Get user location
      const fetchLocation = async () => {
        try {
          const location = await getCurrentUserLocation();
          setUserLocation(location);
          
          // Generate recommendations based on user location
          const recommended = getRestaurantRecommendations(
            zomatoRestaurants,
            location.lat,
            location.lng,
            undefined, // No cuisine filter initially
            3.5, // Min rating
            10, // Max distance km
            10, // Top N results
            2 // Max per locality
          );
          
          setRecommendedRestaurants(recommended);
        } catch (error) {
          console.error('Error getting user location:', error);
          // Default to Mumbai, India
          const defaultLocation = { lat: 19.076, lng: 72.8777 };
          setUserLocation(defaultLocation);
          
          // Generate recommendations based on default location
          const recommended = getRestaurantRecommendations(
            zomatoRestaurants,
            defaultLocation.lat,
            defaultLocation.lng
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
    } catch (error) {
      console.error("Error loading restaurant data:", error);
      toast.error("Failed to load restaurant data");
      setIsLoading(false);
    }

    toast.info("Showing Indian restaurants in your area");
  }, [searchParams]);
  
  useEffect(() => {
    if (!restaurants.length) return;
    
    let result = [...restaurants];
    
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
  }, [restaurants, filters, sortBy, userLocation]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleRestaurantSelect = (id: string) => {
    navigate(`/restaurant/${id}`);
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
              Indian Restaurants in Your Area
            </h1>
            
            <div className="mb-8">
              <SearchBar showButton />
            </div>
            
            {!isLoading && recommendedRestaurants.length > 0 && (
              <div className="mb-10">
                <h2 className="mb-4 text-xl font-medium text-gray-900">
                  Recommended for You
                </h2>
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {recommendedRestaurants.slice(0, 4).map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      isFavorite={isFavorite(restaurant.id)}
                      onFavoriteToggle={toggleFavorite}
                    />
                  ))}
                </div>
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
                {viewMode === 'map' ? (
                  <div className="mb-6">
                    <LeafletMap 
                      restaurants={filteredRestaurants} 
                      userLocation={userLocation || undefined}
                      onSelectRestaurant={handleRestaurantSelect} 
                      className="h-[500px]"
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
                    <p className="text-gray-600">Try adjusting your filters to see more results.</p>
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
