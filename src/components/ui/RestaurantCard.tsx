
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
          src={restaurant.photos[0]}
          alt={restaurant.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
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
      </div>
    </Link>
  );
};

export default RestaurantCard;
