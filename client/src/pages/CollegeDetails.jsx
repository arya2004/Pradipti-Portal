import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  Upload,
  Send,
  X,
  Plus,
  School2,
  Download,
  Edit,
} from "lucide-react";
import { api } from "../api/mockData";

export function CollegeDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await api.getCollege("CL-0178");
        setCollege(data);
      } catch (error) {
        console.error("Error fetching college data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, []);

  const removeProgram = async (code) => {
    if (!college) return;
    try {
      const updatedPrograms = await api.removeProgram(college.id, code);
      setCollege((prev) =>
        prev ? { ...prev, programs: updatedPrograms } : null
      );
    } catch (error) {
      console.error("Error removing program:", error);
    }
  };

  const handleUploadMOU = async () => {
    if (!college) return;
    try {
      await api.uploadMOU(college.id, null);
      alert("MOU uploaded successfully");
    } catch (error) {
      console.error("Error uploading MOU:", error);
    }
  };

  const handleDownloadMOU = async () => {
    if (!college) return;
    try {
      await api.downloadMOU(college.id);
      alert("MOU downloaded successfully");
    } catch (error) {
      console.error("Error downloading MOU:", error);
    }
  };

  const handleSendNotification = async () => {
    if (!college) return;
    try {
      const message = prompt("Enter notification message:");
      if (message) {
        await api.sendNotification(college.id, message);
        alert("Notification sent successfully");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        College not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <School2 className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">
              College Management
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2">
              <Bell className="h-6 w-6 text-gray-500" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <button className="text-gray-500 hover:text-gray-700">Clear</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="flex space-x-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <span>Apply Filters</span>
          </button>
        </div>

        {/* University Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {college.name}
              </h2>
              <p className="text-sm text-gray-500">
                College Code: {college.id}
              </p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                LOCATION
              </h3>
              <p className="text-base text-gray-900">{college.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                CONTACT INFORMATION
              </h3>
              <p className="text-base text-gray-900">{college.email}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">
              NUMBER OF REGISTERED STUDENTS
            </h3>
            <p className="text-base text-gray-900">
              {college.registeredStudents}
            </p>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleUploadMOU}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-50"
            >
              <Upload className="h-4 w-4" />
              <span>Upload MOU</span>
            </button>
            <button
              onClick={handleDownloadMOU}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg flex items-center space-x-2 hover:bg-blue-50"
            >
              <Download className="h-4 w-4" />
              <span>Download MOU</span>
            </button>
            <button
              onClick={handleSendNotification}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Send className="h-4 w-4" />
              <span>Send Notification</span>
            </button>
          </div>
        </div>

        {/* Programs Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            PROGRAMS ASSIGNED
          </h3>
          <div className="flex flex-wrap gap-2">
            {college.programs.map((program) => (
              <div
                key={program.code}
                className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
              >
                <span title={program.fullName}>{program.name}</span>
                <button
                  onClick={() => removeProgram(program.code)}
                  className="ml-2 hover:text-blue-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>ADD</span>
            </button>
          </div>
        </div>

        {/* Admins Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College Admin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  College ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mail ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {college.admins.map((admin, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {admin.dateAdded}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
