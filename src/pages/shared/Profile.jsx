import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Download,
  Camera,
  Edit3,
  Check,
  X as XIcon,
  Globe
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { MOCK_CERTIFICATES, MOCK_USERS } from '@/mocks';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editData, setEditData] = React.useState({ bio: '', github: '', name: '' });
  const fileInputRef = React.useRef(null);

  // Use current user from local storage or default to first mock user for permissions check
  const savedRole = localStorage.getItem('careerlink_role') || 'student';
  const loggedInUser = MOCK_USERS.find(u => u.role === savedRole) || MOCK_USERS[0];
  const isOwnProfile = loggedInUser.id === id || (!id && loggedInUser.id === 's1');

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const userId = id || localStorage.getItem('careerlink_user_id') || 's1';
        const userData = await api.getUser(userId);
        setUser(userData);
        setEditData({ bio: userData.bio || '', github: userData.github || '', name: userData.name });
      } catch (error) {
        toast.error('Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    }
    fetchUser();
  }, [id]);

  const handleUpdateProfile = async () => {
    try {
      const updatedUser = await api.updateProfile(user.id, editData);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const updatedUser = await api.updateProfile(user.id, { avatar: reader.result });
          setUser(updatedUser);
          toast.success('Profile picture updated');
        } catch (error) {
          toast.error('Failed to upload image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const userCerts = MOCK_CERTIFICATES.filter(c => c.studentId === user?.id && c.status === 'approved');

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-20">
      {/* Profile Header Card */}
      <Card className="bg-white border-slate-100 overflow-hidden relative shadow-sm rounded-[2.5rem] border-none">
        <div className="h-64 bg-slate-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-transparent to-primary-100/30" />
            
            {/* Atmosphere Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-50/30 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />

            {isOwnProfile && (
              <div className="absolute top-8 right-8 z-20">
                 <Button 
                   onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}
                   className={`${isEditing ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-white/80 backdrop-blur-md text-slate-900 hover:bg-white'} border-none rounded-2xl h-12 px-6 font-bold text-xs uppercase transition-all shadow-xl`}
                 >
                   {isEditing ? <><Check className="w-4 h-4 mr-2" /> Save Changes</> : <><Edit3 className="w-4 h-4 mr-2" /> Edit Profile</>}
                 </Button>
                 {isEditing && (
                   <Button 
                     onClick={() => setIsEditing(false)}
                     variant="ghost"
                     className="ml-2 bg-white/50 backdrop-blur-md text-slate-600 hover:bg-white rounded-2xl h-12 w-12 p-0 border-none shadow-xl"
                   >
                     <XIcon className="w-4 h-4" />
                   </Button>
                 )}
              </div>
            )}
        </div>
        <CardContent className="p-10 pt-0 relative">
          <div className="flex flex-col md:flex-row items-end gap-8 -mt-24 mb-10">
            <div className="relative group">
               <Avatar className="w-48 h-48 border-[12px] border-white rounded-[2.5rem] shadow-xl relative bg-white overflow-hidden">
                 <AvatarImage src={user.avatar} className="object-cover h-full w-full" />
                 <AvatarFallback className="bg-primary-600 text-white text-6xl font-bold">{user.name[0]}</AvatarFallback>
                 
                 {isOwnProfile && (
                   <div 
                     onClick={() => fileInputRef.current?.click()}
                     className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white gap-2"
                   >
                      <Camera className="w-8 h-8" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Update Photo</span>
                   </div>
                 )}
               </Avatar>
               <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleImageUpload} 
                 className="hidden" 
                 accept="image/*"
               />
               <div className="absolute bottom-4 right-4 bg-emerald-500 p-2 rounded-xl border-4 border-white shadow-lg">
                  <Verified className="w-5 h-5 text-white" />
               </div>
            </div>

            <div className="flex-1 pb-4 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                <div className="space-y-1 w-full">
                  <div className="flex items-center gap-3">
                    {isEditing ? (
                      <Input 
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="text-2xl font-bold bg-slate-50 border-slate-100 h-12 max-w-md"
                      />
                    ) : (
                      <h1 className="text-4xl font-bold tracking-tight text-slate-900">{user.name}</h1>
                    )}
                    <Sparkles className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary-50 text-primary-600 border border-primary-100 px-4 py-1.5 font-bold text-xs uppercase tracking-wide leading-none shadow-sm">
                      Verified {user.role}
                    </Badge>
                    <span className="text-slate-500 text-xs font-bold uppercase tracking-wide">&bull; Since 2023</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-slate-600 text-sm font-bold uppercase tracking-tight">
                  <GraduationCap className="w-4 h-4 text-primary-600" />
                  <span>University of Tech</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 text-sm font-bold uppercase tracking-tight">
                  <MapPin className="w-4 h-4 text-primary-600" />
                  <span>San Francisco, CA</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (user.github) {
                      window.open(`https://${user.github.replace('https://', '')}`, '_blank');
                    } else if (isOwnProfile) {
                      setIsEditing(true);
                      toast.info('Please enter your GitHub handle in the edit field.');
                    }
                  }} 
                  className={`bg-white border-slate-200 hover:bg-slate-50 rounded-2xl h-14 px-10 text-xs font-bold uppercase tracking-wide transition-all shadow-sm ${!user.github && isOwnProfile ? 'text-primary-600 border-primary-200' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  {!user.github && isOwnProfile ? (
                    <><Plus className="w-4 h-4 mr-2" /> Connect GitHub</>
                  ) : (
                    <>Follow Link</>
                  )}
                </Button>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 px-10 text-xs font-bold uppercase tracking-wide shadow-xl shadow-primary-600/10 border-none group transition-all hover:scale-105">
                   Direct Message
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-12 border-t border-slate-50">
             <div className="space-y-10">
                <div className="space-y-4">
                   <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">Professional Bio</h3>
                   <Card className="bg-slate-50/50 border-slate-100 p-6 rounded-3xl border-none shadow-sm">
                      {isEditing ? (
                        <Textarea 
                          value={editData.bio}
                          onChange={(e) => setEditData({...editData, bio: e.target.value})}
                          className="bg-transparent border-none focus-visible:ring-0 p-0 text-base text-slate-700 leading-relaxed font-medium min-h-[120px]"
                          placeholder="Tell your professional story..."
                        />
                      ) : (
                        <p className="text-base text-slate-700 leading-relaxed font-medium">
                          "{user.bio || 'Architecting high-performance digital systems and forging the next generation of professional talent with cutting-edge expertise.'}"
                        </p>
                      )}
                   </Card>
                </div>

                <div className="space-y-4">
                   <h3 className="text-xs font-bold uppercase tracking-wide text-slate-600">Contact Sync</h3>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-bold group">
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                           <Mail className="w-4 h-4" />
                        </div>
                        <span className="truncate">{user.email}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-600 font-bold hover:text-primary-600 transition-all group cursor-pointer w-full">
                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm border border-slate-100">
                           <Github className="w-4 h-4" />
                        </div>
                        {isEditing ? (
                          <Input 
                            value={editData.github}
                            onChange={(e) => setEditData({...editData, github: e.target.value})}
                            placeholder="github.com/username"
                            className="bg-slate-50 border-slate-100 h-10 flex-1"
                          />
                        ) : (
                          <span onClick={() => window.open(`https://${user.github || 'github.com'}`, '_blank')}>{user.github || 'github.com/professional'}</span>
                        )}
                      </div>
                      <a href="#" className="flex items-center gap-4 text-sm text-slate-600 font-bold hover:text-primary-600 transition-all group">
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
                        className="rounded-xl text-xs font-bold uppercase tracking-wide py-3.5 px-8 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-lg shadow-primary-600/10 transition-all"
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
                               </div>
                            </div>

                            <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-emerald-400 border border-white/10">
                                     <ShieldCheck className="w-5 h-5" />
                                  </div>
                                  <span className="text-xs font-bold uppercase tracking-wide text-white/60">Admin Verified</span>
                               </div>
                               <Button variant="ghost" className="text-primary-400 hover:text-white hover:bg-white/5 font-bold uppercase tracking-wide text-xs gap-2 rounded-xl">
                                  <Download className="w-4 h-4" />
                                  Secure Download
                               </Button>
                            </div>
                         </div>
                      </Card>
                    )) : (
                      <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center bg-slate-50/20">
                         <Award className="w-12 h-12 text-slate-300 mb-4" />
                         <h4 className="font-bold text-xl text-slate-900 uppercase">No Credentials Yet</h4>
                         <p className="text-sm text-slate-600 font-bold uppercase tracking-wide mt-2 max-w-xs leading-relaxed">Complete class activities and achieve high progress to earn your verified certificates.</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="projects" className="space-y-4 outline-none">
                    <div className="p-20 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center group hover:border-primary-400 hover:bg-primary-50/50 transition-all cursor-pointer bg-slate-50/20">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-sm border border-slate-100">
                            <Plus className="w-10 h-10 text-slate-300 group-hover:text-white transition-transform group-hover:rotate-90" />
                        </div>
                        <h4 className="font-bold text-2xl mb-2 text-slate-900 uppercase">Showcase Growth</h4>
                        <p className="text-sm text-slate-600 font-bold uppercase tracking-wide max-w-xs mx-auto leading-relaxed">Upload your academic or professional projects to impress the top hiring partners.</p>
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
                      <Badge key={skill} className="bg-white hover:bg-primary-50 border border-slate-100 px-6 py-3 text-xs font-bold uppercase tracking-wide rounded-xl text-slate-600 hover:text-primary-600 hover:border-primary-200 cursor-default transition-all shadow-sm">
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
          <Briefcase className="w-6 h-6 text-slate-300 group-hover:text-primary-600 transition-colors" />
        </div>
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-0.5 h-full bg-slate-100 rounded-full" />
      </div>
      <div className="pb-10 flex-1">
        <h4 className="font-bold text-xl tracking-tight text-slate-900 group-hover:text-primary-600 transition-colors mb-2 uppercase">{title}</h4>
        <div className="flex items-center gap-3 mb-4">
           <span className="text-xs text-primary-600 font-bold uppercase tracking-wide px-3 py-1 bg-primary-50 rounded-lg border border-primary-100 shadow-sm">{company}</span>
           <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">{period}</span>
        </div>
        <p className="text-base text-slate-600 leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
}
