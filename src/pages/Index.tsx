
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Utensils, MapPin, Star, Clock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/ui/SearchBar';
import RestaurantCard from '@/components/ui/RestaurantCard';
import { mockRestaurants, mockUsers } from '@/utils/mockData';

const Index: React.FC = () => {
  const [favorites, setFavorites] = useState<string[]>(mockUsers[0]?.favorites || []);
  
  const featuredRestaurants = mockRestaurants.slice(0, 3);
  const popularRestaurants = [...mockRestaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50 pt-24">
        <div 
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <div className="absolute inset-0 bg-gradient-radial from-white to-white/10" />
        </div>
        
        <div className="foodie-container relative z-10 flex flex-col items-center text-center">
          <span className="mb-4 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800 animate-fade-in">
            Discover amazing restaurants near you
          </span>
          
          <h1 className="mb-6 font-semibold tracking-tight text-gray-900 md:text-5xl lg:text-6xl animate-slide-down">
            Find Your Perfect <span className="text-foodie-500">Dining Experience</span>
          </h1>
          
          <p className="mb-10 max-w-2xl text-lg text-gray-600 md:text-xl animate-slide-down">
            Search thousands of restaurants with real reviews from food lovers like you. Find the perfect spot for any occasion.
          </p>
          
          <div className="w-full max-w-4xl animate-scale-in">
            <SearchBar variant="large" showButton />
          </div>
          
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-gray-700 sm:gap-12 animate-fade-in">
            <div className="flex items-center gap-2">
              <Utensils size={20} className="text-foodie-500" />
              <span>10,000+ Restaurants</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={20} className="text-foodie-500" />
              <span>100+ Cities</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={20} className="text-foodie-500" />
              <span>Trusted Reviews</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-foodie-500" />
              <span>Updated Daily</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>
      
      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="foodie-container">
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="mb-2 inline-block rounded-full bg-foodie-100 px-3 py-1 text-sm font-medium text-foodie-800">
                Editors' Picks
              </span>
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                Featured Restaurants
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
                isFavorite={favorites.includes(restaurant.id)}
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
                Popular Restaurants
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
                isFavorite={favorites.includes(restaurant.id)}
                onFavoriteToggle={toggleFavorite}
                className="animate-fade-in"
              />
            ))}
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
                  Ready to find your next favorite restaurant?
                </h2>
                <p className="mb-8 text-lg text-white/90 sm:text-xl">
                  Join thousands of food lovers discovering new places to eat. Create an account to save your favorites and get personalized recommendations.
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
