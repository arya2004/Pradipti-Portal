// Simulated API data
export const mockColleges = [
  { name: 'Vishwakarma University', id: 'CL-0178', state: 'MH', city: 'Pune', status: 'Approved' },
  { name: 'MIT - ADT', id: 'CL-0179', state: 'MH', city: 'Pune', status: 'Pending' },
  { name: 'Fergusson College', id: 'CL-0180', state: 'MH', city: 'Pune', status: 'Approved' },
  { name: 'COEP', id: 'CL-0181', state: 'MH', city: 'Pune', status: 'Pending' },
  { name: 'Symbiosis Institute', id: 'CL-0182', state: 'MH', city: 'Pune', status: 'Approved' },
];

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
  }
};