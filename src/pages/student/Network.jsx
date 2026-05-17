import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  Search, 
  UserPlus, 
  MessageSquare, 
  Globe, 
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  ChevronRight,
  Filter
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MOCK_USERS } from '@/mocks';

export default function Network() {
  const users = MOCK_USERS.slice(0, 6);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-primary-600">Elite Community</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Professional Network</h1>
          <p className="text-slate-500 text-base">Connect with peers, mentors, and industry hiring partners.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search ecosystem..." 
              className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <Button variant="outline" size="icon" className="h-11 w-11 rounded-xl border-slate-200 bg-white">
             <Filter className="w-5 h-5 text-slate-400" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {users.map((user, idx) => (
                <Card key={idx} className="group border-slate-100 rounded-[2rem] bg-white shadow-sm hover:shadow-2xl hover:border-primary-100 transition-all duration-500 cursor-pointer overflow-hidden">
                   <CardContent className="p-8">
                      <div className="flex justify-between items-start mb-6">
                         <Avatar className="w-16 h-16 border border-slate-50 shadow-lg group-hover:scale-105 transition-transform">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                         </Avatar>
                         <Badge className="bg-primary-50 text-primary-600 border-none font-bold text-[9px] uppercase tracking-wide px-3 py-1">Active Now</Badge>
                      </div>
                      
                      <div className="space-y-1 mb-8">
                         <h4 className="text-xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{user.name}</h4>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{user.role}</p>
                      </div>

                      <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 line-clamp-2">
                        Highly proficient in distributed systems and cloud-native architecture.
                      </p>
                      
                      <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                         <div className="flex items-center gap-2 text-primary-600 font-bold">
                            <TrendingUp className="w-4 h-4" />
                            <span className="text-[10px] uppercase tracking-wide">Top Tier Match</span>
                         </div>
                         <div className="flex gap-2">
                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-300 hover:text-primary-600 hover:bg-primary-50 transition-all">
                               <MessageSquare className="w-5 h-5" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-slate-300 hover:text-primary-600 hover:bg-primary-50 transition-all">
                               <UserPlus className="w-5 h-5" />
                            </Button>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                    <Globe className="w-7 h-7" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight text-white uppercase leading-tight">Global Network Pulse</h3>
                 <div className="space-y-6">
                    <StatItem label="Daily Connections" value="1.2k+" />
                    <StatItem label="Talent Velocity" value="84%" />
                    <StatItem label="Hiring Conversion" value="High" />
                 </div>
              </div>
           </Card>

           <div className="space-y-4 px-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Industry Recognition</h3>
              <div className="space-y-3">
                 {[1,2,3].map(i => (
                   <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between group hover:border-primary-100 transition-all cursor-pointer shadow-sm">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                            <Award className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-sm font-bold text-slate-950 uppercase group-hover:text-primary-600 transition-colors">Career Ambassador</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Elite Status Level 2</p>
                         </div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                   </div>
                 ))}
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
       <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide">{label}</p>
       <h4 className="text-3xl font-bold tracking-tight text-white leading-none">{value}</h4>
    </div>
  );
}
