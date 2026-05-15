import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Download, 
  Plus, 
  Trash2, 
  Layout, 
  Eye, 
  Sparkles,
  Save,
  CheckCircle2,
  ChevronRight,
  User,
  GraduationCap,
  Briefcase,
  Wand2
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState('personal');

  const steps = [
    { id: 'personal', label: 'Identity', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Skills', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <Layout className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Document Architect</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Resume <span className="text-primary-600">Builder</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            Engineer a high-conversion professional profile. Our intelligent builder optimizes your structure for both AI scanners and human reviewers.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" className="h-14 px-8 border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 font-bold uppercase tracking-widest text-[10px] bg-white">
              <Save className="w-4 h-4 mr-3" /> Auto-saved
           </Button>
           <Button className="bg-primary-600 hover:bg-primary-700 h-14 px-8 rounded-2xl text-white font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/10">
              <Download className="w-4 h-4 mr-3" /> Export PDF
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Editor Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-slate-50 border border-slate-200 p-3 rounded-[2.5rem] flex flex-col gap-2 shadow-sm">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`flex items-center justify-between p-5 rounded-[1.5rem] transition-all group ${
                    activeTab === step.id 
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-600/10' 
                      : 'text-slate-400 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-xl transition-all ${
                       activeTab === step.id ? 'bg-white/20' : 'bg-slate-100'
                     }`}>
                        {step.icon}
                     </div>
                     <span className="font-bold text-sm uppercase tracking-tight">{step.label}</span>
                  </div>
                  {activeTab === step.id && <ChevronRight className="w-5 h-5" />}
                </button>
              ))}
           </div>

           <Card className="bg-primary-50 border-primary-100 p-8 rounded-[2rem] relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 p-4">
                 <Sparkles className="w-6 h-6 text-primary-600 opacity-40" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-4">AI Optimizer</p>
              <h4 className="font-bold text-primary-950 mb-4 leading-tight">Your summary needs more action verbs.</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">
                 Try replacing "Worked on" with "Architected" or "Spearheaded" to improve recruiter engagement.
              </p>
              <Button variant="outline" className="w-full bg-white border-primary-200 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl h-11 text-[10px] font-black uppercase tracking-widest transition-all">
                 Apply Suggestions
              </Button>
           </Card>
        </div>

        {/* Editor Content & Live Preview */}
        <div className="lg:col-span-8 grid grid-cols-1 gap-10">
           {/* Form Area */}
           <Card className="bg-white border-slate-200 p-10 rounded-[3rem] shadow-sm">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="space-y-8"
                 >
                    <div className="space-y-2">
                       <h3 className="text-2xl font-bold tracking-tight capitalize text-slate-950">{activeTab} Details</h3>
                       <p className="text-slate-400 text-sm font-medium">Provide high-impact details for this section.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                          <Input placeholder="Alex Rivera" className="bg-slate-50 border-slate-200 h-14 rounded-2xl text-slate-900 font-medium" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Current Role</label>
                          <Input placeholder="Senior UI/UX Strategy" className="bg-slate-50 border-slate-200 h-14 rounded-2xl text-slate-900 font-medium" />
                       </div>
                       <div className="space-y-2 md:col-span-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Professional Summary</label>
                          <textarea 
                            placeholder="Architecting future-proof digital experiences..." 
                            className="w-full h-32 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all"
                          />
                       </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                       <Button variant="ghost" className="h-14 px-8 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-50 font-bold uppercase tracking-widest text-[10px]">
                          Clear Section
                       </Button>
                       <Button className="bg-primary-600 hover:bg-primary-700 text-white h-14 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/10 transition-all">
                          Continue to Next
                       </Button>
                    </div>
                 </motion.div>
              </AnimatePresence>
           </Card>

           {/* Quick Preview Card */}
           <section className="space-y-6">
              <div className="flex items-center justify-between px-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Live Mini Preview</h4>
                 <Button variant="ghost" className="text-primary-600 font-bold text-[10px] uppercase tracking-widest gap-2">
                    <Eye className="w-4 h-4" /> Fullscreen View
                 </Button>
              </div>
              <Card className="bg-white border-slate-200 p-12 rounded-[3rem] text-slate-950 min-h-[400px] shadow-lg">
                 <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-8">
                    <div className="space-y-2">
                       <h2 className="text-4xl font-extrabold tracking-tighter text-slate-900">Alex Rivera</h2>
                       <p className="text-primary-600 font-black text-xs uppercase tracking-widest">Senior Design Strategist</p>
                    </div>
                    <div className="text-right space-y-1">
                       <p className="text-[10px] font-bold text-slate-700">alex@careerlink.campus</p>
                       <p className="text-[10px] font-bold text-slate-700">Kigali, Rwanda</p>
                       <p className="text-[10px] font-bold text-primary-600 hover:underline cursor-pointer">linkedin.com/in/alexr</p>
                    </div>
                 </div>

                 <div className="space-y-10">
                    <section className="space-y-4">
                       <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-primary-600/20 border-b border-slate-100 pb-2">Experience</h5>
                       <div className="space-y-6">
                          <div>
                             <div className="flex justify-between font-bold text-sm mb-1 text-slate-900">
                                <span>Frontend Design Intern &bull; Google</span>
                                <span className="text-slate-400">2024 - Present</span>
                             </div>
                             <p className="text-xs leading-relaxed text-slate-500">Spearheaded the UI optimization for the internal platform, resulting in a 25% increase in productivity across 4 engineering teams.</p>
                          </div>
                       </div>
                    </section>
                 </div>
              </Card>
           </section>
        </div>
      </div>
    </div>
  );
}
