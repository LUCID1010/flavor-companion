
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  size = 'md', 
  showText = false,
  className 
}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Size maps for the stars
  const sizeMap = {
    sm: { star: 14, className: 'text-xs' },
    md: { star: 18, className: 'text-sm' },
    lg: { star: 22, className: 'text-base' },
  };
  
  const { star: starSize, className: textClass } = sizeMap[size];
  
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex text-foodie-500">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            // Full star
            return <Star key={i} size={starSize} fill="currentColor" className="animate-subtle" />;
          } else if (i === fullStars && hasHalfStar) {
            // Half star
            return <StarHalf key={i} size={starSize} fill="currentColor" className="animate-subtle" />;
          } else {
            // Empty star
            return <Star key={i} size={starSize} className="text-gray-300 animate-subtle" />;
          }
        })}
      </div>
      
      {showText && (
        <span className={cn("font-medium text-gray-700", textClass)}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default RatingStars;
