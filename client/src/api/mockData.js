export const mockColleges = [
  { name: 'Vishwakarma Institute of Technology', id: 'CL-0178', state: 'MH', city: 'Pune', status: 'Approved', programs: ['FP', 'BPI', 'IP'] },
  { name: 'MIT - ADT', id: 'CL-0179', state: 'MH', city: 'Pune', status: 'Pending', programs: ['FP', 'BPI'] },
  { name: 'Fergusson College', id: 'CL-0180', state: 'MH', city: 'Pune', status: 'Approved', programs: ['BPI', 'IP'] },
  { name: 'COEP', id: 'CL-0181', state: 'MH', city: 'Pune', status: 'Pending', programs: ['FP', 'IP'] },
  { name: 'Symbiosis Institute', id: 'CL-0182', state: 'MH', city: 'Pune', status: 'Approved', programs: ['FP', 'BPI', 'IP'] }
];

// Function to update the status of a college and persist it in memory
export const updateCollegeStatus = (id, newStatus) => {
  const collegeIndex = mockColleges.findIndex(college => college.id === id);
  if (collegeIndex !== -1) {
    mockColleges[collegeIndex].status = newStatus;
  }
  return [...mockColleges]; // Return updated list for UI updates
};

const handleStatusChange = (collegeId, status) => {
  // Update the status using the function and get the updated list of colleges
  const updatedColleges = updateCollegeStatus(collegeId, status);

  // Update the state to reflect the changes in both `colleges` and `filteredColleges`
  setColleges(updatedColleges);
  setFilteredColleges(updatedColleges);
};

export const Program = {
  fetchPrograms: async () => [
    { name: "Air Traffic Management Intern 1", id: "APP-2025-001", applications: 2, slotsRemaining: "3/10" },
    { name: "Air Traffic Management Intern 2", id: "APP-2025-002", applications: 2, slotsRemaining: "7/10" },
    { name: "Air Traffic Management Intern 3", id: "APP-2025-003", applications: 2, slotsRemaining: "1/10" },
    { name: "Air Traffic Management Intern 4", id: "APP-2025-004", applications: 2, slotsRemaining: "1/10" }
  ]
};

const mockProgram = {
  title: 'Air Traffic Management Intern',
  courseCode: 'PP12345',
  startDate: '10th Dec\' 24',
  duration: '4 Months',
  location: 'Pune',
  applyBy: '8 Nov\' 24'
};

const mockStudents = [
  { name: 'Arya Pathak', id: 'APP0123', attended: false, status: 'Pending' },
  { name: 'Omkar Lolage', id: 'APP0124', attended: true, status: 'Approved' },
  { name: 'Prajwal Weladi', id: 'APP0125', attended: true, status: 'Approved' },
  { name: 'Arya Rajvaidya', id: 'APP0126', attended: false, status: 'Rejected' }
];

const mockNotifications = [
  { id: 1, message: "New application submitted", time: "1 min ago" },
  { id: 2, message: "Application approved", time: "5 mins ago" },
  { id: 3, message: "Program slots updated", time: "10 mins ago" }
];

const mockUser = {
  name: 'Omkar Lolage',
  role: 'Admin',
  email: 'admin@example.com'
};

// Simulated API endpoints
export const api = {
  async fetchColleges() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockColleges;
  },
  
  async fetchStats() {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      total: mockColleges.length,
      pending: mockColleges.filter(c => c.status === 'Pending').length,
      approved: mockColleges.filter(c => c.status === 'Approved').length
    };
  },

  async fetchProgram(id) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return mockProgram;
  },

  async fetchProgramStudents(programId) {
    await new Promise(resolve => setTimeout(resolve, 600));
    return mockStudents;
  },

  async fetchNotifications() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockNotifications;
  },

  async fetchCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  }
};
