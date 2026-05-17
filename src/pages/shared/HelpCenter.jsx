import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Book, 
  MessageCircle, 
  Zap, 
  ChevronRight, 
  HelpCircle,
  Shield,
  LifeBuoy,
  FileText,
  Mail,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export default function HelpCenterPage() {
  const categories = [
    { title: 'Technical Mastery', icon: <Zap /> },
    { title: 'Ecosystem Credits', icon: <Shield /> },
    { title: 'Partner Disputes', icon: <LifeBuoy /> },
    { title: 'Global Directory', icon: <Search /> },
  ];

  const faqs = [
    'How do I verify my industry certifications?',
    'What are ecosystem credits and how to earn them?',
    'Connecting with top-tier technical mentors',
    'Dispute resolution for internship projects'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 font-sans pb-20">
      {/* Search Hero */}
      <div className="text-center space-y-8 pt-12">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
          Ecosystem <span className="text-primary-600">Support</span>
        </h1>
        <p className="text-slate-500 text-xl font-normal max-w-xl mx-auto leading-relaxed">
           Find technical specifications, platform guidance, and professional dispute resolution.
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300" />
          <Input 
            placeholder="Search the knowledge base..." 
            className="h-16 pl-16 rounded-2xl bg-white border-slate-100 shadow-2xl shadow-primary-600/5 text-lg border-none ring-1 ring-slate-100 focus-visible:ring-primary-600/20"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <Card key={i} onClick={() => toast.info(`Loading ${cat.title} documentation...`)} className="group hover:border-primary-100 transition-all cursor-pointer rounded-[2rem] bg-white border-slate-50 shadow-sm border-none">
             <CardContent className="p-8 text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary-600 group-hover:text-white transition-all mx-auto shadow-sm">
                   {React.cloneElement(cat.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="text-xl font-bold uppercase tracking-tight text-slate-900">{cat.title}</h4>
             </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-slate-100">
         <div className="lg:col-span-8 space-y-10">
            <h3 className="text-3xl font-bold uppercase border-b border-slate-100 pb-6 text-slate-900">Solutions Hub</h3>
            <div className="space-y-4">
               {faqs.map((q, i) => (
                 <div key={i} onClick={() => toast.info(`Opening guide: ${q}`)} className="flex items-center justify-between p-6 rounded-2xl border border-slate-50 hover:bg-slate-50/50 transition-all group cursor-pointer">
                    <span className="text-sm font-bold text-slate-500 group-hover:text-primary-600 transition-colors capitalize">{q}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-600 transition-all" />
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
               <div className="relative z-10 space-y-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                     <MessageCircle className="w-7 h-7" />
                  </div>
                  <h3 className="text-4xl font-bold tracking-tight uppercase text-white">Live Support</h3>
                  <p className="text-slate-400 font-medium text-lg leading-relaxed">
                    Our technical support agents are active 24/7 for emergency ecosystem inquiries.
                  </p>
                  <Button onClick={() => toast.success('Connecting to elite support agent...')} className="w-full h-14 bg-primary-600 text-white hover:bg-primary-700 rounded-2xl font-bold uppercase tracking-wide text-xs shadow-xl shadow-primary-600/20 border-none">
                     Initiate Chat
                  </Button>
               </div>
            </Card>

            <div className="p-8 rounded-[2rem] bg-slate-50 space-y-6">
               <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Support</span>
               </div>
               <p className="text-sm font-bold text-slate-900">support@careerlink.edu</p>
               <Button variant="link" onClick={() => toast.info('Generating support ticket...')} className="p-0 h-auto text-primary-600 font-bold text-xs uppercase tracking-wide flex items-center gap-2 group">
                  Submit Support Ticket <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-all" />
               </Button>
            </div>
         </div>
      </div>
    </div>
  );
}
