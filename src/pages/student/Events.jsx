import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  Star, 
  TrendingUp,
  Award,
  Zap,
  Globe,
  Plus
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

export default function Events() {
  const events = [
    {
      title: 'Global Tech Summit 2024',
      organizer: 'CareerLink HQ',
      date: 'June 12-14, 2024',
      location: 'Virtual / Metaverse',
      attendees: '4.5k+',
      image: 'https://images.unsplash.com/photo-1540575861501-7ad058177bf3?auto=format&fit=crop&q=80&w=800',
      category: 'Conference'
    },
    {
      title: 'AI Startup Pitch Night',
      organizer: 'Innovation Hub',
      date: 'May 28, 2024',
      location: 'San Francisco, CA',
      attendees: '120+',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
      category: 'Networking'
    }
  ];

  const handleRegister = (title) => {
    toast.success(`Access credentials secured for ${title}`);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      {/* Featured Event Hero */}
      <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 h-[500px] group shadow-2xl">
         <img 
           src="https://images.unsplash.com/photo-1505373630103-892744917ad5?auto=format&fit=crop&q=80&w=2000" 
           className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-1000"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
         
         <div className="absolute bottom-0 left-0 w-full p-12 md:p-20 z-10 space-y-8">
            <div className="flex items-center gap-3">
               <Badge className="bg-primary-600 text-white border-none font-bold text-xs uppercase tracking-wide px-4 py-1.5 shadow-lg shadow-primary-600/20">Featured Experience</Badge>
               <span className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wide">
                  <Globe className="w-3.5 h-3.5" />
                  International Audience
               </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">Pan-African AI Innovation Challenge</h2>
            <div className="flex flex-wrap items-center gap-8">
               <div className="flex items-center gap-3 text-white/80">
                  <Calendar className="w-5 h-5 text-primary-400" />
                  <span className="text-sm font-bold uppercase tracking-wide">May 20-22, 2024</span>
               </div>
               <div className="flex items-center gap-3 text-white/80">
                  <Users className="w-5 h-5 text-primary-400" />
                  <span className="text-sm font-bold uppercase tracking-wide">8,500 Registered</span>
               </div>
               <Button onClick={() => handleRegister('African AI Challenge')} className="bg-white text-slate-900 hover:bg-primary-50 rounded-xl h-12 px-10 font-bold uppercase tracking-wide text-xs shadow-xl">
                  Secure Access
               </Button>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-2xl font-bold text-slate-900 uppercase">Upcoming Events</h3>
              <div className="flex gap-2">
                 <Button variant="ghost" onClick={() => toast.info('Filtering all events...')} className="h-10 px-4 rounded-xl text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-primary-600">All</Button>
                 <Button variant="ghost" onClick={() => toast.info('Filtering workshops...')} className="h-10 px-4 rounded-xl text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-primary-600">Workshops</Button>
                 <Button variant="ghost" onClick={() => toast.info('Filtering seminars...')} className="h-10 px-4 rounded-xl text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-primary-600">Seminars</Button>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, idx) => (
                <Card key={idx} onClick={() => handleRegister(event.title)} className="group border-slate-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 cursor-pointer">
                   <div className="h-56 relative overflow-hidden">
                      <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                         <Badge className="bg-primary-600 text-white border-none font-bold text-xs uppercase tracking-wide px-3 py-1">{event.category}</Badge>
                      </div>
                   </div>
                   <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase mb-4">{event.title}</h3>
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-slate-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wide">{event.date}</span>
                         </div>
                         <div className="flex items-center gap-3 text-slate-500">
                            <MapPin className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wide truncate">{event.location}</span>
                         </div>
                      </div>
                      
                      <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {[1,2,3].map(i => (
                              <Avatar key={i} className="border-2 border-white w-8 h-8">
                                <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-400">U</AvatarFallback>
                              </Avatar>
                            ))}
                            <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400">
                               +
                            </div>
                         </div>
                         <Button variant="ghost" className="p-0 text-xs font-bold uppercase tracking-wide text-primary-600 hover:bg-transparent group">
                            Register Now <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="rounded-[2.5rem] bg-white border-slate-100 p-10 shadow-sm border-none">
              <div className="space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600">
                       <Zap className="w-7 h-7" />
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-xs uppercase">Active Goal</Badge>
                 </div>
                 <div>
                    <h4 className="text-2xl font-bold text-slate-900 uppercase">Ecosystem Credits</h4>
                    <p className="text-sm text-slate-500 font-medium mt-2">Attend 3 more workshops this month to earn the 'Active Networker' badge.</p>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
                       <span>Progress</span>
                       <span>2/5</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                       <div className="h-full w-2/5 bg-primary-600" />
                    </div>
                 </div>
              </div>
           </Card>

           <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 px-4">Elite Mentors</h3>
              <div className="space-y-3">
                 {[1,2,3].map(i => (
                   <div key={i} onClick={() => toast.info('Requesting mentor session...')} className="p-5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between group hover:border-primary-100 transition-all cursor-pointer">
                      <div className="flex items-center gap-4">
                         <Avatar className="w-10 h-10 border border-slate-50 shadow-sm">
                            <AvatarFallback className="bg-primary-50 text-primary-600 font-bold text-xs">M</AvatarFallback>
                         </Avatar>
                         <div>
                            <p className="text-sm font-bold text-slate-950 uppercase group-hover:text-primary-600 transition-colors">Dr. Sarah Smith</p>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">AI Strategy Lead</p>
                         </div>
                      </div>
                      <Plus className="w-4 h-4 text-slate-300 group-hover:text-primary-600" />
                   </div>
                 ))}
              </div>
              <Button variant="ghost" onClick={() => toast.info('Opening mentor directory...')} className="w-full text-xs font-bold uppercase tracking-wide text-slate-500 hover:text-primary-600">Find More Mentors</Button>
           </div>
        </div>
      </div>
    </div>
  );
}
