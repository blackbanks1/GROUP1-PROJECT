import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Award, 
  Download, 
  Share2, 
  Search, 
  ShieldCheck, 
  ExternalLink,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function Certificates() {
  const studentId = localStorage.getItem('careerlink_user_id') || 's1';
  const [certificates, setCertificates] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadCertificates() {
      try {
        const data = await api.getStudentCertificates(studentId);
        setCertificates(data);
      } catch (error) {
        toast.error('Failed to load certificates');
      } finally {
        setIsLoading(false);
      }
    }
    loadCertificates();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-emerald-500 rounded-full" />
             <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">Verified Credentials</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Academic Achievements</h1>
          <p className="text-slate-500 text-base">Your official industry-recognized mastery certificates.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
           {certificates.map((cert) => (
             <Card key={cert.id} className="bg-slate-900 border-none rounded-[2.5rem] p-10 relative overflow-hidden group hover:scale-[1.01] transition-all duration-500 shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                
                <div className="relative z-10">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                         <Award className="w-8 h-8" />
                      </div>
                      <div className="text-right">
                         <Badge className="bg-emerald-500 text-white border-none font-bold text-xs uppercase tracking-wide px-4 py-1.5 shadow-lg shadow-emerald-500/20">Official Credential</Badge>
                         <p className="text-xs font-bold text-white/50 uppercase tracking-wide mt-3">ID: {cert.id.toUpperCase()}</p>
                      </div>
                   </div>

                   <div className="space-y-6 mb-12">
                      <h4 className="text-4xl font-bold text-white tracking-tight leading-none uppercase">{cert.className}</h4>
                      <div className="flex items-center gap-6">
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-wide">Final Grade</p>
                            <p className="text-3xl font-bold text-primary-400">{cert.grade}</p>
                         </div>
                         <div className="w-px h-10 bg-white/10" />
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-wide">Lecturer</p>
                            <p className="text-base font-bold text-white uppercase tracking-tight">{cert.lecturerName}</p>
                         </div>
                         <div className="w-px h-10 bg-white/10" />
                         <div className="space-y-1">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-wide">Issued</p>
                            <p className="text-base font-bold text-white uppercase tracking-tight">{cert.issuedDate}</p>
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                            <ShieldCheck className="w-5 h-5" />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-wide text-white/60">Institutional Verification Active</span>
                      </div>
                      <Button variant="ghost" className="text-primary-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-wide text-xs gap-2 rounded-xl">
                         <Download className="w-4 h-4" />
                         Secure Download
                      </Button>
                   </div>
                </div>
             </Card>
           ))}

           {certificates.length === 0 && (
             <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-slate-50/20">
                <Award className="w-12 h-12 text-slate-300 mb-4" />
                <h4 className="font-bold text-xl text-slate-900 uppercase">No Credentials Yet</h4>
                <p className="text-sm text-slate-600 font-bold uppercase tracking-wide mt-2 max-w-xs leading-relaxed">Complete your course activities with excellence to unlock institutional certificates.</p>
             </div>
           )}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <Card className="bg-white border-slate-100 rounded-3xl p-8 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8 px-2">Skill Breakdown</h3>
              <div className="space-y-8">
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center border border-primary-100 shadow-sm">
                       <Zap className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Skill Units</p>
                       <h4 className="text-3xl font-bold text-slate-950 leading-none">{certificates.length * 15}</h4>
                    </div>
                 </div>
                 <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                       <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Badges Earned</p>
                       <h4 className="text-3xl font-bold text-slate-950 leading-none">{certificates.length + 2}</h4>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}
