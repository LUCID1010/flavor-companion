
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
  // Define Indian cities and explicitly exclude San Francisco and Singapore
  const indianCities = ['Chandigarh', 'Mumbai', 'New Delhi', 'Bangalore', 'Pune', 'Agra', 'Chennai', 'Lucknow', 'Jaipur', 'Hyderabad'];
  
  // Filter out San Francisco, Singapore, and non-Indian cities
  const filteredRestaurants = restaurants.filter(restaurant => 
    indianCities.includes(restaurant.city) &&
    restaurant.city !== 'San Francisco' &&
    restaurant.city !== 'Singapore'
  );

  if (filteredRestaurants.length === 0) {
    return <NoRestaurantsFound />;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredRestaurants.map((restaurant) => (
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
