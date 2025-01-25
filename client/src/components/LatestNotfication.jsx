import React from "react";

import { Link, useLocation } from "react-router-dom";

export default function LatestNotification({ onClose }) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <div className="w-full lg:w-1/4 bg-white border-l border-gray-200 p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-white"
              fill="rgba(70, 95, 241, 1)"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
            <h2 className="font-montserrat text-lg font-semibold text-textGray">
              Notifications
            </h2>
          </div>
          <button className="font-montserrat text-#6E6E6E hover:text-gray-800 transition-colors duration-200 font-semibold">
            Clear
          </button>
        </div>

        <div className="font-montserrat space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-myGray rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="flex-grow">
                <p className="font-montserrat text-sm text-gray-900 font-medium">
                  New Message from XYZ1234
                </p>
                <p className="font-montserrat text-xs text-gray-500 mt-1">
                  1 sec ago
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="font-montserrat w-full mt-4 py-2 text-center text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium">
          View all
        </button>
      </div>
    </>
  );
}

function NotificationLink({ href, icon, children, active, onClick }) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}
