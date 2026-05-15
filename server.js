import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/genai';

// Mock Data
const MOCK_USERS = [
  { id: 's1', name: 'Alex Johnson', role: 'student', email: 'alex@campus.edu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex', bio: 'CS Student at University of Tech.' },
  { id: 'c1', name: 'Google Recruit', role: 'company', email: 'hiring@google.com', avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=GO' },
  { id: 'l1', name: 'Dr. Sarah Smith', role: 'lecturer', email: 's.smith@campus.edu', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
];

const MOCK_INTERNSHIPS = [
  { id: 'i1', title: 'Frontend Developer Intern', companyName: 'Google', location: 'Mountain View, CA', requirements: ['React', 'JavaScript', 'Tailwind'], salary: '$5000/mo', status: 'open' },
  { id: 'i2', title: 'Backend Engineer Intern', companyName: 'Meta', location: 'Menlo Park, CA', requirements: ['Node.js', 'Python', 'Go'], status: 'open' },
];

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression());
app.use(cors());
app.use(express.json());

// --- API Endpoints ---

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/users', (req, res) => {
  res.json(MOCK_USERS);
});

app.get('/api/internships', (req, res) => {
  res.json(MOCK_INTERNSHIPS);
});

app.post('/api/ai/generate-roadmap', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'AI Key not configured' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: 'AI Generation failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
