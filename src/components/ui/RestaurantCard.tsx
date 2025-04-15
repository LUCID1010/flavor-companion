
import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, MapPinIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import RatingStars from './RatingStars';
import { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  featured?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  className,
  isFavorite = false,
  onFavoriteToggle,
  featured = false,
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onFavoriteToggle) {
      onFavoriteToggle(restaurant.id);
    }
  };
  
  // Enhanced function to get cuisine-specific images with more variety for Indian dishes
  const getCuisineImage = () => {
    const cuisine = restaurant.cuisine[0]?.toLowerCase() || '';
    const restaurantName = restaurant.name.toLowerCase();
    const city = restaurant.city.toLowerCase();
    const random = Math.floor(Math.random() * 5) + 1; // Add variety to images
    
    // More specific Indian cuisine categories for better image matching
    if (cuisine.includes('north indian') || restaurantName.includes('punjabi')) {
      return `https://source.unsplash.com/random/800x600/?north,indian,food,curry,butter,chicken,${random}`;
    } else if (cuisine.includes('south indian') || restaurantName.includes('dosa')) {
      return `https://source.unsplash.com/random/800x600/?south,indian,dosa,idli,sambar,${random}`;
    } else if (cuisine.includes('chinese')) {
      return `https://source.unsplash.com/random/800x600/?chinese,noodles,dimsum,${random}`;
    } else if (cuisine.includes('italian')) {
      return `https://source.unsplash.com/random/800x600/?italian,pasta,pizza,${random}`;
    } else if (cuisine.includes('continental')) {
      return `https://source.unsplash.com/random/800x600/?continental,steak,${random}`;
    } else if (cuisine.includes('punjabi') || restaurantName.includes('dhaba')) {
      return `https://source.unsplash.com/random/800x600/?punjabi,food,butter,chicken,lassi,${random}`;
    } else if (cuisine.includes('cafe')) {
      return `https://source.unsplash.com/random/800x600/?cafe,coffee,pastry,${random}`;
    } else if (cuisine.includes('fast food')) {
      return `https://source.unsplash.com/random/800x600/?fast,food,burger,${random}`;
    } else if (cuisine.includes('bakery')) {
      return `https://source.unsplash.com/random/800x600/?bakery,bread,cake,${random}`;
    } else if (cuisine.includes('mughlai')) {
      return `https://source.unsplash.com/random/800x600/?mughlai,biryani,kebab,${random}`;
    } else if (cuisine.includes('street food')) {
      return `https://source.unsplash.com/random/800x600/?indian,street,food,chaat,${random}`;
    } else if (cuisine.includes('seafood')) {
      return `https://source.unsplash.com/random/800x600/?seafood,fish,curry,${random}`;
    } else if (cuisine.includes('goan')) {
      return `https://source.unsplash.com/random/800x600/?goan,fish,curry,${random}`;
    } else if (cuisine.includes('kashmiri')) {
      return `https://source.unsplash.com/random/800x600/?kashmiri,food,rogan,josh,${random}`;
    } else if (cuisine.includes('hyderabadi')) {
      return `https://source.unsplash.com/random/800x600/?hyderabadi,biryani,haleem,${random}`;
    } else if (cuisine.includes('rajasthani')) {
      return `https://source.unsplash.com/random/800x600/?rajasthani,dal,baati,${random}`;
    } else if (cuisine.includes('bengali')) {
      return `https://source.unsplash.com/random/800x600/?bengali,fish,curry,${random}`;
    } else if (city === 'mumbai' || city === 'pune') {
      return `https://source.unsplash.com/random/800x600/?maharashtrian,pav,bhaji,vada,${random}`;
    } else if (city === 'delhi' || city === 'new delhi') {
      return `https://source.unsplash.com/random/800x600/?delhi,street,food,chole,bhature,${random}`;
    } else if (city === 'bangalore') {
      return `https://source.unsplash.com/random/800x600/?bangalore,karnataka,food,${random}`;
    } else if (city === 'chandigarh') {
      return `https://source.unsplash.com/random/800x600/?chandigarh,punjabi,food,${random}`;
    } else {
      // More specific request to ensure we get food images
      return `https://source.unsplash.com/random/800x600/?indian,restaurant,food,dish,${restaurant.name.split(' ')[0]}`;
    }
  };

  return (
    <Link
      to={`/restaurant/${restaurant.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-card transition-all duration-300 hover:shadow-elevated",
        featured ? "md:flex-row" : "",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-gray-200",
          featured ? "md:w-2/5 lg:w-1/2" : "aspect-[4/3]"
        )}
      >
        <img
          src={restaurant.photos?.[0] || getCuisineImage()}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // If image fails to load, replace with cuisine-specific image
            e.currentTarget.src = getCuisineImage();
          }}
        />
        
        <button
          onClick={handleFavoriteClick}
          className="absolute right-3 top-3 rounded-full bg-white/90 p-2 shadow-elegant backdrop-blur-sm transition-all duration-300 hover:bg-white"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <HeartIcon
            size={18}
            className={cn(
              "transition-colors duration-300",
              isFavorite ? "fill-foodie-500 text-foodie-500" : "text-gray-600"
            )}
          />
        </button>
        
        <div className="absolute left-0 top-0 p-2">
          <div className="flex flex-wrap gap-1">
            {restaurant.cuisine.slice(0, 2).map((cuisine) => (
              <span
                key={cuisine}
                className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-800 shadow-sm backdrop-blur-sm"
              >
                {cuisine}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={cn(
        "flex flex-1 flex-col p-4",
        featured ? "justify-between md:p-6" : ""
      )}>
        <div>
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 group-hover:text-foodie-600 md:text-xl">
              {restaurant.name}
            </h3>
            <span className="font-medium text-gray-800">
              {restaurant.priceRange}
            </span>
          </div>
          
          <div className="mb-2 flex items-center gap-2">
            <RatingStars rating={restaurant.rating} size="sm" />
            <span className="text-sm text-gray-500">
              ({restaurant.reviewCount})
            </span>
          </div>
          
          <div className="flex items-start gap-1 text-sm text-gray-500">
            <MapPinIcon size={16} className="mt-0.5 shrink-0 text-foodie-400" />
            <span>{restaurant.city}, {restaurant.state}</span>
          </div>
          
          {featured && (
            <p className="mt-3 hidden text-sm text-gray-600 line-clamp-3 md:block">
              {restaurant.description}
            </p>
          )}
        </div>
        
        {featured && (
          <div className="mt-4 hidden md:block">
            <div className="flex flex-wrap gap-1">
              {restaurant.features.slice(0, 3).map((feature) => (
                <span
                  key={feature}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* Show distance if available */}
        {restaurant.distanceKm !== undefined && (
          <div className="mt-2 flex items-center text-xs text-foodie-600">
            <span>{restaurant.distanceKm.toFixed(1)} km away</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RestaurantCard;
