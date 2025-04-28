
import React from 'react';
import { List, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ViewModeToggleProps {
  viewMode: 'list' | 'map';
  onViewModeChange: (mode: 'list' | 'map') => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange('list')}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium',
          viewMode === 'list' 
            ? 'bg-foodie-50 text-foodie-600' 
            : 'bg-white text-gray-600 hover:bg-gray-100'
        )}
      >
        <List size={18} />
        <span>List</span>
      </button>
      <button
        onClick={() => onViewModeChange('map')}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium',
          viewMode === 'map' 
            ? 'bg-foodie-50 text-foodie-600' 
            : 'bg-white text-gray-600 hover:bg-gray-100'
        )}
      >
        <MapPin size={18} />
        <span>Map</span>
      </button>
    </div>
  );
};

export default ViewModeToggle;
