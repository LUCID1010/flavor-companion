
import React, { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { CuisineType, FilterOptions, PriceRange } from '@/types';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  className?: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  className,
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setExpanded(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section) 
        : [...prev, section]
    );
  };

  const isExpanded = (section: string) => expanded.includes(section);

  const cuisineOptions: CuisineType[] = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 
    'Thai', 'Indian', 'French', 'Mediterranean', 'Korean',
    'Vietnamese', 'Greek', 'Spanish', 'Middle Eastern', 
    'Vegetarian', 'Vegan', 'Seafood', 'Barbecue', 'Fusion'
  ];

  const priceOptions: PriceRange[] = ['$', '$$', '$$$', '$$$$'];

  const featureOptions: string[] = [
    'Outdoor Seating', 'Takeout', 'Delivery', 'Vegetarian Options',
    'Vegan Options', 'Gluten-Free Options', 'Full Bar', 'Wine Selection',
    'Happy Hour', 'Good for Groups', 'Good for Kids', 'Wheelchair Accessible',
    'Reservations', 'Free Wi-Fi', 'Live Music', 'Pet Friendly',
    'Brunch', 'Late Night'
  ];

  const updateCuisine = (cuisine: CuisineType) => {
    const newCuisines = filters.cuisine.includes(cuisine)
      ? filters.cuisine.filter(c => c !== cuisine)
      : [...filters.cuisine, cuisine];
    
    onFilterChange({ ...filters, cuisine: newCuisines });
  };

  const updatePrice = (price: PriceRange) => {
    const newPrices = filters.price.includes(price)
      ? filters.price.filter(p => p !== price)
      : [...filters.price, price];
    
    onFilterChange({ ...filters, price: newPrices });
  };

  const updateFeature = (feature: string) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    
    onFilterChange({ ...filters, features: newFeatures });
  };

  const toggleOpenNow = () => {
    onFilterChange({ ...filters, openNow: !filters.openNow });
  };

  return (
    <div className={cn("bg-white rounded-xl shadow-card", className)}>
      <div className="divide-y divide-gray-100">
        {/* Price Range Filter */}
        <div className="p-4">
          <div 
            className="flex cursor-pointer items-center justify-between" 
            onClick={() => toggleSection('price')}
          >
            <h3 className="text-base font-medium text-gray-900">Price Range</h3>
            <ChevronDown 
              size={18} 
              className={cn(
                "text-gray-400 transition-transform duration-200", 
                isExpanded('price') ? "rotate-180" : ""
              )} 
            />
          </div>
          
          <div className={cn(
            "mt-3 flex flex-wrap gap-2 transition-all duration-300",
            !isExpanded('price') && "hidden"
          )}>
            {priceOptions.map(price => (
              <button
                key={price}
                onClick={() => updatePrice(price)}
                className={cn(
                  "flex h-9 items-center rounded-lg border px-3 transition-all",
                  filters.price.includes(price)
                    ? "border-foodie-400 bg-foodie-50 text-foodie-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                <span className="text-sm font-medium">{price}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Cuisine Filter */}
        <div className="p-4">
          <div 
            className="flex cursor-pointer items-center justify-between" 
            onClick={() => toggleSection('cuisine')}
          >
            <h3 className="text-base font-medium text-gray-900">Cuisine</h3>
            <ChevronDown 
              size={18} 
              className={cn(
                "text-gray-400 transition-transform duration-200", 
                isExpanded('cuisine') ? "rotate-180" : ""
              )} 
            />
          </div>
          
          <div className={cn(
            "mt-3 grid grid-cols-2 gap-2 transition-all duration-300 sm:grid-cols-3",
            !isExpanded('cuisine') && "hidden"
          )}>
            {cuisineOptions.map(cuisine => (
              <div 
                key={cuisine}
                className="flex items-center"
              >
                <button
                  type="button"
                  onClick={() => updateCuisine(cuisine)}
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
                    filters.cuisine.includes(cuisine)
                      ? "border-foodie-500 bg-foodie-500 text-white" 
                      : "border-gray-300 bg-transparent text-transparent hover:border-gray-400"
                  )}
                >
                  <Check size={12} />
                </button>
                <label className="ml-2 cursor-pointer text-sm text-gray-700" onClick={() => updateCuisine(cuisine)}>
                  {cuisine}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Filter */}
        <div className="p-4">
          <div 
            className="flex cursor-pointer items-center justify-between" 
            onClick={() => toggleSection('features')}
          >
            <h3 className="text-base font-medium text-gray-900">Features</h3>
            <ChevronDown 
              size={18} 
              className={cn(
                "text-gray-400 transition-transform duration-200", 
                isExpanded('features') ? "rotate-180" : ""
              )} 
            />
          </div>
          
          <div className={cn(
            "mt-3 grid grid-cols-1 gap-2 transition-all duration-300 sm:grid-cols-2",
            !isExpanded('features') && "hidden"
          )}>
            {featureOptions.map(feature => (
              <div 
                key={feature}
                className="flex items-center"
              >
                <button
                  type="button"
                  onClick={() => updateFeature(feature)}
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
                    filters.features.includes(feature)
                      ? "border-foodie-500 bg-foodie-500 text-white" 
                      : "border-gray-300 bg-transparent text-transparent hover:border-gray-400"
                  )}
                >
                  <Check size={12} />
                </button>
                <label className="ml-2 cursor-pointer text-sm text-gray-700" onClick={() => updateFeature(feature)}>
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        {/* Open Now Filter */}
        <div className="p-4">
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleOpenNow}
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-all",
                filters.openNow
                  ? "border-foodie-500 bg-foodie-500 text-white" 
                  : "border-gray-300 bg-transparent text-transparent hover:border-gray-400"
              )}
            >
              <Check size={12} />
            </button>
            <label className="ml-2 cursor-pointer text-base font-medium text-gray-900" onClick={toggleOpenNow}>
              Open Now
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
