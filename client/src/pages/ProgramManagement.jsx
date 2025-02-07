import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  Filter,
  Pencil,
  Calendar,
  PlayCircleIcon,
  MapPinIcon,
  HourglassIcon,
} from "lucide-react";
import { api } from "../api/mockData";
import LatestNotification from "../components/LatestNotfication";

export function ProgramManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [program, setProgram] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    attendance: "all",
    status: "all",
  });
  const [editMode, setEditMode] = useState(false);
  const [editedProgram, setEditedProgram] = useState(null);

  useEffect(() => {
    const fetchProgramData = async () => {
      try {
        setLoading(true);
        const programId = "PROG001";
        const [programData, studentsData] = await Promise.all([
          api.fetchProgram(programId),
          api.fetchProgramStudents(programId),
        ]);

        setProgram(programData);
        setEditedProgram(programData);
        setStudents(studentsData);
      } catch (error) {
        console.error("Error fetching program data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProgramData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleEdit = () => {
    if (editMode) {
      setProgram(editedProgram);
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleStudentAction = (studentId, action) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, status: action } : student
      )
    );
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAttendance =
      filters.attendance === "all" ||
      (filters.attendance === "attended" && student.attended) ||
      (filters.attendance === "not-attended" && !student.attended);
    const matchesStatus =
      filters.status === "all" || student.status === filters.status;

    return matchesSearch && matchesAttendance && matchesStatus;
  });

  // Calculate attendance stats
  const attendanceStats = {
    total: students.length,
    attended: students.filter((student) => student.attended).length,
  };

  if (loading) {
    return (
      <div className="p-6 md:p-8 pt-16 md:pt-8">
        <div className="font-montserrat text-center">
          Loading program data...
        </div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="p-6 md:p-8 pt-16 md:pt-8">
        <div className="font-montserrat text-center">No Programs yet</div>
      </div>
    );
  }

  return (
    <div className="font-montserrat p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Program Details</h1>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-6 h-6" />
          </button>
          <span className="hidden md:inline">Notifications</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applicants..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-4 h-4" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {showFilters && (
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attendance
              </label>
              <select
                className="w-full rounded-lg border-gray-300"
                value={filters.attendance}
                onChange={(e) =>
                  handleFilterChange("attendance", e.target.value)
                }
              >
                <option value="all">All</option>
                <option value="attended">Attended</option>
                <option value="not-attended">Not Attended</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                className="w-full rounded-lg border-gray-300"
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
              >
                <option value="all">All</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            {editMode ? (
              <input
                type="text"
                value={editedProgram.title}
                onChange={(e) =>
                  setEditedProgram({ ...editedProgram, title: e.target.value })
                }
                className="text-xl font-semibold border rounded px-2 py-1"
              />
            ) : (
              <h2 className="text-xl font-semibold">{program.title}</h2>
            )}
            <div className="text-sm text-gray-500 mt-1">
              Course Code- {program.courseCode}
            </div>
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-2 ${
              editMode ? "bg-green-600" : "bg-blue-600"
            } text-white rounded-lg`}
            onClick={handleEdit}
          >
            <Pencil className="w-4 h-4" />
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
        <div className="font-montserrat content flex py-2">
          <img className="w-100 h-80 mb-4" src={program.img}></img>
          {editMode ? (
            <input
              type="text-area"
              value={editedProgram.description}
              onChange={(e) =>
                setEditedProgram({
                  ...editedProgram,
                  description: e.target.value,
                })
              }
              className="border rounded px-2 py-1 w-full"
            />
          ) : (
            <p className="font-montserrat ms-5 me-7 text-xl">
              {program.description}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6">
          <div>
            <div className="text-sm text-gray-500">
              <span>
                <PlayCircleIcon className="w-4 h-4 text-myBlue" />
                START DATE
              </span>
            </div>
            {editMode ? (
              <input
                type="text"
                value={editedProgram.startDate}
                onChange={(e) =>
                  setEditedProgram({
                    ...editedProgram,
                    startDate: e.target.value,
                  })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <div>{program.startDate}</div>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500">
              <Calendar className="w-4 h-4 text-myBlue" />
              DURATION
            </div>
            {editMode ? (
              <input
                type="text"
                value={editedProgram.duration}
                onChange={(e) =>
                  setEditedProgram({
                    ...editedProgram,
                    duration: e.target.value,
                  })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <div>{program.duration}</div>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500">
              <MapPinIcon className="w-4 h-4 text-myBlue" />
              LOCATION
            </div>
            {editMode ? (
              <input
                type="text"
                value={editedProgram.location}
                onChange={(e) =>
                  setEditedProgram({
                    ...editedProgram,
                    location: e.target.value,
                  })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <div>{program.location}</div>
            )}
          </div>
          <div>
            <div className="text-sm text-gray-500">
              <HourglassIcon className="w-4 h-4 text-myBlue" />
              APPLY BY
            </div>
            {editMode ? (
              <input
                type="text"
                value={editedProgram.applyBy}
                onChange={(e) =>
                  setEditedProgram({
                    ...editedProgram,
                    applyBy: e.target.value,
                  })
                }
                className="border rounded px-2 py-1 w-full"
              />
            ) : (
              <div>{program.applyBy}</div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Student Name</th>
                <th className="py-3">Application ID</th>
                <th className="py-3">Attendance</th>
                <th className="py-3">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b">
                  <td className="py-4">{student.name}</td>
                  <td className="py-4">{student.id}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full text-sm ${
                        student.attended
                          ? "px-7 py-1 bg-bgGreen text-textGreen font-semibold"
                          : "px-4 py-1 bg-bgRed text-myRed font-semibold"
                      }`}
                    >
                      {student.attended ? "Attended" : "Not Attended"}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`rounded-full text-sm ${
                        student.status === "Approved"
                          ? "px-3 py-1 bg-myGreen text-white"
                          : student.status === "Pending"
                          ? "px-4 py-1 bg-myYellow text-white"
                          : "px-4 py-1 bg-myRed text-white"
                      }`}
                    >
                      {student.status === "Approved"
                        ? "Approved"
                        : student.status === "Pending"
                        ? "Pending"
                        : "Rejected"}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-5">
                      <button
                        className="px-3 py-1 bg-myGreen text-white rounded hover:bg-green-600"
                        onClick={() =>
                          handleStudentAction(student.id, "Approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-1 bg-myRed text-white rounded hover:bg-red-600"
                        onClick={() =>
                          handleStudentAction(student.id, "Rejected")
                        }
                      >
                        Deny
                      </button>
                      <button
                        className="px-3 py-1 bg-myYellow text-white rounded hover:bg-yellow-600"
                        onClick={() =>
                          handleStudentAction(student.id, "Pending")
                        }
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          Live attendance:{" "}
          <span className="font-semibold">{attendanceStats.attended}</span> out
          of <span className="font-semibold">{attendanceStats.total}</span>{" "}
          attended this program
        </div>
      </div>
    </div>
  );
}
