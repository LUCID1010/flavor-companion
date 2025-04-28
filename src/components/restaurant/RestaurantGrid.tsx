
import React from 'react';
import { Restaurant } from '@/types';
import RestaurantCard from '@/components/ui/RestaurantCard';
import NoRestaurantsFound from './NoRestaurantsFound';

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
  // Filter out any non-Indian cities
  const indianCities = ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur', 'Hyderabad'];
  const indianRestaurants = restaurants.filter(restaurant => indianCities.includes(restaurant.city));

  if (indianRestaurants.length === 0) {
    return <NoRestaurantsFound />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {indianRestaurants.map((restaurant) => (
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
