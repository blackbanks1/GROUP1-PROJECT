import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  ExternalLink, 
  Github, 
  Plus, 
  Code, 
  Layout, 
  Database, 
  Smartphone,
  Eye,
  MessageSquare,
  Share2,
  TrendingUp,
  Award,
  X,
  Camera,
  Check
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function Portfolio() {
  const { id } = useParams();
  const studentId = id || localStorage.getItem('careerlink_user_id') || 's1';
  const [user, setUser] = React.useState(null);
  const [projects, setProjects] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newProject, setNewProject] = React.useState({ title: '', description: '', tags: '', image: '' });

  React.useEffect(() => {
    async function loadPortfolio() {
      try {
        const [userData, projectData] = await Promise.all([
          api.getUser(studentId),
          api.getStudentProjects(studentId)
        ]);
        setUser(userData);
        setProjects(projectData);
      } catch (error) {
        toast.error('Failed to load portfolio details');
      } finally {
        setIsLoading(false);
      }
    }
    loadPortfolio();
  }, [studentId]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return toast.error('Project title is required');

    try {
      const data = {
        ...newProject,
        studentId,
        tags: newProject.tags.split(',').map(t => t.trim()).filter(t => t),
        image: newProject.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
      };
      const posted = await api.postProject(data);
      setProjects([posted, ...projects]);
      setIsDialogOpen(false);
      setNewProject({ title: '', description: '', tags: '', image: '' });
      toast.success('Project added to your portfolio!');
    } catch (error) {
      toast.error('Failed to add project');
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
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Public Showcase</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">{user?.name}'s Portfolio</h1>
          <p className="text-slate-500 text-base">Verified technical proof of your skills and industry contributions.</p>
        </div>
        <div className="flex gap-3">
          {user?.github && (
            <Button 
              variant="outline" 
              onClick={() => window.open(`https://${user.github.replace('https://', '')}`, '_blank')}
              className="border-slate-200 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl h-12 px-6 font-bold text-sm transition-all uppercase"
            >
              <Github className="w-5 h-5 mr-2" /> View GitHub
            </Button>
          )}

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 px-8 font-bold text-sm shadow-xl shadow-primary-600/10 border-none transition-all uppercase">
                <Plus className="w-5 h-5 mr-2" /> Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] rounded-[2rem] p-10">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-2xl font-bold uppercase tracking-tight">New Technical Submission</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddProject} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400">Project Title</Label>
                  <Input 
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="e.g. Distributed Ledger System" 
                    className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400">Stack (comma separated)</Label>
                  <Input 
                    value={newProject.tags}
                    onChange={(e) => setNewProject({...newProject, tags: e.target.value})}
                    placeholder="React, Node.js, AWS" 
                    className="h-12 bg-slate-50 border-slate-100 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold uppercase text-slate-400">Project Overview</Label>
                  <Textarea 
                    value={newProject.description}
                    onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                    placeholder="Describe the architectural complexity..." 
                    className="bg-slate-50 border-slate-100 rounded-xl min-h-[100px]"
                  />
                </div>
                <DialogFooter className="pt-6">
                  <Button type="submit" className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold uppercase text-xs border-none shadow-lg shadow-primary-600/10">
                    Deploy to Portfolio
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, idx) => (
                <Card key={idx} className="group border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 cursor-pointer">
                   <div className="h-56 relative overflow-hidden">
                      <img src={project.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={project.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
                         <div className="flex gap-2">
                            {project.tags.map(tag => (
                              <Badge key={tag} className="bg-white/10 backdrop-blur-md text-white border-white/20 font-bold text-[9px] uppercase tracking-wide">
                                {tag}
                              </Badge>
                            ))}
                         </div>
                      </div>
                   </div>
                   <CardContent className="p-8">
                      <h3 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-primary-600 transition-colors uppercase mb-4 truncate">
                         {project.title}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 line-clamp-3">{project.description}</p>
                      
                      <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-4 text-slate-400">
                            <div className="flex items-center gap-1.5">
                               <Eye className="w-4 h-4" />
                               <span className="text-[10px] font-bold">{project.stats.views}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                               <MessageSquare className="w-4 h-4" />
                               <span className="text-[10px] font-bold">{project.stats.comments}</span>
                            </div>
                         </div>
                         <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600">
                            <ExternalLink className="w-5 h-5" />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}

              <div 
                onClick={() => setIsDialogOpen(true)}
                className="p-20 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer bg-slate-50/20 h-full"
              >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                      <Plus className="w-8 h-8 text-slate-200 group-hover:text-white transition-transform group-hover:rotate-90" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-400 group-hover:text-slate-900 transition-colors uppercase">New Submission</h4>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-primary-600 border-none rounded-[2.5rem] p-10 text-white shadow-2xl shadow-primary-600/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/20">
                    <TrendingUp className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight uppercase">Contribution Pulse</h3>
                 <div className="space-y-6">
                    <StatItem label="Market Visibility" value="High" />
                    <StatItem label="Skill Mastery" value={`${Math.min(100, 70 + projects.length * 5)}%`} />
                    <StatItem label="Peer Validation" value={`Top ${Math.max(1, 15 - projects.length)}%`} />
                 </div>
              </div>
           </Card>

           <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-4">Portfolio Analytics</h3>
              <div className="space-y-4">
                 <Card className="p-6 bg-white border-slate-100 rounded-2xl shadow-sm group hover:border-primary-100 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                          <Share2 className="w-6 h-6" />
                       </div>
                       <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Network Reach</p>
                          <h4 className="text-3xl font-bold tracking-tight text-slate-950 leading-none">{(projects.length * 1.2).toFixed(1)}k</h4>
                       </div>
                    </div>
                 </Card>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="space-y-1">
       <p className="text-[10px] font-bold text-white/50 uppercase tracking-wide">{label}</p>
       <h4 className="text-3xl font-bold tracking-tight text-white leading-none uppercase">{value}</h4>
    </div>
  );
}
