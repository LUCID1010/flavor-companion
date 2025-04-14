
import React, { useState } from 'react';
import { Search, MapPin, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'large';
  initialQuery?: string;
  initialLocation?: string;
  onSearch?: (query: string, location: string) => void;
  showButton?: boolean;
  disableNavigation?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  variant = 'default',
  initialQuery = '',
  initialLocation = '',
  onSearch,
  showButton = true,
  disableNavigation = false,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  
  // Conditionally use navigate only if we're not disabling navigation
  // This prevents the useNavigate hook from being called outside Router context
  const navigate = !disableNavigation ? useNavigate() : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSearch) {
      onSearch(query, location);
    } else if (navigate) {
      // Only navigate if navigate is available
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (location) params.append('loc', location);
      
      navigate(`/restaurants?${params.toString()}`);
    }
  };

  const isLarge = variant === 'large';
  
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full flex-col gap-2 transition-all sm:flex-row",
        isLarge ? "md:p-1" : "",
        className
      )}
    >
      <div
        className={cn(
          "group relative flex flex-1 items-center overflow-hidden rounded-xl border border-border bg-white transition-all focus-within:border-foodie-300 focus-within:ring-1 focus-within:ring-foodie-300",
          isLarge ? "md:rounded-xl md:shadow-elegant" : ""
        )}
      >
        <div className="pointer-events-none flex h-full items-center pl-3 text-gray-400">
          <Search size={isLarge ? 20 : 18} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find restaurants, cuisine, dishes..."
          className={cn(
            "flex-1 bg-transparent py-2 pl-2 pr-4 text-gray-900 placeholder-gray-400 outline-none",
            isLarge ? "md:py-3 md:text-lg" : ""
          )}
        />
      </div>

      <div
        className={cn(
          "group relative flex flex-1 items-center overflow-hidden rounded-xl border border-border bg-white transition-all focus-within:border-foodie-300 focus-within:ring-1 focus-within:ring-foodie-300",
          isLarge ? "md:rounded-xl md:shadow-elegant" : ""
        )}
      >
        <div className="pointer-events-none flex h-full items-center pl-3 text-gray-400">
          <MapPin size={isLarge ? 20 : 18} />
        </div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="City, state, or zip code"
          className={cn(
            "flex-1 bg-transparent py-2 pl-2 pr-4 text-gray-900 placeholder-gray-400 outline-none",
            isLarge ? "md:py-3 md:text-lg" : ""
          )}
        />
      </div>

      {showButton && (
        <button
          type="submit"
          className={cn(
            "flex items-center justify-center rounded-xl bg-foodie-500 px-6 py-2 font-medium text-white shadow-button transition-all hover:bg-foodie-600 focus:outline-none focus:ring-2 focus:ring-foodie-500 focus:ring-offset-1 active:bg-foodie-700",
            isLarge ? "md:px-8 md:py-3 md:text-lg" : ""
          )}
        >
          <span className="mr-1">Search</span>
          <ChevronRight size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
