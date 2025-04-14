
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Loader2, MapPin, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { Restaurant } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import GoogleMapView from '@/components/ui/GoogleMapView';
import { getRestaurantById } from '@/utils/mockData';
import { getCurrentUserLocation } from '@/services/api/mapApi';

const Favorites: React.FC = () => {
  const { user, isFavorite, toggleFavorite } = useAuth();
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in, redirect to login if not
    if (!user && !isLoading) {
      navigate('/auth');
      return;
    }
    
    if (user) {
      // Get restaurant data for favorites
      const restaurants = user.favorites
        .map(id => getRestaurantById(id))
        .filter(Boolean) as Restaurant[];
        
      setFavoriteRestaurants(restaurants);
      setIsLoading(false);
    }
    
    // Get user location
    const fetchLocation = async () => {
      try {
        const location = await getCurrentUserLocation();
        setUserLocation(location);
      } catch (error) {
        console.error('Error getting user location:', error);
        // Default to Mumbai, India
        setUserLocation({ lat: 19.076, lng: 72.8777 });
      }
    };
    
    fetchLocation();
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [user, navigate, isLoading]);
  
  const handleFavoriteToggle = async (id: string) => {
    await toggleFavorite(id);
    setFavoriteRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
  };
  
  const handleRestaurantSelect = (id: string) => {
    navigate(`/restaurant/${id}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-foodie-500" />
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="foodie-container py-10">
          <div className="mb-6">
            <h1 className="mb-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
              Your Favorite Restaurants
            </h1>
            <p className="text-gray-600">
              {favoriteRestaurants.length > 0
                ? `You have ${favoriteRestaurants.length} favorite ${favoriteRestaurants.length === 1 ? 'restaurant' : 'restaurants'}`
                : 'Save your favorite restaurants to find them easily later'}
            </p>
          </div>
          
          {favoriteRestaurants.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium ${
                  viewMode === 'list' 
                    ? 'bg-foodie-50 text-foodie-600' 
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List size={18} />
                <span>List View</span>
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
                <span>Map View</span>
              </button>
            </div>
          )}
          
          {favoriteRestaurants.length > 0 ? (
            viewMode === 'list' ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {favoriteRestaurants.map((restaurant) => (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isFavorite={true}
                    onFavoriteToggle={() => handleFavoriteToggle(restaurant.id)}
                    className="animate-fade-in"
                  />
                ))}
              </div>
            ) : (
              <GoogleMapView
                restaurants={favoriteRestaurants}
                userLocation={userLocation || undefined}
                onSelectRestaurant={handleRestaurantSelect}
                className="h-[500px] mb-6"
              />
            )
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
