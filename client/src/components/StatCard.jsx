import React from 'react';

export function StatCard({ title, value, type }) {
  const colors = {
    total: 'text-blue-600',
    pending: 'text-yellow-600',
    approved: 'text-green-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
      <p className={`text-2xl font-bold ${colors[type]}`}>{value}</p>
    </div>
  );
}