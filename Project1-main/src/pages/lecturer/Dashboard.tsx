import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  FileText, 
  MessageCircle, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  ArrowRight
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { MOCK_USERS } from '@/mocks';

export default function LecturerDashboard() {
  const currentUser = MOCK_USERS[2]; // Dr. Sarah Smith
  
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-primary-600" />
            <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">Supervision Terminal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-display text-slate-950 uppercase italic leading-tight">
            Academic <span className="text-primary-600">Oversight</span>
          </h1>
          <p className="text-slate-500 text-xl font-medium max-w-2xl leading-relaxed">Evaluation and performance monitoring of clinical or technical placements.</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="border-slate-200 text-slate-400 rounded-2xl h-16 px-10 font-bold text-xs uppercase tracking-widest transition-all bg-white shadow-sm">
            Generate Reports
          </Button>
          <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-16 px-10 font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary-600/10 transition-all hover:scale-105 border-none">
            New Evaluation
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Users className="text-accent-blue" />} label="Assigned Students" value="24" subtext="Across 12 companies" accent="bg-accent-blue" />
        <StatCard icon={<FileText className="text-primary-400" />} label="Pending Reports" value="8" subtext="Action needed" accent="bg-primary-500" />
        <StatCard icon={<CheckCircle2 className="text-accent-green" />} label="Graded This Term" value="16" subtext="65% completion" accent="bg-accent-green" />
        <StatCard icon={<AlertCircle className="text-accent-pink" />} label="Flagged Issues" value="2" subtext="Requires meeting" accent="bg-accent-pink" />
      </div>

      {/* Students & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student List */}
        <Card className="lg:col-span-2 glass border-slate-200/50 overflow-hidden shadow-xl">
          <CardHeader className="p-8 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50/20">
             <div className="flex items-center gap-4">
               <h3 className="text-xl font-bold font-display tracking-tight text-slate-900">Assigned Students</h3>
               <Badge className="bg-slate-100 text-slate-500 border-none font-bold text-[9px] uppercase tracking-widest">24 Total</Badge>
             </div>
             <div className="relative w-full sm:w-64">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
               <Input placeholder="Filter students..." className="h-10 text-xs pl-10 bg-white border-slate-200 rounded-xl focus:border-primary-500/50 transition-all" />
             </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {[
                { name: 'Alex Johnson', company: 'Google', progress: 45, status: 'Normal', avatar: 'A' },
                { name: 'Chloe Davies', company: 'Atlassian', progress: 82, status: 'Excelling', avatar: 'C' },
                { name: 'Daniel Smith', company: 'Canva', progress: 12, status: 'Behind', avatar: 'D' },
                { name: 'Elena Rodriguez', company: 'Stripe', progress: 60, status: 'Normal', avatar: 'E' },
                { name: 'Felix Brown', company: 'Airbnb', progress: 30, status: 'Flagged', avatar: 'F' },
              ].map((student, idx) => (
                <div key={idx} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group cursor-pointer">
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="w-12 h-12 border border-slate-200 group-hover:border-primary-500/50 group-hover:scale-110 transition-all">
                      <AvatarFallback className="bg-primary-50 text-primary-700 font-bold">{student.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="font-bold tracking-tight text-slate-900 group-hover:text-primary-500 transition-colors truncate">{student.name}</h4>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2 mt-0.5">{student.company}</p>
                      <div className="flex items-center gap-3 max-w-[180px]">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <motion.div 
                                initial={{ width: 0 }} 
                                animate={{ width: `${student.progress}%` }} 
                                className="h-full bg-primary-500 rounded-full" 
                            />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">{student.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <Badge className={`text-[9px] font-bold uppercase tracking-widest border-none px-3 py-1.5 shadow-sm ${
                        student.status === 'Excelling' ? 'bg-emerald-500 text-white' :
                        student.status === 'Behind' ? 'bg-orange-500 text-white' :
                        student.status === 'Flagged' ? 'bg-rose-500 text-white' :
                        'bg-slate-100 text-slate-500'
                    }`}>
                      {student.status}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-8 text-[9px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 transition-colors p-0 hover:bg-transparent">
                      Review Log <ArrowRight className="ml-1.5 w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-slate-100 bg-slate-50/20">
               <Button variant="outline" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 border-slate-200 hover:bg-slate-100 h-10 rounded-xl transition-all">
                    View Full Directory
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports / Notifications */}
        <div className="space-y-8">
          <Card className="glass border-slate-200/50 overflow-hidden shadow-xl">
            <CardHeader className="p-6 pb-4 border-b border-slate-100 bg-slate-50/20">
              <h3 className="text-lg font-bold flex items-center gap-3 font-display tracking-tight text-slate-900">
                <FileText className="w-4 h-4 text-primary-500" />
                Recent Reports
              </h3>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {[
                { name: 'Alex Johnson', week: 4, time: '2h ago' },
                { name: 'Elena Rodriguez', week: 6, time: '5h ago' },
                { name: 'Chloe Davies', week: 8, time: 'Yesterday' },
              ].map((report, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-primary-500/30 transition-all cursor-pointer group hover:bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-xs group-hover:text-primary-600 transition-colors tracking-tight truncate mr-2 text-slate-900">{report.name}</p>
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest shrink-0">{report.time}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium font-sans">Weekly Status &bull; Week {report.week}</p>
                </div>
              ))}
              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white text-[10px] font-bold uppercase tracking-widest border-none mt-2 h-11 rounded-xl shadow-lg shadow-primary-500/10 transition-all hover:scale-[1.02]">
                Grade All Pending
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-slate-200/50 overflow-hidden shadow-xl">
             <CardHeader className="p-6 pb-4 border-b border-slate-100 bg-slate-50/20">
                <h3 className="text-lg font-bold flex items-center gap-3 font-display tracking-tight text-slate-900">
                  <MessageCircle className="w-4 h-4 text-accent-blue" />
                  Messages
                </h3>
             </CardHeader>
             <CardContent className="p-6 space-y-4">
                {MOCK_USERS.slice(0, 2).map((user) => (
                   <div key={user.id} className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group border border-transparent hover:border-slate-100">
                    <Avatar className="w-10 h-10 border border-slate-200 group-hover:border-accent-blue transition-colors">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-primary-50 text-primary-700 text-[10px] font-bold">{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-xs truncate tracking-tight text-slate-900">{user.name}</p>
                      <p className="text-[10px] text-slate-400 truncate font-sans">Sent a question about the internship...</p>
                    </div>
                    <div className="w-2 h-2 bg-accent-blue rounded-full shadow-[0_0_10px_rgba(56,189,248,0.3)] animate-pulse" />
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors h-10 hover:bg-slate-50">
                    Open Messenger
                </Button>
             </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, subtext, accent }: { icon: React.ReactNode; label: string; value: string; subtext: string; accent: string }) {
  return (
    <Card className="bg-white border-none transition-all group overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary-600/5 p-10 rounded-[2.5rem] relative">
      <div className={`absolute top-0 left-0 w-full h-1.5 ${accent} opacity-20`} />
      <div className="flex items-center gap-6 mb-6 relative z-10">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">{icon}</div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 italic font-display">{label}</span>
      </div>
      <div className="relative z-10">
        <h3 className="text-5xl font-bold tracking-tighter mb-2 font-display italic text-slate-950 leading-none">{value}</h3>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{subtext}</p>
      </div>
    </Card>
  );
}
