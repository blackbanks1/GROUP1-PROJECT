import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mail, 
  ExternalLink,
  GraduationCap,
  BadgeCheck,
  Clock,
  ArrowUpRight,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function LecturerStudents() {
  const navigate = useNavigate();
  const lecturerId = localStorage.getItem('careerlink_user_id') || 'l1';
  const [students, setStudents] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    async function loadStudents() {
      try {
        const classes = await api.getLecturerAvailableClasses(lecturerId);
        if (classes.length > 0) {
          // Fetch students from all available classes
          const allStudentsPromises = classes.map(c => api.getClassStudents(c.id));
          const studentsArrays = await Promise.all(allStudentsPromises);
          const allStudents = studentsArrays.flat();
          
          // Unique students by ID
          const uniqueStudents = Array.from(new Map(allStudents.map(s => [s.id, s])).values());
          setStudents(uniqueStudents);
        }
      } catch (error) {
        toast.error('Failed to load student directory');
      } finally {
        setIsLoading(false);
      }
    }
    loadStudents();
  }, []);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-1">
          <button 
            onClick={() => navigate('/lecturer/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-bold text-[10px] uppercase flex items-center mb-4 transition-all hover:-translate-x-1"
          >
             <ArrowLeft className="w-3 h-3 mr-1" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Student Directory</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Class Roster</h1>
          <p className="text-slate-500 text-base font-normal">Monitor individual student progression and engagement across your assigned courses.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="group border-slate-100 bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 rounded-[2rem] overflow-hidden">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                   <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm group-hover:scale-105 transition-transform duration-500">
                      <AvatarImage src={student.avatar} />
                      <AvatarFallback className="bg-primary-50 text-primary-600 text-2xl font-bold">{student.name[0]}</AvatarFallback>
                   </Avatar>
                   <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-lg border-4 border-white shadow-lg">
                      <BadgeCheck className="w-4 h-4 text-white" />
                   </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-950 uppercase group-hover:text-primary-600 transition-colors mb-1">{student.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">ID: {student.id.toUpperCase()}</p>
                
                <div className="grid grid-cols-2 gap-4 w-full mb-8">
                   <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Attendance</p>
                      <p className="text-sm font-bold text-slate-900">94%</p>
                   </div>
                   <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Engagement</p>
                      <p className="text-sm font-bold text-emerald-600">High</p>
                   </div>
                </div>

                <div className="flex gap-2 w-full">
                  <Button variant="outline" className="flex-1 rounded-xl h-11 border-slate-200 text-xs font-bold uppercase hover:bg-slate-50">
                    <Mail className="w-3.5 h-3.5 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="icon" className="w-11 h-11 rounded-xl border-slate-200 text-slate-400 hover:text-primary-600">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filteredStudents.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
             <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
             <h4 className="font-bold text-slate-900 uppercase">No Students Found</h4>
          </div>
        )}
      </div>
    </div>
  );
}
