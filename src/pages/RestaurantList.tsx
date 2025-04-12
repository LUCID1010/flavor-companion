
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import FilterPanel from '@/components/ui/FilterPanel';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { CuisineType, FilterOptions, PriceRange, SortOption } from '@/types';
import { filterRestaurants, mockRestaurants, mockUsers, sortRestaurants } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const RestaurantList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(mockUsers[0]?.favorites || []);
  
  // Get query params
  const initialQuery = searchParams.get('q') || '';
  const initialLocation = searchParams.get('loc') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'relevance';
  
  // State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [filters, setFilters] = useState<FilterOptions>({
    cuisine: [],
    price: [],
    features: [],
    openNow: false
  });
  
  // Get filtered restaurants
  const filteredRestaurants = filterRestaurants(
    searchQuery,
    filters.cuisine as CuisineType[],
    filters.price as PriceRange[],
    filters.features,
    filters.openNow
  );
  
  // Sort restaurants
  const sortedRestaurants = sortRestaurants(filteredRestaurants, sortBy);
  
  // Handle search
  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setLocationQuery(location);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (query) params.set('q', query);
    else params.delete('q');
    
    if (location) params.set('loc', location);
    else params.delete('loc');
    
    setSearchParams(params);
  };
  
  // Handle sort change
  const handleSortChange = (newSort: SortOption) => {
    setSortBy(newSort);
    
    // Update URL params
    const params = new URLSearchParams(searchParams);
    if (newSort !== 'relevance') params.set('sort', newSort);
    else params.delete('sort');
    
    setSearchParams(params);
  };
  
  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };
  
  // Sort options
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'rating', label: 'Rating (High to Low)' },
    { value: 'reviews', label: 'Most Reviewed' },
    { value: 'priceAsc', label: 'Price (Low to High)' },
    { value: 'priceDesc', label: 'Price (High to Low)' },
  ];
  
  // Add scroll handler
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Search Bar */}
        <div className="border-b border-gray-200 pb-6 pt-4">
          <div className="foodie-container">
            <SearchBar 
              initialQuery={searchQuery} 
              initialLocation={locationQuery} 
              onSearch={handleSearch}
            />
          </div>
        </div>
        
        <div className="foodie-container py-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
                {searchQuery 
                  ? `Results for "${searchQuery}"` 
                  : "All Restaurants"}
              </h1>
              <p className="text-gray-600">
                {sortedRestaurants.length} restaurants found
                {locationQuery ? ` near ${locationQuery}` : ''}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Filter Button (Mobile) */}
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 md:hidden"
              >
                <SlidersHorizontal size={16} />
                <span>Filters</span>
              </button>
              
              {/* Sort Dropdown */}
              <div className="flex items-center">
                <div className="relative">
                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={16} className="text-gray-500" />
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value as SortOption)}
                      className="appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-8 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:border-foodie-300 focus:outline-none focus:ring-1 focus:ring-foodie-300"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
            {/* Filters */}
            <aside className={cn(
              "fixed inset-y-0 left-0 z-40 w-full transform overflow-y-auto bg-white p-6 transition duration-300 ease-in-out md:relative md:inset-auto md:block md:w-auto md:transform-none md:p-0",
              mobileFiltersOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            )}>
              <div className="md:sticky md:top-28">
                <div className="mb-4 flex items-center justify-between md:hidden">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <FilterPanel 
                  filters={filters} 
                  onFilterChange={setFilters}
                />
              </div>
            </aside>
            
            {/* Restaurant List */}
            <div className="lg:col-span-3">
              {mobileFiltersOpen && (
                <div 
                  className="fixed inset-0 z-30 bg-black/30 md:hidden" 
                  onClick={() => setMobileFiltersOpen(false)}
                />
              )}
              
              {sortedRestaurants.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                  {sortedRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      isFavorite={favorites.includes(restaurant.id)}
                      onFavoriteToggle={toggleFavorite}
                      className="animate-fade-in"
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-8 text-center">
                  <p className="mb-4 text-lg font-medium text-gray-700">No restaurants found</p>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantList;
