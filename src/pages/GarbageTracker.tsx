import React from 'react';
import { MapPin } from 'lucide-react';

const GarbageTracker = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Garbage Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Map</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md">
            {/* Placeholder for map */}
            <div className="flex items-center justify-center h-full">
              <MapPin className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Garbage Type</h2>
          <div className="space-y-4">
            {['Plastic Waste', 'Organic Waste', 'Metal Waste'].map((type, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{type}</span>
                <button className="bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                  View in Map
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GarbageTracker;