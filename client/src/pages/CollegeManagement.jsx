import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { mockColleges, updateCollegeStatus } from "../api/mockData";

export function CollegeManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const itemsPerPage = 3;

  const availablePrograms = ["FP", "BPI", "IP"];

  useEffect(() => {
    setColleges(mockColleges);
    setFilteredColleges(mockColleges);
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    applyFilters(term, selectedPrograms);
  };

  const toggleProgram = (program) => {
    const updatedPrograms = selectedPrograms.includes(program)
      ? selectedPrograms.filter((p) => p !== program)
      : [...selectedPrograms, program];
    setSelectedPrograms(updatedPrograms);
    applyFilters(searchTerm, updatedPrograms);
  };

  const applyFilters = (term, programs) => {
    let filtered = colleges;

    if (term) {
      filtered = filtered.filter(
        (college) =>
          college.name.toLowerCase().includes(term.toLowerCase()) ||
          college.id.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (programs.length > 0) {
      filtered = filtered.filter((college) =>
        programs.every((program) => college.programs.includes(program))
      );
    }

    setFilteredColleges(filtered);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedPrograms([]);
    applyFilters(searchTerm, []);
    setShowFilters(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleStatusChange = (collegeId, status) => {
    const updatedColleges = updateCollegeStatus(collegeId, status);

    setColleges(updatedColleges);
    setFilteredColleges(updatedColleges);
  };

  const getProgramBadge = (program) => (
    <span key={program} className="font-montserrat text-blue-600 ml-2">
      {program}
    </span>
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredColleges.length);

  const currentPageData = filteredColleges.slice(startIndex, endIndex);

  return (
    <div className="p-6 bg-gray-50">
      <h1 className="font-montserrat text-2xl font-semibold mb-6">
        College Management
      </h1>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="font-montserrat absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search colleges..."
              className="font-montserrat w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <button
            className="font-montserrat flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="font-montserrat w-4 h-4" />
            Apply Filters
          </button>
        </div>

        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-montserrat font-medium">
                Filter by Programs
              </h3>
              <button
                onClick={clearFilters}
                className="font-montserrat text-sm text-gray-500 flex items-center gap-1"
              >
                Clear Filters
              </button>
            </div>
            <div className="flex gap-4">
              {availablePrograms.map((program) => (
                <label
                  key={program}
                  className="font-montserrat flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={selectedPrograms.includes(program)}
                    onChange={() => toggleProgram(program)}
                    className="rounded"
                  />
                  {program}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="font-montserrat text-left">
              <th className="py-2 px-6 font-medium">College Name</th>
              <th className="py-2 px-6 font-medium">College ID</th>
              <th className="py-2 px-6 font-medium">Status</th>
              <th className="py-2 px-6 font-medium">Programs Assigned</th>
              <th className="py-2 px-6 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPageData.map((college) => (
              <tr key={college.id} className="border-t">
                <td className="font-montserrat py-2 px-6">{college.name}</td>
                <td className="font-montserrat py-2 px-6">{college.id}</td>
                <td className="font-montserrat py-2 px-6">
                  <span
                    className={`font-montserrat rounded-full ${
                      college.status === "Approved"
                        ? "px-3 py-1 bg-myGreen text-white"
                        : college.status === "Rejected"
                        ? "px-4 py-1 bg-myRed text-white"
                        : "px-4 py-1 bg-myYellow text-white"
                    }`}
                  >
                    {college.status}
                  </span>
                </td>
                <td className="font-montserrat py-2 px-6">
                  {college.programs.map(getProgramBadge)}
                </td>
                <td className="font-montserrat py-2 px-6">
                  <button
                    className="font-montserrat px-3 py-1 bg-myGreen text-white rounded-full text-sm mr-2"
                    onClick={() => handleStatusChange(college.id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="font-montserrat px-4 py-1 bg-myRed text-white rounded-full text-sm"
                    onClick={() => handleStatusChange(college.id, "Rejected")}
                  >
                    Deny
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="font-montserrat mt-6 flex justify-between items-center">
        <div>
          Showing {startIndex + 1} to {endIndex} of {filteredColleges.length}{" "}
          results
        </div>
        <div className="font-montserrat flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="font-montserrat px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(filteredColleges.length / itemsPerPage)
            }
            className="font-montserrat px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
