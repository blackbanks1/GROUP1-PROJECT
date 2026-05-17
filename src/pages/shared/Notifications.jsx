import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  Zap, 
  Award, 
  MessageSquare, 
  Briefcase, 
  UserPlus,
  ArrowRight,
  MoreVertical,
  X
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: 'Certification Issued',
      message: 'Your Google Cloud Training certificate has been officially verified by the Dean.',
      type: 'success',
      icon: <Award />,
      time: '1h ago',
      read: false
    },
    {
      id: 2,
      title: 'Interview Request',
      message: 'Meta Engineer Academy wants to schedule a technical deep dive for the Internship role.',
      type: 'primary',
      icon: <Briefcase />,
      time: '3h ago',
      read: false
    },
    {
      id: 3,
      title: 'Network Update',
      message: 'Dr. Sarah Smith liked your latest technical milestone broadcast.',
      type: 'info',
      icon: <Zap />,
      time: '5h ago',
      read: true
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-xs font-bold uppercase tracking-wide text-primary-600">Alert Center</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
            Global Notifications
          </h1>
          <p className="text-slate-500 text-base">Stay updated on your certifications, career matches, and network activity.</p>
        </div>
        <Button variant="outline" onClick={() => toast.success('All notifications marked as resolved')} className="text-xs font-bold uppercase tracking-wide h-10 px-6 rounded-xl border-slate-100 hover:bg-slate-50 transition-all">
          Mark All As Read
        </Button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <Card key={notif.id} className={`group border-slate-100 transition-all duration-300 rounded-[2rem] overflow-hidden border-none shadow-sm ${notif.read ? 'bg-white' : 'bg-primary-50/30'}`}>
            <CardContent className="p-8">
               <div className="flex items-start gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all shadow-sm ${
                    notif.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                    notif.type === 'primary' ? 'bg-primary-50 text-primary-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>
                    {React.cloneElement(notif.icon, { className: "w-6 h-6" })}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                        <h4 className={`text-xl font-bold tracking-tight uppercase ${notif.read ? 'text-slate-900' : 'text-slate-400'}`}>{notif.title}</h4>
                        <span className="text-xs font-bold text-slate-300 uppercase">{notif.time}</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                      {notif.message}
                    </p>
                    
                    <div className="pt-4 flex items-center gap-4">
                       <Button variant="ghost" onClick={() => toast.info('Accessing related transmission or asset...')} className="p-0 h-auto text-xs font-bold uppercase tracking-wide text-primary-600 hover:bg-transparent flex items-center gap-2 group/btn">
                          Take Action <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-all" />
                       </Button>
                       <div className="w-1 h-1 rounded-full bg-slate-200" />
                       <Button variant="ghost" onClick={() => toast.info('Notification archived')} className="p-0 h-auto text-xs font-bold uppercase tracking-wide text-slate-300 hover:text-red-500">Dismiss</Button>
                    </div>
                  </div>

                  <Button variant="ghost" size="icon" className="text-slate-200 hover:text-slate-900 group-hover:opacity-100 opacity-0 transition-all">
                     <MoreVertical className="w-5 h-5" />
                  </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pt-12 text-center">
         <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">End of Notifications</p>
      </div>
    </div>
  );
}
