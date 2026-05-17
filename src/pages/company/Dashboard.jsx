import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Briefcase, 
  Calendar, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { toast } from 'sonner';

// Mock chart data
const chartData = [
  { name: 'Mon', apps: 4 },
  { name: 'Tue', apps: 7 },
  { name: 'Wed', apps: 5 },
  { name: 'Thu', apps: 12 },
  { name: 'Fri', apps: 9 },
  { name: 'Sat', apps: 3 },
  { name: 'Sun', apps: 1 },
];

export default function CompanyDashboard() {
  const companyId = 'c1'; // Google Recruit
  
  const [jobs, setJobs] = React.useState([]);
  const [applications, setApplications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newJob, setNewJob] = React.useState({ title: '', status: 'Active', description: '' });

  React.useEffect(() => {
    async function loadDashboardData() {
      try {
        const [jobsData, appsData] = await Promise.all([
          api.getInternships(),
          api.getApplications(companyId)
        ]);
        
        // Filter jobs for this company
        setJobs(jobsData.filter(j => j.companyId === companyId));
        setApplications(appsData);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const handlePostInternship = async (e) => {
    e.preventDefault();
    if (!newJob.title) {
      toast.error('Please enter a job title');
      return;
    }

    try {
      const data = {
        ...newJob,
        companyId,
        companyName: 'Google Recruit',
      };
      const postedJob = await api.postInternship(data);
      setJobs([postedJob, ...jobs]);
      setIsDialogOpen(false);
      setNewJob({ title: '', status: 'Active', description: '' });
      toast.success('Internship posted successfully to the marketplace.');
    } catch (error) {
      toast.error('Failed to post internship');
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
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
            <span className="text-[10px] uppercase font-bold text-primary-600">Recruitment Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-950 uppercase leading-tight">
            Pipeline <span className="text-primary-600">Command</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">Manage your talent acquisition and internship openings across the network.</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-bold uppercase text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
              <Plus className="w-5 h-5 mr-3" />
              Post New Internship
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] rounded-[2rem] p-10">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">Post New Opportunity</DialogTitle>
            </DialogHeader>
            <form onSubmit={handlePostInternship} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-[10px] font-bold uppercase text-slate-400">Internship Title</Label>
                <Input 
                  id="title" 
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  placeholder="e.g. Backend Engineering Intern" 
                  className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-[10px] font-bold uppercase text-slate-400">Priority Status</Label>
                <select 
                  id="status"
                  value={newJob.status}
                  onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary-500/20 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Urgent">Urgent</option>
                  <option value="Reviewing">Reviewing</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-[10px] font-bold uppercase text-slate-400">Brief Description</Label>
                <Textarea 
                  id="description" 
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  placeholder="Describe the core technical focus..." 
                  className="bg-slate-50 border-slate-100 rounded-xl min-h-[100px]"
                />
              </div>
              <DialogFooter className="pt-6">
                <Button type="submit" className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase text-xs border-none shadow-lg shadow-primary-600/10">
                  Broadcast Opening
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-accent-blue" />} label="Total Applicants" value={applications.length} subtext="+0 this week" accent="bg-accent-blue" />
        <StatCard icon={<Briefcase className="text-primary-400" />} label="Open Positions" value={jobs.length} subtext="active hirings" accent="bg-primary-500" />
        <StatCard icon={<Calendar className="text-accent-orange" />} label="Interviews" value="0" subtext="No upcoming" accent="bg-accent-orange" />
        <StatCard icon={<CheckCircle2 className="text-accent-green" />} label="Hires Made" value="0" subtext="0% conversion" accent="bg-accent-green" />
      </div>

      {/* Analytics & Active Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Application Trends */}
        <Card className="lg:col-span-2 glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 uppercase">Application Trends</h3>
            <Badge variant="outline" className="text-[10px] font-bold border-slate-200 uppercase text-slate-400">Last 7 Days</Badge>
          </CardHeader>
          <CardContent className="p-8 h-[350px]">
            <div className="flex items-center justify-center h-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100">
               <p className="text-slate-300 font-bold uppercase text-[10px]">Analytics Visualization Unavailable</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions / New Candidates */}
        <Card className="glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-row items-center justify-between bg-slate-50/20">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">New Candidates</h3>
            <Clock className="w-5 h-5 text-slate-400" />
          </CardHeader>
          <CardContent className="p-0 divide-y divide-slate-100">
            {applications.length > 0 ? applications.map((app, idx) => (
              <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer text-slate-900">
                <div className="flex items-center gap-4 overflow-hidden">
                  <Avatar className="w-10 h-10 border border-slate-200 group-hover:border-primary-500/50 group-hover:scale-105 transition-all">
                    <AvatarImage src={app.studentAvatar} />
                    <AvatarFallback className="bg-primary-50 text-primary-700 font-bold">{app.studentName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden">
                    <h5 className="font-bold text-sm truncate tracking-tight group-hover:text-primary-500 transition-colors">{app.studentName}</h5>
                    <p className="text-[10px] text-slate-400 uppercase font-bold mt-0.5">{app.internshipTitle}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className="bg-emerald-500/10 text-emerald-500 border-none text-[9px] font-bold px-2 py-1 uppercase tracking-tighter">Applied</Badge>
                </div>
              </div>
            )) : (
              <div className="p-10 text-center">
                <p className="text-xs font-bold text-slate-400 uppercase">No new candidates yet</p>
              </div>
            )}
            <div className="p-6">
              <Button variant="outline" className="w-full text-[10px] font-bold text-slate-400 uppercase hover:text-slate-900 border-slate-200 hover:bg-slate-100 h-10 rounded-xl transition-all">
                View All Candidates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Job Openings */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold tracking-tight uppercase">Active Internship Openings</h3>
          <Button variant="link" className="text-primary-500 font-bold hover:text-primary-400 uppercase text-[10px]">Manage Positions</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <Card key={idx} className="glass border-slate-200/50 hover:border-primary-500/30 transition-all group p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-primary-50 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-6 h-6 text-primary-500" />
                </div>
                <Badge className={`text-[9px] font-bold uppercase border-none px-3 py-1 ${
                    job.status === 'Urgent' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'bg-primary-50 text-primary-600'
                }`}>{job.status}</Badge>
              </div>
              <h4 className="text-xl font-bold mb-6 tracking-tight group-hover:text-primary-500 transition-colors text-slate-900 leading-tight uppercase">{job.title}</h4>
              <div className="flex items-center justify-between py-5 border-t border-slate-100">
                <div>
                  <p className="text-2xl font-extrabold tracking-tighter text-slate-900">{job.applicants}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Applicants</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-extrabold tracking-tighter text-slate-900">{(job.views / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Profile Views</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6 border-slate-200 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 group-hover:shadow-lg group-hover:shadow-primary-500/20 transition-all rounded-xl h-12 font-bold text-xs uppercase">
                 View Applications
                 <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }) {
  return (
    <Card className="bg-white border-none transition-all group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 p-10 rounded-[2.5rem] relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">{icon}</div>
        <span className="text-[10px] font-bold uppercase text-slate-300">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 text-slate-950 leading-none">{value}</h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase">{subtext}</p>
      </div>
    </Card>
  );
}
