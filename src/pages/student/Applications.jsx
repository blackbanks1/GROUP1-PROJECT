import * as React from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  ArrowRight, 
  Building2, 
  Calendar, 
  Filter,
  Search,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MOCK_APPLICATIONS = [
  {
    id: '1',
    company: 'Google',
    role: 'UI/UX Design Intern',
    status: 'Interview',
    appliedDate: 'May 10, 2024',
    location: 'Remote',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=GO'
  },
  {
    id: '2',
    company: 'Stripe',
    role: 'Frontend Engineer',
    status: 'In Review',
    appliedDate: 'May 12, 2024',
    location: 'Dublin, IE',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=ST'
  },
  {
    id: '3',
    company: 'Meta',
    role: 'Product Analytics',
    status: 'Accepted',
    appliedDate: 'April 28, 2024',
    location: 'Menlo Park, CA',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=MT'
  },
  {
    id: '4',
    company: 'Amazon',
    role: 'Cloud Intern',
    status: 'Rejected',
    appliedDate: 'April 15, 2024',
    location: 'Seattle, WA',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=AM'
  }
];

export default function MyApplications() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary-600" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">Application Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-display text-slate-950 uppercase italic leading-tight">
            My <span className="text-primary-600">Applications</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
            Monitor your professional outreach and track candidacy status across global partners.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="text-slate-400 border-slate-200 hover:bg-slate-50 rounded-2xl h-16 px-10 font-bold text-xs uppercase tracking-widest transition-all bg-white shadow-sm">
             Drafts (02)
           </Button>
           <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-10 rounded-2xl shadow-xl shadow-primary-600/10 font-black uppercase tracking-widest text-[10px] transition-all text-white border-none hover:scale-105">
             New Pipeline
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatusSummary label="Total Pipeline" count="12" color="bg-slate-100" />
        <StatusSummary label="Active Review" count="05" color="bg-primary-50" textColor="text-primary-600" />
        <StatusSummary label="Interviews" count="02" color="bg-primary-100" textColor="text-primary-700" />
        <StatusSummary label="Placement" count="01" color="bg-primary-600" textColor="text-primary-800" />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <TabsList className="bg-slate-50 border border-slate-200 h-14 p-1.5 rounded-2xl">
              {['all', 'review', 'interview', 'accepted', 'rejected'].map((tab) => (
                <TabsTrigger 
                  key={tab} 
                  value={tab} 
                  className="rounded-xl px-6 h-full font-bold text-[10px] uppercase tracking-widest data-[state=active]:bg-primary-600 data-[state=active]:text-white transition-all text-slate-500"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="relative w-full lg:w-96 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                <Input placeholder="Filter applications..." className="bg-slate-50 border-slate-200 h-14 pl-12 rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-900 placeholder:text-slate-400" />
            </div>
        </div>

        <TabsContent value="all" className="space-y-4 outline-none">
          {MOCK_APPLICATIONS.map((app, idx) => (
            <ApplicationCard key={app.id} app={app} index={idx} />
          ))}
        </TabsContent>

        <TabsContent value="review" className="space-y-4 outline-none">
          {MOCK_APPLICATIONS.filter(a => a.status === 'In Review').map((app, idx) => (
            <ApplicationCard key={app.id} app={app} index={idx} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatusSummary({ label, count, color, textColor = 'text-slate-900' }: { label; count; color; textColor? }) {
  return (
    <Card className={`bg-white border-slate-100 overflow-hidden relative shadow-sm hover:shadow-md transition-all rounded-[2rem] border-none group`}>
      <div className={`absolute top-0 left-0 w-full h-1.5 ${color}`} />
      <CardContent className="p-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-4 group-hover:text-primary-600 transition-colors font-display italic">{label}</p>
        <h3 className={`text-6xl font-bold tracking-tighter font-display italic ${textColor}`}>{count}</h3>
      </CardContent>
    </Card>
  );
}

function ApplicationCard({ app, index }: { app; index; key?.Key }) {
  const statusColors = {
    'Interview': 'bg-primary-50 text-primary-600 border-primary-200',
    'In Review': 'bg-slate-50 text-slate-600 border-slate-200',
    'Accepted': 'bg-emerald-50 text-emerald-600 border-emerald-200',
    'Rejected': 'bg-red-50 text-red-600 border-red-200'
  };

  const StatusIcon = {
    'Interview': <Calendar className="w-4 h-4" />,
    'In Review': <Clock className="w-4 h-4" />,
    'Accepted': <CheckCircle2 className="w-4 h-4" />,
    'Rejected': <XCircle className="w-4 h-4" />
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="bg-white border-none hover:shadow-xl hover:shadow-primary-600/5 transition-all group cursor-pointer overflow-hidden p-8 rounded-[2.5rem] shadow-sm relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 relative z-10">
          <div className="flex items-center gap-6 flex-1">
             <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center group-hover:bg-white group-hover:border-primary-100 transition-all shadow-sm">
                <img src={app.logo} alt={app.company} className="w-full h-full rounded-xl object-cover" />
             </div>
             <div className="space-y-1">
                <h4 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-primary-600 transition-colors leading-tight">{app.role}</h4>
                <div className="flex items-center gap-4 text-slate-400 text-sm font-medium">
                   <span className="flex items-center gap-2"><Building2 className="w-4 h-4" /> {app.company}</span>
                   <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {app.location}</span>
                </div>
             </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 lg:justify-end">
             <div className="text-right hidden lg:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Timeline</p>
                <p className="text-sm font-semibold text-slate-600">{app.appliedDate}</p>
             </div>
             <div className="w-px h-10 bg-slate-100 hidden lg:block" />
             <Badge className={`h-12 px-6 rounded-xl font-semibold text-sm border flex items-center gap-2 shadow-sm transition-transform active:scale-95 ${statusColors[app.status]}`}>
               {StatusIcon[app.status]}
               {app.status}
             </Badge>
             <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl bg-white text-slate-400 group-hover:text-white group-hover:bg-primary-600 group-hover:border-primary-600 border-slate-200 transition-all shadow-sm hover:scale-110">
                <ChevronRight className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
