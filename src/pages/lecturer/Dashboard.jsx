import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Plus,
  Search,
  MoreVertical,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LecturerDashboard() {
  const lecturerId = 'l1'; // Dr. Sarah Smith
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    async function loadLecturerData() {
      try {
        const classesData = await api.getLecturerClasses(lecturerId);
        setClasses(classesData);
        if (classesData.length > 0) {
          setSelectedClass(classesData[0]);
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }
    loadLecturerData();
  }, []);

  React.useEffect(() => {
    if (selectedClass) {
      async function loadGroups() {
        try {
          const groupsData = await api.getClassGroups(selectedClass.id);
          setGroups(groupsData);
        } catch (error) {
          console.error('Failed to load class groups', error);
        }
      }
      loadGroups();
    }
  }, [selectedClass]);

  const handleAction = (msg) => {
    toast.info(msg);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary-600" />
            <span className="text-[10px] uppercase font-bold text-primary-600">Faculty Command Center</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 uppercase leading-tight">
            Academic <span className="text-primary-600">Insight</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">Oversee academic progression, group dynamics, and student performance metrics.</p>
        </div>
        <Button onClick={() => handleAction('Opening class creation wizard')} className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-bold uppercase text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
          <Plus className="w-5 h-5 mr-3" />
          Create New Class
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-primary-500" />} label="Total Students" value={selectedClass?.studentsCount || 0} subtext="Across active courses" accent="bg-primary-500" />
        <StatCard icon={<LayoutGrid className="text-accent-blue" />} label="Active Groups" value={groups.length} subtext="Collaborative teams" accent="bg-accent-blue" />
        <StatCard icon={<CheckCircle2 className="text-accent-green" />} label="Submissions" value="14" subtext="Pending review" accent="bg-accent-green" />
        <StatCard icon={<Trophy className="text-accent-orange" />} label="Avg. Progress" value={`${selectedClass?.progress || 0}%`} subtext="Class performance" accent="bg-accent-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Class Selection & Groups */}
        <Card className="lg:col-span-4 glass border-slate-100 overflow-hidden shadow-sm">
           <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Class Registry</h3>
           </CardHeader>
           <CardContent className="p-4 space-y-2">
              {classes.map((c) => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedClass(c)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all flex items-center justify-between group ${selectedClass?.id === c.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20' : 'hover:bg-slate-50'}`}
                >
                   <div>
                      <h4 className="font-bold text-sm uppercase">{c.name}</h4>
                      <p className={`text-[10px] font-bold uppercase mt-1 ${selectedClass?.id === c.id ? 'text-white/60' : 'text-slate-400'}`}>{c.code}</p>
                   </div>
                   <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedClass?.id === c.id ? 'text-white' : 'text-slate-300'}`} />
                </div>
              ))}
           </CardContent>
        </Card>

        {/* Group Management */}
        <Card className="lg:col-span-8 glass border-slate-100 overflow-hidden shadow-sm">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <div>
               <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">{selectedClass?.name} Groups</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Manage project teams and milestones</p>
            </div>
            <Button variant="outline" className="border-slate-200 text-[10px] font-bold uppercase h-10 rounded-xl px-5">Download CSV</Button>
          </CardHeader>
          
          <CardContent className="p-8">
            {groups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {groups.map((group, idx) => (
                  <Card key={idx} className="bg-white border-slate-100 hover:border-primary-100 transition-all rounded-2xl p-6 group cursor-pointer shadow-sm">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                          <Target className="w-6 h-6" />
                       </div>
                       <Badge className="bg-primary-50 text-primary-600 border-none text-[9px] font-bold px-2 py-0.5 uppercase">{group.name}</Badge>
                    </div>
                    
                    <div className="flex -space-x-3 mb-6">
                       {group.members.map((member, i) => (
                         <Avatar key={i} className="w-9 h-9 border-4 border-white shadow-sm">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-slate-100 text-[10px] font-bold">{member.name[0]}</AvatarFallback>
                         </Avatar>
                       ))}
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                          <span>Milestone Progress</span>
                          <span className="text-primary-600">65%</span>
                       </div>
                       <Progress value={65} className="h-1.5" />
                    </div>

                    <Button variant="ghost" className="w-full mt-6 text-[10px] font-bold text-slate-400 uppercase group-hover:text-primary-600 border-t border-slate-50 pt-6 rounded-none h-auto">
                       View Group Activity
                    </Button>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                 <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                 <h4 className="font-bold text-slate-900 uppercase">No Groups Assigned</h4>
                 <p className="text-sm text-slate-500 font-medium uppercase mt-2">Initialize group distribution to start project tracking.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }) {
  return (
    <Card className="bg-white border-none transition-all group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 p-10 rounded-[2.5rem] relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">{icon}</div>
        <span className="text-[10px] font-bold uppercase text-slate-300 tracking-widest">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 text-slate-950 leading-none">{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{subtext}</p>
      </div>
    </Card>
  );
}
