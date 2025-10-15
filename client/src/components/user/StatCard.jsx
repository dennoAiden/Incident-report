import React from 'react';

export function StatCard({ icon: Icon, title, value, change, timeframe }) {
  const isPositive = change > 0;

  return (
    <div className="bg-gray-800/60 backdrop-blur-lg rounded-xl p-5 md:p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all">
      <div className="flex items-center gap-4">
        <div className="bg-yellow-500/10 p-3 rounded-lg flex-shrink-0">
          <Icon className="h-6 w-6 text-yellow-400" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-gray-400 truncate">{title}</h3>
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-2xl font-bold text-white">{value}</span>
            <span className={`text-sm font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">vs. previous {timeframe}</p>
        </div>
      </div>
    </div>
  );
}
