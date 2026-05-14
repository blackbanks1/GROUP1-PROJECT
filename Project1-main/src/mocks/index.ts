import { User, Internship, Post } from '../types';

export const MOCK_USERS: User[] = [
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
    name: 'Google Recruit',
    role: 'company',
    email: 'hiring@google.com',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GO',
    bio: 'Finding the next generation of tech leaders.',
  },
  {
    id: 'l1',
    name: 'Dr. Sarah Smith',
    role: 'lecturer',
    email: 's.smith@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    bio: 'Professor of Computer Science. Internship coordinator.',
  },
  {
    id: 'a1',
    name: 'Admin Master',
    role: 'admin',
    email: 'admin@campus.edu',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
  },
];

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'i1',
    title: 'Frontend Developer Intern',
    companyId: 'c1',
    companyName: 'Google',
    location: 'Mountain View, CA',
    description: 'Work on cutting-edge localized web applications using React.',
    requirements: ['React', 'TypeScript', 'Tailwind'],
    status: 'open',
    type: 'Remote',
    salary: '$5000/mo',
    createdAt: '2024-05-10',
  },
  {
    id: 'i2',
    title: 'Backend Engineer Intern',
    companyId: 'c2',
    companyName: 'Meta',
    location: 'Menlo Park, CA',
    description: 'Scale distributed systems and improve API performance.',
    requirements: ['Node.js', 'Python', 'Go'],
    status: 'open',
    type: 'Full-time',
    createdAt: '2024-05-12',
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    authorId: 's1',
    authorName: 'Alex Johnson',
    authorRole: 'student',
    authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    content: 'Just finished my first week at Google! Amazing experience so far. #Internship #GoogleLife',
    likes: 42,
    comments: 5,
    createdAt: '2024-05-13T10:00:00Z',
  },
  {
    id: 'p2',
    authorId: 'c1',
    authorName: 'Google Recruit',
    authorRole: 'company',
    authorAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GO',
    content: 'We are hiring interns for Summer 2024! Apply now to work on cool projects.',
    likes: 120,
    comments: 18,
    createdAt: '2024-05-12T15:30:00Z',
  },
];
