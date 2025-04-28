
import React from 'react';

const NoRestaurantsFound: React.FC = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
      <h3 className="mb-2 text-lg font-medium text-gray-900">No restaurants found</h3>
      <p className="text-gray-600">Try adjusting your filters or selecting a different city.</p>
    </div>
  );
};

export default NoRestaurantsFound;
