export const MOCK_USERS = [
  {
    id: 's1',
    name: 'Alex Johnson',
    role: 'student',
    email: 'alex@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    bio: 'CS Student at University of Tech. Passionate about AI and Web Dev.',
  },
  {
    id: 'c1',
    name: 'Google Cloud Training',
    role: 'company',
    email: 'training@google.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GO',
    bio: 'Industry-leading cloud architecture and AI training programs.',
    stars: 4.8,
  },
  {
    id: 'c2',
    name: 'Meta Engineer Academy',
    role: 'company',
    email: 'academy@meta.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MT',
    bio: 'Specializing in frontend performance and distributed systems.',
    stars: 4.5,
  },
  {
    id: 'l1',
    name: 'Dr. Sarah Smith',
    role: 'lecturer',
    email: 's.smith@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Lead Instructor from Google Cloud. Specialist in Scalable Systems.',
  },
  {
    id: 'a1',
    name: 'Dean of Studies',
    role: 'admin',
    email: 'dean@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dean',
  },
  {
    id: 'l2',
    name: 'Prof. Michael Chen',
    role: 'lecturer',
    email: 'm.chen@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    bio: 'Data Science expert and industry liaison.',
  },
  {
    id: 'l3',
    name: 'Dr. Emily Brown',
    role: 'lecturer',
    email: 'e.brown@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    bio: 'Specializing in Human-Computer Interaction.',
  },
];

export const MOCK_OPPORTUNITIES = [
  {
    id: 'o1',
    title: 'Cloud Architecture Mastery',
    companyName: 'Google Cloud',
    companyId: 'c1',
    location: 'Hybrid / Online',
    description: 'A 12-week intensive on scaling global web applications using GCP and React.',
    skills: ['GCP', 'Kubernetes', 'Advanced React', 'System Design'],
    certificate: 'Google Professional Architect (Verified)',
    cost: '$1,200 (School Sponsored)',
    duration: '12 Weeks',
    status: 'open',
  },
  {
    id: 'o2',
    title: 'Performance Frontend Academy',
    companyName: 'Meta Engineer Academy',
    companyId: 'c2',
    location: 'Remote',
    description: 'Master the art of high-performance rendering and state management in massive codebases.',
    skills: ['React Native', 'WASM', 'GraphQL', 'Performance Profiling'],
    certificate: 'Meta Frontend Specialist',
    cost: '$950 (School Sponsored)',
    duration: '8 Weeks',
    status: 'open',
  },
];

export const MOCK_POSTS = [
  {
    id: 'p1',
    authorId: 's1',
    authorName: 'Alex Johnson',
    authorRole: 'student',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Just finished my first week at Google Amazing experience so far. #Internship #GoogleLife',
    likes: 42,
    comments: 5,
    createdAt: '2024-05-13T10:00:00Z',
  },
];

export const MOCK_CLASSES = [
  { 
    id: 'c1', 
    name: 'Web Engineering 301', 
    code: 'WE301', 
    studentsCount: 45, 
    trainingPartner: 'Google Cloud',
    collectiveProgress: 72,
    status: 'In Progress'
  },
  { 
    id: 'c2', 
    name: 'Data Science Fall 2024', 
    code: 'DS400', 
    studentsCount: 120,
    trainingPartner: 'Meta Engineer Academy',
    collectiveProgress: 35,
    status: 'Onboarding'
  },
];

export const MOCK_GROUPS = [
  { 
    id: 'g1', 
    classId: 'c1', 
    name: 'Alpha Project Team', 
    students: [
      { name: 'Alex Johnson', progress: 95 },
      { name: 'Jane Doe', progress: 82 },
      { name: 'Mike Ross', progress: 45 }
    ] 
  },
  { 
    id: 'g2', 
    classId: 'c1', 
    name: 'Beta Backend Group', 
    students: [
      { name: 'Sarah Wilson', progress: 88 },
      { name: 'John Smith', progress: 62 }
    ] 
  },
];

export const MOCK_ACTIVITIES = [
  { id: 'a1', groupId: 'g1', name: 'System Architecture Draft', progress: 65, dueDate: 'May 25' },
  { id: 'a2', groupId: 'g1', name: 'Database Schema Design', progress: 30, dueDate: 'May 28' },
  { id: 'a3', groupId: 'g2', name: 'API Documentation', progress: 90, dueDate: 'May 22' },
];

export const MOCK_CERTIFICATES = [
  { 
    id: 'cert1', 
    studentId: 's1', 
    studentName: 'Alex Johnson',
    classId: 'c1', 
    className: 'Web Engineering 301',
    lecturerName: 'Dr. Sarah Smith',
    grade: 'A', 
    progress: 95,
    status: 'approved',
    issuedDate: 'May 12, 2024'
  },
  { 
    id: 'cert2', 
    studentId: 's2', 
    studentName: 'Jane Doe',
    classId: 'c1', 
    className: 'Web Engineering 301',
    lecturerName: 'Dr. Sarah Smith',
    grade: 'B', 
    progress: 82,
    status: 'pending',
    issuedDate: 'May 14, 2024'
  },
  { 
    id: 'cert3', 
    studentId: 's3', 
    studentName: 'Mike Ross',
    classId: 'c1', 
    className: 'Web Engineering 301',
    lecturerName: 'Dr. Sarah Smith',
    grade: 'C', 
    progress: 45,
    status: 'pending',
    issuedDate: 'May 15, 2024'
  }
];
