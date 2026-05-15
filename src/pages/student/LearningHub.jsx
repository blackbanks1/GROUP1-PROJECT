import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Search, 
  Star, 
  Bookmark, 
  Trophy,
  ArrowRight,
  Code2,
  Brush,
  Database,
  Terminal,
  Brain,
  Video
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const COURSES = [
  {
    id: '1',
    title: 'Advanced React Architecture',
    instructor: 'David Khourshid',
    duration: '12h 45m',
    rating: '4.9',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    tags: ['React', 'Patterns', 'Scalability']
  },
  {
    id: '2',
    title: 'UI Design for Future Tech',
    instructor: 'Sarah Drasner',
    duration: '8h 20m',
    rating: '4.8',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800&auto=format&fit=crop&q=60',
    tags: ['UI/UX', 'Figma', 'Strategy']
  },
  {
    id: '3',
    title: 'Mastering Cybersecurity SOC',
    instructor: 'Ken Thompson',
    duration: '24h 10m',
    rating: '5.0',
    category: 'Security',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
    tags: ['SOC', 'Network', 'Defense']
  },
  {
    id: '4',
    title: 'Blockchain for Enterprise',
    instructor: 'Vitalik Buterin',
    duration: '15h 30m',
    rating: '4.7',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&auto=format&fit=crop&q=60',
    tags: ['Web3', 'Solidity', 'Architecture']
  }
];

export default function LearningHub() {
  return (
    <div className="space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-10 border-b border-slate-100">
        <div className="space-y-6">
          <div className="flex items-center gap-4 text-primary-600">
             <div className="p-3 bg-primary-50 rounded-2xl border border-primary-100 shadow-sm">
                <BookOpen className="w-6 h-6" />
             </div>
             <span className="text-[11px] uppercase font-black tracking-[0.5em] italic font-display">Intelligence Terminal</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter font-display text-slate-950 uppercase italic leading-[0.85]">
            Evolution <br /><span className="text-primary-600 underline decoration-slate-950/5 underline-offset-[15px]">Hub</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">
            Upgrade your capabilities with industry-certified paths designed by world-class leaders and top technical creators.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="text-slate-400 hover:text-slate-950 h-16 px-10 border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-white transition-all shadow-sm">
              My Library (14)
           </Button>
           <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-12 rounded-2xl shadow-xl shadow-primary-600/10 font-black uppercase tracking-widest text-[10px] group text-white border-none hover:scale-105 active:scale-95">
              Sync Learning
              <Play className="w-4 h-4 ml-3 fill-current transition-transform group-hover:scale-125" />
           </Button>
        </div>
      </div>

      {/* Search & Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 h-24 bg-white border border-slate-100 rounded-3xl flex items-center px-10 group focus-within:border-primary-400 focus-within:shadow-2xl focus-within:shadow-primary-600/5 transition-all shadow-sm">
           <Search className="w-8 h-8 text-slate-200 group-focus-within:text-primary-600 transition-colors mr-10" />
           <Input 
             placeholder="What do you want to master today? (e.g. System Architecture, SOC Analysis)" 
             className="bg-transparent border-none focus-visible:ring-0 text-2xl placeholder:text-slate-200 text-slate-950 font-medium font-display italic" 
           />
        </div>
        <div className="h-24 bg-white border border-slate-100 rounded-3xl flex items-center justify-center gap-5 group cursor-pointer hover:bg-primary-50 transition-all shadow-sm">
           <div className="w-12 h-12 bg-yellow-50 rounded-2xl flex items-center justify-center border border-yellow-100">
              <Trophy className="w-7 h-7 text-yellow-500" />
           </div>
           <span className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-950 font-display">Leaderboard</span>
        </div>
      </div>

      {/* Learning Path Categories */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <CategoryCard icon={<Code2 />} label="Engineering" active />
        <CategoryCard icon={<Brush />} label="Creative" />
        <CategoryCard icon={<Database />} label="Data Science" />
        <CategoryCard icon={<Terminal />} label="Security" />
        <CategoryCard icon={<Brain />} label="AI / ML" />
        <CategoryCard icon={<Video />} label="Media" />
      </div>

      {/* Featured Courses */}
      <section className="space-y-8">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-2xl font-bold font-display tracking-tight text-slate-950 uppercase italic">Handpicked for your roadmap</h3>
           <Button variant="ghost" className="text-primary-600 font-bold text-[10px] uppercase tracking-widest">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {COURSES.map((course, idx) => (
             <motion.div
               key={course.id}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: idx * 0.1 }}
             >
               <Card className="bg-white border-none group hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 overflow-hidden cursor-pointer h-full flex flex-col shadow-sm rounded-[2.5rem] relative hover:-translate-y-2">
                  <div className="aspect-video relative overflow-hidden text-white m-4 rounded-[2rem]">
                     <img 
                       src={course.image} 
                       alt={course.title} 
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                     <div className="absolute top-4 right-4 h-12 w-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white/60 hover:text-white hover:bg-primary-600 transition-all duration-300">
                        <Bookmark className="w-5 h-5" />
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500 border-4 border-white/20">
                           <Play className="w-6 h-6 fill-current" />
                        </div>
                     </div>
                  </div>
                  <CardContent className="px-8 pb-8 flex-1 flex flex-col">
                     <div className="flex items-center justify-between mb-6">
                        <Badge className="bg-primary-50 text-primary-600 border border-primary-100 font-black text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300">
                           {course.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-yellow-500 font-bold text-xs bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100 group-hover:rotate-3 transition-transform">
                           <Star className="w-3.5 h-3.5 fill-current" /> {course.rating}
                        </div>
                     </div>
                     <h4 className="font-bold text-2xl mb-4 text-slate-950 group-hover:text-primary-600 transition-colors duration-300 leading-tight italic uppercase font-display">
                        {course.title}
                     </h4>
                     <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 font-display italic group-hover:text-slate-600 transition-colors">{course.instructor}</p>
                     
                     <div className="mt-auto flex items-center justify-between pt-8 border-t border-slate-50">
                        <div className="flex items-center gap-2 text-slate-300 font-black text-[9px] uppercase tracking-[0.2em] group-hover:text-slate-500 transition-colors">
                           <Clock className="w-4 h-4 text-primary-600/50" /> {course.duration}
                        </div>
                        <Button variant="ghost" className="h-10 px-6 text-primary-600 hover:text-white hover:bg-primary-600 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-90">
                           Resume <ArrowRight className="w-3.5 h-3.5 ml-2" />
                        </Button>
                     </div>
                  </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Progress Section */}
      <Card className="bg-slate-950 p-16 overflow-hidden relative rounded-[4rem] shadow-2xl text-white border-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
        
        <div className="flex flex-col lg:flex-row items-center gap-20 relative z-10">
           <div className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-primary-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="w-56 h-56 rounded-full border-[1.5rem] border-white/5 flex items-center justify-center relative bg-slate-950 shadow-inner">
                 <span className="text-6xl font-black font-display text-white italic">48%</span>
              </div>
              <svg className="absolute inset-0 w-full h-full -rotate-90 group-hover:scale-105 transition-transform duration-700">
                 <circle 
                   cx="112" cy="112" r="98" 
                   fill="transparent" 
                   stroke="currentColor" 
                   strokeWidth="24" 
                   strokeDasharray={2 * Math.PI * 98} 
                   strokeDashoffset={2 * Math.PI * 98 * (1 - 0.48)}
                   className="text-primary-600" 
                 />
              </svg>
           </div>
           <div className="flex-1 space-y-10 text-center lg:text-left">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary-500 font-display italic">Evolution Metric</span>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter font-display italic uppercase leading-none">Your Progress <br />Milestone</h3>
              </div>
              <p className="text-slate-400 font-medium max-w-xl text-lg leading-relaxed italic font-display">
                 "You're doing better than 82% of students in your domain. Complete your 'Architectural Strategy' module to unlock elite recruiter priority."
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4">
                 <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-12 rounded-2xl font-black uppercase tracking-widest text-[10px] text-white border-none shadow-xl shadow-primary-600/20 hover:scale-105 transition-all">
                    Resume Evolution
                 </Button>
                 <Button variant="outline" className="text-white hover:text-slate-950 h-16 px-12 border-white/10 hover:border-white whitespace-normal hover:bg-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                    Analytic Report
                 </Button>
              </div>
           </div>
        </div>
      </Card>
    </div>
  );
}

function CategoryCard({ icon, label, active = false }) {
  return (
    <Card className={`bg-white border p-8 flex flex-col items-center justify-center gap-6 transition-all group cursor-pointer rounded-[2rem] shadow-sm relative overflow-hidden h-44 ${
      active ? 'border-primary-600 bg-primary-50/30' : 'border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-600/5'
    }`}>
      {active && <div className="absolute top-0 right-0 p-4"><div className="w-2 h-2 rounded-full bg-primary-600 animate-ping" /></div>}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-12 ${
        active ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary-600/20 shadow-sm'
      }`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] font-display italic ${active ? 'text-primary-600' : 'text-slate-300 group-hover:text-slate-900'}`}>
        {label}
      </span>
    </Card>
  );
}
