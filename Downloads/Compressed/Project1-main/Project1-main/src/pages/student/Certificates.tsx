import { motion } from 'motion/react';
import { 
  Award, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Zap,
  Briefcase,
  Share2,
  Trash2,
  FileBadge
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const CERTIFICATES = [
  {
    id: '1',
    title: 'Advanced System Architecture',
    issuer: 'CareerLink Academy',
    date: 'May 12, 2024',
    type: 'Professional',
    verifyId: 'CL-882-991',
    status: 'Verified',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=ASA'
  },
  {
    id: '2',
    title: 'UI Design Fundamentals',
    issuer: 'Google Design',
    date: 'April 28, 2024',
    type: 'Specialization',
    verifyId: 'G-DF-4422',
    status: 'Verified',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=GDF'
  },
  {
    id: '3',
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'March 15, 2024',
    type: 'Industry Certification',
    verifyId: 'AWS-CP-1029',
    status: 'Verified',
    image: 'https://api.dicebear.com/7.x/initials/svg?seed=AWS'
  }
];

export default function Certificates() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Verified Accomplishments</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            My <span className="text-primary-600">Certificates</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            A secure repository of your professional validation. These certificates are dynamically linked to your profile and visible to elite recruiters.
          </p>
        </div>
        <div className="flex items-center gap-4">
           <Button className="bg-primary-600 hover:bg-primary-700 h-16 px-10 rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/10 text-white">
              <Plus className="w-4 h-4 mr-3" /> Add Certificate
           </Button>
        </div>
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <Card className="bg-primary-50 border-primary-100 p-8 flex items-center justify-between col-span-1 lg:col-span-1 shadow-sm">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-primary-600 mb-1">Total Earned</p>
               <h3 className="text-4xl font-extrabold text-slate-900">14</h3>
            </div>
            <Award className="w-10 h-10 text-primary-600 opacity-20" />
         </Card>
         <div className="lg:col-span-3 h-24 bg-slate-50 border border-slate-200 rounded-[2.5rem] flex items-center px-8 focus-within:border-primary-400 transition-all shadow-sm">
            <Search className="w-6 h-6 text-slate-400 mr-6" />
            <Input 
              placeholder="Filter by title, issuer, or verification ID..." 
              className="bg-transparent border-none focus-visible:ring-0 text-lg font-medium placeholder:text-slate-300 text-slate-900" 
            />
         </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {CERTIFICATES.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 group hover:border-primary-400 transition-all overflow-hidden flex flex-col rounded-[2.5rem] shadow-sm hover:shadow-md">
               <div className="aspect-[16/10] bg-slate-50 p-12 relative overflow-hidden flex items-center justify-center border-b border-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none" />
                  <div className="relative z-10 text-center space-y-4">
                     <FileBadge className="w-16 h-16 text-primary-600 mx-auto opacity-20" />
                     <h4 className="text-xl font-bold text-slate-900 font-display italic leading-tight">{cert.title}</h4>
                     <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Credential Validation</p>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                     <div className="space-y-0.5">
                        <p className="text-[7px] font-black uppercase tracking-tighter text-slate-300">Authorized By</p>
                        <p className="text-[9px] font-bold text-slate-600">{cert.issuer}</p>
                     </div>
                     <div className="w-12 h-12 rounded-full border-4 border-primary-100 flex items-center justify-center bg-white shadow-sm">
                        <ShieldCheck className="w-6 h-6 text-primary-600" />
                     </div>
                  </div>
               </div>
               <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
                  <div className="space-y-4 flex-1">
                     <div className="flex items-center justify-between">
                        <Badge className="bg-primary-50 text-primary-600 border border-primary-100 font-black text-[9px] uppercase tracking-widest px-3 py-1">
                           {cert.type}
                        </Badge>
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{cert.date}</span>
                     </div>
                     <h3 className="text-2xl font-bold tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors uppercase italic">{cert.title}</h3>
                     <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verify ID:</span>
                        <code className="text-[10px] font-bold text-primary-600 tracking-wider">{cert.verifyId}</code>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                     <Button variant="outline" className="border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest transition-all bg-white">
                        <Download className="w-4 h-4 mr-2" /> Download
                     </Button>
                     <Button variant="outline" className="border-slate-200 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl h-12 text-[10px] font-black uppercase tracking-widest transition-all bg-white">
                        <Share2 className="w-4 h-4 mr-2" /> Share
                     </Button>
                  </div>
               </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Verification Tool Box */}
      <Card className="bg-slate-900 p-12 overflow-hidden relative rounded-[3rem] shadow-xl">
         <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <ShieldCheck className="w-48 h-48 text-white" />
         </div>
         <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            <div className="space-y-4">
               <h3 className="text-3xl font-bold tracking-tight font-display italic uppercase text-white">Verification Engine</h3>
               <p className="text-slate-400 text-sm font-medium max-w-lg">
                  Third-party organizations can verify your achievements instantly using our secure hashing system. Keep your profile public for automated recruiter credential checks.
               </p>
            </div>
            <div className="flex-1 w-full max-w-md">
               <Input placeholder="Enter Verify ID to test..." className="h-16 bg-white/10 border-white/10 rounded-2xl mb-4 text-center font-bold tracking-widest uppercase text-xs text-white placeholder:text-slate-500 focus:border-primary-400 transition-all" />
               <Button className="w-full h-16 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary-600/20">Verify Credential</Button>
            </div>
         </div>
      </Card>
    </div>
  );
}
