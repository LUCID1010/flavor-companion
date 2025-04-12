
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MapPin, Clock, Phone, Globe, Star, ChevronRight, ChevronLeft, Share2, ThumbsUp, X } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RatingStars from '@/components/ui/RatingStars';
import { getRestaurantById, getRestaurantReviews, mockUsers } from '@/utils/mockData';
import { cn } from '@/lib/utils';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = getRestaurantById(id || '');
  const reviews = getRestaurantReviews(id || '');
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Check if restaurant is in favorites
    const userFavorites = mockUsers[0]?.favorites || [];
    setIsFavorite(userFavorites.includes(id || ''));
    
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, [id]);
  
  // Handle navigation error
  if (!restaurant) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 px-4 pt-24 sm:px-6 lg:px-8">
          <div className="py-16 text-center">
            <h1 className="mb-4 text-2xl font-semibold text-gray-900">Restaurant Not Found</h1>
            <p className="mb-8 text-gray-600">
              The restaurant you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center justify-center rounded-lg bg-foodie-500 px-4 py-2 font-medium text-white shadow-button transition-all hover:bg-foodie-600"
            >
              Browse Restaurants
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  
  const nextImage = () => {
    setActiveImageIndex((prev) => 
      prev === restaurant.photos.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex((prev) => 
      prev === 0 ? restaurant.photos.length - 1 : prev - 1
    );
  };
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDay = daysOfWeek[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  
  const hoursToday = restaurant.hours[currentDay];
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Photo Gallery */}
        <div className="relative mb-8">
          {/* Main Image */}
          <div className="relative h-[30vh] w-full overflow-hidden bg-gray-100 sm:h-[40vh] md:h-[50vh]">
            <img
              src={restaurant.photos[activeImageIndex]}
              alt={restaurant.name}
              className="h-full w-full object-cover"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            
            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-elegant backdrop-blur-sm transition-all hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-elegant backdrop-blur-sm transition-all hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>
            
            {/* Thumbnail Indicators */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {restaurant.photos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    index === activeImageIndex
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  )}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* View All Photos Button */}
            <button
              onClick={() => setShowAllPhotos(true)}
              className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-medium text-gray-800 shadow-elegant backdrop-blur-sm transition-all hover:bg-white"
            >
              View All Photos
            </button>
          </div>
        </div>
        
        <div className="foodie-container pb-16">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
                {restaurant.name}
              </h1>
              
              <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <RatingStars rating={restaurant.rating} showText size="md" />
                  <span className="text-gray-500">
                    ({restaurant.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-gray-800">
                    {restaurant.priceRange}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span>{restaurant.cuisine.join(', ')}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {restaurant.features.map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={toggleFavorite}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-4 py-2 text-sm font-medium transition-all",
                  isFavorite
                    ? "border-foodie-200 bg-foodie-50 text-foodie-700"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <Heart
                  size={18}
                  className={cn(
                    isFavorite ? "fill-foodie-500 text-foodie-500" : ""
                  )}
                />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
              
              <button
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Description */}
              <section className="mb-10">
                <h2 className="mb-3 text-xl font-semibold text-gray-900">About</h2>
                <p className="text-gray-700">
                  {restaurant.description}
                </p>
              </section>
              
              {/* Menu */}
              <section className="mb-10">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Popular Menu Items</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {restaurant.menuItems
                    .filter(item => item.popular)
                    .map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-card transition-all hover:shadow-elevated"
                    >
                      <div className="p-4">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <button
                    className="inline-flex items-center gap-1 font-medium text-foodie-600 transition-colors hover:text-foodie-700"
                  >
                    <span>View full menu</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </section>
              
              {/* Reviews */}
              <section className="mb-10">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Reviews ({restaurant.reviewCount})
                  </h2>
                  <button
                    className="text-sm font-medium text-foodie-600 transition-colors hover:text-foodie-700"
                  >
                    See all reviews
                  </button>
                </div>
                
                <div className="space-y-6">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="animate-fade-in">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {review.userAvatar && (
                            <img
                              src={review.userAvatar}
                              alt={review.userName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium text-gray-900">
                              {review.userName}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>
                        <RatingStars rating={review.rating} size="sm" />
                      </div>
                      
                      <p className="mb-3 text-gray-700">{review.text}</p>
                      
                      {review.photos && review.photos.length > 0 && (
                        <div className="mb-3 flex gap-2 overflow-x-auto">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Review photo ${index + 1}`}
                              className="h-20 w-20 rounded-lg object-cover"
                            />
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-sm">
                        <button className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700">
                          <ThumbsUp size={16} />
                          <span>Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <button
                    className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white py-3 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50"
                  >
                    Write a Review
                  </button>
                </div>
              </section>
            </div>
            
            {/* Info Card */}
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-card">
                <div className="p-5">
                  <h3 className="mb-4 text-lg font-medium text-gray-900">Restaurant Info</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="mt-0.5 shrink-0 text-foodie-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Location</h4>
                        <address className="not-italic text-sm text-gray-700">
                          {restaurant.address}<br />
                          {restaurant.city}, {restaurant.state} {restaurant.zipCode}
                        </address>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="mt-0.5 shrink-0 text-foodie-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Hours</h4>
                        <div className="text-sm text-gray-700">
                          <div className="font-medium text-foodie-600">
                            {currentDay} {hoursToday.open} - {hoursToday.close}
                          </div>
                          <button className="mt-1 text-xs font-medium text-foodie-600 transition-colors hover:text-foodie-700">
                            View all hours
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="mt-0.5 shrink-0 text-foodie-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Phone</h4>
                        <a href={`tel:${restaurant.phone}`} className="text-sm text-gray-700 hover:text-foodie-600">
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Globe size={18} className="mt-0.5 shrink-0 text-foodie-500" />
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Website</h4>
                        <a 
                          href={restaurant.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-foodie-600 transition-colors hover:text-foodie-700"
                        >
                          {restaurant.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 pt-0">
                  <a 
                    href="#" 
                    className="flex w-full items-center justify-center rounded-lg bg-foodie-500 py-3 font-medium text-white shadow-button transition-all hover:bg-foodie-600 active:bg-foodie-700"
                  >
                    Reserve a Table
                  </a>
                </div>
              </div>
              
              {/* Map Placeholder */}
              <div className="mt-6 rounded-xl bg-gray-100 p-4 text-center">
                <div className="aspect-video rounded-lg bg-gray-200 p-8">
                  <p className="text-gray-500">Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Photo Gallery Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <button
            onClick={() => setShowAllPhotos(false)}
            className="absolute right-4 top-4 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
            aria-label="Close gallery"
          >
            <X size={24} />
          </button>
          
          <div className="max-h-screen overflow-auto p-4">
            <div className="grid gap-4 md:grid-cols-2">
              {restaurant.photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`${restaurant.name} photo ${index + 1}`}
                  className="w-full rounded-lg object-cover shadow-lg"
                />
              ))}
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
