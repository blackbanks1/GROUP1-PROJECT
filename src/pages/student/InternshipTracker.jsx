import { motion } from 'motion/react';
import { 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FileText, 
  MessageSquare, 
  PieChart, 
  TrendingUp,
  Zap,
  Target,
  Trophy
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function InternshipTracker() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-primary-600">
             <div className="h-px w-8 bg-primary-600" />
             <span className="text-[10px] uppercase font-bold tracking-[0.3em]">Active Internship</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Journey <span className="text-primary-600">Tracker</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium">Currently engaged with <span className="text-slate-900 font-bold">Google UI Platform Team</span></p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 rounded-2xl h-14 px-8 font-bold text-xs uppercase tracking-widest transition-all bg-white text-slate-400 hover:text-slate-900 shadow-sm">
                Weekly Report
            </Button>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 px-8 font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary-600/10 transition-all">
                Submit Daily Log
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Progress Overview */}
        <Card className="bg-white border-slate-200 p-8 lg:col-span-2 relative overflow-hidden group shadow-sm">
          <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <Trophy className="w-64 h-64 text-primary-600" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-12">
               <div className="space-y-1">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-950 uppercase italic font-display">Technical Mastery</h3>
                  <p className="text-primary-600 text-xs font-bold uppercase tracking-widest">Phase 02 Integration</p>
               </div>
               <div className="text-right">
                  <p className="text-4xl font-black text-primary-600">68%</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Overall Progress</p>
               </div>
            </div>
            
            <div className="space-y-8">
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                     <span className="text-slate-400">Task Completion</span>
                     <span className="text-slate-900">82%</span>
                  </div>
                  <Progress value={82} className="h-2 bg-slate-100" indicatorClassName="bg-primary-600" />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                     <span className="text-slate-400">Attendance</span>
                     <span className="text-slate-900">100%</span>
                  </div>
                  <Progress value={100} className="h-2 bg-slate-100" indicatorClassName="bg-emerald-600" />
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
                     <span className="text-slate-400">Lecturer Evaluation</span>
                     <span className="text-slate-900">94%</span>
                  </div>
                  <Progress value={94} className="h-2 bg-slate-100" indicatorClassName="bg-primary-400" />
               </div>
            </div>
          </div>
        </Card>

        {/* Quick Insights */}
        <div className="space-y-6">
           <InsightCard icon={<Clock className="text-primary-600" />} label="Time Remaining" value="45 Days" sub="Stage 2 of 4" />
           <InsightCard icon={<Target className="text-primary-600" />} label="Current Aim" value="API Dev" sub="Due in 3 days" />
           <InsightCard icon={<TrendingUp className="text-emerald-600" />} label="Performance" value="Excellent" sub="Top 5% of Interns" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Timeline */}
         <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-bold font-display tracking-tight text-slate-950 uppercase italic">Milestones</h3>
               <Button variant="ghost" className="text-slate-400 hover:text-slate-900 text-[10px] font-black uppercase tracking-widest transition-colors">View All</Button>
            </div>
            <Card className="bg-white border-slate-200 divide-y divide-slate-100 p-2 shadow-sm">
               <TimelineItem title="Mid-term Evaluation" date="May 20" status="Upcoming" />
               <TimelineItem title="Authentication Module" date="May 12" status="Completed" />
               <TimelineItem title="Database Schema Design" date="May 05" status="Completed" />
               <TimelineItem title="Project Kickoff" date="April 28" status="Completed" />
            </Card>
         </section>

         {/* Feedback */}
         <section className="space-y-6">
            <h3 className="text-xl font-bold font-display tracking-tight text-slate-950 uppercase italic px-2">Supervisors</h3>
            <div className="space-y-4">
               <SupervisorCard 
                 name="Dr. Jane Smith" 
                 role="University Lecturer" 
                 feedback="Alex is demonstrating exceptional growth in system architecture. His contribution to the auth module was pivotal."
               />
               <SupervisorCard 
                 name="Marcus Holloway" 
                 role="Company Mentor" 
                 feedback="Great initiative. Alex needs to focus more on documentation standards, but his code quality is top-tier."
               />
            </div>
         </section>
      </div>
    </div>
  );
}

function InsightCard({ icon, label, value, sub }: { icon; label; value; sub }) {
  return (
    <Card className="bg-white border-slate-200 p-6 hover:bg-slate-50 transition-all group overflow-hidden relative shadow-sm">
       <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl group-hover:scale-110 transition-transform">
             {icon}
          </div>
          <div>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
             <h4 className="text-2xl font-bold tracking-tight text-slate-950">{value}</h4>
             <p className="text-[9px] font-bold text-primary-600 uppercase tracking-tighter mt-1">{sub}</p>
          </div>
       </div>
    </Card>
  );
}

function TimelineItem({ title, date, status }: { title; date; status }) {
  return (
    <div className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors rounded-3xl group">
       <div className="flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full ${status === 'Completed' ? 'bg-emerald-600 shadow-sm' : 'bg-slate-200'}`} />
          <div>
             <h5 className={`font-bold text-sm tracking-tight ${status === 'Completed' ? 'text-slate-900' : 'text-slate-400'}`}>{title}</h5>
             <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">{date}</p>
          </div>
       </div>
       <Badge className={`text-[10px] font-black uppercase tracking-widest border-none px-3 py-1 ${
         status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
       }`}>
         {status}
       </Badge>
    </div>
  );
}

function SupervisorCard({ name, role, feedback }: { name; role; feedback }) {
  return (
    <Card className="bg-white border-slate-200 p-8 hover:bg-slate-50 transition-all relative overflow-hidden group shadow-sm">
       <div className="absolute top-0 left-0 w-1 h-full bg-primary-600 opacity-20" />
       <div className="flex gap-6 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100 flex items-center justify-center text-primary-600 font-bold">
             {name[0]}
          </div>
          <div>
             <h5 className="font-bold text-slate-900">{name}</h5>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{role}</p>
          </div>
       </div>
       <p className="text-sm text-slate-500 leading-relaxed italic font-medium">"{feedback}"</p>
    </Card>
  );
}
