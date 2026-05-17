import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  MessageSquare, 
  Star, 
  Calendar, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export default function Mentorship() {
  const mentors = [
    {
      name: 'Dr. Sarah Smith',
      role: 'Lead Cloud Architect @ Google',
      rating: 4.9,
      reviews: 124,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      tags: ['Cloud', 'Scalability', 'Career Strategy']
    },
    {
      name: 'Michael Chen',
      role: 'Senior Staff Engineer @ Meta',
      rating: 4.8,
      reviews: 89,
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      tags: ['Frontend', 'Performance', 'WASM']
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Guidance Hub</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Industry Mentorship</h1>
          <p className="text-slate-500 text-base">Connect with verified industry leaders for career guidance and technical growth.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search mentors..." 
            className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mentors.map((mentor, idx) => (
                <Card key={idx} className="group border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500">
                   <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-8">
                         <Avatar className="w-20 h-20 border-2 border-white shadow-xl group-hover:scale-105 transition-transform">
                            <AvatarImage src={mentor.image} />
                            <AvatarFallback>{mentor.name[0]}</AvatarFallback>
                         </Avatar>
                         <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-100">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="text-[10px] font-bold">{mentor.rating}</span>
                         </div>
                      </div>
                      
                      <div className="space-y-4 mb-10">
                         <div>
                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{mentor.name}</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mt-1">{mentor.role}</p>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {mentor.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-slate-50 text-slate-400 border-none font-bold text-[9px] uppercase tracking-wide">
                                {tag}
                              </Badge>
                            ))}
                         </div>
                      </div>
                      
                      <div className="pt-8 border-t border-slate-50 flex items-center gap-3">
                         <Button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 font-bold text-xs uppercase tracking-wide border-none shadow-lg shadow-primary-600/10">
                            Book Session
                         </Button>
                         <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-100 text-slate-400 hover:text-primary-600 hover:bg-primary-50">
                            <MessageSquare className="w-5 h-5" />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-primary-50 border-primary-100 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">
                    <TrendingUp className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight uppercase text-primary-800 leading-tight">Impact Metrics</h3>
                 <p className="text-primary-900/60 font-medium text-base leading-relaxed">
                   Students with regular industry mentorship are 3x more likely to secure roles at top-tier tech partners.
                 </p>
                 <Button className="w-full h-14 bg-primary-600 text-white hover:bg-primary-700 rounded-xl font-bold uppercase tracking-wide text-[10px] shadow-xl shadow-primary-600/20 border-none">
                    Request Mentor Match
                 </Button>
              </div>
           </Card>

           <div className="space-y-4 px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Available Slots Today</h3>
              <div className="space-y-3">
                 {[1,2].map(i => (
                   <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between group hover:border-primary-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-600 transition-all">
                            <Calendar className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-950 uppercase">2:30 PM - 3:00 PM</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">System Design Review</p>
                         </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-primary-600 transition-all" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
