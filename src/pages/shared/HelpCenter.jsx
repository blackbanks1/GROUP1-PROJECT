import { motion } from 'motion/react';
import { 
  HelpCircle, 
  Search, 
  MessageCircle, 
  FileText, 
  Video, 
  Zap, 
  ArrowRight,
  ExternalLink,
  LifeBuoy,
  Book,
  ShieldQuestion
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HelpCenter() {
  const categories = [
    { icon: <FileText />, title: 'Documentation', count: '45 Guides' },
    { icon: <Video />, title: 'Tutorials', count: '12 Classes' },
    { icon: <ShieldQuestion />, title: 'FAQs', count: '80 Answers' },
    { icon: <MessageCircle />, title: 'Direct Support', count: '24/7 Active' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto py-12">
        <div className="flex items-center gap-3">
           <div className="p-3 bg-primary-50 rounded-2xl shadow-sm border border-primary-100">
              <LifeBuoy className="w-8 h-8 text-primary-600" />
           </div>
           <span className="text-[12px] uppercase font-black tracking-[0.5em] text-primary-600">Support Terminal</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-display leading-[1.1] italic text-slate-900">
          How can we <br /> <span className="text-primary-600 uppercase">Assist</span> your journey?
        </h1>
        <div className="w-full relative group max-w-2xl">
           <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-primary-600 transition-colors" />
           <Input 
             placeholder="Search for solutions, documentation, or technical guides..." 
             className="h-20 bg-white border-slate-100 shadow-xl rounded-[2.5rem] pl-20 text-xl font-medium focus-visible:ring-primary-400 placeholder:text-slate-200 transition-all" 
           />
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
         {categories.map((cat, idx) => (
           <Card key={idx} className="bg-white border-none shadow-sm hover:shadow-md transition-all group p-10 flex flex-col items-center text-center gap-6 rounded-[3rem] cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white group-hover:rotate-12 transition-all relative z-10 shadow-sm">
                 {cat.icon}
              </div>
              <div className="space-y-1 relative z-10">
                 <h4 className="text-xl font-bold italic uppercase tracking-tight text-slate-900 font-display">{cat.title}</h4>
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">{cat.count}</p>
              </div>
           </Card>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-12">
         <section className="space-y-8">
            <h3 className="text-3xl font-bold italic uppercase font-display border-b border-slate-100 pb-6 text-slate-900">Solutions Hub</h3>
            <div className="space-y-4">
               {['How to optimize your resume for AI?', 'Setting up your first internship meeting', 'Verifying certificates from external partners', 'Connecting with verified mentors'].map((q, i) => (
                 <Card key={i} className="bg-white border-slate-50 hover:border-slate-100 transition-all p-6 group cursor-pointer flex items-center justify-between rounded-2xl shadow-sm border">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-primary-600 transition-colors capitalize italic font-display">{q}</span>
                    <ArrowRight className="w-5 h-5 text-slate-200 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
                 </Card>
               ))}
            </div>
         </section>

         <Card className="bg-primary-50 border-none p-16 rounded-[4rem] relative overflow-hidden flex flex-col items-center justify-center text-center gap-10 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent" />
            <div className="relative z-10 space-y-8 w-full max-w-sm">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl shadow-primary-200 relative">
                  <div className="absolute inset-0 rounded-full border-4 border-primary-600/10 animate-ping" />
                  <MessageCircle className="w-12 h-12 text-primary-600 relative z-10" />
               </div>
               <div className="space-y-3">
                  <h3 className="text-4xl font-bold tracking-tight italic uppercase font-display text-slate-900">Live Support</h3>
                  <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">Average response interval: 2.5 minutes</p>
               </div>
               <Button className="bg-primary-600 hover:bg-primary-700 h-16 w-full rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary-600/10 border-none transition-all hover:scale-105 text-white">
                  Open Direct Channel
               </Button>
            </div>
         </Card>
      </div>
    </div>
  );
}
