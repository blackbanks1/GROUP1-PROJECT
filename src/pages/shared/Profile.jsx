import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  MapPin, 
  Link as LinkIcon, 
  Mail, 
  FileText,
  Github,
  Linkedin,
  Twitter,
  Plus,
  Verified,
  Sparkles,
  Award,
  ShieldCheck,
  Download
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_USERS, MOCK_CERTIFICATES } from '@/mocks';

export default function ProfilePage() {
  const { id } = useParams();
  const user = MOCK_USERS.find(u => u.id === id) || MOCK_USERS[0];
  const userCerts = MOCK_CERTIFICATES.filter(c => c.studentId === user.id && c.status === 'approved');
  
  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Profile Header Card */}
      <Card className="bg-white border-slate-100 overflow-hidden relative shadow-sm rounded-[2.5rem] border-none">
        <div className="h-64 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-primary-100/30" />
            
            {/* Atmosphere Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-50/30 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
        </div>
        <CardContent className="p-10 pt-0 relative">
          <div className="flex flex-col md:flex-row items-end gap-8 -mt-24 mb-10">
            <div className="relative group">
               <Avatar className="w-48 h-48 border-[12px] border-white rounded-[2.5rem] shadow-xl relative bg-white">
                 <AvatarImage src={user.avatar} className="object-cover" />
                 <AvatarFallback className="bg-primary-600 text-white text-6xl font-black italic font-display">{user.name[0]}</AvatarFallback>
               </Avatar>
               <div className="absolute bottom-4 right-4 bg-emerald-500 p-2 rounded-xl border-4 border-white shadow-lg">
                  <Verified className="w-5 h-5 text-white" />
               </div>
            </div>

            <div className="flex-1 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h1 className="text-4xl font-bold tracking-tighter font-display italic uppercase text-slate-900">{user.name}</h1>
                    <Sparkles className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary-50 text-primary-600 border border-primary-100 px-4 py-1.5 font-black text-[10px] uppercase tracking-widest leading-none shadow-sm">
                      Verified {user.role}
                    </Badge>
                    <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">&bull; Since {user.createdAt || '2023'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tight">
                  <GraduationCap className="w-4 h-4 text-primary-600" />
                  <span>University of Tech</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-tight">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button variant="outline" className="bg-white border-slate-200 hover:bg-slate-50 rounded-2xl h-14 px-10 text-[10px] font-black uppercase tracking-widest transition-all shadow-sm text-slate-500 hover:text-slate-900">
                  Follow Link
                </Button>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 px-10 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary-600/10 border-none group transition-all hover:scale-105">
                   Direct Message
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-slate-50">
             <div className="space-y-10">
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-display italic">Professional Bio</h3>
                   <Card className="bg-slate-50/50 border-slate-100 p-6 rounded-3xl border-none shadow-sm">
                      <p className="text-sm text-slate-600 leading-relaxed font-bold italic font-display">
                        "{user.bio || 'Architecting high-performance digital systems and forging the next generation of professional talent with cutting-edge expertise.'}"
                      </p>
                   </Card>
                </div>

                <div className="space-y-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 font-display italic">Contact Sync</h3>
                   <div className="space-y-4">
                      <a href={`mailto:${user.email}`} className="flex items-center gap-4 text-xs text-slate-400 font-bold hover:text-primary-600 transition-all group">
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                           <Mail className="w-4 h-4" />
                        </div>
                        {user.email}
                      </a>
                      <a href="#" className="flex items-center gap-4 text-xs text-slate-400 font-bold hover:text-primary-600 transition-all group">
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm border border-slate-100">
                           <Github className="w-4 h-4" />
                        </div>
                        github.com/professional
                      </a>
                      <a href="#" className="flex items-center gap-4 text-xs text-slate-400 font-bold hover:text-primary-600 transition-all group">
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#0077b5] group-hover:text-white transition-all shadow-sm border border-slate-100">
                           <Linkedin className="w-4 h-4" />
                        </div>
                        linkedin.com/in/leader
                      </a>
                   </div>
                </div>
             </div>

             <div className="md:col-span-2">
                <Tabs defaultValue="projects" className="w-full">
                  <TabsList className="bg-slate-50/50 border border-slate-100 p-1.5 rounded-2xl mb-10 inline-flex shadow-sm">
                    {['projects', 'experience', 'skills', 'certificates'].map((tab) => (
                      <TabsTrigger 
                        key={tab}
                        value={tab} 
                        className="rounded-xl text-[10px] font-black uppercase tracking-[0.2em] py-3.5 px-8 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-lg shadow-primary-600/10 transition-all"
                      >
                         {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  <TabsContent value="certificates" className="space-y-6 outline-none">
                    {userCerts.length > 0 ? userCerts.map((cert) => (
                      <Card key={cert.id} className="bg-slate-900 border-none rounded-[2.5rem] p-10 relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 shadow-2xl">
                         <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                         <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-600/5 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                         
                         <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                               <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                                  <Award className="w-8 h-8" />
                               </div>
                               <div className="text-right">
                                  <Badge className="bg-emerald-500 text-white border-none font-bold text-[10px] uppercase tracking-widest px-4 py-1.5 shadow-lg shadow-emerald-500/20">Official Credential</Badge>
                                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] mt-3">ID: {cert.id.toUpperCase()}</p>
                               </div>
                            </div>

                            <div className="space-y-6 mb-12">
                               <h4 className="text-4xl font-bold text-white tracking-tight leading-none uppercase italic font-display">{cert.className}</h4>
                               <div className="flex items-center gap-6">
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Final Grade</p>
                                     <p className="text-3xl font-black text-primary-400 italic font-display">{cert.grade}</p>
                                  </div>
                                  <div className="w-px h-10 bg-white/10" />
                                  <div className="space-y-1">
                                     <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Lecturer</p>
                                     <p className="text-sm font-bold text-white uppercase tracking-tight">{cert.lecturerName}</p>
                                  </div>
                               </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                                     <ShieldCheck className="w-5 h-5" />
                                  </div>
                                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">Admin Verified</span>
                               </div>
                               <Button variant="ghost" className="text-primary-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-widest text-[10px] gap-2 rounded-xl">
                                  <Download className="w-4 h-4" />
                                  Secure Download
                               </Button>
                            </div>
                         </div>
                      </Card>
                    )) : (
                      <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-slate-50/20">
                         <Award className="w-12 h-12 text-slate-200 mb-4" />
                         <h4 className="font-bold text-xl text-slate-900 uppercase italic font-display">No Credentials Yet</h4>
                         <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-xs leading-relaxed">Complete class activities and achieve high progress to earn your verified certificates.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4 outline-none">
                    <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer bg-slate-50/20">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                            <Plus className="w-10 h-10 text-slate-200 group-hover:text-white transition-transform group-hover:rotate-90" />
                        </div>
                        <h4 className="font-bold text-2xl mb-2 text-slate-900 font-display uppercase italic">Showcase Growth</h4>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">Upload your academic or professional projects to impress the top hiring partners.</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="experience" className="space-y-4 outline-none">
                    <ExperienceItem 
                      title="Lead Solutions Architect (Intern)"
                      company="Tech Giant Systems"
                      period="May 2024 - Present"
                      description="Designing high-availability cloud infrastructure and optimizing frontend delivery performance."
                    />
                    <ExperienceItem 
                      title="Fullstack Development Lead"
                      company="University Research Lab"
                      period="Jan 2023 - April 2024"
                      description="Lead developer for the Campus Resource Optimization project, reaching over 10,000 active students."
                    />
                  </TabsContent>

                  <TabsContent value="skills" className="flex flex-wrap gap-3 outline-none">
                    {['React Expert', 'TypeScript', 'System Architecture', 'UI/UX Strategy', 'Cloud Infrastructure', 'Product Management', 'DevOps', 'GenAI Tools', 'Data Strategy'].map(skill => (
                      <Badge key={skill} className="bg-white hover:bg-primary-50 border border-slate-100 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl text-slate-400 hover:text-primary-600 hover:border-primary-200 cursor-default transition-all shadow-sm">
                        {skill}
                      </Badge>
                    ))}
                  </TabsContent>
                </Tabs>
             </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ExperienceItem({ title, company, period, description }) {
  return (
    <div className="flex gap-8 group">
      <div className="relative">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border border-slate-100 group-hover:border-primary-400 transition-all group-hover:bg-primary-50 shadow-sm active:scale-95">
          <Briefcase className="w-6 h-6 text-slate-200 group-hover:text-primary-600 transition-colors" />
        </div>
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-50 rounded-full" />
      </div>
      <div className="pb-10 flex-1">
        <h4 className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors mb-2 italic font-display uppercase">{title}</h4>
        <div className="flex items-center gap-3 mb-4">
           <span className="text-[10px] text-primary-600 font-black uppercase tracking-[0.2em] px-3 py-1 bg-primary-50 rounded-lg border border-primary-100 shadow-sm">{company}</span>
           <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.1em]">{period}</span>
        </div>
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}
