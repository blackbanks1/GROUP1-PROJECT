import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  MapPin, 
  Search,
  Check,
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MOCK_USERS } from '@/mocks';
import { api } from '@/lib/api';
import { Internship } from '@/types';

export default function StudentDashboard() {
  const currentUser = MOCK_USERS[0];
  const [internships, setInternships] = React.useState<Internship[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    api.getInternships()
      .then(data => {
        setInternships(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load internships", err);
        setLoading(false);
      });
  }, []);

  // Define progress stages  const stages = [
    { label: 'Applied', status: 'completed' },
    { label: 'Interview', status: 'completed' },
    { label: 'Accepted', status: 'active' },
    { label: 'Active', status: 'pending' },
    { label: 'Reports', status: 'pending' },
    { label: 'Completed', status: 'pending' },
  ];

  const currentStageIndex = 2; // "Accepted"

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-8 bg-primary-600" />
             <span className="text-[10px] uppercase font-black tracking-[0.3em] text-primary-600">Student Terminal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950 uppercase italic leading-tight">
            Greetings, <span className="text-primary-600 underline decoration-primary-100 underline-offset-8">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Your professional ecosystem is currently <span className="text-emerald-500 font-bold italic">optimized</span>.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="text-slate-400 border-slate-200 hover:bg-slate-50 rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest transition-all bg-white shadow-sm">
                Update Resume
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 px-8 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-600/10 border-none transition-all hover:scale-105 active:scale-95">
                Explore Direct Opps
            </Button>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Briefcase className="w-5 h-5" />} 
          label="Total Applications" 
          value="12" 
          subtext="+2 this month" 
          color="primary"
        />
        <StatCard 
          icon={<Calendar className="w-5 h-5" />} 
          label="Interviews" 
          value="03" 
          subtext="Next: Tomorrow, 10 AM" 
          color="primary"
        />
        <StatCard 
          icon={<CheckCircle2 className="w-5 h-5" />} 
          label="Offers Received" 
          value="01" 
          subtext="Google UI Intern" 
          color="primary"
        />
        <StatCard 
          icon={<Clock className="w-5 h-5" />} 
          label="Response Time" 
          value="48h" 
          subtext="92% faster than avg" 
          color="primary"
        />
      </div>

      {/* Internship Progress Tracker */}
      <Card className="bg-white border-slate-200 overflow-hidden shadow-sm relative group">
        <div className="absolute inset-0 bg-primary-50/30 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardHeader className="p-8 border-b border-slate-100">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-primary-100 rounded-lg">
                  <Target className="w-5 h-5 text-primary-600" />
               </div>
               <h3 className="text-xl font-bold tracking-tight font-display text-slate-900">Internship Roadmap</h3>
            </div>
            <Badge className="bg-primary-50 text-primary-700 border border-primary-100 px-4 py-1.5 font-bold text-[10px] uppercase tracking-widest">Active Stage: Recruitment</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-12">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-6 left-0 w-full h-1 bg-slate-100 rounded-full" />
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-6 left-0 h-1 bg-primary-600 z-10 rounded-full"
            />

            <div className="flex justify-between relative z-20">
              {stages.map((stage, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-700 ${
                      idx < currentStageIndex 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-md shadow-primary-600/10' 
                        : idx === currentStageIndex 
                        ? 'bg-white border-primary-600 text-primary-600 shadow-sm' 
                        : 'bg-white border-slate-200 text-slate-300'
                    }`}
                  >
                    {idx < currentStageIndex ? <Check className="w-6 h-6" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                  </motion.div>
                  <span className={`mt-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${
                    idx <= currentStageIndex ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {stage.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Recommended Internships */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-600" />
              <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900">Top Opportunities</h3>
            </div>
            <Button variant="ghost" size="sm" className="text-primary-600 text-[10px] font-bold uppercase tracking-widest hover:bg-primary-50">Browse Library</Button>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                Optimizing Opportunities...
              </div>
            ) : internships.map((job) => (
              <Card key={job.id} className="bg-white border-slate-200 hover:border-primary-400 transition-all group overflow-hidden cursor-pointer shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex-shrink-0 flex items-center justify-center border border-slate-100 p-2 group-hover:bg-primary-50 transition-colors">
                      <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${job.companyName}`} className="w-full h-full rounded-lg" alt="logo" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg group-hover:text-primary-600 transition-colors tracking-tight truncate text-slate-900">{job.title}</h4>
                        {job.salary && <span className="text-primary-600 font-bold text-[10px] uppercase tracking-widest bg-primary-50 px-2 py-1 rounded-lg border border-primary-100">{job.salary}</span>}
                      </div>
                      <p className="text-slate-500 text-sm mb-6 font-medium">{job.companyName} &bull; {job.location}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.requirements.map(req => (
                          <Badge key={req} variant="secondary" className="bg-slate-50 text-[9px] font-bold uppercase tracking-widest border border-slate-100 text-slate-500 px-3 py-1">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="self-center">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all">
                          <ArrowUpRight className="w-6 h-6 text-slate-300 group-hover:text-white" />
                       </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Application Status */}
        <section className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <h3 className="text-2xl font-bold font-display tracking-tight text-slate-900">Active Applications</h3>
            </div>
          </div>
          <Card className="bg-white border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
            {[
              { company: 'Google', role: 'UI/UX Intern', status: 'In Review', date: 'May 10', color: 'bg-primary-400' },
              { company: 'Meta', role: 'Frontend Engineer', status: 'Accepted', date: 'May 08', color: 'bg-primary-600' },
              { company: 'Stripe', role: 'Product Design', status: 'Interview', date: 'May 05', color: 'bg-primary-700' },
              { company: 'Linear', role: 'Backend Intern', status: 'On Hold', date: 'April 28', color: 'bg-slate-200' },
            ].map((app, idx) => (
              <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-6">
                    <div className={`w-1.5 h-12 rounded-full ${app.color} shadow-sm`} />
                    <div className="space-y-1">
                        <h5 className="font-bold text-lg tracking-tight group-hover:text-primary-600 transition-colors text-slate-900">{app.company}</h5>
                        <p className="text-xs text-slate-500 font-medium">{app.role}</p>
                    </div>
                </div>
                <div className="text-right space-y-2">
                  <Badge className={`text-[10px] font-bold uppercase tracking-widest border-none px-4 py-1.5 ${
                    app.status === 'Accepted' ? 'bg-primary-50 text-primary-700' :
                    app.status === 'In Review' ? 'bg-primary-50 text-primary-600' :
                    app.status === 'Interview' ? 'bg-primary-100 text-primary-800' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {app.status}
                  </Badge>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em]">{app.date}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, color }: { icon: React.ReactNode; label: string; value: string; subtext: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: 'text-primary-600 bg-primary-50 border-primary-100 shadow-primary-500/5',
  };

  return (
    <Card className="bg-white border-slate-200 hover:border-primary-200 transition-all group overflow-hidden shadow-sm pt-1">
      <CardContent className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-2xl border transition-transform group-hover:scale-110 ${colorMap.primary}`}>
             {icon}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{label}</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-5xl font-extrabold tracking-tighter font-display text-slate-950">{value}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{subtext}</p>
        </div>
      </CardContent>
    </Card>
  );
}
