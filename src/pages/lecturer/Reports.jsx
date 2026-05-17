import * as React from 'react';
import { 
  FileText, 
  Send, 
  Plus, 
  CheckCircle2, 
  Clock, 
  User, 
  BookOpen,
  ChevronRight,
  Target,
  Trophy,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LecturerReports() {
  const lecturerId = 'l1';
  const [reports, setReports] = React.useState([]);
  const [students, setStudents] = React.useState([]);
  const [classes, setClasses] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newReport, setNewReport] = React.useState({ studentId: '', classId: '', grade: 'A', status: 'Finalized' });

  React.useEffect(() => {
    async function loadReportsData() {
      try {
        const [reportsData, classesData] = await Promise.all([
          api.getLecturerReports(lecturerId),
          api.getLecturerClasses(lecturerId)
        ]);
        setReports(reportsData);
        setClasses(classesData);
        
        if (classesData.length > 0) {
          const groups = await api.getClassGroups(classesData[0].id);
          const allStudents = groups.flatMap(g => g.members);
          const uniqueStudents = Array.from(new Map(allStudents.map(s => [s.id, s])).values());
          setStudents(uniqueStudents);
        }
      } catch (error) {
        toast.error('Failed to load reports data');
      } finally {
        setIsLoading(false);
      }
    }
    loadReportsData();
  }, []);

  const handleCreateReport = async (e) => {
    e.preventDefault();
    if (!newReport.studentId || !newReport.classId) return toast.error('Please select student and class');

    try {
      const student = students.find(s => s.id === newReport.studentId);
      const cls = classes.find(c => c.id === newReport.classId);
      
      const data = {
        ...newReport,
        studentName: student?.name,
        className: cls?.name,
      };
      const posted = await api.postReport(data);
      setReports([posted, ...reports]);
      setIsDialogOpen(false);
      setNewReport({ studentId: '', classId: '', grade: 'A', status: 'Finalized' });
      toast.success('Student evaluation finalized successfully!');
    } catch (error) {
      toast.error('Failed to create report');
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
    <div className="space-y-10 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Academic Records</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Evaluations & Reports</h1>
          <p className="text-slate-500 text-base font-normal">Review and finalize student performance records and institutional credits.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 px-8 font-bold text-sm shadow-xl shadow-primary-600/10 border-none transition-all uppercase">
              <Plus className="w-5 h-5 mr-2" /> New Evaluation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-10">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Post Student Evaluation</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateReport} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-slate-400">Select Student</Label>
                <select 
                  value={newReport.studentId}
                  onChange={(e) => setNewReport({...newReport, studentId: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium outline-none"
                >
                  <option value="">Choose Student...</option>
                  {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-slate-400">Course / Class</Label>
                <select 
                  value={newReport.classId}
                  onChange={(e) => setNewReport({...newReport, classId: e.target.value})}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium outline-none"
                >
                  <option value="">Choose Class...</option>
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <Label className="text-[10px] font-bold uppercase text-slate-400">Final Grade</Label>
                   <Input 
                     value={newReport.grade}
                     onChange={(e) => setNewReport({...newReport, grade: e.target.value})}
                     placeholder="A+" 
                     className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                   />
                 </div>
                 <div className="space-y-2">
                   <Label className="text-[10px] font-bold uppercase text-slate-400">Status</Label>
                   <select 
                     value={newReport.status}
                     onChange={(e) => setNewReport({...newReport, status: e.target.value})}
                     className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium outline-none"
                   >
                     <option value="Finalized">Finalized</option>
                     <option value="Draft">Draft</option>
                   </select>
                 </div>
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase text-xs border-none shadow-lg shadow-primary-600/10">
                  Finalize Evaluation
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-4">
           {reports.map((report) => (
             <Card key={report.id} className="group border-slate-100 bg-white hover:border-primary-100 transition-all rounded-[1.5rem] shadow-sm overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                   <div className="p-8 flex-1">
                      <div className="flex justify-between items-start mb-6">
                         <div className="space-y-1">
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{report.studentName}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{report.className}</p>
                         </div>
                         <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase px-3 py-1">{report.status}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-6 py-6 border-t border-slate-50">
                         <div className="space-y-1">
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Final Grade</p>
                            <p className="text-2xl font-black text-primary-600">{report.grade}</p>
                         </div>
                         <div className="w-px h-8 bg-slate-100" />
                         <div className="space-y-1">
                            <p className="text-[9px] font-bold text-slate-400 uppercase">Date Logged</p>
                            <p className="text-sm font-bold text-slate-700 uppercase">{report.date}</p>
                         </div>
                      </div>
                   </div>
                   <div className="w-full md:w-32 bg-slate-50 flex items-center justify-center group-hover:bg-primary-50 transition-colors border-l border-slate-100">
                      <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-primary-600">
                         <ArrowUpRight className="w-6 h-6" />
                      </Button>
                   </div>
                </CardContent>
             </Card>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                    <Trophy className="w-7 h-7" />
                 </div>
                 <h3 className="text-2xl font-bold tracking-tight uppercase leading-tight">Institutional Performance</h3>
                 <div className="space-y-6">
                    <div className="space-y-2">
                       <div className="flex justify-between text-[10px] font-bold uppercase text-white/50 tracking-widest">
                          <span>Report Completion</span>
                          <span>94%</span>
                       </div>
                       <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-primary-500 w-[94%]" />
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[9px] font-bold text-white/40 uppercase mb-1">Avg. Grade</p>
                          <p className="text-xl font-bold">A-</p>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <p className="text-[9px] font-bold text-white/40 uppercase mb-1">Peer Rank</p>
                          <p className="text-xl font-bold">Top 3%</p>
                       </div>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
