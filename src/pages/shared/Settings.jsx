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
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

export default function Settings() {
  const sections = [
    { icon: <User className="w-4 h-4" />, label: 'Profile Details', sub: 'Public identity and bio' },
    { icon: <Shield className="w-4 h-4" />, label: 'Privacy & Security', sub: 'Auth and visibility' },
    { icon: <Bell className="w-4 h-4" />, label: 'Notifications', sub: 'Signal preferences' },
    { icon: <Palette className="w-4 h-4" />, label: 'Appearance', sub: 'Theme and visuals' },
    { icon: <Database className="w-4 h-4" />, label: 'Data Registry', sub: 'Manage your archives' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
           <div className="p-2 bg-primary-50 rounded-lg shadow-sm border border-primary-100">
              <SettingsIcon className="w-5 h-5 text-primary-600" />
           </div>
           <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600">Core Configuration</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display uppercase italic text-slate-900">
          System <span className="text-primary-600">Settings</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
          Fine-tune your professional interface. Adjust your neural link preferences and security protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-4">
           {sections.map((section, idx) => (
             <Card key={idx} className="bg-white border-none shadow-sm hover:shadow-md transition-all p-6 cursor-pointer group rounded-[1.8rem] relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 w-1 bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm">
                         {section.icon}
                      </div>
                      <div>
                         <h4 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase italic text-sm font-display">{section.label}</h4>
                         <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none mt-0.5">{section.sub}</p>
                      </div>
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-primary-600 transition-all transform group-hover:translate-x-1" />
                </div>
             </Card>
           ))}
        </div>

        <div className="lg:col-span-8">
           <Card className="bg-white border-none shadow-xl rounded-[3rem] p-12 space-y-12 relative overflow-hidden">
              <section className="space-y-8">
                 <h3 className="text-2xl font-bold tracking-tight font-display italic uppercase text-slate-900">Public Identity</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Display Name</label>
                       <Input placeholder="Alex Rivera" className="h-14 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 font-medium focus-visible:ring-primary-400 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Professional Email</label>
                       <Input placeholder="alex@careerlink.campus" className="h-14 bg-slate-50 border-slate-200 rounded-2xl text-slate-900 font-medium focus-visible:ring-primary-400 transition-all shadow-sm" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Short Bio</label>
                       <textarea 
                         placeholder="Architecting future-proof digital experiences..." 
                         className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 shadow-sm transition-all"
                       />
                    </div>
                 </div>
              </section>

              <section className="space-y-8 pt-12 border-t border-slate-50">
                 <h3 className="text-2xl font-bold tracking-tight font-display italic uppercase text-slate-900">Global Signals</h3>
                 <div className="space-y-6">
                    <PreferenceSwitch label="Real-time Interview Alerts" description="Instant transmission of recruiter sync requests" defaultChecked />
                    <PreferenceSwitch label="Public Profile Visibility" description="Allow verified partners to discover your roadmap" defaultChecked />
                    <PreferenceSwitch label="Collaborative Mode" description="Allow other students to see your active projects" />
                 </div>
              </section>

              <div className="flex justify-end gap-4 pt-12">
                 <Button variant="ghost" className="h-12 px-8 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 font-semibold text-sm">
                    Reset Defaults
                 </Button>
                 <Button className="bg-primary-600 hover:bg-primary-700 h-12 px-8 rounded-xl font-semibold text-sm shadow-lg shadow-primary-600/10 border-none transition-all hover:scale-105 text-white">
                    Save Changes
                 </Button>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function PreferenceSwitch({ label, description, defaultChecked = false }: { label; description; defaultChecked? }) {
  return (
    <div className="flex items-center justify-between group p-2 rounded-2xl hover:bg-slate-50/50 transition-all">
       <div className="space-y-1">
          <h5 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase italic text-sm font-display">{label}</h5>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{description}</p>
       </div>
       <Switch defaultChecked={defaultChecked} className="data-[state=checked]:bg-primary-600" />
    </div>
  );
}
