
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from '@/components/ui/RestaurantCard';

interface RestaurantGridProps {
  restaurants: Restaurant[];
  isFavorite: (id: string) => boolean;
  onFavoriteToggle: (id: string) => void;
}

const RestaurantGrid: React.FC<RestaurantGridProps> = ({
  restaurants,
  isFavorite,
  onFavoriteToggle,
}) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isFavorite={isFavorite(restaurant.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default RestaurantGrid;
