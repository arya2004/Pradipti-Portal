import React from 'react';
import { Eye } from 'lucide-react';

export function CollegeTable({ colleges = [], loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        Loading colleges...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500">
            <th className="p-4">College Name</th>
            <th className="p-4">College ID</th>
            <th className="p-4">State</th>
            <th className="p-4">City</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {colleges.map((college) => (
            <tr key={college.id} className="border-t">
              <td className="p-4">{college.name}</td>
              <td className="p-4">{college.id}</td>
              <td className="p-4">{college.state}</td>
              <td className="p-4">{college.city}</td>
              <td className="p-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    college.status === 'Approved'
                      ? 'bg-green-100 text-green-600'
                      : 'bg-yellow-100 text-yellow-600'
                  }`}
                >
                  {college.status}
                </span>
              </td>
              <td className="p-4">
                <button 
                  onClick={() => alert(`Viewing ${college.name}`)}
                  className="text-blue-600 flex items-center space-x-1 hover:text-blue-700"
                >
                  <Eye size={16} />
                  <span>View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}