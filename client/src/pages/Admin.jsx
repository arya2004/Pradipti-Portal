import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Admin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const navigate = useNavigate();

  const colleges = [
    { userName: "user-1", userId: "U12345", actions: "Edit Delete", access: "Admin" },
    { userName: "user-2", userId: "U67890", actions: "Edit", access: "User" },
    { userName: "user-3", userId: "U54321", actions: "View", access: "Guest" },
    { userName: "user-4", userId: "U98765", actions: "Edit Delete", access: "Admin" },
    { userName: "user-5", userId: "U11223", actions: "View", access: "User" },
    { userName: "user-6", userId: "U44556", actions: "Edit", access: "User" },
  ];

  useEffect(() => {
    setFilteredColleges(
      colleges.filter(college =>
        college.userName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery]);

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-row min-h-screen">
      <div className="flex-grow p-6 md:p-8 pt-16 md:pt-8 bg-gray-50">
        <div className="grid grid-cols-1 gap-6 mb-8">
          <h2 className="font-montserrat text-2xl text-gray-800 font-semibold">
            Admin Page
          </h2>

          <div className="flex items-center gap-4 mb-6">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search Users..."
              className="border px-4 py-2 rounded-lg w-full max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Apply Filters Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Apply Filters
            </button>

            {/* Add Users Button */}
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Add Users
            </button>
          </div>

          <div className="mb-6">
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                      User Names
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                      User ID
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                      Actions
                    </th>
                    <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                      Access
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredColleges.map((college, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-700">{college.userName}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{college.userId}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{college.actions}</td>
                      <td className="py-3 px-4 text-sm text-blue-500">{college.access}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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
      </div>
    </div>
  );
}
