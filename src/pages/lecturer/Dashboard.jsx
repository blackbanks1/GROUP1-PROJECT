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
  ArrowUpRight,
  Check
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LecturerDashboard() {
  const lecturerId = localStorage.getItem('careerlink_user_id') || 'l1';
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Group Creation State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  // Class Selection State
  const [isClassSelectOpen, setIsClassSelectOpen] = useState(false);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [isUpdatingClasses, setIsUpdatingClasses] = useState(false);

  const loadLecturerData = async () => {
    try {
      const selectedClasses = await api.getLecturerSelectedClasses(lecturerId);
      setClasses(selectedClasses);
      setSelectedClassIds(selectedClasses.map(c => c.id));
      if (selectedClasses.length > 0 && !selectedClass) {
        setSelectedClass(selectedClasses[0]);
      } else if (selectedClasses.length === 0) {
        setSelectedClass(null);
      }
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    loadLecturerData();
  }, []);

  React.useEffect(() => {
    if (selectedClass) {
      loadGroups();
    } else {
      setGroups([]);
    }
  }, [selectedClass]);

  const loadGroups = async () => {
    try {
      const groupsData = await api.getClassGroups(selectedClass.id);
      setGroups(groupsData);
    } catch (error) {
      console.error('Failed to load class groups', error);
    }
  };

  const handleOpenClassSelect = async () => {
    setIsClassSelectOpen(true);
    try {
      const allAvailable = await api.getLecturerAvailableClasses(lecturerId);
      setAvailableClasses(allAvailable);
    } catch (error) {
      toast.error('Failed to load available classes');
    }
  };

  const toggleClassSelection = (id) => {
    setSelectedClassIds(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const handleConfirmClasses = async () => {
    setIsUpdatingClasses(true);
    try {
      await api.updateLecturerSelectedClasses(lecturerId, selectedClassIds);
      toast.success('Supervised classes updated');
      setIsClassSelectOpen(false);
      loadLecturerData();
    } catch (error) {
      toast.error('Failed to update classes');
    } finally {
      setIsUpdatingClasses(false);
    }
  };

  const handleOpenCreateModal = async () => {
    if (!selectedClass) {
      toast.error('Please select a class first');
      return;
    }
    setIsCreateModalOpen(true);
    try {
      const students = await api.getClassStudents(selectedClass.id);
      setClassStudents(students);
    } catch (error) {
      toast.error('Failed to load students for this class');
    }
  };

  const toggleStudent = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) {
      toast.error('Group name is required');
      return;
    }
    if (selectedStudentIds.length === 0) {
      toast.error('Select at least one student');
      return;
    }

    setIsCreating(true);
    try {
      await api.createGroup({
        name: newGroupName,
        classId: selectedClass.id,
        studentIds: selectedStudentIds
      });
      toast.success(`Group "${newGroupName}" created!`);
      setIsCreateModalOpen(false);
      setNewGroupName('');
      setSelectedStudentIds([]);
      loadGroups();
    } catch (error) {
      toast.error('Failed to create group');
    } finally {
      setIsCreating(false);
    }
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
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Dialog open={isClassSelectOpen} onOpenChange={setIsClassSelectOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenClassSelect} variant="outline" className="border-slate-200 text-slate-600 rounded-2xl h-16 px-10 font-bold uppercase text-[10px] shadow-sm transition-all hover:bg-slate-50 border-2">
                <BookOpen className="w-5 h-5 mr-3" />
                Select Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-3xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase tracking-tight text-slate-900">Supervise Classes</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <Label className="text-xs font-bold uppercase text-slate-400">Available from Student Registry ({availableClasses.length})</Label>
                <ScrollArea className="h-64 rounded-xl border border-slate-100 p-2">
                  <div className="space-y-1">
                    {availableClasses.map((cls) => (
                      <div 
                        key={cls.id} 
                        onClick={() => toggleClassSelection(cls.id)}
                        className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${selectedClassIds.includes(cls.id) ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'}`}
                      >
                        <Checkbox 
                          checked={selectedClassIds.includes(cls.id)} 
                          onCheckedChange={() => toggleClassSelection(cls.id)}
                        />
                        <div className="flex-1">
                           <p className="text-sm font-bold uppercase">{cls.name}</p>
                           <p className="text-[10px] uppercase text-slate-400 font-bold">{cls.school}</p>
                        </div>
                        {selectedClassIds.includes(cls.id) && <Check className="w-4 h-4" />}
                      </div>
                    ))}
                    {availableClasses.length === 0 && (
                      <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase">No classes found in registry</div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleConfirmClasses} 
                  disabled={isUpdatingClasses}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 rounded-xl font-bold uppercase text-[10px]"
                >
                  {isUpdatingClasses ? 'Updating...' : 'Save Selection'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreateModal} className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-bold uppercase text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
                <Plus className="w-5 h-5 mr-3" />
                Create New Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-white rounded-3xl border-none shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold uppercase tracking-tight text-slate-900">Configure Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-400">Group Designation</Label>
                  <Input 
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="e.g. Alpha Project Team" 
                    className="h-12 bg-slate-50 border-slate-200 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-slate-400">Personnel Selection ({selectedStudentIds.length})</Label>
                  <ScrollArea className="h-64 rounded-xl border border-slate-100 p-2">
                    <div className="space-y-1">
                      {classStudents.map((student) => (
                        <div 
                          key={student.id} 
                          onClick={() => toggleStudent(student.id)}
                          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedStudentIds.includes(student.id) ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'}`}
                        >
                          <Checkbox 
                            checked={selectedStudentIds.includes(student.id)} 
                            onCheckedChange={() => toggleStudent(student.id)}
                            className="border-slate-300"
                          />
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar} />
                            <AvatarFallback className="text-[10px]">{student.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-semibold">{student.name}</span>
                          {selectedStudentIds.includes(student.id) && <Check className="w-4 h-4 ml-auto" />}
                        </div>
                      ))}
                      {classStudents.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-xs font-bold uppercase">No students in this class</div>
                      )}
                    </div>
                  </ScrollArea>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={handleCreateGroup} 
                  disabled={isCreating}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white h-12 rounded-xl font-bold uppercase text-[10px]"
                >
                  {isCreating ? 'Initializing...' : 'Confirm Formation'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-primary-500" />} label="Total Students" value={selectedClass?.studentsCount || 0} subtext="Across active courses" accent="bg-primary-500" />
        <StatCard icon={<LayoutGrid className="text-accent-blue" />} label="Active Groups" value={groups.length} subtext="Collaborative teams" accent="bg-accent-blue" />
        <StatCard icon={<CheckCircle2 className="text-accent-green" />} label="Submissions" value="0" subtext="Pending review" accent="bg-accent-green" />
        <StatCard icon={<Trophy className="text-accent-orange" />} label="Avg. Progress" value={`${selectedClass?.progress || 0}%`} subtext="Class performance" accent="bg-accent-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Class Selection & Groups */}
        <Card className="lg:col-span-4 glass border-slate-100 overflow-hidden shadow-sm">
           <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Class Registry</h3>
           </CardHeader>
           <CardContent className="p-4 space-y-2">
              {classes.length > 0 ? classes.map((c) => (
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
              )) : (
                <div className="p-8 text-center text-slate-400 text-[10px] font-bold uppercase">No Active Classes</div>
              )}
           </CardContent>
        </Card>

        {/* Group Management */}
        <Card className="lg:col-span-8 glass border-slate-100 overflow-hidden shadow-sm">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <div>
               <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">{selectedClass?.name || 'No Class Selected'} Groups</h3>
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
                       {group.members?.map((member, i) => (
                         <Avatar key={i} className="w-9 h-9 border-4 border-white shadow-sm">
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback className="bg-slate-100 text-[10px] font-bold">{member.name[0]}</AvatarFallback>
                         </Avatar>
                       ))}
                    </div>

                    <div className="space-y-4">
                       <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                          <span>Milestone Progress</span>
                          <span className="text-primary-600">0%</span>
                       </div>
                       <Progress value={0} className="h-1.5" />
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
