import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  TrendingUp,
  LayoutGrid,
  Award,
  BookOpen
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MOCK_OPPORTUNITIES } from '@/mocks';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    company: 'Google Cloud',
    role: 'Cloud Architecture Mastery',
    status: 'Interview',
    appliedDate: 'May 10, 2024',
    location: 'Hybrid',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GO'
  },
  {
    id: '2',
    company: 'Meta Academy',
    role: 'Performance Frontend Academy',
    status: 'In Review',
    appliedDate: 'May 12, 2024',
    location: 'Remote',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MT'
  }
];

export default function CareerHub() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-primary-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">Opportunity Hub</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950">
            Training <span className="text-primary-600">Marketplace</span>
          </h1>
          <p className="text-slate-500 text-lg font-normal max-w-2xl leading-relaxed">Browse real-world skill training programs provided by industry-leading companies.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-slate-200 text-slate-500 rounded-xl h-11 px-6 font-semibold text-sm transition-all bg-white shadow-sm hover:bg-slate-50">
             Saved Offers
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 px-6 font-semibold text-sm shadow-lg shadow-primary-600/10 transition-all hover:scale-105 border-none">
            Enrollment Tracker
          </Button>
        </div>
      </div>

      <Tabs defaultValue="explore" className="w-full">
        <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100 mb-8 inline-flex">
          <TabsTrigger value="explore" className="rounded-xl px-8 py-3 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">Browse Programs</TabsTrigger>
          <TabsTrigger value="applications" className="rounded-xl px-8 py-3 text-xs font-bold uppercase tracking-widest data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">My Enrollments</TabsTrigger>
        </TabsList>

        <TabsContent value="explore" className="space-y-8 outline-none">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 group w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
              <Input 
                placeholder="Search skills, companies, or certificates..." 
                className="bg-white border-slate-200 h-14 pl-12 rounded-2xl focus-visible:ring-primary-500/50 text-slate-900 placeholder:text-slate-400 shadow-sm"
              />
            </div>
            <Button className="h-14 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl shadow-lg shadow-primary-600/10 flex-1 lg:flex-none font-bold uppercase tracking-widest text-xs">
              Find Opportunities
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_OPPORTUNITIES.map((opp, idx) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-white border-slate-200 hover:border-primary-400 transition-all group overflow-hidden cursor-pointer relative shadow-sm rounded-3xl">
                  <CardContent className="p-8 relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                           <div className="w-full h-full rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold text-xl">
                              {opp.companyName[0]}
                           </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl group-hover:text-primary-600 transition-colors mb-1 text-slate-900">{opp.title}</h3>
                          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                            {opp.companyName} &bull; <MapPin className="w-3 h-3" /> {opp.location}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-slate-300 group-hover:text-primary-600 rounded-xl h-12 w-12 bg-slate-50">
                        <ArrowUpRight className="w-6 h-6" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                       <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{opp.description}</p>
                       
                       <div className="space-y-3">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Skills Gained</p>
                          <div className="flex flex-wrap gap-2">
                            {opp.skills.map(skill => (
                              <Badge key={skill} className="bg-slate-50 text-slate-400 border-none rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                       </div>

                       <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                             <Award className="w-4 h-4 text-primary-600" />
                             <span className="text-[10px] font-bold text-slate-950 uppercase tracking-widest">{opp.certificate}</span>
                          </div>
                          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">{opp.cost}</span>
                       </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatusMiniCard label="Active Programs" count="02" color="text-primary-600" />
            <StatusMiniCard label="Interviews" count="01" color="text-violet-600" />
            <StatusMiniCard label="Certified" count="01" color="text-emerald-600" />
          </div>

          <div className="space-y-4">
            {MOCK_APPLICATIONS.map((app, idx) => (
              <ApplicationRow key={app.id} app={app} index={idx} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatusMiniCard({ label, count, color }) {
  return (
    <Card className="bg-white border-slate-100 shadow-sm rounded-2xl p-6 flex items-center justify-between group hover:border-primary-200 transition-all">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        <h3 className={`text-3xl font-bold tracking-tight ${color}`}>{count}</h3>
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
        <BookOpen className="w-5 h-5 text-slate-300" />
      </div>
    </Card>
  );
}

function ApplicationRow({ app, index }) {
  const statusColors = {
    'Interview': 'bg-violet-50 text-violet-600',
    'In Review': 'bg-primary-50 text-primary-600',
    'Accepted': 'bg-emerald-50 text-emerald-600',
    'Rejected': 'bg-red-50 text-red-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-white border-slate-100 hover:border-primary-100 transition-all group cursor-pointer p-6 rounded-3xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:bg-white transition-all shadow-sm">
             <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">
                {app.company[0]}
             </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors leading-tight">{app.role}</h4>
            <p className="text-xs text-slate-400 font-medium">{app.company} &bull; {app.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
           <Badge className={`px-4 py-1.5 rounded-xl font-bold text-[10px] uppercase tracking-widest border-none shadow-sm ${statusColors[app.status]}`}>
             {app.status}
           </Badge>
           <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
        </div>
      </Card>
    </motion.div>
  );
}

function ChevronRight({ className }) {
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
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
