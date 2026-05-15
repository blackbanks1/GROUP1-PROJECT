import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  FileText, 
  Plus, 
  Search, 
  CheckCircle2, 
  Clock,
  LayoutGrid,
  ChevronRight,
  MoreVertical,
  PlusCircle,
  FolderPlus,
  UserPlus,
  Trophy,
  Activity,
  Calendar,
  Layers,
  Sparkles,
  Award,
  ShieldCheck
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TagInput } from "@/components/ui/tag-input";
import { 
  MOCK_CLASSES, 
  MOCK_GROUPS, 
  MOCK_ACTIVITIES,
  MOCK_CERTIFICATES 
} from '@/mocks';
import { toast } from 'sonner';

export default function LecturerDashboard() {
  const [activeClass, setActiveClass] = useState(MOCK_CLASSES[0]);
  const [selectedGroup, setSelectedGroup] = useState(MOCK_GROUPS[0]);
  const [isAddStudentsOpen, setIsAddStudentsOpen] = useState(false);
  const [isAddActivitiesOpen, setIsAddActivitiesOpen] = useState(false);
  const [isNominateOpen, setIsNominateOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newTags, setNewTags] = useState([]);

  const currentGroups = MOCK_GROUPS.filter(g => g.classId === activeClass.id);
  const currentActivities = MOCK_ACTIVITIES.filter(a => a.groupId === selectedGroup?.id);
  
  const sortedStudents = selectedGroup 
    ? [...selectedGroup.students].sort((a, b) => b.progress - a.progress) 
    : [];

  const calculateGrade = (progress = 85) => {
    if (progress >= 90) return 'A';
    if (progress >= 80) return 'B';
    if (progress >= 70) return 'C';
    return 'D';
  };

  const handleNominate = () => {
    toast.success(`Certificate nomination for ${selectedStudent.name} submitted to Admin (Grade: ${calculateGrade(selectedStudent.progress)})`);
    setIsNominateOpen(false);
  };

  const handleBulkAddStudents = () => {
    if (newTags.length === 0) return;
    toast.success(`Successfully added ${newTags.length} students to ${selectedGroup.name}`);
    setNewTags([]);
    setIsAddStudentsOpen(false);
  };

  const handleBulkAddActivities = () => {
    if (newTags.length === 0) return;
    toast.success(`Assigned ${newTags.length} new activities to ${selectedGroup.name}`);
    setNewTags([]);
    setIsAddActivitiesOpen(false);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-violet-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-violet-600">Lecturer Workspace</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            Unified <span className="text-violet-600">Classroom</span>
          </h1>
          <p className="text-slate-500 text-lg font-normal max-w-2xl leading-relaxed">Manage your classes, groups, and track student progress in one place.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-500 rounded-xl h-11 px-6 font-semibold text-sm transition-all bg-white shadow-sm hover:bg-slate-50">
            <Layers className="w-4 h-4 mr-2" /> Class Reports
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl h-11 px-6 font-semibold text-sm shadow-lg shadow-violet-600/10 transition-all hover:scale-105 border-none">
            <Plus className="w-4 h-4 mr-2" /> Create New Class
          </Button>
        </div>
      </div>

      {/* Class Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLASSES.map((cls) => (
          <button 
            key={cls.id}
            onClick={() => {
                setActiveClass(cls);
                setSelectedGroup(MOCK_GROUPS.find(g => g.classId === cls.id));
            }}
            className={`group text-left p-6 rounded-[2rem] border-2 transition-all duration-500 relative overflow-hidden ${
              activeClass.id === cls.id 
                ? 'bg-violet-600 border-violet-600 shadow-xl shadow-violet-600/20' 
                : 'bg-white border-slate-100 hover:border-violet-200 hover:shadow-lg'
            }`}
          >
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${
                activeClass.id === cls.id ? 'bg-white/20 text-white' : 'bg-violet-50 text-violet-600 group-hover:rotate-12'
              }`}>
                <LayoutGrid className="w-6 h-6" />
              </div>
              <h3 className={`text-xl font-bold tracking-tight mb-1 transition-colors ${
                activeClass.id === cls.id ? 'text-white' : 'text-slate-950'
              }`}>{cls.name}</h3>
              <p className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                activeClass.id === cls.id ? 'text-white/70' : 'text-slate-400'
              }`}>{cls.code} &bull; {cls.studentsCount} Students</p>
            </div>
            {activeClass.id === cls.id && (
              <Sparkles className="absolute top-4 right-4 w-5 h-5 text-white/40 animate-pulse" />
            )}
          </button>
        ))}
      </div>

      {/* Main Workspace Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Groups Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-violet-500" />
                Active Groups
            </h2>
            <Button variant="ghost" size="sm" className="text-violet-600 hover:bg-violet-50 rounded-lg font-bold text-[10px] uppercase tracking-widest">
                <FolderPlus className="w-4 h-4 mr-1.5" /> New Group
            </Button>
          </div>

          <div className="space-y-3">
            {currentGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className={`w-full p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group/card ${
                  selectedGroup?.id === group.id 
                    ? 'bg-white border-violet-200 shadow-md ring-1 ring-violet-100' 
                    : 'bg-slate-50/50 border-transparent hover:bg-white hover:border-slate-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    selectedGroup?.id === group.id ? 'bg-violet-600 text-white' : 'bg-white text-slate-400 group-hover/card:text-violet-500'
                  }`}>
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-slate-950 text-sm group-hover/card:text-violet-600 transition-colors">{group.name}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{group.students.length} Members</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-all ${
                  selectedGroup?.id === group.id ? 'text-violet-600 translate-x-1' : 'text-slate-300 opacity-0 group-hover/card:opacity-100'
                }`} />
              </button>
            ))}
          </div>
        </div>

        {/* Group Details & Activities Panel */}
        <Card className="lg:col-span-8 glass border-slate-200/50 shadow-2xl rounded-[2.5rem] overflow-hidden">
          {selectedGroup ? (
            <div className="divide-y divide-slate-100">
              {/* Panel Header */}
              <div className="p-8 bg-slate-50/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                   <h3 className="text-2xl font-bold text-slate-950 tracking-tight">{selectedGroup.name} Workspace</h3>
                   <div className="flex items-center gap-3">
                      <Badge variant="outline" className="rounded-full border-slate-200 text-slate-500 font-bold text-[10px] uppercase px-3 py-1 bg-white">
                        {activeClass.name}
                      </Badge>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Modified 2h ago</span>
                   </div>
                </div>
                <div className="flex gap-2">
                   {/* Bulk Add Students Dialog */}
                   <Dialog open={isAddStudentsOpen} onOpenChange={setIsAddStudentsOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-[10px] uppercase tracking-widest h-10 px-4 hover:border-violet-200 hover:text-violet-600">
                          <UserPlus className="w-4 h-4 mr-2" /> Add Students
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-violet-600" />
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">Add Students</DialogTitle>
                          <DialogDescription className="text-slate-500">Type names and press Enter to add them to this group.</DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                           <TagInput 
                             placeholder="Student name..." 
                             tags={newTags} 
                             setTags={setNewTags} 
                           />
                        </div>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => { setIsAddStudentsOpen(false); setNewTags([]); }}>Cancel</Button>
                          <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8" onClick={handleBulkAddStudents}>Save Members</Button>
                        </DialogFooter>
                      </DialogContent>
                   </Dialog>

                   <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-10 px-4 font-bold text-[10px] uppercase tracking-widest">
                      <MessageCircle className="w-4 h-4 mr-2" /> Group Chat
                   </Button>
                </div>
              </div>

              {/* Members Preview / Leaderboard */}
              <div className="p-8">
                 <div className="flex items-center justify-between mb-8">
                    <div>
                       <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Performance Leaderboard</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Arranged by progress percentage</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Active Tracking</span>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    {sortedStudents.map((student, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-violet-100 hover:shadow-xl hover:shadow-violet-600/5 transition-all group/member">
                         <div className="flex items-center gap-4 flex-1">
                            <div className="relative">
                               <Avatar className="w-12 h-12 border-2 border-white shadow-sm group-hover/member:scale-105 transition-transform duration-500">
                                  <AvatarFallback className={`text-xs font-bold ${
                                    i === 0 ? 'bg-amber-100 text-amber-600' : 
                                    i === 1 ? 'bg-slate-100 text-slate-400' :
                                    i === 2 ? 'bg-orange-50 text-orange-400' : 'bg-slate-50 text-slate-400'
                                  }`}>
                                      {i === 0 ? '🏆' : student.name[0]}
                                  </AvatarFallback>
                               </Avatar>
                               {i < 3 && (
                                 <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-50">
                                    <span className="text-[8px] font-black text-slate-900">{i + 1}</span>
                                 </div>
                               )}
                            </div>
                            <div className="min-w-0 flex-1 max-w-[200px]">
                               <p className="font-bold text-slate-950 truncate group-hover/member:text-violet-600 transition-colors">{student.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rank #{i + 1}</p>
                            </div>
                            
                            <div className="flex-1 px-8 hidden md:block">
                               <div className="flex justify-between items-end mb-2">
                                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Mastery Level</span>
                                  <span className="text-xs font-black text-slate-950 italic">{student.progress}%</span>
                               </div>
                               <Progress value={student.progress} className={`h-1.5 rounded-full ${
                                 student.progress > 80 ? 'bg-emerald-500' : 
                                 student.progress > 50 ? 'bg-violet-500' : 'bg-orange-500'
                               }`} />
                            </div>
                         </div>
                         
                         <div className="flex items-center gap-2">
                            <Badge variant="outline" className="hidden lg:flex rounded-full border-slate-100 text-slate-400 font-bold text-[9px] uppercase px-3 py-1">
                               {calculateGrade(student.progress)} Grade
                            </Badge>
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              onClick={() => {
                                setSelectedStudent(student);
                                setIsNominateOpen(true);
                              }}
                              className="h-10 w-10 rounded-xl text-slate-300 hover:text-violet-600 hover:bg-violet-50 transition-all active:scale-90"
                            >
                               <Award className="w-5 h-5" />
                            </Button>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Nomination Modal */}
              <Dialog open={isNominateOpen} onOpenChange={setIsNominateOpen}>
                <DialogContent className="sm:max-w-[400px] rounded-3xl border-none shadow-2xl overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-violet-600" />
                   <DialogHeader className="p-2">
                      <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                         <Award className="w-6 h-6 text-violet-600" />
                         Issue Certificate
                      </DialogTitle>
                      <DialogDescription className="text-slate-500 font-medium">
                         Nominate <span className="text-violet-600 font-bold">{selectedStudent}</span> for class completion.
                      </DialogDescription>
                   </DialogHeader>
                   <div className="py-8 space-y-6">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Calculated Grade</span>
                            <Badge className="bg-violet-600 text-white border-none font-bold text-lg px-4 py-1">{calculateGrade()}</Badge>
                         </div>
                         <div className="space-y-2">
                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                               <span>Activity Progress</span>
                               <span>85% avg</span>
                            </div>
                            <Progress value={85} className="h-1.5 bg-white" />
                         </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-violet-50/50 border border-violet-100">
                         <ShieldCheck className="w-5 h-5 text-violet-600" />
                         <p className="text-[10px] font-bold text-violet-700 leading-tight">This will be sent to Admin for final verification and issuance.</p>
                      </div>
                   </div>
                   <DialogFooter className="p-2">
                      <Button variant="ghost" onClick={() => setIsNominateOpen(false)}>Cancel</Button>
                      <Button onClick={handleNominate} className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8 font-bold uppercase tracking-widest text-[10px]">Submit to Admin</Button>
                   </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Activities Management */}
              <div className="p-8 space-y-8">
                 <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Group Activities</h4>
                    
                    {/* Bulk Add Activities Dialog */}
                    <Dialog open={isAddActivitiesOpen} onOpenChange={setIsAddActivitiesOpen}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-violet-600 font-bold text-[10px] uppercase tracking-widest hover:bg-violet-50">
                          <PlusCircle className="w-4 h-4 mr-1.5" /> Assign Task
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px] rounded-3xl border-none shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-violet-600" />
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">New Activities</DialogTitle>
                          <DialogDescription className="text-slate-500">Press Enter after each task name to bulk assign activities.</DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                           <TagInput 
                             placeholder="Activity name (e.g. Design Spec)..." 
                             tags={newTags} 
                             setTags={setNewTags} 
                           />
                        </div>
                        <DialogFooter>
                          <Button variant="ghost" onClick={() => { setIsAddActivitiesOpen(false); setNewTags([]); }}>Cancel</Button>
                          <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-8" onClick={handleBulkAddActivities}>Assign Tasks</Button>
                        </DialogFooter>
                      </DialogContent>
                   </Dialog>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentActivities.map((activity) => (
                      <div key={activity.id} className="p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-violet-600/5 hover:border-violet-100 transition-all duration-500 group/activity">
                         <div className="flex justify-between items-start mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover/activity:bg-violet-600 group-hover/activity:text-white transition-all duration-500">
                               <Activity className="w-5 h-5" />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-slate-900">
                               <MoreVertical className="w-4 h-4" />
                            </Button>
                         </div>
                         <h5 className="font-bold text-slate-900 group-hover/activity:text-violet-600 transition-colors mb-4">{activity.name}</h5>
                         
                         <div className="space-y-4">
                            <div className="flex justify-between items-end">
                               <div className="flex items-center gap-1.5 text-slate-400">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span className="text-[10px] font-bold uppercase tracking-wider">{activity.dueDate}</span>
                               </div>
                               <span className="text-xs font-black text-slate-900 italic">{activity.progress}%</span>
                            </div>
                            <Progress value={activity.progress} className="h-2 rounded-full bg-slate-100" />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          ) : (
            <div className="h-[600px] flex flex-col items-center justify-center p-12 text-center">
               <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                  <LayoutGrid className="w-10 h-10 text-slate-200" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No Group Selected</h3>
               <p className="text-sm text-slate-400 max-w-xs leading-relaxed">Select a group from the left panel to manage students and track activities.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
