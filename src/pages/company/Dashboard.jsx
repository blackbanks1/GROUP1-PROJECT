import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MOCK_USERS } from '@/mocks';

// Mock chart data
const chartData = [
  { name: 'Mon', apps: 4 },
  { name: 'Tue', apps: 7 },
  { name: 'Wed', apps: 5 },
  { name: 'Thu', apps: 12 },
  { name: 'Fri', apps: 9 },
  { name: 'Sat', apps: 3 },
  { name: 'Sun', apps: 1 },
];

export default function CompanyDashboard() {
  const currentUser = MOCK_USERS[1]; // Google Recruit
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary-600" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">Recruitment Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-display text-slate-950 uppercase italic leading-tight">
            Pipeline <span className="text-primary-600">Command</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">Manage your talent acquisition and internship openings across the network.</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
          <Plus className="w-5 h-5 mr-3" />
          Post New Internship
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-accent-blue" />} label="Total Applicants" value="128" subtext="+14 this week" accent="bg-accent-blue" />
        <StatCard icon={<Briefcase className="text-primary-400" />} label="Open Positions" value="8" subtext="3 urgent hirings" accent="bg-primary-500" />
        <StatCard icon={<Calendar className="text-accent-orange" />} label="Interviews" value="12" subtext="Next, 9 AM" accent="bg-accent-orange" />
        <StatCard icon={<CheckCircle2 className="text-accent-green" />} label="Hires Made" value="24" subtext="92% retention rate" accent="bg-accent-green" />
      </div>

      {/* Analytics & Active Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application Trends */}
        <Card className="lg:col-span-2 glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">Application Trends</h3>
            <Badge variant="outline" className="text-[10px] font-bold border-slate-200 uppercase tracking-widest text-slate-400">Last 7 Days</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#00000008" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                   stroke="#64748b" 
                   fontSize={10} 
                   tickLine={false} 
                   axisLine={false} 
                   dx={-10}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                  itemStyle={{ color: '#7c3aed', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="apps" 
                  stroke="#7c3aed" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorApps)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Actions / New Candidates */}
        <Card className="glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">New Candidates</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            {[
              { name: 'Sarah Wilson', role: 'Frontend Intern', match: '98%', avatar: 'S' },
              { name: 'John Doe', role: 'Backend Intern', match: '85%', avatar: 'J' },
              { name: 'Emma Lee', role: 'UI/UX Intern', match: '92%', avatar: 'E' },
              { name: 'Mike Ross', role: 'QA Intern', match: '78%', avatar: 'M' },
            ].map((candidate, idx) => (
              <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer text-slate-900">
                <div className="flex items-center gap-4 overflow-hidden">
                  <Avatar className="w-10 h-10 border border-slate-200 group-hover:border-primary-500/50 group-hover:scale-105 transition-all">
                    <AvatarFallback className="bg-primary-50 text-primary-700 font-bold">{candidate.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <h5 className="font-bold text-sm truncate tracking-tight group-hover:text-primary-500 transition-colors">{candidate.name}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5">{candidate.role}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className="bg-primary-500/10 text-primary-500 border-none text-[9px] font-bold px-2 py-1 uppercase tracking-tighter">{candidate.match} Match</Badge>
                </div>
              </div>
            ))}
            <div className="p-6">
              <Button variant="outline" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 border-slate-200 hover:bg-slate-100 h-10 rounded-xl transition-all">
                View All Candidates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Openings */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold tracking-tight font-display">Active Internship Openings</h3>
          <Button variant="link" className="text-primary-500 font-bold hover:text-primary-400 uppercase tracking-widest text-[10px]">Manage Positions</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Frontend Developer Intern', applicants: 42, views: 1200, status: 'Active' },
            { title: 'Cloud Infrastructure Intern', applicants: 15, views: 450, status: 'Urgent' },
            { title: 'Data Science Intern', applicants: 89, views: 3200, status: 'Reviewing' },
          ].map((job, idx) => (
            <Card key={idx} className="glass border-slate-200/50 hover:border-primary-500/30 transition-all group p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-primary-50 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6 text-primary-500" />
                </div>
                <Badge className={`text-[9px] font-bold uppercase tracking-widest border-none px-3 py-1 ${
                    job.status === 'Urgent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-primary-50 text-primary-600'
                }`}>{job.status}</Badge>
              </div>
              <h4 className="text-xl font-bold mb-6 tracking-tight font-display group-hover:text-primary-500 transition-colors text-slate-900 leading-tight">{job.title}</h4>
              <div className="flex items-center justify-between py-5 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-extrabold tracking-tighter font-display text-slate-900">{job.applicants}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Applicants</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold tracking-tighter font-display text-slate-900">{(job.views / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Profile Views</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 border-slate-200 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all rounded-xl h-12 font-bold text-xs uppercase tracking-widest">
                 View Applications
                 <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }: { icon.ReactNode; label; value; subtext; accent }) {
  return (
    <Card className="bg-white border-none transition-all group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 p-10 rounded-[2.5rem] relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic font-display">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 font-display italic text-slate-950 leading-none">{value}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subtext}</p>
      </div>
    </Card>
  );
}
