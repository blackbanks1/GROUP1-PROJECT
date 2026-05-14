import { motion } from 'motion/react';
import { 
  Bell, 
  MessageSquare, 
  Briefcase, 
  Zap, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ArrowRight,
  Info,
  Calendar,
  Filter,
  Trash2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Interview Invitation',
    description: 'Google has invited you for a technical strategic sync.',
    time: '2 hours ago',
    type: 'interview',
    read: false,
    icon: <Calendar className="w-4 h-4" />
  },
  {
    id: '2',
    title: 'Application Update',
    description: 'Your application for Stripe is now "Under Review".',
    time: '5 hours ago',
    type: 'application',
    read: true,
    icon: <Briefcase className="w-4 h-4" />
  },
  {
    id: '3',
    title: 'Network Activity',
    description: 'Sarah Chen and 4 others viewed your updated portfolio.',
    time: 'Yesterday',
    type: 'network',
    read: true,
    icon: <Zap className="w-4 h-4" />
  }
];

export default function Notifications() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-primary-50 rounded-lg shadow-sm border border-primary-100">
                <Bell className="w-5 h-5 text-primary-600" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">System Signals</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display uppercase italic text-slate-900">
            Signal <span className="text-primary-600">Center</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Real-time transmissions of your professional progress and network pulses. Stay synchronized with global opportunities.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="ghost" className="h-14 px-8 border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px] shadow-sm mb-1 bg-white">
              Mark All Read
           </Button>
           <Button variant="ghost" className="h-14 w-14 bg-white border border-slate-100 rounded-2xl text-slate-300 hover:text-rose-500 transition-all p-0 shadow-sm mb-1">
              <Trash2 className="w-5 h-5" />
           </Button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
        {['All Signals', 'Applications', 'Interviews', 'Network', 'Events', 'Learning'].map((cat) => (
          <Button key={cat} variant="ghost" className="whitespace-nowrap rounded-xl bg-white border border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-400 hover:text-primary-600 px-6 font-black text-[10px] uppercase tracking-widest h-14 shadow-sm mb-1">
            {cat}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {NOTIFICATIONS.map((notif, idx) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className={`group overflow-hidden p-8 border-none shadow-sm transition-all relative ${!notif.read ? 'bg-primary-50/30' : 'bg-white'}`}>
               {!notif.read && <div className="absolute inset-y-0 left-0 w-1 bg-primary-600" />}
               <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                    !notif.read ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/20' : 'bg-slate-50 text-slate-300'
                  }`}>
                    {notif.icon}
                  </div>
                  <div className="flex-1 space-y-1">
                     <div className="flex items-center justify-between">
                        <h4 className={`text-xl font-bold tracking-tight italic font-display uppercase ${!notif.read ? 'text-slate-900' : 'text-slate-400'}`}>{notif.title}</h4>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{notif.time}</span>
                     </div>
                     <p className={`text-sm font-medium leading-relaxed ${!notif.read ? 'text-slate-600' : 'text-slate-400'}`}>{notif.description}</p>
                     
                     <div className="pt-6 flex gap-3">
                        {!notif.read && (
                           <Button className="h-10 px-6 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-black text-[10px] uppercase tracking-widest border-none shadow-xl shadow-primary-600/10">
                              Take Action
                           </Button>
                        )}
                        <Button variant="ghost" className="h-10 px-6 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                           Dismiss
                        </Button>
                     </div>
                  </div>
                  {!notif.read && <div className="w-2.5 h-2.5 rounded-full bg-primary-600 shadow-[0_0_12px_rgba(37,99,235,0.6)] mt-2" />}
               </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
