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
  Sparkles
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { MOCK_CLASSES, MOCK_OPPORTUNITIES, MOCK_USERS, MOCK_CERTIFICATES } from '@/mocks';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const [certs, setCerts] = React.useState(MOCK_CERTIFICATES);
  const [companies, setCompanies] = React.useState(MOCK_USERS.filter(u => u.role === 'company'));
  const [searchStudent, setSearchStudent] = React.useState('');
  
  const pendingCerts = certs.filter(c => c.status === 'pending');

  const handleApprove = (id) => {
    toast.success('Certificate officially issued to student');
    setCerts(certs.map(c => c.id === id ? { ...c, status: 'approved' } : c));
  };

  const updateStars = (companyId, newStars) => {
    setCompanies(companies.map(c => c.id === companyId ? { ...c, stars: newStars } : c));
    toast.success('Company rating updated');
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Header & Dean's Search */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-primary-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">Dean's Oversight Console</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            School <span className="text-primary-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-lg font-normal max-w-2xl leading-relaxed">Whole-school picture of training progress and industry partnerships.</p>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
          <Input 
            placeholder="Search Global Student Directory..." 
            className="bg-white border-slate-200 h-14 pl-12 rounded-2xl focus-visible:ring-primary-500/20 shadow-xl shadow-slate-200/10 text-slate-950"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
          />
          {searchStudent && (
            <Card className="absolute top-16 left-0 w-full z-50 rounded-2xl shadow-2xl border-slate-100 p-2 animate-in fade-in slide-in-from-top-2">
               <div className="p-4 text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase">Searching for "{searchStudent}"...</p>
               </div>
            </Card>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-blue-500" />} label="Total Students" value="1,240" subtext="Across all classes" accent="bg-blue-500" />
        <StatCard icon={<Building2 className="text-primary-600" />} label="Active Partners" value="12" subtext="Training companies" accent="bg-primary-600" />
        <StatCard icon={<TrendingUp className="text-emerald-500" />} label="School Mastery" value="74%" subtext="Collective progress" accent="bg-emerald-500" />
        <StatCard icon={<Award className="text-orange-500" />} label="Certs Issued" value="482" subtext="This semester" accent="bg-orange-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Class Training Progress */}
        <Card className="lg:col-span-8 glass border-slate-200/50 overflow-hidden shadow-sm rounded-[2.5rem]">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
             <div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900">Class Training Progress</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Whole picture of school performance</p>
             </div>
             <Button variant="ghost" size="sm" className="text-primary-600 font-bold uppercase tracking-widest text-[10px]">Detailed Analytics</Button>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
             {MOCK_CLASSES.map((cls) => (
                <div key={cls.id} className="space-y-4 group">
                   <div className="flex justify-between items-end">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary-50 transition-colors">
                            <LayoutGrid className="w-6 h-6 text-slate-400 group-hover:text-primary-600" />
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-950 group-hover:text-primary-600 transition-colors">{cls.name}</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partnered with {cls.trainingPartner}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <Badge className="bg-primary-50 text-primary-600 border-none rounded-lg text-[10px] mb-1">{cls.collectiveProgress}% Progress</Badge>
                         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{cls.studentsCount} Students Enrolled</p>
                      </div>
                   </div>
                   <Progress value={cls.collectiveProgress} className="h-2 rounded-full bg-slate-50" />
                </div>
             ))}
          </CardContent>
        </Card>

        {/* Opportunity Marketplace Selection */}
        <Card className="lg:col-span-4 glass border-slate-200/50 overflow-hidden shadow-sm rounded-[2.5rem]">
           <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-xl font-bold tracking-tight text-slate-900">Training Marketplace</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Active Company Offers</p>
           </CardHeader>
           <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                 {MOCK_OPPORTUNITIES.map((opp) => (
                    <div key={opp.id} className="p-6 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                       <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-slate-950 group-hover:text-primary-600 transition-colors leading-tight">{opp.title}</h4>
                          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600" />
                       </div>
                       <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{opp.description}</p>
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-primary-600 uppercase bg-primary-50 px-2 py-0.5 rounded-md">{opp.companyName}</span>
                          <span className="text-[10px] font-bold text-slate-400 italic">{opp.duration}</span>
                       </div>
                    </div>
                 ))}
              </div>
              <div className="p-6">
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl h-12 font-bold uppercase tracking-widest text-[10px]">Browse Marketplace</Button>
              </div>
           </CardContent>
        </Card>
      </div>

      {/* Partner Rating & Approval Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Company Rating (Stars) */}
         <Card className="glass border-slate-200/50 shadow-sm overflow-hidden rounded-[2.5rem]">
            <CardHeader className="p-8 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-3">
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
                             <p className="font-bold text-slate-950 group-hover:text-primary-600 transition-colors">{company.name}</p>
                             <div className="flex items-center gap-1 mt-1">
                                {[1,2,3,4,5].map((s) => (
                                  <button key={s} onClick={() => updateStars(company.id, s)}>
                                    <StarIcon className={`w-3 h-3 ${s <= (company.stars || 0) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                                  </button>
                                ))}
                                <span className="text-[10px] font-bold text-slate-400 ml-2">{company.stars || 0}/5</span>
                             </div>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-300 hover:text-slate-950 rounded-xl">
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
              <h3 className="text-lg font-bold tracking-tight text-slate-900 flex items-center gap-3">
                <Award className="w-5 h-5 text-violet-600" />
                Certification Approval
              </h3>
              <Badge className="bg-violet-50 text-violet-600 border-none font-bold text-[10px] uppercase">{pendingCerts.length} Requests</Badge>
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
                             <p className="font-bold text-slate-950 group-hover:text-primary-600 transition-colors">{cert.studentName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{cert.className} &bull; Grade {cert.grade}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <Button 
                            size="icon" 
                            variant="ghost" 
                            onClick={() => handleApprove(cert.id)}
                            className="text-emerald-500 hover:bg-emerald-50 w-10 h-10 rounded-xl border border-slate-100 hover:border-emerald-200"
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
                       <Award className="w-12 h-12 text-slate-100 mx-auto mb-4" />
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No pending sign-offs</p>
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
    <Card className="bg-white border-none transition-all duration-500 group overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-600/10 p-10 rounded-[2.5rem] relative hover:-translate-y-2 cursor-pointer">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500 shadow-sm">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic font-display group-hover:text-slate-600 transition-colors">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 font-display italic text-slate-950 leading-none group-hover:scale-105 origin-left transition-transform duration-500">{value}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subtext}</p>
      </div>
    </Card>
  );
}

function StarIcon({ className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}
