import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Activity, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Trophy,
  LayoutGrid,
  ChevronRight,
  Target,
  Sparkles,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MOCK_CLASSES, 
  MOCK_GROUPS, 
  MOCK_ACTIVITIES, 
  MOCK_USERS 
} from '@/mocks';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const currentUser = MOCK_USERS[0]; // Alex Johnson
  
  // Find the student's group and class
  const myGroup = MOCK_GROUPS.find(g => g.students.some(s => s.name === currentUser.name));
  const myClass = MOCK_CLASSES.find(c => c.id === myGroup?.classId);
  const myActivities = MOCK_ACTIVITIES.filter(a => a.groupId === myGroup?.id);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
             <div className="h-px w-6 bg-primary-600" />
             <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">Student Terminal</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Welcome back, <span className="text-primary-600">{currentUser.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 text-lg font-normal">Your academic and professional progress is <span className="text-primary-600 font-semibold italic">on track</span>.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/student/career')} className="text-slate-500 border-slate-200 hover:bg-slate-50 rounded-xl h-11 px-6 font-semibold text-sm transition-all bg-white shadow-sm">
                Career Pipeline
            </Button>
            <Button onClick={() => navigate(`/profile/${currentUser.id}`)} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 px-6 font-semibold text-sm shadow-lg shadow-primary-600/10 border-none transition-all hover:scale-105">
                My Profile
            </Button>
        </div>
      </div>

      {/* Primary Context Card (Class & Group) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 bg-slate-900 border-none rounded-[2.5rem] overflow-hidden shadow-2xl relative group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
           <CardContent className="p-10 relative z-10 flex flex-col h-full justify-between">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-primary-400">
                       <LayoutGrid className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Current Class</span>
                 </div>
                 <h2 className="text-4xl font-bold text-white tracking-tight mb-2">{myClass?.name}</h2>
                 <p className="text-primary-400 font-bold uppercase tracking-widest text-xs mb-8">{myClass?.code} &bull; Lectured by Dr. Sarah Smith</p>
                 
                 <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
                    <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                       <Trophy className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Assigned Group</p>
                       <p className="font-bold text-white text-sm">{myGroup?.name}</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex items-center gap-6">
                 <div className="flex -space-x-3">
                    {myGroup?.students.map((student, i) => (
                      <Avatar key={i} className="border-2 border-slate-900 w-10 h-10">
                        <AvatarFallback className="text-[10px] font-bold bg-slate-800 text-white">{student.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                 </div>
                 <p className="text-xs font-bold text-white/60">You & {myGroup?.students.length - 1} others in this group</p>
              </div>
           </CardContent>
        </Card>

        {/* Quick Progress Mini Card */}
        <Card className="bg-white border-slate-100 shadow-xl rounded-[2.5rem] p-10 flex flex-col justify-between group hover:border-primary-100 transition-all">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                 </div>
                 <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase">On Schedule</Badge>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Academic Achievement</h3>
              <p className="text-sm text-slate-400 font-medium">You have completed <span className="text-primary-600 font-bold">4/6</span> core tasks for this semester.</p>
           </div>
           
           <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                 <span>Course Completion</span>
                 <span>72%</span>
              </div>
              <Progress value={72} className="h-2 rounded-full bg-slate-50" />
           </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* My Activities Column */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
                 <Activity className="w-6 h-6 text-primary-600" />
                 My Assigned Tasks
              </h2>
              <Button variant="link" className="text-primary-600 text-[10px] font-bold uppercase tracking-widest">View Full Syllabus</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myActivities.map((activity, idx) => (
                <Card key={idx} className="bg-white border-slate-100 hover:border-primary-200 transition-all duration-300 rounded-3xl group/task cursor-pointer">
                   <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 group-hover/task:bg-primary-600 group-hover/task:text-white transition-all flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                         </div>
                         <Badge variant="outline" className="border-slate-100 text-slate-400 text-[9px] font-bold uppercase tracking-widest">{activity.dueDate}</Badge>
                      </div>
                      <h4 className="font-bold text-slate-900 group-hover/task:text-primary-600 transition-colors mb-4">{activity.name}</h4>
                      <div className="space-y-3">
                         <div className="flex justify-between text-[10px] font-bold text-slate-400">
                            <span>Activity Progress</span>
                            <span>{activity.progress}%</span>
                         </div>
                         <Progress value={activity.progress} className="h-1.5 rounded-full bg-slate-50" />
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        {/* Sidebar Features Column */}
        <div className="lg:col-span-4 space-y-8">
           {/* Career Snapshot */}
           <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">Career Pipeline</h3>
              <Card className="bg-white border-slate-100 rounded-3xl p-6 shadow-sm group hover:border-primary-100 transition-all">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                       <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900">Google UI Intern</p>
                       <p className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">Interview Stage</p>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 text-slate-400" />
                       <span className="text-[10px] font-bold text-slate-600">May 20, 10:00 AM</span>
                    </div>
                    <ChevronRight className="w-3 h-3 text-slate-300" />
                 </div>
                 <Button onClick={() => navigate('/student/career')} variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors">
                    Access Career Hub
                 </Button>
              </Card>
           </div>

           {/* Learning Resources */}
           <div className="space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 px-2">Skill Roadmap</h3>
              <div className="space-y-3">
                 {[
                   { label: 'React Architecture', time: '12h left', color: 'bg-primary-500' },
                   { label: 'Advanced UI Design', time: 'Completed', color: 'bg-emerald-500' },
                 ].map((resource, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-primary-100 transition-all cursor-pointer group">
                       <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${resource.color}`} />
                          <span className="text-xs font-bold text-slate-700 group-hover:text-primary-600 transition-colors">{resource.label}</span>
                       </div>
                       <span className="text-[10px] font-bold text-slate-300">{resource.time}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
