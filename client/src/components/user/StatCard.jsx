import React from "react";

export function StatCard({ icon: Icon, title, value, change, timeframe }) {
  const isPositive = change > 0;

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all w-full">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* Icon Section */}
        <div className="bg-yellow-500/10 p-2 sm:p-3 rounded-lg flex-shrink-0 self-start sm:self-auto">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />
        </div>

        {/* Content Section */}
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-400 truncate">{title}</h3>

          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl font-bold text-white break-words">
              {value}
            </span>
            <span
              className={`text-xs sm:text-sm font-medium ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>

          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
            vs. previous {timeframe}
          </p>
        </div>
      </div>
    </div>
  );
}
