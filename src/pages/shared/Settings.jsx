import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Bell, 
  Globe, 
  Shield, 
  Zap, 
  ChevronRight,
  Database,
  Moon,
  Palette,
  CreditCard,
  Mail
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function SettingsPage() {
  const sections = [
    { id: 'profile', icon: <User />, label: 'Profile Account' },
    { id: 'security', icon: <Lock />, label: 'Auth & Security' },
    { id: 'notifications', icon: <Bell />, label: 'Global Alerts' },
    { id: 'billing', icon: <CreditCard />, label: 'Credits & Sponsorship' },
    { id: 'appearance', icon: <Palette />, label: 'Interface' },
    { id: 'privacy', icon: <Shield />, label: 'Data & Privacy' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-xs font-bold uppercase tracking-wide text-primary-600">Configuration</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Platform Settings</h1>
          <p className="text-slate-500 text-base">Manage your identity, alerts, and system preferences.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3 space-y-2">
           {sections.map(section => (
             <button key={section.id} onClick={() => toast.info(`Accessing ${section.label} configuration...`)} className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group text-left">
                <div className="p-2.5 bg-white rounded-xl border border-slate-100 text-slate-400 group-hover:text-primary-600 group-hover:border-primary-100 shadow-sm transition-all">
                   {React.cloneElement(section.icon, { className: "w-4 h-4" })}
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm">{section.label}</h4>
             </button>
           ))}
        </div>

        <div className="lg:col-span-9 space-y-8">
           <Card className="rounded-[2.5rem] border-slate-100 shadow-sm border-none bg-white">
              <CardContent className="p-10 space-y-12">
                 <section className="space-y-6">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Public Identity</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <SettingItem 
                         label="Display Name" 
                         description="How you appear to partners"
                         defaultChecked={true}
                       />
                       <SettingItem 
                         label="Professional Bio" 
                         description="Visible on your public profile"
                         defaultChecked={true}
                       />
                    </div>
                 </section>

                 <section className="space-y-6">
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">Global Signals</h3>
                    <div className="space-y-4">
                       <SettingToggle 
                         label="Activity Broadcast" 
                         description="Notify your network about milestones"
                         defaultChecked={true}
                       />
                       <SettingToggle 
                         label="Partner Inquiries" 
                         description="Allow companies to contact you directly"
                         defaultChecked={true}
                       />
                       <SettingToggle 
                         label="Smart Alerts" 
                         description="Receive AI-driven career recommendations"
                         defaultChecked={false}
                       />
                    </div>
                 </section>
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function SettingItem({ label, description }) {
  return (
    <div onClick={() => toast.info(`Updating ${label} status...`)} className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 space-y-4 group hover:bg-white hover:border-primary-100 transition-all cursor-pointer">
       <div className="flex justify-between items-start">
          <div className="space-y-1">
             <h5 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm">{label}</h5>
             <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{description}</p>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transition-all" />
       </div>
    </div>
  );
}

function SettingToggle({ label, description, defaultChecked }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 hover:border-primary-100 transition-all group">
       <div className="space-y-1">
          <h5 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase text-sm">{label}</h5>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{description}</p>
       </div>
       <Switch defaultChecked={defaultChecked} onCheckedChange={(val) => toast.success(`${label} ${val ? 'enabled' : 'disabled'}`)} className="data-[state=checked]:bg-primary-600" />
    </div>
  );
}
