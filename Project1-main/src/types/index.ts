export type UserRole = 'student' | 'lecturer' | 'admin' | 'company';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt?: string;
}

export interface Internship {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  description: string;
  requirements: string[];
  status: 'open' | 'closed';
  type: 'Full-time' | 'Part-time' | 'Remote';
  salary?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  internshipId: string;
  studentId: string;
  status: 'applied' | 'interview' | 'accepted' | 'rejected';
  appliedAt: string;
}

export interface Report {
  id: string;
  studentId: string;
  title: string;
  content: string;
  week: number;
  status: 'pending' | 'reviewed';
  feedback?: string;
  submittedAt: string;
}

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar?: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  createdAt: string;
}

export interface Lecture {
  id: string;
  title: string;
  lecturerId: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  studentsCount: number;
}
