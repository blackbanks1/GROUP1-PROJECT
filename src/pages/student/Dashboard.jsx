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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState(null);
  const [group, setGroup] = React.useState(null);
  const [activities, setActivities] = React.useState([]);
  const [applications, setApplications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadDashboard() {
      try {
        const userId = localStorage.getItem('careerlink_user_id') || 's1';
        const [userData, appsData] = await Promise.all([
          api.getUser(userId),
          api.getApplications()
        ]);

        setCurrentUser(userData);
        setApplications(appsData.filter(a => a.studentId === userId));

        try {
          const groupData = await api.getStudentGroup(userId);
          setGroup(groupData);
          const acts = await api.getGroupActivities(groupData.id);
          setActivities(acts);
        } catch (groupError) {
          console.log('Student not yet assigned to a group');
          setGroup(null);
          setActivities([]);
        }
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboard();
  }, []);
  const handleAction = (action) => {
    toast.info(`Action initiated: ${action}`);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const myClass = group?.classInfo;

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans pb-20">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-xs font-bold uppercase tracking-wide text-primary-600">Student Portal</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
            Welcome, {currentUser?.name.split(' ')[0]}
          </h1>
          <p className="text-slate-600 text-base font-normal">Your academic and professional progress is on track.</p>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/student/career')} className="text-slate-600 border-slate-200 hover:bg-slate-50 rounded-lg h-10 px-5 font-medium text-sm transition-all bg-white uppercase">
                Career Hub
            </Button>
            <Button onClick={() => navigate(`/profile/${currentUser.id}`)} className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg h-10 px-5 font-medium text-sm shadow-md shadow-primary-600/10 border-none transition-all uppercase">
                My Profile
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-900 border-none rounded-2xl overflow-hidden shadow-xl relative group">
           <CardContent className="p-8 relative z-10 flex flex-col h-full justify-between">
              <div>
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-primary-400">
                       <LayoutGrid className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-white/60">Current Course</span>
                 </div>
                 <h2 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">{myClass?.name}</h2>
                 <p className="text-primary-400 font-bold text-sm mb-8 uppercase tracking-wide">{myClass?.code} &bull; {myClass?.lecturerName}</p>
                 
                 <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 w-fit">
                    <div className="w-9 h-9 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                       <Trophy className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-0.5">Assigned Group</p>
                       <p className="font-bold text-white text-sm uppercase">{group?.name}</p>
                    </div>
                 </div>
              </div>

              <div className="mt-12 flex items-center gap-4">
                 <div className="flex -space-x-2">
                    {group?.members.map((student, i) => (
                      <Avatar key={i} className="border-2 border-slate-900 w-8 h-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback className="text-xs font-bold bg-slate-800 text-white">{student.name[0]}</AvatarFallback>
                      </Avatar>
                    ))}
                 </div>
                 <p className="text-xs font-bold text-white/70 uppercase">You & {group?.members.length - 1} team members</p>
              </div>
           </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-sm rounded-2xl p-8 flex flex-col justify-between hover:border-primary-100 transition-all">
           <div className="space-y-6">
              <div className="flex items-center justify-between">
                 <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Target className="w-5 h-5" />
                 </div>
                 <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-xs uppercase">Active</Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Achievement</h3>
                <p className="text-sm text-slate-600 font-semibold uppercase">Course progress tracking active.</p>
              </div>
           </div>
           
           <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                 <span>Course Completion</span>
                 <span className="text-primary-600">{myClass?.progress}%</span>
              </div>
              <Progress value={myClass?.progress} className="h-1.5" />
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 tracking-tight uppercase">
                 <Activity className="w-5 h-5 text-primary-600" />
                 Active Tasks
              </h2>
              <Button variant="link" onClick={() => handleAction('Viewing Syllabus')} className="text-primary-600 text-xs font-bold p-0 uppercase">View Syllabus</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activities.map((activity, idx) => (
                <Card key={idx} onClick={() => handleAction(`Opening ${activity.name}`)} className="bg-white border-slate-100 hover:border-primary-200 transition-all rounded-xl cursor-pointer shadow-sm">
                   <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-6">
                         <div className="w-9 h-9 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center">
                            <CheckCircle2 className="w-4.5 h-4.5" />
                         </div>
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{activity.dueDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm">{activity.name}</h4>
                      <div className="space-y-2">
                         <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                            <span>Progress</span>
                            <span className="text-slate-700">{activity.progress}%</span>
                         </div>
                         <Progress value={activity.progress} className="h-1" />
                      </div>
                   </CardContent>
                </Card>
              ))}
              {activities.length === 0 && (
                <div className="col-span-2 py-10 text-center border-2 border-dashed border-slate-100 rounded-xl">
                   <p className="text-sm font-bold text-slate-400 uppercase">No active tasks assigned</p>
                </div>
              )}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-2">Career Pipeline</h3>
              <Card className="bg-white border-slate-100 rounded-2xl p-6 shadow-sm hover:border-primary-100 transition-all">
                 <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                       <Briefcase className="w-4.5 h-4.5" />
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-900 uppercase">
                         {applications.length > 0 ? 'Active Applications' : 'Market Ready'}
                       </p>
                       <p className="text-xs font-bold text-violet-600 uppercase tracking-wider">
                         {applications.length} submitted
                       </p>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 mb-6">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 text-slate-500" />
                       <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Check Marketplace</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                 </div>
                 <Button onClick={() => navigate('/student/applications')} variant="ghost" className="w-full text-xs font-bold text-slate-500 hover:text-primary-600 uppercase">
                    Open Marketplace
                 </Button>
              </Card>
           </div>
        </div>
      </div>
    </div>
  );
}
