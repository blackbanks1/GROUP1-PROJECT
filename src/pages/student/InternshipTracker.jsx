import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function InternshipTracker() {
  const tasks = [
    { name: 'System Architecture Design', status: 'completed', progress: 100 },
    { name: 'API Implementation', status: 'active', progress: 65 },
    { name: 'Unit Testing & QA', status: 'pending', progress: 0 },
    { name: 'Production Deployment', status: 'pending', progress: 0 }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Active Engagement</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Internship Tracker</h1>
          <p className="text-slate-500 text-base">Real-time monitoring of your industrial training and technical growth.</p>
        </div>
        <div className="flex items-center gap-3 p-1.5 bg-slate-50 rounded-xl border border-slate-100">
           <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase px-3 py-1">In Training</Badge>
           <span className="text-xs font-bold text-slate-400 pr-3">Google Cloud &bull; Week 4</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-white border-slate-100 shadow-sm rounded-[2.5rem] overflow-hidden">
           <CardHeader className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold text-slate-950 uppercase">Technical Mastery</h3>
                 <span className="text-2xl font-bold text-primary-600">68%</span>
              </div>
           </CardHeader>
           <CardContent className="p-8 space-y-10">
              <div className="space-y-6">
                 {tasks.map((task, i) => (
                   <div key={i} className="space-y-3">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${task.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                               {task.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                            </div>
                            <span className={`text-sm font-bold ${task.status === 'active' ? 'text-slate-900' : 'text-slate-500'}`}>{task.name}</span>
                         </div>
                         <span className="text-[10px] font-bold text-slate-400">{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-1" />
                   </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between text-slate-400 text-xs font-bold">
                 <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Next Review: May 22, 2024</span>
                 </div>
                 <Button variant="link" onClick={() => toast.info('Loading detailed industrial training report...')} className="text-primary-600 font-bold p-0 uppercase text-xs">View Detailed Report</Button>
              </div>
           </CardContent>
        </Card>

        <div className="space-y-8">
           <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-slate-950 uppercase">Milestones</h3>
              <div className="grid grid-cols-1 gap-4">
                 <MilestoneCard icon={<Award />} label="Architecture Signed" status="earned" />
                 <MilestoneCard icon={<Zap />} label="Performance Optimization" status="next" />
              </div>
           </div>

           <div className="space-y-4">
              <h3 className="text-xl font-bold tracking-tight text-slate-950 uppercase px-2">Supervisors</h3>
              <Card className="bg-white border-slate-100 rounded-2xl p-6 shadow-sm">
                 <div className="space-y-6">
                    <SupervisorItem 
                      name="Dr. Sarah Smith" 
                      role="Lecturer" 
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" 
                    />
                    <SupervisorItem 
                      name="Marcus Aurelius" 
                      role="Industry Mentor" 
                      avatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" 
                    />
                 </div>
              </Card>
           </div>
        </div>
      </div>

      {/* Recent Feedback Section */}
      <div className="space-y-6">
         <h3 className="text-xl font-bold text-slate-900 uppercase px-2">Recent Feedback</h3>
         <Card className="bg-slate-50 border-none rounded-[2rem] p-10">
            <div className="max-w-2xl">
               <p className="text-lg text-slate-600 leading-relaxed font-medium">
                 "Alex has demonstrated exceptional technical clarity in the microservices architecture phase. The attention to scalability and system redundancy is far beyond the expected level for this stage of training."
               </p>
               <div className="flex items-center gap-4 mt-8">
                  <Avatar className="w-12 h-12 border-2 border-white">
                     <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  </Avatar>
                  <div>
                     <p className="text-sm font-bold text-slate-900">Dr. Sarah Smith</p>
                     <p className="text-[10px] font-bold text-primary-600 uppercase tracking-wide">University Lead Supervisor</p>
                  </div>
               </div>
            </div>
         </Card>
      </div>
    </div>
  );
}

function MilestoneCard({ icon, label, status }) {
  return (
    <Card onClick={() => toast.info(`Viewing milestone: ${label}`)} className={`p-6 rounded-2xl border transition-all flex items-center gap-4 cursor-pointer ${status === 'earned' ? 'bg-primary-600 text-white border-none shadow-lg shadow-primary-600/20' : 'bg-white border-slate-100 text-slate-400'}`}>
       <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'earned' ? 'bg-white/20' : 'bg-slate-50'}`}>
          {React.cloneElement(icon, { className: "w-5 h-5" })}
       </div>
       <span className="text-sm font-bold uppercase tracking-tight">{label}</span>
       {status === 'earned' && <CheckCircle2 className="w-4 h-4 ml-auto text-white/60" />}
    </Card>
  );
}

function SupervisorItem({ name, role, avatar }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer" onClick={() => toast.info(`Opening channel with supervisor: ${name}`)}>
       <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-slate-100">
             <AvatarImage src={avatar} />
          </Avatar>
          <div>
             <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{name}</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{role}</p>
          </div>
       </div>
       <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600">
          <ArrowRight className="w-4 h-4" />
       </Button>
    </div>
  );
}
