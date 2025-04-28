
import React from 'react';
import { cn } from '@/lib/utils';

interface CitySelectorProps {
  selectedCity: string;
  availableCities: string[];
  onCityChange: (city: string) => void;
}

const CitySelector: React.FC<CitySelectorProps> = ({
  selectedCity,
  availableCities,
  onCityChange,
}) => {
  return (
    <div className="mb-6 overflow-x-auto pb-2">
      <div className="flex space-x-2">
        {availableCities.map((city) => (
          <button
            key={city}
            onClick={() => onCityChange(city)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              selectedCity === city
                ? "bg-foodie-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CitySelector;
