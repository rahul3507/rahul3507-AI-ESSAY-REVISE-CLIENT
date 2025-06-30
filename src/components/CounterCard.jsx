import React from "react";

const CounterCard = ({ title, value, count }) => {
  return (
    <div className="border border-gray-200 bg-white rounded-xl p-6 shadow-md hover:shadow-md transition-shadow duration-300 flex-1">
      <div className="border-b border-gray-200 pb-4 text-gray-900 flex items-center justify-between">
        <h4 className="text-lg font-semibold">{title}</h4>
      </div>
      <div className="mt-4">
        <span className="text-4xl font-semibold text-gray-800">{count}</span>
      </div>
      <div className="flex items-center text-sm mt-6">
        <span className="text-green-600 font-medium">+{value} From Last Week</span>
      </div>
    </div>
  );
};

export default CounterCard;