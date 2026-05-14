import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart3, 
  Users, 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  MoreVertical,
  Search,
  ArrowUpRight,
  UserPlus,
  AlertTriangle,
  AlertCircle,
  Info,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const data = [
  { name: 'Jan', students: 4000, companies: 2400 },
  { name: 'Feb', students: 3000, companies: 1398 },
  { name: 'Mar', students: 2000, companies: 9800 },
  { name: 'Apr', students: 2780, companies: 3908 },
  { name: 'May', students: 1890, companies: 4800 },
];

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#ef4444'];
const PIE_DATA = [
  { name: 'Students', value: 400 },
  { name: 'Companies', value: 300 },
  { name: 'Lecturers', value: 150 },
  { name: 'Admins', value: 50 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary-600" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">Administrative Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-display text-slate-950 uppercase italic leading-tight">
            System <span className="text-primary-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">Full platform oversight and administrative control center.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-slate-200 text-slate-400 rounded-2xl h-16 px-10 font-bold text-xs uppercase tracking-widest transition-all bg-white shadow-sm">
            Audit Logs
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
            Platform Settings
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-accent-blue" />} label="Platform Users" value="12.4k" subtext="+840 this month" accent="bg-accent-blue" />
        <StatCard icon={<Building2 className="text-primary-400" />} label="Active Companies" value="842" subtext="45 pending approval" accent="bg-primary-500" />
        <StatCard icon={<TrendingUp className="text-accent-green" />} label="Success Rate" value="94.2%" subtext="Placements vs Applications" accent="bg-accent-green" />
        <StatCard icon={<ShieldCheck className="text-accent-orange" />} label="System Uptime" value="99.9%" subtext="Status: Operational" accent="bg-accent-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Growth Chart */}
        <Card className="lg:col-span-2 glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
             <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">Registration Growth</h3>
             <div className="flex gap-6">
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(124,58,237,0.3)]" />
                   <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Students</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-2.5 h-2.5 rounded-full bg-accent-blue shadow-[0_0_10px_rgba(56,189,248,0.3)]" />
                   <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Companies</span>
                </div>
             </div>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} barGap={8}>
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
                   cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                   contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
                   itemStyle={{ fontWeight: 'bold', fontSize: '12px' }}
                />
                <Bar dataKey="students" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                <Bar dataKey="companies" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* User Distribution */}
        <Card className="glass border-slate-200/50 overflow-hidden shadow-xl relative">
          <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">User Distribution</h3>
          </CardHeader>
          <CardContent className="p-8 h-[350px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={105}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="focus:outline-none shadow-sm" />
                  ))}
                </Pie>
                <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                <p className="text-4xl font-extrabold tracking-tighter font-display mb-1 text-slate-900">850</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Total Base</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health / Pending Tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="glass border-slate-200/50 shadow-xl overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
              <h3 className="text-lg font-bold font-display tracking-tight flex items-center gap-3 text-slate-900">
                <ShieldCheck className="w-5 h-5 text-accent-pink" />
                Security OverSight
              </h3>
              <Badge variant="outline" className="text-accent-pink border-accent-pink/20 bg-accent-pink/5 font-bold text-[9px] uppercase tracking-widest">3 Alerts</Badge>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {[
                    { msg: 'Unusual login pattern from IP 192.168.1.1', level: 'High', time: '10m ago', icon: AlertTriangle, color: 'text-accent-pink' },
                    { msg: 'Account verification needed: Apple Recruit', level: 'Medium', time: '1h ago', icon: AlertCircle, color: 'text-accent-orange' },
                    { msg: 'System update available: v2.4.1', level: 'Info', time: '5h ago', icon: Info, color: 'text-accent-blue' },
                  ].map((alert, idx) => (
                    <div key={idx} className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                       <alert.icon className={`w-6 h-6 ${alert.color} opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all`} />
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium tracking-tight truncate text-slate-900">{alert.msg}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-1">{alert.time} &bull; {alert.level} Priority</p>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 border-t border-slate-100">
                  <Button variant="ghost" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors h-10 hover:bg-slate-50">
                    Open Security Console
                  </Button>
               </div>
            </CardContent>
         </Card>

         <Card className="glass border-slate-200/50 shadow-xl overflow-hidden">
            <CardHeader className="p-6 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
              <h3 className="text-lg font-bold font-display tracking-tight flex items-center gap-3 text-slate-900">
                <UserPlus className="w-5 h-5 text-accent-blue" />
                Pending Verification
              </h3>
              <Button variant="link" size="sm" className="text-primary-600 font-bold uppercase tracking-widest text-[10px] italic">Review All</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {[
                    { name: 'Tesla Inc.', type: 'Company', date: '2 hours ago' },
                    { name: 'Stanford University', type: 'Institution', date: '5 hours ago' },
                    { name: 'Prof. James Bond', type: 'Lecturer', date: 'Yesterday' },
                  ].map((pending, idx) => (
                    <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                       <div className="flex items-center gap-4 overflow-hidden">
                          <Avatar className="w-11 h-11 border border-slate-200 group-hover:border-primary-500/50 group-hover:scale-105 transition-all">
                             <AvatarFallback className="bg-primary-50 text-primary-700 font-bold text-sm">{pending.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="min-w-0 overflow-hidden">
                             <p className="text-sm font-bold tracking-tight truncate text-slate-900">{pending.name}</p>
                             <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mt-0.5 truncate">{pending.type} &bull; {pending.date}</p>
                          </div>
                       </div>
                       <div className="flex gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                          <Button size="icon" variant="ghost" className="text-accent-green hover:bg-accent-green/10 w-8 h-8 rounded-full border border-slate-200 group-hover:border-accent-green/20">
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-accent-pink hover:bg-accent-pink/10 w-8 h-8 rounded-full border border-slate-200 group-hover:border-accent-pink/20">
                            <ShieldAlert className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="p-4 border-t border-slate-100">
                  <Button variant="ghost" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors h-10 hover:bg-slate-50">
                    See Verified Institutions
                  </Button>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }: { icon: React.ReactNode; label: string; value: string; subtext: string; accent: string }) {
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
