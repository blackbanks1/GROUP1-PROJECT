import { motion } from 'motion/react';
import { 
  Users, 
  MapPin, 
  Briefcase, 
  Calendar, 
  GraduationCap, 
  Search,
  Filter,
  UserPlus,
  MessageSquare,
  Sparkles,
  Link2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const NETWORK_MOCK = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    role: 'Senior Product Designer',
    company: 'Linear',
    location: 'Remote',
    mutual: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
  },
  {
    id: 'u2',
    name: 'Marcus Rashford',
    role: 'Cloud Architect',
    company: 'AWS',
    location: 'London, UK',
    mutual: 8,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
  },
  {
    id: 'u3',
    name: 'Damilola Ade',
    role: 'Fullstack Dev',
    company: 'Stripe',
    location: 'Lagos, NG',
    mutual: 15,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Damy'
  },
  {
    id: 'u4',
    name: 'Alex Rivera',
    role: 'Student Mentor',
    company: 'Global Academy',
    location: 'Kigali, RW',
    mutual: 24,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
  }
];

export default function ProfessionalNetwork() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <Users className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Elite Connectivity</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Professional <span className="text-primary-600">Network</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Surround yourself with industry pioneers. Connect, learn, and expand your reach within the global professional ecosystem.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button className="bg-primary-600 hover:bg-primary-700 h-14 px-10 rounded-2xl shadow-lg shadow-primary-600/10 font-bold uppercase tracking-widest text-[10px] text-white">
              Find Mentors
           </Button>
        </div>
      </div>

      {/* Network Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <NetworkStat label="Total Connections" value="1,248" growth="+42 this week" />
         <NetworkStat label="Network Reach" value="452k" growth="Top 5% in Domain" />
         <NetworkStat label="Pending Invites" value="28" growth="Action Required" />
      </div>

      {/* Search & Filtration */}
      <div className="flex flex-col lg:flex-row gap-4">
         <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
            <Input 
              placeholder="Search by name, role, or company..." 
              className="bg-slate-50 border-slate-200 h-16 pl-14 rounded-[1.5rem] focus-visible:ring-primary-400 text-slate-900 font-medium shadow-sm" 
            />
         </div>
         <Button variant="outline" className="h-16 px-8 border-slate-200 bg-white rounded-[1.5rem] text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px] shadow-sm">
            <Filter className="w-4 h-4 mr-3" /> Filters
         </Button>
      </div>

      {/* Connection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {NETWORK_MOCK.map((user, idx) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 hover:border-primary-400 transition-all overflow-hidden group flex flex-col h-full rounded-[2.5rem] shadow-sm hover:shadow-md">
               <CardContent className="p-8 flex-1 flex flex-col text-center">
                  <div className="relative mx-auto mb-8">
                     <div className="absolute -inset-1 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-full blur-lg opacity-0 group-hover:opacity-20 transition-opacity" />
                     <Avatar className="w-24 h-24 border-4 border-white relative shadow-lg">
                        <AvatarImage src={user.avatar} className="object-cover" />
                        <AvatarFallback className="bg-primary-600 text-white font-bold">{user.name[0]}</AvatarFallback>
                     </Avatar>
                  </div>
                  
                  <div className="space-y-1 mb-6">
                     <h4 className="text-xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors italic font-display uppercase tracking-tight">{user.name}</h4>
                     <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 font-sans tracking-widest">{user.role}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                     <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold">
                        <Briefcase className="w-3.5 h-3.5" /> {user.company}
                     </div>
                     <div className="flex items-center justify-center gap-2 text-slate-400 text-[11px] font-bold">
                        <MapPin className="w-3.5 h-3.5" /> {user.location}
                     </div>
                  </div>

                  <div className="mt-auto space-y-4">
                     <div className="flex items-center justify-center gap-2 font-mono">
                        <div className="flex -space-x-2">
                           {[1, 2, 3].map(i => (
                             <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100" />
                           ))}
                        </div>
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{user.mutual} mutual connections</span>
                     </div>
                     <div className="flex gap-2">
                        <Button className="flex-1 bg-primary-600 hover:bg-primary-700 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest group text-white">
                           Connect
                           <UserPlus className="w-3.5 h-3.5 ml-2 transform group-hover:scale-110 transition-transform" />
                        </Button>
                        <Button variant="outline" className="w-12 h-12 rounded-xl border-slate-200 text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all p-0 bg-white">
                           <MessageSquare className="w-4 h-4" />
                        </Button>
                     </div>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Suggested Communities */}
      <section className="space-y-8">
         <div className="flex items-center gap-2 px-2 text-primary-600 font-display italic">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-2xl font-bold tracking-tight uppercase">Career Communities</h3>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CommunityCard name="Global Architecture" members="12.4k" color="primary" />
            <CommunityCard name="Product Design Elite" members="8.2k" color="primary" />
            <CommunityCard name="Cyber Defense Ops" members="5.1k" color="primary" />
         </div>
      </section>
    </div>
  );
}

function NetworkStat({ label, value, growth }: { label: string; value: string; growth: string }) {
  return (
    <Card className="bg-white border-slate-200 p-8 overflow-hidden relative shadow-sm">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-600 to-primary-400 opacity-20" />
       <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{label}</p>
       <div className="flex items-end justify-between">
          <h3 className="text-4xl font-extrabold tracking-tight text-slate-950 font-display italic leading-none">{value}</h3>
          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{growth}</span>
       </div>
    </Card>
  );
}

function CommunityCard({ name, members, color }: { name: string; members: string; color: string }) {
  return (
    <Card className="bg-white border-slate-200 p-8 transition-all group cursor-pointer hover:border-primary-400 shadow-sm hover:shadow-md">
       <div className="flex items-center justify-between mb-8">
          <div className="space-y-1">
             <h4 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight italic font-display">{name}</h4>
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{members} networking active</p>
          </div>
          <Link2 className="w-6 h-6 text-slate-200 group-hover:text-primary-600 transition-colors" />
       </div>
       <Button variant="outline" className="w-full bg-slate-50 border-slate-200 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest transition-all">
          Join Community
       </Button>
    </Card>
  );
}
