import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

// In-memory State
let USERS = [
  { id: 's1', name: 'Alex Johnson', role: 'student', email: 'alex@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', bio: 'CS Student at University of Tech.', github: 'github.com/alexj' },
  { id: 's2', name: 'Jane Doe', role: 'student', email: 'jane@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jane', bio: 'Junior Developer.', github: 'github.com/janedoe' },
  { id: 's3', name: 'Mike Ross', role: 'student', email: 'mike@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', bio: 'Legal Tech Enthusiast.', github: 'github.com/mross' },
  { id: 'c1', name: 'Google Recruit', role: 'company', email: 'hiring@google.com', password: 'password123', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GO', github: 'github.com/google', stars: 5 },
  { id: 'l1', name: 'Dr. Sarah Smith', role: 'lecturer', email: 's.smith@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', bio: 'Lead Instructor from Google Cloud. Specialist in Scalable Systems.' },
  { id: 'a1', name: 'Dean Admin', role: 'admin', email: 'admin@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
];

let INTERNSHIPS = [
  { id: 'i1', title: 'Frontend Developer Intern', companyName: 'Google Recruit', companyId: 'c1', location: 'Mountain View, CA', requirements: ['React', 'JavaScript', 'Tailwind'], salary: '$5000/mo', status: 'Active', applicants: 0, views: 1200, description: 'Work on cutting edge UI frameworks.' },
  { id: 'i2', title: 'Backend Engineer Intern', companyName: 'Meta', companyId: 'c2', location: 'Menlo Park, CA', requirements: ['Node.js', 'Python', 'Go'], salary: '$5500/mo', status: 'Active', applicants: 0, views: 800, description: 'Scale global infrastructure.' },
];

let CLASSES = [
  { id: 'c1', name: 'Web Engineering 301', code: 'WE301', lecturerName: 'Dr. Sarah Smith', lecturerId: 'l1', studentsCount: 45, progress: 72, trainingPartner: 'Google Recruit' }
];

let GROUPS = [
  { id: 'g1', classId: 'c1', name: 'Alpha Project Team', studentIds: ['s1', 's2', 's3'] }
];

let ACTIVITIES = [
  { id: 'a1', groupId: 'g1', name: 'System Architecture Draft', progress: 65, dueDate: 'May 25' },
  { id: 'a2', groupId: 'g1', name: 'Database Schema Design', progress: 30, dueDate: 'May 28' },
];

let PROJECTS = [
  { id: 'p1', studentId: 's1', title: 'E-Commerce Microservices', description: 'A scalable architecture built with Node.js, Kubernetes, and RabbitMQ.', tags: ['Backend', 'System Design', 'DevOps'], stats: { views: '1.2k', comments: 24, shares: 12 }, image: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800' }
];

let CERTIFICATES = [
  { id: 'cert1', studentId: 's1', studentName: 'Alex Johnson', className: 'Web Engineering 301', lecturerName: 'Dr. Sarah Smith', grade: 'A', status: 'approved', issuedDate: 'May 12, 2024' },
  { id: 'cert2', studentId: 's2', studentName: 'Jane Doe', className: 'Web Engineering 301', lecturerName: 'Dr. Sarah Smith', grade: 'B+', status: 'pending', issuedDate: 'May 15, 2024' }
];

let REPORTS = [
  { id: 'r1', studentId: 's1', studentName: 'Alex Johnson', classId: 'c1', className: 'Web Engineering 301', grade: 'A', status: 'Finalized', date: 'May 10, 2024' }
];

let APPLICATIONS = [];

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid email or password' });
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.post('/api/auth/signup', (req, res) => {
  const { email, name, password, role, ...rest } = req.body;
  if (USERS.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' });
  const newUserId = `${role[0]}${Date.now()}`;
  const newUser = { id: newUserId, email, name, password, role, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`, createdAt: new Date().getFullYear().toString(), ...rest };
  USERS.push(newUser);
  if (role === 'student') {
    const alphaGroup = GROUPS.find(g => g.id === 'g1');
    if (alphaGroup) alphaGroup.studentIds.push(newUserId);
  }
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// Admin endpoints
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalStudents: USERS.filter(u => u.role === 'student').length,
    activePartners: USERS.filter(u => u.role === 'company').length,
    schoolMastery: '74%',
    certsIssued: CERTIFICATES.filter(c => c.status === 'approved').length
  });
});

app.get('/api/admin/classes', (req, res) => res.json(CLASSES));
app.get('/api/admin/certificates', (req, res) => res.json(CERTIFICATES));
app.post('/api/admin/certificates/:id/approve', (req, res) => {
  const cert = CERTIFICATES.find(c => c.id === req.params.id);
  if (!cert) return res.status(404).json({ error: 'Certificate not found' });
  cert.status = 'approved';
  res.json(cert);
});
app.put('/api/admin/companies/:id/stars', (req, res) => {
  const company = USERS.find(u => u.id === req.params.id && u.role === 'company');
  if (!company) return res.status(404).json({ error: 'Company not found' });
  company.stars = req.body.stars;
  res.json(company);
});

// Users
app.get('/api/users', (req, res) => res.json(USERS.map(({password, ...u}) => u)));
app.get('/api/users/:id', (req, res) => {
  const user = USERS.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...u } = user;
  res.json(u);
});
app.put('/api/users/:id', (req, res) => {
  const index = USERS.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  USERS[index] = { ...USERS[index], ...req.body };
  const { password, ...u } = USERS[index];
  res.json(u);
});

// Lecturer
app.get('/api/lecturer/:id/classes', (req, res) => res.json(CLASSES.filter(c => c.lecturerId === req.params.id)));
app.get('/api/class/:id/groups', (req, res) => {
  const classGroups = GROUPS.filter(g => g.classId === req.params.id).map(g => {
     const members = g.studentIds.map(sid => {
        const u = USERS.find(user => user.id === sid);
        return u ? { id: u.id, name: u.name, avatar: u.avatar } : null;
     }).filter(Boolean);
     return { ...g, members };
  });
  res.json(classGroups);
});
app.get('/api/lecturer/:id/reports', (req, res) => res.json(REPORTS));
app.post('/api/reports', (req, res) => {
  const newReport = { ...req.body, id: `r${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
  REPORTS.unshift(newReport);
  res.status(201).json(newReport);
});

// Internships
app.get('/api/internships', (req, res) => res.json(INTERNSHIPS));
app.post('/api/internships', (req, res) => {
  const newInternship = { ...req.body, id: `i${Date.now()}`, applicants: 0, views: 0, status: req.body.status || 'Active' };
  INTERNSHIPS.unshift(newInternship);
  res.status(201).json(newInternship);
});
app.get('/api/applications', (req, res) => {
  const { companyId } = req.query;
  if (companyId) {
    const ids = INTERNSHIPS.filter(i => i.companyId === companyId).map(i => i.id);
    const filtered = APPLICATIONS.filter(app => ids.includes(app.internshipId));
    return res.json(filtered.map(a => ({ ...a, studentName: USERS.find(u => u.id === a.studentId)?.name, studentAvatar: USERS.find(u => u.id === a.studentId)?.avatar, internshipTitle: INTERNSHIPS.find(i => i.id === a.internshipId)?.title })));
  }
  res.json(APPLICATIONS);
});
app.post('/api/applications', (req, res) => {
  const { studentId, internshipId } = req.body;
  if (APPLICATIONS.find(a => a.studentId === studentId && a.internshipId === internshipId)) return res.status(400).json({ error: 'Already applied' });
  const newApp = { id: `a${Date.now()}`, studentId, internshipId, status: 'pending', appliedDate: new Date().toISOString() };
  APPLICATIONS.push(newApp);
  const internship = INTERNSHIPS.find(i => i.id === internshipId);
  if (internship) internship.applicants += 1;
  res.status(201).json(newApp);
});

// Student
app.get('/api/student/:id/group', (req, res) => {
  const group = GROUPS.find(g => g.studentIds.includes(req.params.id));
  if (!group) return res.status(404).json({ error: 'Group not found' });
  const members = group.studentIds.map(sid => { const u = USERS.find(user => user.id === sid); return u ? { id: u.id, name: u.name, avatar: u.avatar } : null; }).filter(Boolean);
  const classInfo = CLASSES.find(c => c.id === group.classId);
  res.json({ ...group, members, classInfo });
});
app.get('/api/group/:id/activities', (req, res) => res.json(ACTIVITIES.filter(a => a.groupId === req.params.id)));
app.get('/api/student/:id/projects', (req, res) => res.json(PROJECTS.filter(p => p.studentId === req.params.id)));
app.post('/api/projects', (req, res) => { const newProject = { ...req.body, id: `p${Date.now()}`, stats: { views: '0', comments: 0, shares: 0 } }; PROJECTS.unshift(newProject); res.status(201).json(newProject); });
app.get('/api/student/:id/certificates', (req, res) => res.json(CERTIFICATES.filter(c => c.studentId === req.params.id)));

app.post('/api/ai/generate-roadmap', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!process.env.GEMINI_API_KEY) return res.status(500).json({ error: 'AI Key not configured' });
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const result = await genAI.getGenerativeModel({ model: "gemini-pro" }).generateContent(prompt);
    res.json({ text: (await result.response).text() });
  } catch (error) { res.status(500).json({ error: 'AI Generation failed' }); }
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
