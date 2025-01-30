import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LatestNotification from "../components/LatestNotfication";

export function Admin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredColleges, setFilteredColleges] = useState([]);
  const navigate = useNavigate();

  const colleges = [
    {
      userName: "user-1",
      userId: "U12345",
      actions: "Delete Edit",
      access: "Admin",
    },
    {
      userName: "user-2",
      userId: "U67890",
      actions: "Delete Edit",
      access: "User",
    },
    {
      userName: "user-3",
      userId: "U54321",
      actions: "Delete Edit",
      access: "Guest",
    },
    {
      userName: "user-4",
      userId: "U98765",
      actions: "Delete Edit",
      access: "Admin",
    },
    {
      userName: "user-5",
      userId: "U11223",
      actions: "Delete Edit",
      access: "User",
    },
    {
      userName: "user-6",
      userId: "U44556",
      actions: "Delete Edit",
      access: "User",
    },
  ];

  useEffect(() => {
    setFilteredColleges(
      colleges.filter((college) =>
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
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {college.userName}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        {college.userId}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-700">
                        <div>
                          <button
                            onClick={() =>
                              alert(`Deleting user ${college.userName}`)
                            }
                            className="flex items-center space-x-1 hover:text-blue-700"
                          >
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() =>
                              alert(`Editing user ${college.userName}`)
                            }
                            className="flex items-center space-x-1 hover:text-blue-700"
                          >
                            <span>Edit</span>
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-blue-500">
                        {college.access}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <LatestNotification />
    </div>
  );
}
