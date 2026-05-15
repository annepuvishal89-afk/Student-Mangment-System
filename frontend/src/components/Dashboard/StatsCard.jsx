import React from 'react';

const colorMap = {
  indigo: 'border-indigo-500 text-indigo-500',
  green: 'border-green-500 text-green-500',
  blue: 'border-blue-500 text-blue-500',
  red: 'border-red-500 text-red-500',
  yellow: 'border-yellow-500 text-yellow-500',
};

const StatsCard = ({ title, value, icon: Icon, color = 'indigo' }) => (
  <div className={`bg-white shadow rounded-lg p-6 flex items-center space-x-4 border-l-4 ${colorMap[color] || colorMap.indigo}`}>
    {Icon && <Icon className={`h-10 w-10 ${colorMap[color] || colorMap.indigo}`} />}
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-base text-gray-500 mt-1">{title}</div>
    </div>
  </div>
);

export default StatsCard;
