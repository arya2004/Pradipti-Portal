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
  const [college, setCollege] = useState();
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCollege, setEditedCollege] = useState(college);

  useEffect(() => {
    const fetchCollege = async () => {
      try {
        const data = await api.getCollege("CL-0178");
        setCollege(data);
        setEditedCollege(data);
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!college || !editedCollege) return;
    try {
      await api.updateCollege(college.id, editedCollege);
      setCollege(editedCollege);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating college:", error);
    }
  };

  const handleCancel = () => {
    setEditedCollege(college);
    setIsEditing(false);
  };

  const filteredAdmins =
    college?.admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
    <div className="font-montserrat min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-collegeDetailsBlack">
          College Management
        </h1>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

        {/* College Description */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-4xl font-sb text-black mb-2">
                {college.name}
              </h2>
              <p className="text-lg font-light text-black">
                College Code: {college.id}
              </p>
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700"
            >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? "Save" : "Edit"}</span>
            </button>
          </div>

          <div className="flex gap-8 mb-8">
            <img
              src={college.logo}
              alt={college.name}
              className="w-48 h-auto object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-medium font-base text-currcol mb-1">
                    LOCATION
                  </h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedCollege?.location}
                      onChange={(e) =>
                        setEditedCollege((prev) =>
                          prev ? { ...prev, location: e.target.value } : null
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-xl font-bold text-black">
                      {college.location}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-medium font-base text-currcol mb-1">
                    CONTACT INFORMATION
                  </h3>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedCollege?.email}
                      onChange={(e) =>
                        setEditedCollege((prev) =>
                          prev ? { ...prev, email: e.target.value } : null
                        )
                      }
                      className="w-full p-2 border rounded"
                    />
                  ) : (
                    <p className="text-xl font-bold text-black">
                      {college.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-medium font-base text-currcol mb-1">
                  NUMBER OF REGISTERED STUDENTS
                </h3>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedCollege?.registeredStudents}
                    onChange={(e) =>
                      setEditedCollege((prev) =>
                        prev
                          ? {
                              ...prev,
                              registeredStudents: parseInt(e.target.value),
                            }
                          : null
                      )
                    }
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p className="text-xl font-bold text-black">
                    {college.registeredStudents}
                  </p>
                )}
              </div>
            </div>
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
          <h3 className="text-base font-bold text-programsBlack mb-4">
            PROGRAMS ASSIGNED
          </h3>
          <div className="flex flex-wrap gap-2">
            {college.programs.map((program) => (
              <div
                key={program.code}
                className="flex items-center bg-blue-50 ext-base font-bold text-programsBlack px-3 py-1 rounded-full border border-blue-200"
              >
                <span title={program.fullName} className="font-bold">
                  {program.name}
                </span>
                <button
                  onClick={() => removeProgram(program.code)}
                  className="ml-2 hover:text-blue-800"
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
        <div className="bg-collegeDetailsTableBackground rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  College Admin
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  College ID
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  Mail ID
                </th>
                <th className="px-6 py-3 text-left text-xl font-sb text-black tracking-wider">
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredAdmins.map((admin, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
                    {admin.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
                    {admin.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-sb text-black italic underline">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-black">
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
