import React, { useState, useEffect } from "react";
import { Search, Filter, Trash2 } from "lucide-react";
import { api } from "../api/mockData";

export function Notifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    date: "",
    category: "",
    priority: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const notificationsPerPage = 8;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await api.fetchNotifications();
        setNotifications(fetchedNotifications);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleFilterChange = (filter, value) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const toggleNotificationSelection = (id) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedNotifications = () => {
    setNotifications(prev => 
      prev.filter(notification => !selectedNotifications.includes(notification.id))
    );
    setSelectedNotifications([]);
  };

  const filteredNotifications = notifications
    .filter((notification) =>
      notification.sender.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (notification) =>
        (!selectedFilters.date || notification.date === selectedFilters.date) &&
        (!selectedFilters.category || notification.category === selectedFilters.category) &&
        (!selectedFilters.priority || notification.priority === selectedFilters.priority)
    );

  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage);
  const startIndex = (currentPage - 1) * notificationsPerPage;
  const currentNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading notifications...</div>;
  }

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="font-montserrat text-2xl font-semibold mb-6">Notifications</h1>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Notifications..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          Apply Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th className="py-2 px-4">
                <input 
                  type="checkbox" 
                  checked={selectedNotifications.length === currentNotifications.length}
                  onChange={() => {
                    if (selectedNotifications.length === currentNotifications.length) {
                      setSelectedNotifications([]);
                    } else {
                      setSelectedNotifications(currentNotifications.map(n => n.id));
                    }
                  }} 
                />
              </th>
              <th className="py-2 px-4 font-medium">No.</th>
              <th className="py-2 px-4 font-medium">Notification Title</th>
              <th className="py-2 px-4 font-medium">Date & Time</th>
              <th className="py-2 px-4 font-medium">Category</th>
              <th className="py-2 px-4 font-medium">Priority</th>
              <th className="py-2 px-4">
                {selectedNotifications.length > 0 && (
                  <button 
                    onClick={deleteSelectedNotifications}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentNotifications.map((notification, index) => (
              <tr key={notification.id} className="border-t mb-4">
                <td className="py-2 px-4">
                  <input 
                    type="checkbox" 
                    checked={selectedNotifications.includes(notification.id)}
                    onChange={() => toggleNotificationSelection(notification.id)}
                  />
                </td>
                <td className="py-2 px-4">{startIndex + index + 1}</td>
                <td className="py-2 px-4">
                  New Message from{" "}
                  <span className="text-[#494949] underline font-bold">
                    {notification.sender}
                  </span>
                </td>
                <td className="py-2 px-4">
                  {notification.date} <strong>{notification.time}</strong>
                </td>
                <td className="py-2 px-4">{notification.category}</td>
                <td className="py-2 px-4">{notification.priority}</td>
                <td className="py-2 px-4">
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => {
                      setNotifications(prev => 
                        prev.filter(n => n.id !== notification.id)
                      );
                      setSelectedNotifications(prev => 
                        prev.filter(id => id !== notification.id)
                      );
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div>
          Showing {startIndex + 1} to{" "}
          {Math.min(startIndex + notificationsPerPage, filteredNotifications.length)} of{" "}
          {filteredNotifications.length} results
        </div>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 border rounded-md disabled:opacity-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="px-3 py-1 border rounded-md"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}