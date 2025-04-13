
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, MapPin, Star, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { toast } from 'sonner';
import HomeMap from '@/components/ui/HomeMap';
import { useAuth } from '@/hooks/useAuth';
import { getFeaturedRestaurants, getPopularRestaurants } from '@/services/api/restaurantApi';

const Index: React.FC = () => {
  const { isFavorite, toggleFavorite } = useAuth();
  
  const [featuredRestaurants, setFeaturedRestaurants] = useState([]);
  const [popularRestaurants, setPopularRestaurants] = useState([]);
  
  useEffect(() => {
    // Get featured and popular restaurants
    try {
      const featured = getFeaturedRestaurants(3);
      const popular = getPopularRestaurants(4);
      
      setFeaturedRestaurants(featured);
      setPopularRestaurants(popular);
    } catch (error) {
      console.error('Error loading restaurants:', error);
      toast.error('Failed to load restaurant data');
    }
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-24">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-white to-white/10" />
        </div>
        
        <div className="foodie-container relative z-10 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800 animate-fade-in">
            Discover amazing Indian restaurants near you
          </span>
          
          <h1 className="mb-6 font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-slide-down">
            Find Your Perfect <span className="text-foodie-500">Indian Dining</span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-gray-600 md:text-xl animate-slide-down">
            Explore the rich flavors of India with thousands of authentic restaurants. From spicy curries to sweet desserts, find your next favorite Indian dish.
          </p>
          
          <div className="w-full max-w-4xl animate-scale-in">
            <SearchBar variant="large" showButton />
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-700 sm:gap-12 animate-fade-in">
            <div className="flex items-center gap-2">
              <Utensils size={20} className="text-foodie-500" />
              <span>1000+ Restaurants</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-foodie-500" />
              <span>All Major Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-foodie-500" />
              <span>Authentic Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-foodie-500" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="foodie-container">
          <div className="mb-10">
            <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
              Find Nearby
            </span>
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Indian Restaurants Near You
            </h2>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Discover the best Indian restaurants in your area. Allow location access to see restaurants close to you.
            </p>
          </div>
          
          <HomeMap className="h-[500px]" />
          
          <div className="mt-6 text-center">
            <Link 
              to="/restaurants" 
              className="inline-flex items-center gap-1.5 rounded-lg border border-foodie-500 bg-white px-5 py-2 font-medium text-foodie-600 transition-colors hover:bg-foodie-50"
            >
              View All Restaurants
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="foodie-container">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                Editor's Picks
              </span>
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Featured Indian Restaurants
              </h2>
            </div>
            <Link 
              to="/restaurants" 
              className="flex items-center gap-1 text-foodie-600 transition-colors hover:text-foodie-700"
            >
              <span className="font-medium">View all restaurants</span>
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:gap-10">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                featured
                isFavorite={isFavorite(restaurant.id)}
                onFavoriteToggle={toggleFavorite}
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Popular Restaurants */}
      <section className="bg-gray-50 py-16">
        <div className="foodie-container">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                Top Rated
              </span>
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Popular Indian Restaurants
              </h2>
            </div>
            <Link 
              to="/restaurants?sort=rating" 
              className="flex items-center gap-1 text-foodie-600 transition-colors hover:text-foodie-700"
            >
              <span className="font-medium">See more</span>
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {popularRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isFavorite={isFavorite(restaurant.id)}
                onFavoriteToggle={toggleFavorite}
                className="animate-fade-in"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="foodie-container">
          <div className="mb-10 text-center">
            <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
              About FoodieFinder
            </span>
            <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
              Your Guide to Indian Cuisine
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-foodie-100 p-3 w-12 h-12 flex items-center justify-center">
                <Utensils className="h-6 w-6 text-foodie-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Authentic Indian Food</h3>
              <p className="text-gray-600">
                Discover the diverse and rich culinary heritage of India, from North to South and East to West.
                Our platform showcases authentic Indian restaurants serving traditional recipes.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-foodie-100 p-3 w-12 h-12 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-foodie-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Find Nearby Options</h3>
              <p className="text-gray-600">
                Easily locate Indian restaurants near you with our interactive map. Filter by cuisine type, 
                price range, or specific dishes to find exactly what you're craving.
              </p>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 rounded-full bg-foodie-100 p-3 w-12 h-12 flex items-center justify-center">
                <Star className="h-6 w-6 text-foodie-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">Trusted Reviews</h3>
              <p className="text-gray-600">
                Read honest reviews from fellow Indian cuisine enthusiasts. Share your own experiences and help 
                others discover the best tandoori, dosas, biryani, and more.
              </p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/about"
              className="inline-flex items-center rounded-lg bg-foodie-500 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-foodie-600"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20">
        <div className="foodie-container">
          <div className="overflow-hidden rounded-2xl bg-foodie-500">
            <div className="relative px-6 py-16 sm:px-10 sm:py-20 md:px-16">
              <div className="absolute right-0 top-0 h-full w-1/3 bg-foodie-400 opacity-50 md:w-1/2 lg:w-2/3" />
              
              <div className="relative z-10 max-w-2xl">
                <h2 className="mb-6 text-3xl font-semibold text-white sm:text-4xl">
                  Ready to find your next favorite Indian restaurant?
                </h2>
                <p className="mb-8 text-lg text-white/90 sm:text-xl">
                  Join thousands of Indian food lovers discovering new places to eat. Create an account to save your favorites and get personalized recommendations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-medium text-foodie-600 shadow-button transition-all hover:bg-gray-50 active:bg-gray-100"
                  >
                    Sign Up Now
                  </Link>
                  <Link
                    to="/restaurants"
                    className="inline-flex items-center justify-center rounded-xl border border-white bg-transparent px-5 py-3 font-medium text-white transition-all hover:bg-white/10 active:bg-white/20"
                  >
                    Browse Restaurants
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
