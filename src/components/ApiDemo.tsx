
import React, { useState } from 'react';
import { useLanguages } from '@/hooks/useRestaurantApi';

const ApiDemo: React.FC = () => {
  const { data, isLoading, error } = useLanguages();
  
  if (isLoading) return <div className="p-4">Loading language data...</div>;
  
  if (error) return <div className="p-4 text-red-500">Error loading API data</div>;
  
  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Worldwide Restaurants API Demo</h2>
      <h3 className="text-lg font-medium mb-2">Supported Languages:</h3>
      
      {data?.languages?.language ? (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {Object.entries(data.languages.language).map(([code, language]: [string, any]) => (
            <li key={code} className="p-2 bg-gray-50 rounded">
              {language.name} ({code})
            </li>
          ))}
        </ul>
      ) : (
        <p>No language data available</p>
      )}
    </div>
  );
};

export default ApiDemo;
