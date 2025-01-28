import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { mockNotifications } from "../api/mockData";

export function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getPriorityClass = (priority) => {
    // switch (priority) {
    //   case "High":
    //     return "font-montserrat bg-red-100 text-red-800";
    //   case "Medium":
    //     return "font-montserrat bg-yellow-100 text-yellow-800";
    //   case "Low":
    //     return "font-montserrat bg-green-100 text-green-800";
    //   default:
    //     return "font-montserrat bg-gray-100 text-gray-800";
    // }
    return "font-montserrat text-currcol";
  };

  const getCategoryClass = (category) => {
    if (category === "System Alert") {
      return "font-montserrat font-semibold text-warningRed";
    }
    return "font-montserrat text-notifColours";
  };

  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNotifications = notifications.slice(startIndex, endIndex);

  return (
    <div className="font-montserrat flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search Notifications..."
            className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Apply Filters
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full ">
          <thead>
            <tr className="text-notifColours border-b font-bold ">
              <th className="p-4 text-left w-12">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="p-4 text-left w-16">No.</th>
              <th className="p-4 text-left">Notification Title</th>
              <th className="p-4 text-left">Date & Time</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Priority</th>
              <th className="p-4 text-left w-16"></th>
            </tr>
          </thead>
          <tbody>
            {currentNotifications.map((notification) => (
              <tr key={notification.id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="p-4 text-black font-bold ">{notification.id}</td>
                <td className="p-4">
                  <div>
                    <span className="font-medium text-currcol">
                      New Message from{" "}
                      <a
                        href="#"
                        className="font-semibold text-black underline"
                      >
                        {notification.from}
                      </a>
                    </span>
                    <p className="text-sm text-gray-500">
                      {notification.message}
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <span>
                      <div className="text-medium text-notifColours">
                        {notification.date}
                      </div>
                    </span>
                    <div className="text-extrabold text-notifColours font-bold">
                      {notification.time}
                    </div>
                  </div>
                </td>
                <td className="text-notifColours font-medium p-4">
                  <span className={getCategoryClass(notification.category)}>
                    {notification.category}
                  </span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold  text-black${getPriorityClass(
                      notification.priority
                    )}`}
                  >
                    {notification.priority}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-warningRed hover:text-red-800">
                    <Trash2 size={18} className="fill-warningRed" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 border-t flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, notifications.length)} of {notifications.length}{" "}
            results
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
