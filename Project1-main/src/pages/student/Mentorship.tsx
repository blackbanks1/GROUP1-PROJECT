import { motion } from 'motion/react';
import { 
  Users, 
  Star, 
  MessageCircle, 
  Calendar, 
  Search, 
  Filter, 
  Sparkles, 
  Zap,
  CheckCircle2,
  Video,
  Clock,
  Briefcase
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MENTORS = [
  {
    id: 'm1',
    name: 'Dr. Sarah Mitchell',
    role: 'Principal Engineer @ Google',
    expertise: ['System Design', 'Leadership', 'Career Growth'],
    rating: '5.0',
    reviews: 124,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 'm2',
    name: 'David Chen',
    role: 'Product Lead @ Meta',
    expertise: ['UX Strategy', 'Product Management', 'Market Entry'],
    rating: '4.9',
    reviews: 86,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
  },
  {
    id: 'm3',
    name: 'Elena Rodriguez',
    role: 'Cybersecurity Analyst @ Cisco',
    expertise: ['Network Defense', 'Pentesting', 'SOC Analysis'],
    rating: '4.8',
    reviews: 62,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
  }
];

export default function Mentorship() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Elite Guidance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Career <span className="text-primary-600">Mentorship</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Accelerate your trajectory by connecting with industry veterans. Gain exclusive insights, strategic reviews, and professional sponsorship.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="border-slate-200 hover:bg-slate-50 h-16 px-10 rounded-2xl text-slate-900 font-bold uppercase tracking-widest text-[10px] hidden lg:flex">
              My Sessions
           </Button>
           <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/10 text-white">
              Become a Mentor
           </Button>
        </div>
      </div>

      {/* Discovery Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 h-20 bg-slate-50 border border-slate-200 rounded-3xl flex items-center px-8 group focus-within:border-primary-400 transition-all">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-primary-600 transition-colors mr-6" />
            <Input 
              placeholder="Search by expertise, industry, or company..." 
              className="bg-transparent border-none focus-visible:ring-0 text-xl placeholder:text-slate-400 text-slate-900 font-medium" 
            />
         </div>
         <div className="h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center gap-4 group cursor-pointer hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5 text-slate-400 group-hover:text-primary-600 transition-colors" />
            <span className="font-black text-xs uppercase tracking-widest text-slate-600">Filters</span>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MENTORS.map((mentor, idx) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 group hover:border-primary-400 transition-all shadow-sm overflow-hidden flex flex-col rounded-[2.5rem]">
               <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
                  <div className="flex items-start gap-5">
                     <div className="relative">
                        <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
                           <AvatarImage src={mentor.avatar} className="object-cover" />
                           <AvatarFallback className="bg-primary-100 text-primary-700 font-bold text-2xl">{mentor.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 bg-primary-600 rounded-full h-8 w-8 flex items-center justify-center border-4 border-white">
                           <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors">{mentor.name}</h4>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{mentor.role}</p>
                        <div className="flex items-center gap-1.5 text-primary-600 font-bold text-xs pt-1">
                           <Star className="w-3.5 h-3.5 fill-current" /> {mentor.rating} <span className="text-slate-400 font-medium ml-1">({mentor.reviews} reviews)</span>
                        </div>
                     </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                     {mentor.expertise.map(skill => (
                        <Badge key={skill} className="bg-slate-50 text-slate-500 border border-slate-100 rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest">
                           {skill}
                        </Badge>
                     ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-100">
                     <div className="space-y-1">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Next Slot</p>
                        <p className="font-bold text-slate-700 text-xs">Tomorrow, 14:00</p>
                     </div>
                     <div className="space-y-1 text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Session Rate</p>
                        <p className="font-bold text-primary-600 text-xs text-nowrap">Verified Free</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                     <Button variant="outline" className="border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest transition-all">
                        View Profile
                     </Button>
                     <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 text-[10px] font-black uppercase tracking-widest shadow-md shadow-primary-600/10 transition-all">
                        Book Session
                     </Button>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Community Feedback / Success Stories */}
      <Card className="bg-primary-50 border-primary-100 p-12 overflow-hidden relative rounded-[3rem] shadow-sm">
         <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Sparkles className="w-48 h-48 text-primary-600" />
         </div>
         <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="space-y-4 max-w-xl">
               <h3 className="text-3xl font-bold tracking-tight font-display italic uppercase text-primary-800">Impact Metrics</h3>
               <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  Students who connect with mentors in their first 3 months have a <span className="text-primary-700 font-bold">75% higher chance</span> of securing elite level internships at companies like Stripe, Linear, and AWS.
               </p>
               <div className="flex gap-12 pt-6">
                  <div>
                     <p className="text-3xl font-black text-primary-800">450+</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Mentors</p>
                  </div>
                  <div>
                     <p className="text-3xl font-black text-primary-800">12k+</p>
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sessions Completed</p>
                  </div>
               </div>
            </div>
            <div className="flex-1 w-full relative">
               <div className="aspect-video bg-white rounded-[2rem] border border-primary-100 flex items-center justify-center group overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-primary-500/5 transition-opacity" />
                  <Video className="w-16 h-16 text-primary-600" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Success Story: From TVET to AWS Cloud</p>
                  </div>
               </div>
            </div>
         </div>
      </Card>
    </div>
  );
}
