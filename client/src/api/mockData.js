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
export const colleges = [
  {
    id: 'CL-0178',
    name: 'Vishwakarma University',
    location: 'Pune, MH',
    email: 'connect@vupune.ac.in',
    registeredStudents: 15420,
    logo: '/college.png',
    programs: [
      { name: 'FB', code: 'FB001', fullName: 'Faculty of Business' },
      { name: 'BPI', code: 'BPI001', fullName: 'Business Process Innovation' },
      { name: 'IP', code: 'IP001', fullName: 'Industrial Psychology' }
    ],
    admins: [
      { 
        name: 'Dr. Rajesh Kumar',
        id: 'APP0123',
        email: 'rajesh.kumar@vupune.ac.in',
        dateAdded: '22 Jan 2024',
        role: 'Principal',
        status: 'active'
      },
      {
        name: 'Dr. Priya Sharma',
        id: 'APP0124',
        email: 'priya.sharma@vupune.ac.in',
        dateAdded: '15 Jan 2024',
        role: 'Dean',
        status: 'active'
      },
      {
        name: 'Prof. Amit Patel',
        id: 'APP0125',
        email: 'amit.patel@vupune.ac.in',
        dateAdded: '10 Jan 2024',
        role: 'HOD',
        status: 'active'
      },
      {
        name: 'Dr. Sarah Wilson',
        id: 'APP0126',
        email: 'sarah.wilson@vupune.ac.in',
        dateAdded: '5 Jan 2024',
        role: 'Dean',
        status: 'active'
      }
    ],
    documents: {
      mou: {
        status: 'pending',
        lastUpdated: '2024-01-15',
        expiryDate: '2025-01-15'
      }
    }
  }
];

export const notifications = [
  {
    id: 'notif-001',
    title: 'MOU Update Required',
    message: 'The current MOU will expire in 30 days. Please upload a new one.',
    type: 'warning',
    date: '2024-01-20',
    read: false
  },
  {
    id: 'notif-002',
    title: 'New Admin Added',
    message: 'Dr. Sarah Wilson has been added as Dean',
    type: 'info',
    date: '2024-01-05',
    read: true
  },
  {
    id: 'notif-003',
    title: 'Student Registration Update',
    message: '150 new students registered this week',
    type: 'success',
    date: '2024-01-18',
    read: false
  }
];

export const availablePrograms = [
  { name: 'FB', code: 'FB001', fullName: 'Faculty of Business' },
  { name: 'BPI', code: 'BPI001', fullName: 'Business Process Innovation' },
  { name: 'IP', code: 'IP001', fullName: 'Industrial Psychology' },
  { name: 'CS', code: 'CS001', fullName: 'Computer Science' },
  { name: 'ME', code: 'ME001', fullName: 'Mechanical Engineering' },
  { name: 'CE', code: 'CE001', fullName: 'Civil Engineering' },
  { name: 'EE', code: 'EE001', fullName: 'Electrical Engineering' },
  { name: 'BT', code: 'BT001', fullName: 'Biotechnology' }
];

export const roles = [
  { id: 'PRINCIPAL', name: 'Principal' },
  { id: 'DEAN', name: 'Dean' },
  { id: 'HOD', name: 'HOD' },
  { id: 'COORDINATOR', name: 'Program Coordinator' }
];

export const api = {

  async fetchCurrentUser() {
    await delay(500);
    return mockUser;
  },

  async fetchNotifications() {
    return fetchNotifications();
  },

  async addNotification(title, message, category, priority) {
    return addNotification(title, message, category, priority);
  },

  async markNotificationAsRead(notificationId) {
    return markNotificationAsRead(notificationId);
  },
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
  },
  async getCollege(id) {
    await delay(500);
    return colleges.find(college => college.id === id);
  },

  async updateCollege(id, data) {
    await delay(800);
    const index = colleges.findIndex(college => college.id === id);
    if (index !== -1) {
      colleges[index] = { ...colleges[index], ...data };
      return colleges[index];
    }
    throw new Error('College not found');
  },

  async getNotifications() {
    await delay(300);
    return notifications;
  },

  async markNotificationAsRead(id) {
    await delay(200);
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      return notification;
    }
    throw new Error('Notification not found');
  },

  async addProgram(collegeId, program) {
    await delay(600);
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      college.programs.push(program);
      return college.programs;
    }
    throw new Error('College not found');
  },

  async removeProgram(collegeId, programCode) {
    await delay(400);
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      college.programs = college.programs.filter(p => p.code !== programCode);
      return college.programs;
    }
    throw new Error('College not found');
  },

  async uploadMOU(collegeId, file) {
    await delay(1000);
    const college = colleges.find(c => c.id === collegeId);
    if (college) {
      college.documents.mou = {
        status: 'active',
        lastUpdated: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
      return college.documents.mou;
    }
    throw new Error('College not found');
  },

  async downloadMOU(collegeId) {
    await delay(500);
    const college = colleges.find(c => c.id === collegeId);
    if (college && college.documents.mou) {
      // In a real application, this would trigger a file download
      return college.documents.mou;
    }
    throw new Error('MOU not found');
  },

  async sendNotification(collegeId, message) {
    await delay(300);
    const notification = {
      id: `notif-${notifications.length + 1}`,
      title: 'New Notification',
      message,
      type: 'info',
      date: new Date().toISOString().split('T')[0],
      read: false
    };
    notifications.unshift(notification);
    return notification;
  }
};
export const fetchNotifications = async () => {
  await delay(500);
  return mockNotifications;
};

export const addNotification = (title, message, category = 'General', priority = 'Medium') => {
  const newNotification = {
    id: `notif-${mockNotifications.length + 1}`,
    title,
    from: 'System',
    message,
    date: new Date().toISOString().split('T')[0], 
    time: new Date().toLocaleTimeString(), 
    category,
    priority,
    read: false
  };

  mockNotifications.unshift(newNotification); 
  return newNotification;
};

export const markNotificationAsRead = async (notificationId) => {
  await delay(300);
  const notification = mockNotifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return notification;
  }
  throw new Error('Notification not found');
};

const generateRandomNotification = () => {
  const titles = ['New Application', 'System Alert', 'Security Update', 'New Message', 'Announcement'];
  const messages = [
    'A new application has been submitted.',
    'The system will undergo maintenance tonight.',
    'Your account password expires in 7 days.',
    'You have received a new message.',
    'An important announcement has been posted.'
  ];
  const categories = ['Application', 'System Alert', 'Security', 'Message', 'Announcement'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  const randomIndex = Math.floor(Math.random() * titles.length);
  
  return addNotification(titles[randomIndex], messages[randomIndex], categories[randomIndex], priorities[randomIndex]);
};

setInterval(() => {
  generateRandomNotification();
}, 30000); 