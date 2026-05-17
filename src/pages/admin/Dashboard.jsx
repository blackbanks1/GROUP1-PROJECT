import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Building2, 
  TrendingUp, 
  MoreVertical,
  Search,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Award,
  ThumbsUp,
  ThumbsDown,
  LayoutGrid,
  Star,
  User,
  Sparkles,
  UserPlus
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [stats, setStats] = React.useState(null);
  const [classes, setClasses] = React.useState([]);
  const [certs, setCerts] = React.useState([]);
  const [companies, setCompanies] = React.useState([]);
  const [opportunities, setOpportunities] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchStudent, setSearchStudent] = React.useState('');
  
  React.useEffect(() => {
    async function loadAdminData() {
      try {
        const [statsData, classesData, certsData, usersData, oppsData] = await Promise.all([
          api.getAdminStats(),
          api.getAdminClasses(),
          api.getAdminCertificates(),
          api.getUsers(),
          api.getInternships()
        ]);
        
        setStats(statsData);
        setClasses(classesData);
        setCerts(certsData);
        setCompanies(usersData.filter(u => u.role === 'company'));
        setOpportunities(oppsData);
      } catch (error) {
        toast.error('Failed to load oversight metrics');
      } finally {
        setIsLoading(false);
      }
    }
    loadAdminData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await api.approveCertificate(id);
      setCerts(certs.map(c => c.id === id ? { ...c, status: 'approved' } : c));
      toast.success('Certificate officially issued to student');
    } catch (error) {
      toast.error('Approval failed');
    }
  };

  const updateStars = async (companyId, newStars) => {
    try {
      await api.updateCompanyStars(companyId, newStars);
      setCompanies(companies.map(c => c.id === companyId ? { ...c, stars: newStars } : c));
      toast.success('Company rating updated');
    } catch (error) {
      toast.error('Rating update failed');
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pendingCerts = certs.filter(c => c.status === 'pending');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Header & Dean's Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-primary-600" />
            <span className="text-xs font-bold uppercase tracking-wide text-primary-600">Dean's Oversight Console</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 uppercase">
            School <span className="text-primary-600">Intelligence</span>
          </h1>
          <p className="text-slate-600 text-lg font-normal max-w-2xl leading-relaxed">Whole-school picture of training progress and industry partnerships.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
          <div className="relative w-full lg:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
            <Input 
              placeholder="Search Global Students..." 
              className="bg-white border-slate-200 h-14 pl-12 rounded-2xl focus-visible:ring-primary-500/20 shadow-xl shadow-slate-200/10 text-slate-900"
              value={searchStudent}
              onChange={(e) => setSearchStudent(e.target.value)}
            />
          </div>
          <Button onClick={() => toast.success('Initializing user provisioning wizard...')} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-14 px-8 font-bold text-xs uppercase shadow-xl shadow-primary-600/10 border-none w-full sm:w-auto">
            <UserPlus className="w-4 h-4 mr-2" /> Provision New User
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="Total Students" value={stats?.totalStudents || 0} subtext="Across all classes" accent="bg-blue-500" />
        <StatCard icon={<Building2 className="text-primary-600" />} label="Active Partners" value={stats?.activePartners || 0} subtext="Training companies" accent="bg-primary-600" />
        <StatCard icon={<TrendingUp className="text-emerald-500" />} label="School Mastery" value={stats?.schoolMastery || '0%'} subtext="Collective progress" accent="bg-emerald-500" />
        <StatCard icon={<Award className="text-orange-500" />} label="Certs Issued" value={stats?.certsIssued || 0} subtext="Lifetime total" accent="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Class Training Progress */}
        <Card className="lg:col-span-8 glass border-slate-200/50 overflow-hidden shadow-sm rounded-[2.5rem]">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
             <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Class Training Progress</h3>
                <p className="text-xs font-bold text-slate-500 uppercase mt-1">Whole picture of school performance</p>
             </div>
             <Button variant="ghost" size="sm" onClick={() => toast.info('Generating school-wide master analytics...')} className="text-primary-600 font-bold uppercase text-xs">Detailed Analytics</Button>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
             {classes.map((cls) => (
                <div key={cls.id} className="space-y-4 group">
                   <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary-50 transition-colors">
                            <LayoutGrid className="w-6 h-6 text-slate-500 group-hover:text-primary-600" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{cls.name}</h4>
                            <p className="text-xs font-bold text-slate-600 uppercase">Partnered with {cls.trainingPartner}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <Badge className="bg-primary-50 text-primary-600 border-none rounded-lg text-xs font-bold mb-1">{cls.progress}% Progress</Badge>
                         <p className="text-xs font-bold text-slate-500 uppercase">{cls.studentsCount} Students Enrolled</p>
                      </div>
                   </div>
                   <Progress value={cls.progress} className="h-2 rounded-full bg-slate-50" />
                </div>
             ))}
          </CardContent>
        </Card>

        {/* Opportunity Marketplace Selection */}
        <Card className="lg:col-span-4 glass border-slate-200/50 overflow-hidden shadow-sm rounded-[2.5rem]">
           <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Training Marketplace</h3>
              <p className="text-xs font-bold text-slate-500 uppercase mt-1">Active Company Offers</p>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                 {opportunities.slice(0, 4).map((opp) => (
                    <div key={opp.id} className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-tight uppercase text-sm">{opp.title}</h4>
                          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-primary-600" />
                       </div>
                       <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">{opp.description}</p>
                       <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-primary-600 uppercase bg-primary-50 px-2 py-0.5 rounded-md">{opp.companyName}</span>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{opp.status}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="p-6">
                 <Button onClick={() => toast.info('Accessing industry partner marketplace...')} className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold uppercase text-xs">Browse Marketplace</Button>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Partner Rating & Approval Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Company Rating (Stars) */}
         <Card className="glass border-slate-200/50 shadow-sm overflow-hidden rounded-[2.5rem]">
            <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-3 uppercase">
                 <Sparkles className="w-5 h-5 text-amber-500" />
                 Verified Training Partners
              </h3>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {companies.map((company) => (
                    <div key={company.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 rounded-2xl border-2 border-white shadow-sm group-hover:scale-105 transition-all">
                             <AvatarImage src={company.avatar} />
                             <AvatarFallback className="bg-slate-900 text-white font-bold">{company.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                             <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm">{company.name}</p>
                             <div className="flex items-center gap-1 mt-1">
                                {[1,2,3,4,5].map((s) => (
                                  <button key={s} onClick={() => updateStars(company.id, s)}>
                                    <Star className={`w-3 h-3 ${s <= (company.stars || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                  </button>
                                ))}
                                <span className="text-[10px] font-bold text-slate-400 ml-2">{company.stars || 0}/5</span>
                             </div>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-950 rounded-xl">
                          <MoreVertical className="w-5 h-5" />
                       </Button>
                    </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Certification Queue (DOS Signature) */}
         <Card className="glass border-slate-200/50 shadow-sm overflow-hidden rounded-[2.5rem]">
            <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20 flex flex-row items-center justify-between">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-3 uppercase">
                <Award className="w-5 h-5 text-violet-600" />
                Certification Approval
              </h3>
              <Badge className="bg-violet-50 text-violet-600 border-none font-bold text-[10px] uppercase px-3 py-1">{pendingCerts.length} Requests</Badge>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                  {pendingCerts.length > 0 ? pendingCerts.map((cert) => (
                    <div key={cert.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600 border border-violet-100">
                             <User className="w-5 h-5" />
                          </div>
                          <div>
                             <p className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm">{cert.studentName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{cert.className} &bull; Grade {cert.grade}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleApprove(cert.id)}
                            className="text-emerald-600 hover:bg-emerald-50 w-10 h-10 rounded-xl border border-slate-100 hover:border-emerald-200"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-red-500 hover:bg-red-50 w-10 h-10 rounded-xl border border-slate-100 hover:border-red-200">
                            <ThumbsDown className="w-5 h-5" />
                          </Button>
                       </div>
                    </div>
                  )) : (
                    <div className="p-20 text-center">
                       <Award className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                       <p className="text-xs font-bold text-slate-500 uppercase">No pending sign-offs</p>
                    </div>
                  )}
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }) {
  return (
    <Card className="bg-white border-none transition-all duration-500 group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/10 p-10 rounded-[2.5rem] relative hover:-translate-y-2 cursor-pointer">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">{icon}</div>
        <span className="text-xs font-bold uppercase text-slate-500 group-hover:text-slate-700 transition-colors tracking-widest">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 text-slate-900 leading-none group-hover:scale-105 origin-left transition-transform duration-500">{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{subtext}</p>
      </div>
    </Card>
  );
}
