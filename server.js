import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const DB_FILE = './db.json';

// In-memory State
let STATE = {
  USERS: [
    { id: 'l1', name: 'Dr. Sarah Smith', role: 'lecturer', email: 's.smith@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', bio: 'Lead Instructor from Google Cloud. Specialist in Scalable Systems.' },
    { id: 'a1', name: 'Dean Admin', role: 'admin', email: 'admin@campus.edu', password: 'password123', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
  ],
  INTERNSHIPS: [
    { id: 'i1', title: 'Frontend Developer Intern', companyName: 'Google Recruit', companyId: 'c1', location: 'Mountain View, CA', requirements: ['React', 'JavaScript', 'Tailwind'], salary: '$5000/mo', status: 'Active', applicants: 0, views: 1200, description: 'Work on cutting edge UI frameworks.' },
  ],
  CLASSES: [],
  GROUPS: [],
  ACTIVITIES: [],
  PROJECTS: [],
  CERTIFICATES: [],
  REPORTS: [],
  APPLICATIONS: [],
  LECTURER_CLASSES: { 'l1': [] }
};

// Persistence Logic
function loadData() {
  if (fs.existsSync(DB_FILE)) {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    STATE = { ...STATE, ...JSON.parse(data) };
  }
}

function saveData() {
  fs.writeFileSync(DB_FILE, JSON.stringify(STATE, null, 2));
}

loadData();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Global middleware to save data on non-GET requests
app.use((req, res, next) => {
  res.on('finish', () => {
    if (req.method !== 'GET') {
      saveData();
    }
  });
  next();
});

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    console.log('Login attempt:', { email: req.body.email, role: req.body.role });
    console.log('Current USERS in memory:', STATE.USERS.map(u => ({ email: u.email, role: u.role })));
  }
  next();
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = STATE.USERS.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) return res.status(401).json({ error: 'Invalid credentials for the selected role' });
  const { password: _, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.post('/api/auth/signup', (req, res) => {
  const { email, name, password, role, ...rest } = req.body;
  if (STATE.USERS.find(u => u.email === email)) return res.status(400).json({ error: 'Email already exists' });
  const newUserId = `${role[0]}${Date.now()}`;
  const newUser = { id: newUserId, email, name, password, role, avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`, createdAt: new Date().getFullYear().toString(), ...rest };
  STATE.USERS.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
});

// Admin endpoints
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalStudents: STATE.USERS.filter(u => u.role === 'student').length,
    activePartners: STATE.USERS.filter(u => u.role === 'company').length,
    schoolMastery: '74%',
    certsIssued: STATE.CERTIFICATES.filter(c => c.status === 'approved').length
  });
});

app.get('/api/admin/classes', (req, res) => res.json(STATE.CLASSES));
app.get('/api/admin/certificates', (req, res) => res.json(STATE.CERTIFICATES));
app.post('/api/admin/certificates/:id/approve', (req, res) => {
  const cert = STATE.CERTIFICATES.find(c => c.id === req.params.id);
  if (!cert) return res.status(404).json({ error: 'Certificate not found' });
  cert.status = 'approved';
  res.json(cert);
});
app.put('/api/admin/companies/:id/stars', (req, res) => {
  const company = STATE.USERS.find(u => u.id === req.params.id && u.role === 'company');
  if (!company) return res.status(404).json({ error: 'Company not found' });
  company.stars = req.body.stars;
  res.json(company);
});

// Users
app.get('/api/users', (req, res) => res.json(STATE.USERS.map(({password, ...u}) => u)));
app.get('/api/users/:id', (req, res) => {
  const user = STATE.USERS.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...u } = user;
  res.json(u);
});
app.put('/api/users/:id', (req, res) => {
  const index = STATE.USERS.findIndex(u => u.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  STATE.USERS[index] = { ...STATE.USERS[index], ...req.body };
  const { password, ...u } = STATE.USERS[index];
  res.json(u);
});

// Lecturer
app.get('/api/lecturer/:id/selected-classes', (req, res) => {
  const lecturerId = req.params.id;
  const selectedIds = STATE.LECTURER_CLASSES[lecturerId] || [];
  
  // Derive all classes first
  const students = STATE.USERS.filter(u => u.role === 'student');
  const classMap = new Map();
  students.forEach(s => {
    const classId = `${s.school}-${s.course}-${s.level}-${s.className}`.replace(/\s+/g, '-').toLowerCase();
    if (!classMap.has(classId)) {
      classMap.set(classId, {
        id: classId,
        name: `${s.course} (${s.className})`,
        school: s.school,
        course: s.course,
        level: s.level,
        className: s.className,
        studentsCount: 0,
        progress: 0,
        code: `${s.level}-${s.className}`
      });
    }
    classMap.get(classId).studentsCount++;
  });
  
  const allAvailable = Array.from(classMap.values());
  const selected = allAvailable.filter(c => selectedIds.includes(c.id));
  res.json(selected);
});

app.post('/api/lecturer/:id/selected-classes', (req, res) => {
  const lecturerId = req.params.id;
  const { classIds } = req.body;
  STATE.LECTURER_CLASSES[lecturerId] = classIds;
  res.json({ success: true });
});

app.get('/api/lecturer/:id/available-classes', (req, res) => {
  // Derive classes from students in USERS
  const students = STATE.USERS.filter(u => u.role === 'student');
  const classMap = new Map();
  
  students.forEach(s => {
    const classId = `${s.school}-${s.course}-${s.level}-${s.className}`.replace(/\s+/g, '-').toLowerCase();
    if (!classMap.has(classId)) {
      classMap.set(classId, {
        id: classId,
        name: `${s.course} (${s.className})`,
        school: s.school,
        course: s.course,
        level: s.level,
        className: s.className,
        studentsCount: 0,
        progress: 0,
        code: `${s.level}-${s.className}`
      });
    }
    classMap.get(classId).studentsCount++;
  });
  
  res.json(Array.from(classMap.values()));
});

app.get('/api/class/:id/students', (req, res) => {
  const classId = req.params.id;
  const students = STATE.USERS.filter(u => {
    if (u.role !== 'student') return false;
    const cid = `${u.school}-${u.course}-${u.level}-${u.className}`.replace(/\s+/g, '-').toLowerCase();
    return cid === classId;
  });
  res.json(students.map(({password, ...u}) => u));
});

app.post('/api/groups', (req, res) => {
  const { name, classId, studentIds } = req.body;
  const newGroup = {
    id: `g${Date.now()}`,
    name,
    classId,
    studentIds
  };
  STATE.GROUPS.push(newGroup);
  res.status(201).json(newGroup);
});

app.get('/api/class/:id/groups', (req, res) => {
  const classGroups = STATE.GROUPS.filter(g => g.classId === req.params.id).map(g => {
     const members = g.studentIds.map(sid => {
        const u = STATE.USERS.find(user => user.id === sid);
        return u ? { id: u.id, name: u.name, avatar: u.avatar } : null;
     }).filter(Boolean);
     return { ...g, members };
  });
  res.json(classGroups);
});
app.get('/api/lecturer/:id/reports', (req, res) => res.json(STATE.REPORTS));
app.post('/api/reports', (req, res) => {
  const newReport = { ...req.body, id: `r${Date.now()}`, date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
  STATE.REPORTS.unshift(newReport);
  res.status(201).json(newReport);
});

// Internships
app.get('/api/internships', (req, res) => res.json(STATE.INTERNSHIPS));
app.post('/api/internships', (req, res) => {
  const newInternship = { ...req.body, id: `i${Date.now()}`, applicants: 0, views: 0, status: req.body.status || 'Active' };
  STATE.INTERNSHIPS.unshift(newInternship);
  res.status(201).json(newInternship);
});
app.get('/api/applications', (req, res) => {
  const { companyId } = req.query;
  if (companyId) {
    const ids = STATE.INTERNSHIPS.filter(i => i.companyId === companyId).map(i => i.id);
    const filtered = STATE.APPLICATIONS.filter(app => ids.includes(app.internshipId));
    return res.json(filtered.map(a => ({ ...a, studentName: STATE.USERS.find(u => u.id === a.studentId)?.name, studentAvatar: STATE.USERS.find(u => u.id === a.studentId)?.avatar, internshipTitle: STATE.INTERNSHIPS.find(i => i.id === a.internshipId)?.title })));
  }
  res.json(STATE.APPLICATIONS);
});
app.post('/api/applications', (req, res) => {
  const { studentId, internshipId } = req.body;
  if (STATE.APPLICATIONS.find(a => a.studentId === studentId && a.internshipId === internshipId)) return res.status(400).json({ error: 'Already applied' });
  const newApp = { id: `a${Date.now()}`, studentId, internshipId, status: 'pending', appliedDate: new Date().toISOString() };
  STATE.APPLICATIONS.push(newApp);
  const internship = STATE.INTERNSHIPS.find(i => i.id === internshipId);
  if (internship) internship.applicants += 1;
  res.status(201).json(newApp);
});

// Student
app.get('/api/student/:id/group', (req, res) => {
  const group = STATE.GROUPS.find(g => g.studentIds.includes(req.params.id));
  if (!group) return res.status(404).json({ error: 'Group not found' });
  const members = group.studentIds.map(sid => { const u = STATE.USERS.find(user => user.id === sid); return u ? { id: u.id, name: u.name, avatar: u.avatar } : null; }).filter(Boolean);
  const classInfo = STATE.CLASSES.find(c => c.id === group.classId);
  res.json({ ...group, members, classInfo });
});
app.get('/api/group/:id/activities', (req, res) => res.json(STATE.ACTIVITIES.filter(a => a.groupId === req.params.id)));
app.get('/api/student/:id/projects', (req, res) => res.json(STATE.PROJECTS.filter(p => p.studentId === req.params.id)));
app.post('/api/projects', (req, res) => { const newProject = { ...req.body, id: `p${Date.now()}`, stats: { views: '0', comments: 0, shares: 0 } }; STATE.PROJECTS.unshift(newProject); res.status(201).json(newProject); });
app.get('/api/student/:id/certificates', (req, res) => res.json(STATE.CERTIFICATES.filter(c => c.studentId === req.params.id)));

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
