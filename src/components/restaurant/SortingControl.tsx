
import React from 'react';
import { SortOption } from '@/types';

interface SortingControlProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const SortingControl: React.FC<SortingControlProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Sort by:</span>
      <select 
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
      >
        <option value="relevance">Relevance</option>
        <option value="rating">Rating</option>
        <option value="reviews">Review Count</option>
        <option value="distance">Distance</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortingControl;
