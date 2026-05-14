import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Zap, 
  Trophy, 
  Search, 
  Filter, 
  ArrowRight,
  Sparkles,
  Clock,
  ExternalLink,
  Code,
  GraduationCap
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const EVENTS = [
  {
    id: '1',
    title: 'Global Hackathon 2024',
    organizer: 'TechLabs Africa',
    date: 'June 15-17',
    type: 'Competition',
    prize: '$10,000 Pool',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    title: 'Career Fair: Future Roles',
    organizer: 'CareerLink Network',
    date: 'June 22',
    type: 'Career Fair',
    prize: 'Direct Interviews',
    category: 'Jobs',
    image: 'https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: '3',
    title: 'Design Sprint: UX 3.0',
    organizer: 'Creative Hub',
    date: 'July 05',
    type: 'Bootcamp',
    prize: 'Certified Badge',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=60'
  }
];

export default function EventsCompetitions() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <Trophy className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Live Competitions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Events & <span className="text-primary-600">Hackathons</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Test your limits, collaborate with elite creators, and secure high-value placements and scholarship awards.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px] bg-white">
              My Registrations
           </Button>
        </div>
      </div>

      {/* Categories Toolbar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
         <div className="relative flex-1 group w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
            <Input 
              placeholder="Search events, bootcamps, or scholarships..." 
              className="bg-slate-50 border-slate-200 h-16 pl-16 rounded-[2rem] focus-visible:ring-primary-400 text-lg font-medium shadow-sm" 
            />
         </div>
         <div className="flex gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <Button className="whitespace-nowrap rounded-xl bg-primary-600 text-white px-6 font-black text-[10px] uppercase tracking-widest h-16 shadow-lg shadow-primary-600/10">All Events</Button>
            <Button variant="outline" className="whitespace-nowrap rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-900 px-6 font-black text-[10px] uppercase tracking-widest h-16 transition-all shadow-sm">Hackathons</Button>
            <Button variant="outline" className="whitespace-nowrap rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-900 px-6 font-black text-[10px] uppercase tracking-widest h-16 transition-all shadow-sm">Career Fairs</Button>
            <Button variant="outline" className="whitespace-nowrap rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-900 px-6 font-black text-[10px] uppercase tracking-widest h-16 transition-all shadow-sm">Scholarships</Button>
         </div>
      </div>

      {/* Featured Event Hero */}
      <Card className="bg-slate-900 overflow-hidden relative rounded-[3rem] min-h-[400px] flex items-center group cursor-pointer shadow-xl">
         <img 
            src="https://images.unsplash.com/photo-1517245318728-ebe72128e7de?w=1600&auto=format&fit=crop&q=60" 
            alt="Hackathon Hero" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-1000" 
         />
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
         <CardContent className="p-16 relative z-10 space-y-8 max-w-2xl">
            <div className="flex items-center gap-3">
               <Badge className="bg-primary-600 text-white border-none rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-widest">Featured Hackathon</Badge>
               <div className="flex items-center gap-2 text-primary-400 font-bold text-[10px] uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" /> Starting in 4 Days
               </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight font-display leading-[1.1] italic text-white">Pan-African AI Innovation Challenge</h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
               Collaborate with students across the continent to build high-impact AI solutions for local logistics and health systems.
            </p>
            <div className="flex gap-4 pt-4">
               <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-2xl shadow-primary-600/40 text-white">
                  Register for Participation
               </Button>
               <Button variant="outline" className="h-16 w-16 bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl text-white hover:bg-primary-600 hover:border-primary-600 transition-all">
                  <ExternalLink className="w-6 h-6" />
               </Button>
            </div>
         </CardContent>
      </Card>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 group hover:border-primary-400 transition-all overflow-hidden flex flex-col rounded-[2.5rem] shadow-sm hover:shadow-md">
               <div className="aspect-video relative overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60" />
                  <div className="absolute top-6 right-6">
                     <Badge className="bg-white/10 backdrop-blur-md text-white border-white/20 rounded-xl px-4 py-2 font-black text-[9px] uppercase tracking-widest">
                        {event.type}
                     </Badge>
                  </div>
               </div>
               <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center justify-between">
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">{event.organizer}</p>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{event.date}</span>
                     </div>
                     <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors uppercase italic">{event.title}</h3>
                     
                     <div className="grid grid-cols-2 gap-4 py-2">
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Reward</p>
                           <p className="font-bold text-emerald-600 text-xs">{event.prize}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Category</p>
                           <p className="font-bold text-slate-900 text-xs">{event.category}</p>
                        </div>
                     </div>
                  </div>

                  <Button variant="outline" className="w-full border-slate-200 text-slate-400 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 rounded-2xl h-14 font-black text-[10px] uppercase tracking-widest transition-all bg-white shadow-sm">
                     View Event Details
                  </Button>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
