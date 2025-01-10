import React, { useState, useEffect } from 'react';
import { Search, Bell, Filter, Pencil } from 'lucide-react';
import { api } from '../api/mockData';

export function ProgramManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [program, setProgram] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        const programId = 'PROG001';
        const [programData, studentsData] = await Promise.all([
          api.fetchProgram(programId),
          api.fetchProgramStudents(programId)
        ]);
        
        setProgram(programData);
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching program data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  // Calculate attendance stats
  const attendanceStats = {
    total: students.length,
    attended: students.filter(student => student.attended).length
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">Loading program data...</div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="p-8">
        <div className="text-center">Program not found</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Program Management</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <span>Notifications</span>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <Filter className="w-4 h-4" />
          Apply Filters
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">{program.title}</h2>
            <div className="text-sm text-gray-500 mt-1">Course Code- {program.courseCode}</div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Pencil className="w-4 h-4" />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-4 gap-8 mb-6">
          <div>
            <div className="text-sm text-gray-500">START DATE</div>
            <div>{program.startDate}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">DURATION</div>
            <div>{program.duration}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">LOCATION</div>
            <div>{program.location}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">APPLY BY</div>
            <div>{program.applyBy}</div>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-3">Student Name</th>
              <th className="py-3">Application ID</th>
              <th className="py-3">Attendance</th>
              <th className="py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="py-4">{student.name}</td>
                <td className="py-4">{student.id}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    student.attended 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {student.attended ? 'Attended' : 'Not Attended'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-500 text-white rounded">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white rounded">
                      Deny
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-white rounded">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-gray-600">
          Live attendance: <span className="font-semibold">{attendanceStats.attended}</span> out of <span className="font-semibold">{attendanceStats.total}</span> attended this program
        </div>
      </div>
    </div>
  );
}