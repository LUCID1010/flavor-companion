
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from '@/components/ui/RestaurantCard';

interface CitySectionProps {
  city: string;
  restaurants: Restaurant[];
  isFavorite: (id: string) => boolean;
  onFavoriteToggle: (id: string) => void;
  onViewAllClick: (city: string) => void;
}

const CitySection: React.FC<CitySectionProps> = ({
  city,
  restaurants,
  isFavorite,
  onFavoriteToggle,
  onViewAllClick,
}) => {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">
          Top Restaurants in {city}
        </h2>
        <button
          onClick={() => onViewAllClick(city)}
          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          See all in {city}
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {restaurants
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4)
          .map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              isFavorite={isFavorite(restaurant.id)}
              onFavoriteToggle={onFavoriteToggle}
            />
          ))}
      </div>
    </div>
  );
};

export default CitySection;
