import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from "sonner";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { CuisineType, FilterOptions, PriceRange, Restaurant } from '@/types';
import { mockRestaurants } from '@/utils/mockData';
import { importRestaurants } from '@/utils/importRestaurantData';
import { useAuth } from '@/hooks/useAuth';
import LocationMap from '@/components/ui/LocationMap';
import { MapPin, List } from 'lucide-react';

const RestaurantList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useAuth();
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: [],
    price: [],
    features: [],
    openNow: false,
  });
  
  const [sortBy, setSortBy] = useState('relevance');
  
  useEffect(() => {
    const importedRestaurants = importRestaurants();
    const allRestaurants = [...mockRestaurants, ...importedRestaurants];
    
    const uniqueRestaurants = allRestaurants.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, [] as Restaurant[]);
    
    setRestaurants(uniqueRestaurants);
    setFilteredRestaurants(uniqueRestaurants);
    
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

    toast.info("Showing Indian restaurants and markets in your area");
  }, [searchParams]);
  
  useEffect(() => {
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
    
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
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
  }, [restaurants, filters, sortBy]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  const handleRestaurantSelect = (id: string) => {
    navigate(`/restaurant/${id}`);
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
                    <LocationMap 
                      restaurants={filteredRestaurants} 
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
