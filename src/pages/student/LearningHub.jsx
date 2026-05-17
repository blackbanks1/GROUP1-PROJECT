import * as React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Play, 
  Clock, 
  Star, 
  TrendingUp, 
  Bookmark,
  ShieldCheck,
  Zap,
  ChevronRight,
  Target
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function LearningHub() {
  const courses = [
    {
      title: 'Advanced Cloud Architecture',
      instructor: 'Dr. Sarah Smith',
      duration: '12h 45m',
      rating: 4.9,
      students: '1.2k',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      progress: 65,
      category: 'System Design'
    },
    {
      title: 'High-Performance React Strategy',
      instructor: 'Michael Chen',
      duration: '8h 20m',
      rating: 4.8,
      students: '850',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      progress: 30,
      category: 'Frontend'
    },
    {
      title: 'Distributed Systems & Scaling',
      instructor: 'Emily Brown',
      duration: '15h 10m',
      rating: 4.9,
      students: '2.4k',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=800',
      progress: 10,
      category: 'Infrastructure'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      {/* Hero Header */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-950 p-12 md:p-20 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        
        <div className="relative z-10 space-y-8 max-w-3xl">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-600/20">
                 <Zap className="w-6 h-6" />
              </div>
              <span className="text-[11px] uppercase font-bold tracking-wide text-primary-400">Intelligence Terminal</span>
           </div>
           <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
             Master the <span className="text-primary-400">Future</span> of Industry.
           </h1>
           <p className="text-slate-400 text-lg font-normal leading-relaxed max-w-xl">
             Access industry-verified training programs and technical roadmaps designed for market excellence.
           </p>
           
           <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl max-w-md focus-within:ring-2 focus-within:ring-primary-600/20 transition-all">
              <Search className="w-5 h-5 text-slate-500 ml-4" />
              <Input 
                placeholder="Search mastery courses..." 
                className="bg-transparent border-none focus-visible:ring-0 text-xl placeholder:text-slate-600 text-white font-medium"
              />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Recommended Roadmap</h3>
              <Button variant="ghost" className="text-primary-600 font-bold text-xs uppercase tracking-wide">Explore All</Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {courses.map((course, idx) => (
                <Card key={idx} className="group border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 cursor-pointer">
                   <div className="h-56 relative overflow-hidden">
                      <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={course.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute bottom-6 left-6 flex items-center gap-2">
                         <Badge className="bg-primary-600 text-white border-none font-bold text-[10px] uppercase tracking-wide px-3 py-1">{course.category}</Badge>
                         <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg text-white text-[10px] font-bold border border-white/10">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                         </div>
                      </div>
                      <Button size="icon" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-14 w-14 rounded-full bg-white text-primary-600 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 shadow-2xl">
                         <Play className="w-6 h-6 ml-1" />
                      </Button>
                   </div>
                   <CardContent className="p-8">
                      <h4 className="font-bold text-2xl mb-4 text-slate-900 group-hover:text-primary-600 transition-colors duration-300 leading-tight uppercase">
                         {course.title}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wide mb-10 group-hover:text-slate-600 transition-colors">{course.instructor}</p>
                      
                      <div className="space-y-3 pt-6 border-t border-slate-50">
                         <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                            <span>Your Progress</span>
                            <span className="text-primary-600">{course.progress}%</span>
                         </div>
                         <Progress value={course.progress} className="h-1.5" />
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600" />
              <div className="relative z-10 space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                       <TrendingUp className="w-7 h-7" />
                    </div>
                    <span className="text-6xl font-bold text-white">48%</span>
                 </div>
                 <div>
                    <span className="text-[10px] font-bold uppercase tracking-wide text-primary-500">Evolution Metric</span>
                    <h3 className="text-4xl font-bold tracking-tight uppercase leading-none mt-2">Your Progress <br />Milestone</h3>
                 </div>
                 <p className="text-slate-400 font-medium text-lg leading-relaxed">
                   You are outpacing 72% of students in your academic cohort. Keep up the high-end output.
                 </p>
                 <Button className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-2xl font-bold uppercase tracking-wide text-[10px]">
                    View Technical Roadmap
                 </Button>
              </div>
           </Card>

           <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-400 px-4">Market Signals</h3>
              <div className="space-y-3">
                 <TrendingItem label="Frontend Performance" trend="+12%" />
                 <TrendingItem label="System Scaling" trend="+8%" />
                 <TrendingItem label="React Native Mastery" trend="+15%" active />
                 <TrendingItem label="Cloud Infrastructure" trend="+22%" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function TrendingItem({ label, trend, active }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer ${active ? 'bg-primary-50 border-primary-200 shadow-sm' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
       <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${active ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-slate-50 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600'}`}>
             <Target className="w-5 h-5" />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-wide ${active ? 'text-primary-600' : 'text-slate-300 group-hover:text-slate-900'}`}>
             {label}
          </span>
       </div>
       <span className={`text-xs font-bold ${active ? 'text-primary-600' : 'text-slate-400'}`}>{trend}</span>
    </div>
  );
}
