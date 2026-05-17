import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp,
  Building2,
  Calendar,
  Zap,
  ArrowUpRight,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function Applications() {
  const navigate = useNavigate();
  const studentId = localStorage.getItem('careerlink_user_id') || 's1';
  const [internships, setInternships] = React.useState([]);
  const [myApplications, setMyApplications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      try {
        const [internData, appsData] = await Promise.all([
          api.getInternships(),
          api.getApplications()
        ]);
        setInternships(internData);
        setMyApplications(appsData.filter(a => a.studentId === studentId));
      } catch (error) {
        toast.error('Failed to load opportunities');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleApply = async (internshipId) => {
    try {
      await api.applyForInternship({ studentId, internshipId });
      toast.success('Application submitted successfully!');
      
      // Update local state
      const updatedApps = await api.getApplications();
      setMyApplications(updatedApps.filter(a => a.studentId === studentId));
    } catch (error) {
      toast.error(error.message || 'Failed to submit application');
    }
  };

  const isApplied = (id) => myApplications.some(a => a.internshipId === id);

  const stats = [
    { label: 'Active Pipeline', count: myApplications.length, color: 'text-primary-600', bg: 'bg-primary-50' },
    { label: 'Interviews', count: 0, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Offers', count: 0, color: 'text-emerald-600', bg: 'bg-emerald-50' }
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/student/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-bold text-[10px] uppercase flex items-center mb-4 transition-all hover:-translate-x-1"
          >
             <ArrowLeft className="w-3 h-3 mr-1" /> Back to Dashboard
          </button>
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Career Pipeline</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Market Applications</h1>
          <p className="text-slate-500 text-base">Track your professional outreach and interview progression.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search applications..." 
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-slate-900 uppercase">Current Opportunities</h3>
              <Button variant="ghost" className="text-primary-600 font-bold text-xs uppercase tracking-wide">Filter Results</Button>
           </div>

           <div className="space-y-4">
              {internships.map((opp) => (
                <Card key={opp.id} className="group border-slate-100 bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5 transition-all duration-300 rounded-2xl cursor-pointer">
                   <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                         <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary-50 group-hover:border-primary-100 transition-all">
                               <Building2 className="w-7 h-7 text-slate-400 group-hover:text-primary-600" />
                            </div>
                            <div className="space-y-1">
                               <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{opp.title}</h4>
                               <p className="text-sm font-semibold text-slate-500">{opp.companyName} &bull; {opp.location}</p>
                               <div className="flex flex-wrap gap-2 mt-3">
                                  {(opp.skills || []).slice(0, 3).map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-500 font-bold text-[9px] uppercase tracking-wide border-none px-2.5">
                                      {skill}
                                    </Badge>
                                  ))}
                               </div>
                            </div>
                         </div>
                         <div className="flex flex-row md:flex-col items-center md:items-end gap-4">
                            {isApplied(opp.id) ? (
                              <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-[10px] uppercase px-3 py-1">Applied</Badge>
                            ) : (
                              <Badge className="bg-primary-50 text-primary-600 border-none font-bold text-[10px] uppercase px-3 py-1">Open</Badge>
                            )}
                            <Button 
                              size="icon" 
                              variant="ghost" 
                              disabled={isApplied(opp.id)}
                              onClick={() => handleApply(opp.id)}
                              className={`h-10 w-10 rounded-xl transition-all ${isApplied(opp.id) ? 'text-emerald-500' : 'hover:bg-primary-50 hover:text-primary-600'}`}
                            >
                               {isApplied(opp.id) ? <CheckCircle2 className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                            </Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                    <Zap className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight uppercase leading-tight">Mastery Certification</h3>
                 <p className="text-slate-400 font-medium text-base leading-relaxed">
                   Verified mastery certificates increase your interview conversion rate by up to 45% in the CareerLink ecosystem.
                 </p>
                 <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wide text-[10px]">
                    Boost Profile
                 </Button>
              </div>
           </Card>

           <div className="space-y-4">
              <h3 className="text-[11px] font-bold uppercase tracking-wide text-slate-400 px-4">Market Watch</h3>
              <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-6">
                 <div className="flex justify-between items-center pb-4 border-b border-slate-50">
                    <div className="flex items-center gap-3">
                       <TrendingUp className="w-4 h-4 text-emerald-500" />
                       <span className="text-xs font-bold text-slate-700">Internship Demand</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">+18%</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <Calendar className="w-4 h-4 text-primary-600" />
                       <span className="text-xs font-bold text-slate-700">Hiring Season</span>
                    </div>
                    <span className="text-xs font-bold text-primary-600">Peak</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, count, color, bg }) {
  return (
    <Card className={`border-none ${bg} rounded-2xl p-8 group hover:shadow-lg transition-all duration-500`}>
        <p className={`text-[10px] font-bold uppercase tracking-wide ${color} mb-4 opacity-60`}>{label}</p>
        <h3 className={`text-6xl font-bold tracking-tight ${color}`}>{count}</h3>
    </Card>
  );
}
