import React from 'react';
import { Clock, MapPin, ArrowRight } from 'lucide-react';

const severityColors = {
  high: 'bg-red-500',
  medium: 'bg-orange-500',
  low: 'bg-yellow-500'
};

export function AlertCard({ image, title, description, time, location, severity, status }) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative w-full">
        <img src={image} alt={title} className="w-full h-48 sm:h-56 md:h-64 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div
          className={`absolute top-3 right-3 text-white text-xs font-bold px-2 py-1 rounded-full ${severityColors[severity]}`}
        >
          {severity.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors">
            {title}
          </h3>
          <span
            className={`mt-1 sm:mt-0 px-2 py-1 rounded-full text-xs font-medium ${
              status === 'Active'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-gray-700 text-gray-400'
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-gray-400 mt-2 text-sm md:text-base line-clamp-3">{description}</p>

        <div className="mt-4 space-y-2 text-gray-400 text-sm md:text-base">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-yellow-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
            <span>{location}</span>
          </div>
        </div>

        <button className="mt-5 w-full bg-gray-700/50 hover:bg-yellow-500 text-gray-300 hover:text-gray-900 py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2">
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
