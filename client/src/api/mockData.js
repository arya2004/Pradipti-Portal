export const mockColleges = [
  { name: 'Vishwakarma Institute of Technology', id: 'CL-0178', state: 'MH', city: 'Pune', status: 'Approved', programs: ['FP', 'BPI', 'IP'] },
  { name: 'MIT - ADT', id: 'CL-0179', state: 'MH', city: 'Pune', status: 'Pending', programs: ['FP', 'BPI'] },
  { name: 'Fergusson College', id: 'CL-0180', state: 'MH', city: 'Pune', status: 'Approved', programs: ['BPI', 'IP'] },
  { name: 'COEP', id: 'CL-0181', state: 'MH', city: 'Pune', status: 'Pending', programs: ['FP', 'IP'] },
  { name: 'Symbiosis Institute', id: 'CL-0182', state: 'MH', city: 'Pune', status: 'Approved', programs: ['FP', 'BPI', 'IP'] }
];

export const mockPrograms = [
  { name: "Air Traffic Management Intern 1", id: "APP-2025-001", applications: 2, slotsRemaining: "3/10" },
  { name: "Air Traffic Management Intern 2", id: "APP-2025-002", applications: 2, slotsRemaining: "7/10" },
  { name: "Air Traffic Management Intern 3", id: "APP-2025-003", applications: 2, slotsRemaining: "1/10" },
  { name: "Air Traffic Management Intern 4", id: "APP-2025-004", applications: 2, slotsRemaining: "1/10" }
];

export const mockProgramDetails = {
  title: 'Air Traffic Management Intern',
  courseCode: 'PP12345',
  startDate: '10th Dec\' 24',
  duration: '4 Months',
  location: 'Pune',
  applyBy: '8 Nov\' 24'
};

export const mockStudents = [
  { name: 'Arya Pathak', id: 'APP0123', attended: false, status: 'Pending' },
  { name: 'Omkar Lolage', id: 'APP0124', attended: true, status: 'Approved' },
  { name: 'Prajwal Weladi', id: 'APP0125', attended: true, status: 'Approved' },
  { name: 'Arya Rajvaidya', id: 'APP0126', attended: false, status: 'Rejected' }
];
export const mockNotifications = [
  { id: 1, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'Application', priority: 'High' },
  { id: 2, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'College', priority: 'High' },
  { id: 3, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'System Alert', priority: 'High' },
  { id: 4, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'Announcement', priority: 'Low' },
  { id: 5, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'News', priority: 'Medium' },
  { id: 6, title: 'New Message', from: 'Designer', message: '2 Messages...', date: '22 DEC 24', time: '16:10', category: 'Security', priority: 'High' },
  { id: 7, title: 'Policy Update', from: 'Admin', message: 'New policy update', date: '23 DEC 24', time: '09:00', category: 'Policy Update', priority: 'Medium' },
  { id: 8, title: 'Security Alert', from: 'System', message: 'Security update required', date: '23 DEC 24', time: '10:30', category: 'Security', priority: 'High' },
  { id: 9, title: 'Announcement', from: 'Admin', message: 'Team meeting', date: '23 DEC 24', time: '11:45', category: 'Announcement', priority: 'Low' },
  { id: 10, title: 'College Update', from: 'Team Lead', message: 'New college added', date: '24 DEC 24', time: '14:20', category: 'College', priority: 'High' },
  { id: 11, title: 'Application Status', from: 'HR', message: 'New application', date: '24 DEC 24', time: '15:15', category: 'Application', priority: 'Medium' },
  { id: 12, title: 'System Alert', from: 'Manager', message: 'System maintenance', date: '24 DEC 24', time: '16:50', category: 'System Alert', priority: 'High' },
  { id: 13, title: 'Security Breach', from: 'IT Support', message: 'Security check required', date: '25 DEC 24', time: '09:30', category: 'Security', priority: 'Critical' },
  { id: 14, title: 'News Update', from: 'Marketing', message: 'Latest news', date: '25 DEC 24', time: '12:15', category: 'News', priority: 'Medium' },
  { id: 15, title: 'Important Announcement', from: 'CEO', message: 'Company update', date: '25 DEC 24', time: '15:00', category: 'Announcement', priority: 'High' }
];

export const mockUser = {
  name: 'Omkar Lolage',
  role: 'Admin',
  email: 'admin@example.com'
};

export const statsData = {
  total: mockColleges.length,
  approved: mockColleges.filter(c => c.status === 'Approved').length,
  pending: mockColleges.filter(c => c.status === 'Pending').length,
  trends: {
    approved: [40, 60, 45, 70, 67],
    pending: [30, 45, 35, 50, 56],
    dates: ["Dec 21", "Dec 22", "Dec 23", "Dec 24", "Dec 25"]
  }
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const updateCollegeStatus = (id, newStatus) => {
  const collegeIndex = mockColleges.findIndex(college => college.id === id);
  if (collegeIndex !== -1) {
    mockColleges[collegeIndex].status = newStatus;
  }
  return [...mockColleges];
};

export const Program = {
  fetchPrograms: async () => {
    await delay(800);
    return mockPrograms;
  }
};

export const api = {
  async fetchColleges(filters = {}) {
    await delay(1000);
    let filteredColleges = [...mockColleges];
    
    if (filters.search) {
      filteredColleges = filteredColleges.filter(college => 
        college.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        college.city.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters.status) {
      filteredColleges = filteredColleges.filter(college => 
        college.status === filters.status
      );
    }
    
    return filteredColleges;
  },

  async updateCollegeStatus(collegeId, status) {
    await delay(1000);
    return updateCollegeStatus(collegeId, status);
  },

  async fetchProgram(id) {
    await delay(800);
    return mockProgramDetails;
  },

  async fetchProgramStudents(programId) {
    await delay(600);
    return mockStudents;
  },

  async fetchStats() {
    await delay(800);
    return statsData;
  },

  async fetchCurrentUser() {
    await delay(500);
    return mockUser;
  },

  async fetchNotifications() {
    await delay(500);
    return mockNotifications;
  },

  async clearNotifications() {
    await delay(500);
    return { success: true, message: 'All notifications cleared' };
  },

  async markNotificationAsRead(notificationId) {
    await delay(300);
    const notification = mockNotifications.find(n => n.id === notificationId);
    if (!notification) throw new Error('Notification not found');
    return { success: true, notification };
  },

  async uploadMOU(collegeId, file) {
    await delay(1500);
    const college = mockColleges.find(c => c.id === collegeId);
    if (!college) throw new Error('College not found');
    return { success: true, message: 'MOU uploaded successfully' };
  },

  async downloadMOU(collegeId) {
    await delay(1000);
    const college = mockColleges.find(c => c.id === collegeId);
    if (!college) throw new Error('College not found');
    window.open('https://drive.google.com/file/d/11H9I7r1Y5AozZ9Oy7N6qW-_qWLaSVkda/view?usp=drive_link');
  }
};