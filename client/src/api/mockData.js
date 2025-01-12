export const mockColleges = [
  { name: 'Vishwakarma Institute of Technology', id: 'CL-0178', state: 'MH', city: 'Pune', status: 'Approved' },
  { name: 'MIT - ADT', id: 'CL-0179', state: 'MH', city: 'Pune', status: 'Pending' },
  { name: 'Fergusson College', id: 'CL-0180', state: 'MH', city: 'Pune', status: 'Approved' },
  { name: 'COEP', id: 'CL-0181', state: 'MH', city: 'Pune', status: 'Pending' },
  { name: 'Symbiosis Institute', id: 'CL-0182', state: 'MH', city: 'Pune', status: 'Approved' },
];

export const Program = {
  fetchPrograms: async () => [
    { name: "Program 1", id: "APP-2025-001", applications: 2, slotsRemaining: "3/10" },
    { name: "Program 2", id: "APP-2025-002", applications: 2, slotsRemaining: "7/10" },
    { name: "Program 3", id: "APP-2025-003", applications: 2, slotsRemaining: "1/10" },
  ],
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
  { name: 'Arya Rajvaidya', id: 'APP0126', attended: false, status: 'Rejected' },
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

  async fetchCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUser;
  }
};