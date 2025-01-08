import React from 'react';

export function Link({ href, icon, children, active }) {
  return (
    <a
      href={href}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}