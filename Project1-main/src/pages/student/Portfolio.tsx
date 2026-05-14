import { motion } from 'motion/react';
import { 
  Globe, 
  Github, 
  ExternalLink, 
  Plus, 
  Code, 
  Layout, 
  Figma,
  Share2,
  Lock,
  Eye,
  Zap,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PROJECTS = [
  {
    id: '1',
    title: 'Nexus Framework',
    category: 'Architecture',
    description: 'A revolutionary design system built for high-scale enterprise applications.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&auto=format&fit=crop&q=60',
    tags: ['React', 'TS', 'Tailwind'],
    link: '#'
  },
  {
    id: '2',
    title: 'EcoVibe App',
    category: 'Mobile Design',
    description: 'Gamified sustainability tracking for local communities in East Africa.',
    image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&auto=format&fit=crop&q=60',
    tags: ['Figma', 'UX Research', 'Flutter'],
    link: '#'
  },
  {
    id: '3',
    title: 'SecureGate v2',
    category: 'Cybersecurity',
    description: 'Integrated identity management system with multi-factor neural auth.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    tags: ['Next.js', 'Rust', 'OAuth'],
    link: '#'
  }
];

export default function StudentPortfolio() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <Globe className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Universal Showcase</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Portfolio <span className="text-primary-600">Exhibit</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            This is where your vision meets reality. Showcase your architectural depth and engineering precision to global partners.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-14 w-14 border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 p-0 shadow-sm bg-white">
              <Share2 className="w-5 h-5" />
           </Button>
           <Button className="bg-primary-600 hover:bg-primary-700 h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/10 text-white">
              <Plus className="w-4 h-4 mr-3" /> Add New Project
           </Button>
        </div>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         <PortfolioStat label="Project Views" value="4.2k" />
         <PortfolioStat label="Repository Stars" value="842" />
         <PortfolioStat label="Design Commends" value="128" />
         <PortfolioStat label="Collaborations" value="12" />
      </div>

      {/* Social Verification */}
      <div className="flex flex-wrap gap-4 items-center px-4 py-8 border-y border-slate-100">
         <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mr-4">Verified Sync</h4>
         <SocialButton icon={<Github className="w-4 h-4" />} label="Github" handle="@alexrivera" connected />
         <SocialButton icon={<Figma className="w-4 h-4" />} label="Dribbble" handle="@alex.design" connected />
         <SocialButton icon={<Globe className="w-4 h-4" />} label="Personal Web" handle="rivera.arch" />
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 group hover:border-primary-400 transition-all overflow-hidden cursor-pointer h-full flex flex-col rounded-[2.5rem] shadow-sm hover:shadow-md">
               <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute top-6 right-6 h-12 w-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-primary-600 scale-90 group-hover:scale-100">
                     <ArrowUpRight className="w-6 h-6" />
                  </div>
               </div>
               <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center justify-between">
                        <Badge className="bg-primary-50 text-primary-600 border border-primary-100 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                           {project.category}
                        </Badge>
                        <div className="flex items-center gap-1.5">
                           <Zap className="w-3.5 h-3.5 text-primary-600 fill-current opacity-20" />
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold tracking-tight text-slate-950 group-hover:text-primary-600 transition-colors uppercase italic font-display">{project.title}</h3>
                     <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        {project.description}
                     </p>
                  </div>

                  <div className="pt-8 border-t border-slate-100 flex items-center justify-between">
                     <div className="flex gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{tag}</span>
                        ))}
                     </div>
                     <Button variant="ghost" className="h-8 p-0 text-slate-200 hover:text-primary-600 transition-colors">
                        <Github className="w-4 h-4" />
                     </Button>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}

        {/* Add Project Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all p-12 h-full flex flex-col items-center justify-center text-center gap-6 rounded-[2.5rem] group cursor-pointer shadow-sm">
             <div className="w-16 h-16 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:scale-110 transition-all">
                <Plus className="w-8 h-8 text-slate-300 group-hover:text-white" />
             </div>
             <div className="space-y-2">
                <h4 className="text-lg font-bold text-slate-400 group-hover:text-slate-900 transition-colors uppercase font-display italic">New Submission</h4>
                <p className="text-xs text-slate-300 font-medium uppercase tracking-widest">Share another perspective</p>
             </div>
          </Card>
        </motion.div>
      </div>

      {/* Featured Github Metrics */}
      <Card className="bg-slate-900 p-12 overflow-hidden relative rounded-[3rem] shadow-xl text-white">
         <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-transparent" />
         <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
            <div className="space-y-4">
               <h3 className="text-3xl font-bold tracking-tight font-display italic uppercase">Contribution Pulse</h3>
               <p className="text-slate-400 text-sm font-medium">42 active streaks and continuous integration pulses detected in last 30 intervals.</p>
            </div>
            <div className="flex gap-1 overflow-x-auto pb-4 lg:pb-0 w-full lg:w-auto">
               {Array.from({ length: 40 }).map((_, i) => (
                 <div 
                   key={i} 
                   className={`w-3 h-10 rounded-sm flex-shrink-0 ${
                     i % 3 === 0 ? 'bg-primary-600 opacity-60' : i % 5 === 0 ? 'bg-primary-600 opacity-20' : 'bg-primary-600'
                   }`} 
                 />
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
}

function PortfolioStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1 text-center md:text-left px-4">
       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
       <h4 className="text-3xl font-extrabold tracking-tight text-slate-950 font-display italic leading-none">{value}</h4>
    </div>
  );
}

function SocialButton({ icon, label, handle, connected = false }: { icon: any; label: string; handle: string; connected?: boolean }) {
  return (
    <Button variant="outline" className={`h-12 px-6 rounded-xl border flex items-center gap-3 transition-all bg-white ${
      connected ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-slate-200 text-slate-400 hover:text-slate-900 shadow-sm'
    }`}>
       {icon}
       <div className="text-left">
          <p className="text-[10px] font-black uppercase tracking-tighter leading-none mb-0.5">{label}</p>
          <p className="text-[9px] font-bold opacity-40 leading-none">{handle}</p>
       </div>
    </Button>
  );
}
