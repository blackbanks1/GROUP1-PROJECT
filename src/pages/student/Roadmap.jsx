import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  Map, 
  Target, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  Award,
  Zap,
  Briefcase,
  Star,
  Lock,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function Roadmap() {
  const milestones = [
    { title: 'Technical Foundations', status: 'completed', date: 'March 2024' },
    { title: 'Microservices Mastery', status: 'active', date: 'In Progress' },
    { title: 'Cloud Scaling Specialist', status: 'locked', date: 'Locked' },
    { title: 'Career-Ready Architect', status: 'locked', date: 'Final Goal' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Evolution Path</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Technical Roadmap</h1>
          <p className="text-slate-500 text-base">Your personalized journey from academic foundations to high-end industrial roles.</p>
        </div>
        <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 px-8 font-bold text-xs uppercase shadow-xl shadow-primary-600/10 border-none">
          Update Roadmap
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
           <Card className="rounded-[3rem] border-slate-100 bg-white shadow-sm p-12 border-none">
              <div className="space-y-16">
                 {milestones.map((m, i) => (
                   <div key={i} className="flex gap-8 group">
                      <div className="relative flex flex-col items-center">
                         <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                           m.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                           m.status === 'active' ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20 rotate-12 scale-110' :
                           'bg-slate-50 text-slate-300'
                         }`}>
                            {m.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> :
                             m.status === 'active' ? <Compass className="w-6 h-6 animate-spin-slow" /> :
                             <Lock className="w-6 h-6" />}
                         </div>
                         {i < milestones.length - 1 && (
                           <div className={`w-0.5 h-20 my-2 rounded-full ${m.status === 'completed' ? 'bg-emerald-100' : 'bg-slate-50'}`} />
                         )}
                      </div>
                      <div className="pt-2 flex-1">
                         <div className="flex items-center gap-4 mb-2">
                            <h3 className={`text-2xl font-bold uppercase tracking-tight ${m.status === 'locked' ? 'text-slate-300' : 'text-slate-900'}`}>{m.title}</h3>
                            {m.status === 'active' && <Badge className="bg-primary-50 text-primary-600 border-none font-bold text-[9px] uppercase">Active Path</Badge>}
                         </div>
                         <p className={`text-sm font-bold uppercase tracking-wide ${m.status === 'completed' ? 'text-emerald-500' : 'text-slate-400'}`}>
                           {m.date}
                         </p>
                         <p className="text-slate-500 mt-4 max-w-xl leading-relaxed font-medium">
                            Complete the microservices architecture project and pass the peer-review audit to unlock the next level of your roadmap.
                         </p>
                      </div>
                   </div>
                 ))}
              </div>
           </Card>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-slate-950 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                    <Target className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight uppercase leading-tight">Mastery Velocity</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-wide">
                       <span>Core Competency</span>
                       <span className="text-primary-400">85%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full w-[85%] bg-primary-600 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                    </div>
                 </div>
                 <p className="text-slate-400 font-medium text-base leading-relaxed">
                   Based on your output velocity, you are projected to reach 'Career-Ready' status in 4 months.
                 </p>
                 <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wide text-[10px]">
                    Technical Deep Dive
                 </Button>
              </div>
           </Card>

           <div className="space-y-4 px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Roadmap Bonuses</h3>
              <div className="space-y-3">
                 <div className="p-6 rounded-2xl bg-white border border-slate-100 flex items-center gap-4 group hover:border-primary-100 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                       <Award className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-950 uppercase">Gold Tier Badge</p>
                       <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Unlock at level 3</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
