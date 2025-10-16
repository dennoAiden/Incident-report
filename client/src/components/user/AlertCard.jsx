import React from "react";
import { Clock, MapPin, ArrowRight } from "lucide-react";

const severityColors = {
  high: "bg-red-500",
  medium: "bg-orange-500",
  low: "bg-yellow-500",
};

export function AlertCard({
  image,
  title,
  description,
  time,
  location,
  severity,
  status,
}) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 group flex flex-col w-full">
      {/* Image */}
      <div className="relative w-full">
        <img
          src={image}
          alt={title}
          className="w-full h-40 sm:h-48 md:h-56 lg:h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
        <div
          className={`absolute top-2 right-2 text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full text-white ${severityColors[severity]}`}
        >
          {severity.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors leading-tight">
            {title}
          </h3>
          <span
            className={`px-2 py-[2px] sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
              status === "Active"
                ? "bg-green-500/20 text-green-400"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            {status}
          </span>
        </div>

        <p className="text-gray-400 mt-2 text-sm sm:text-base leading-snug line-clamp-3">
          {description}
        </p>

        <div className="mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-gray-400 text-xs sm:text-sm">
          <div className="flex items-center">
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-yellow-400" />
            <span>{time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 text-yellow-400" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        <button className="mt-4 sm:mt-5 w-full bg-gray-700/50 hover:bg-yellow-500 text-gray-300 hover:text-gray-900 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm transition-all duration-300 flex items-center justify-center gap-2">
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </div>
  );
}
