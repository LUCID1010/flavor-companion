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
  
  const getCuisineImage = () => {
    const cuisine = restaurant.cuisine[0]?.toLowerCase() || '';
    const restaurantName = restaurant.name.toLowerCase();
    const city = restaurant.city.toLowerCase();
    
    const imageSize = '/800x600';
    const baseUrl = 'https://images.pexels.com/photos';
    
    if (city === 'chandigarh') {
      if (restaurantName.includes('gopal')) {
        return `${baseUrl}/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
      } else if (restaurantName.includes('pal dhaba') || restaurantName.includes('dhaba')) {
        return `${baseUrl}/2741448/pexels-photo-2741448.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
      } else if (restaurantName.includes('punjab grill')) {
        return `${baseUrl}/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
      } else if (restaurantName.includes('saffron')) {
        return `${baseUrl}/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
      } else {
        return `${baseUrl}/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
      }
    }
    
    if (cuisine.includes('north indian') || restaurantName.includes('punjabi')) {
      return `${baseUrl}/2474658/pexels-photo-2474658.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (cuisine.includes('south indian') || restaurantName.includes('dosa')) {
      return `${baseUrl}/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (cuisine.includes('chinese')) {
      return `${baseUrl}/1087906/pexels-photo-1087906.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (cuisine.includes('biryani')) {
      return `${baseUrl}/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (cuisine.includes('street food')) {
      return `${baseUrl}/3926135/pexels-photo-3926135.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    }
    
    if (city === 'mumbai' || city === 'pune') {
      return `${baseUrl}/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'delhi' || city === 'new delhi') {
      return `${baseUrl}/2313686/pexels-photo-2313686.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'bangalore') {
      return `${baseUrl}/3338681/pexels-photo-3338681.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'agra') {
      return `${baseUrl}/3683307/pexels-photo-3683307.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'jaipur') {
      return `${baseUrl}/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'chennai') {
      return `${baseUrl}/3026808/pexels-photo-3026808.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else if (city === 'lucknow') {
      return `${baseUrl}/1624487/pexels-photo-1624487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    } else {
      return `${baseUrl}/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800&h=600`;
    }
  };

  const getImageWithFallback = () => {
    const primaryImageSrc = restaurant.photos?.[0] || getCuisineImage();
    const backupImageSrc = getCuisineImage();
    
    return {
      src: primaryImageSrc,
      onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = backupImageSrc;
        e.currentTarget.onerror = null;
      }
    };
  };

  const imageProps = getImageWithFallback();

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
          src={imageProps.src}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          onError={imageProps.onError}
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
        
        <div className="absolute bottom-0 left-0 p-2">
          <span className="rounded-full bg-black/70 px-2 py-0.5 text-xs font-medium text-white shadow-sm backdrop-blur-sm">
            {restaurant.city}
          </span>
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
