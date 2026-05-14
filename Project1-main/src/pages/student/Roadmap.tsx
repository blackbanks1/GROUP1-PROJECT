import { motion } from 'motion/react';
import { 
  Zap, 
  Target, 
  Map, 
  Trophy, 
  ArrowRight, 
  ChevronRight,
  Code,
  Layout,
  Lock,
  Search,
  BrainCircuit,
  Database,
  Cloud
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ROADMAPS = [
  {
    id: 'fse',
    title: 'Fullstack Engineering',
    category: 'Software Dev',
    color: 'primary',
    icon: <Code />,
    stages: [
      { label: 'Foundations', tasks: ['HTML/CSS Mastery', 'JavaScript Deep Dive'] },
      { label: 'Frontend', tasks: ['React Ecosystem', 'TypeScript Integration'] },
      { label: 'Backend', tasks: ['Node.js & Express', 'PostgreSQL Mastery'] },
      { label: 'Deployment', tasks: ['Docker & Cloud', 'CI/CD Pipelines'] }
    ]
  },
  {
    id: 'cys',
    title: 'Cybersecurity Analyst',
    category: 'Security',
    color: 'pink',
    icon: <Lock />,
    stages: [
      { label: 'Networking', tasks: ['TCP/IP Fundamentals', 'Network Security'] },
      { label: 'Hardening', tasks: ['Linux Admin', 'Server Security'] },
      { label: 'Defensive', tasks: ['SOC Fundamentals', 'Threat Hunting'] },
      { label: 'Advanced', tasks: ['Pen Testing', 'Security Compliance'] }
    ]
  },
  {
    id: 'uxd',
    title: 'Product Design',
    category: 'Design',
    color: 'cyan',
    icon: <Layout />,
    stages: [
      { label: 'Research', tasks: ['User Psychology', 'Competitive Analysis'] },
      { label: 'Visuals', tasks: ['Figma Mastery', 'Design Systems'] },
      { label: 'Testing', tasks: ['Prototypes', 'Usability Testing'] },
      { label: 'Strategy', tasks: ['Product Strategy', 'Handoff Workflow'] }
    ]
  }
];

export default function CareerRoadmap() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <BrainCircuit className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">AI Powered Insights</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Strategic <span className="text-primary-600">Roadmaps</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Architect your future with precision. Our dynamic roadmaps analyze your skills and current market demands to guide your trajectory.
          </p>
        </div>
        <Button variant="outline" className="border-slate-200 hover:bg-slate-50 h-16 px-10 rounded-2xl text-slate-900 font-bold uppercase tracking-widest text-[10px] hidden md:flex">
          Switch Domain
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Active Roadmap Visualization */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="bg-white border-slate-200 p-12 overflow-hidden relative group shadow-sm">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Map className="w-64 h-64 text-slate-900" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-16">
                 <div className="w-20 h-20 rounded-[2rem] bg-primary-600 flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <Zap className="w-10 h-10 text-white" />
                 </div>
                 <div className="space-y-1">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Fullstack Engineering</h2>
                    <div className="flex items-center gap-3">
                       <Badge className="bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-4 py-1 text-[10px] font-black uppercase tracking-widest">Active Path</Badge>
                       <span className="text-slate-400 font-bold text-sm tracking-widest uppercase">75% Complete</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-24 relative">
                {/* Connecting Line */}
                <div className="absolute left-10 top-20 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 via-primary-200 to-transparent" />
                
                {ROADMAPS[0].stages.map((stage, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-12 relative"
                  >
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-4 border-white z-20 transition-all duration-500 ${
                      idx <= 2 ? 'bg-primary-600 text-white shadow-md shadow-primary-600/10' : 'bg-slate-50 text-slate-300 border-slate-100'
                    }`}>
                      {idx < 2 ? <Trophy className="w-8 h-8" /> : idx === 2 ? <Zap className="w-8 h-8" /> : <ChevronRight className="w-8 h-8" />}
                    </div>
                    <div className="flex-1 pt-2">
                       <h3 className={`text-2xl font-bold tracking-tight mb-6 ${idx <= 2 ? 'text-slate-900' : 'text-slate-300'}`}>
                         {stage.label}
                       </h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {stage.tasks.map((task, tidx) => (
                            <div key={tidx} className={`p-5 rounded-2xl border transition-all ${
                              idx < 2 ? 'bg-primary-50/50 border-primary-200' : idx === 2 ? 'bg-white border-primary-400/30 shadow-sm' : 'bg-slate-50/50 border-slate-100'
                            }`}>
                               <div className="flex items-center justify-between">
                                  <span className={`text-sm font-bold ${idx <= 2 ? 'text-slate-700' : 'text-slate-300'}`}>{task}</span>
                                  {idx < 2 && <CheckCircle className="w-4 h-4 text-primary-600" />}
                               </div>
                            </div>
                          ))}
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar: Recommendations & Other Paths */}
        <div className="lg:col-span-4 space-y-8">
           <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">Trending Domains</h3>
              <div className="space-y-4">
                 {ROADMAPS.slice(1).map((path) => (
                   <Card key={path.id} className="bg-white border-slate-200 hover:border-primary-400 transition-all p-6 cursor-pointer group shadow-sm">
                      <div className="flex items-center gap-5">
                         <div className={`w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors text-slate-400`}>
                            {path.icon}
                         </div>
                         <div className="flex-1">
                            <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{path.title}</h4>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Strategic Path</p>
                         </div>
                         <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary-600 transition-all transform group-hover:translate-x-1" />
                      </div>
                   </Card>
                 ))}
              </div>
           </section>

           <section className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 px-4">Expert Advice</h3>
              <Card className="border-primary-100 bg-primary-50/30 p-8 relative overflow-hidden shadow-sm">
                 <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-200/20 blur-3xl" />
                 <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6 italic">
                   "Focus on the foundations of Cloud Infrastructure this month. We've seen a 45% increase in demand for junior engineers with AWS/Docker proficiency."
                 </p>
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-600" />
                    <div className="space-y-0.5">
                       <p className="text-xs font-black uppercase tracking-widest text-slate-900">AI Career Agent</p>
                       <p className="text-[10px] text-primary-600 font-bold uppercase">Real-time Analysis</p>
                    </div>
                 </div>
              </Card>
           </section>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
