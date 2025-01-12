import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { Program } from "../api/mockData";
import { useNavigate } from "react-router-dom";

export function ProgramManagementDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsData = await Program.fetchPrograms();
        setPrograms(programsData);
        setFilteredPrograms(programsData);
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const filtered = programs.filter((program) =>
      program.name.toLowerCase().includes(term.toLowerCase()) ||
      program.id.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredPrograms(filtered);
  };

  const handleView = (programId) => {
    navigate(`/program/${programId}`);
  };

  return (
    <div className="p-6 md:p-8 pt-16 md:pt-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Program Management</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search applications..."
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
          {showFilters ? "Hide Filters" : "Apply Filters"}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3">Program Name</th>
                <th className="py-3">Program ID</th>
                <th className="py-3">No. of Applications</th>
                <th className="py-3">No. of Slots Remaining</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPrograms.map((program) => (
                <tr key={program.id} className="border-b">
                  <td className="py-4">{program.name}</td>
                  <td className="py-4">{program.id}</td>
                  <td className="py-4">{program.applications}</td>
                  <td className="py-4">{program.slotsRemaining}</td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => handleView(program.id)}
                      >
                        View
                      </button>
                      <button
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => console.log(`Updating ${program.id}`)}
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredPrograms.length} of {programs.length} results
        </div>
      </div>
    </div>
  );
}
