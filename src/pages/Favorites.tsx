
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { getRestaurantById, mockUsers } from '@/utils/mockData';
import { Restaurant } from '@/types';

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(mockUsers[0]?.favorites || []);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  
  useEffect(() => {
    // Get restaurant data for favorites
    const restaurants = favorites.map(id => getRestaurantById(id)).filter(Boolean) as Restaurant[];
    setFavoriteRestaurants(restaurants);
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [favorites]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav !== id));
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="foodie-container py-10">
          <div className="mb-10">
            <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Your Favorite Restaurants
            </h1>
            <p className="text-gray-600">
              {favoriteRestaurants.length > 0
                ? `You have ${favoriteRestaurants.length} favorite ${favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'}`
                : 'Save your favorite restaurants to find them easily later'}
            </p>
          </div>
          
          {favoriteRestaurants.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {favoriteRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isFavorite={true}
                  onFavoriteToggle={toggleFavorite}
                  className="animate-fade-in"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-10 text-center shadow-card">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Heart size={32} className="text-gray-400" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                No favorites yet
              </h2>
              <p className="mb-6 max-w-md text-gray-600">
                When you find restaurants you love, save them to your favorites for quick access later.
              </p>
              <Link
                to="/restaurants"
                className="rounded-lg bg-foodie-500 px-5 py-2.5 font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700"
              >
                Explore Restaurants
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
