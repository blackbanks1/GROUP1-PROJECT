import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  GraduationCap, 
  Building2, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft,
  Upload,
  Trophy,
  Briefcase,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';




export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'student', icon: <GraduationCap className="w-8 h-8" />, label: 'Student', desc: 'Looking for top-tier internships and professional mentorship.', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'company', icon: <Building2 className="w-8 h-8" />, label: 'Company', desc: 'Discovering the next generation of industry-leading talent.', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'lecturer', icon: <Users className="w-8 h-8" />, label: 'Lecturer', desc: 'Supervising student growth and bridging academia with industry.', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'admin', icon: <ShieldCheck className="w-8 h-8" />, label: 'Admin', desc: 'Managing the ecosystem and ensuring platform security.', color: 'border-primary-100 text-primary-600 bg-primary-50' },
  ];

  const handleNextStep = () => {
    if (step === 'role' && selectedRole) {
      toast.error('Please select a role to continue');
      return;
    }
    
    if (step === 'role') setStep('info');
    else if (step === 'info') setStep('setup');
    else if (step === 'setup') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep('complete');
      }, 1500);
    }
  };

  const handlePrevStep = () => {
    if (step === 'info') setStep('role');
    else if (step === 'setup') setStep('info');
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 flex items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary-50 blur-[120px] rounded-full -z-10 opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-20 -z-10" />

      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
            <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary-600/20">
                    <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-slate-950 font-display italic">CareerLink</span>
            </Link>
            
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-3 mb-4">
              {['role', 'info', 'setup', 'complete'].map((s, idx) => (
                <div 
                  key={s}
                  className={`h-1 rounded-full transition-all duration-500 shadow-sm ${
                    step === s ? 'w-12 bg-primary-600' : 'w-4 bg-slate-100'
                  }`}
                />
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
               {step === 'role' && 'Select Your Role'}
               {step === 'info' && 'Account Information'}
               {step === 'setup' && 'Profile Setup'}
               {step === 'complete' && 'Welcome Aboard'}
            </h1>
            <p className="text-slate-500 font-normal">
               {step === 'role' && 'Tell us how you will participate in the ecosystem.'}
               {step === 'info' && 'Create your professional credentials.'}
               {step === 'setup' && `Customize your ${selectedRole} profile details.`}
               {step === 'complete' && 'Your journey starts now.'}
            </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 'role' && (
              <motion.div key="role" variants={containerVariants} initial="initial" animate="animate" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id as Role)}
                            className={`p-8 rounded-[2rem] border transition-all flex flex-col items-start text-left gap-6 group relative overflow-hidden shadow-sm ${
                                selectedRole === role.id 
                                    ? 'bg-slate-50 border-primary-600 ring-4 ring-primary-600/5 shadow-xl shadow-primary-600/5' 
                                    : 'bg-white border-slate-100 hover:border-slate-200 hover:bg-slate-50/50'
                            }`}
                        >
                            <div className={`p-4 rounded-2xl border ${role.color} transition-all`}>
                                {role.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900">{role.label}</h3>
                                <p className="text-sm text-slate-400 font-normal leading-relaxed">{role.desc}</p>
                            </div>
                            {selectedRole === role.id && (
                              <motion.div layoutId="check" className="absolute top-6 right-6">
                                <CheckCircle2 className="w-6 h-6 text-primary-600" />
                              </motion.div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                   <Button onClick={handleNextStep} size="lg" className="h-14 px-10 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white rounded-full group shadow-xl shadow-primary-600/20 border-none">
                      Continue
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                   </Button>
                </div>
              </motion.div>
            )}

            {step === 'info' && (
              <motion.div key="info" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-md mx-auto">
                <Card className="bg-white border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-none">
                   <CardContent className="p-8 space-y-6">
                      <div className="grid gap-6">
                         <div className="space-y-2">
                           <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Full Name</Label>
                           <Input placeholder="John Doe" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Work Email</Label>
                           <Input type="email" placeholder="john@university.edu" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                         </div>
                         <div className="space-y-2">
                           <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Password</Label>
                           <Input type="password" placeholder="••••••••" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                         </div>
                      </div>
                      <div className="pt-4 space-y-4">
                        <Button onClick={handleNextStep} className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm shadow-xl shadow-primary-600/10 border-none">
                            Next Step
                        </Button>
                        <Button variant="ghost" onClick={handlePrevStep} className="w-full text-slate-400 hover:text-slate-950 hover:bg-slate-50 rounded-xl h-14 font-semibold text-sm">
                            Go Back
                        </Button>
                      </div>
                   </CardContent>
                </Card>
              </motion.div>
            )}

            {step === 'setup' && (
              <motion.div key="setup" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="max-w-lg mx-auto">
                 <Card className="bg-white border-slate-100 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 border-none">
                   <CardContent className="p-8 space-y-8">
                      {selectedRole === 'student' && (
                        <div className="space-y-6">
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">University</Label>
                             <Input placeholder="Harvard University" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Major / Department</Label>
                             <Input placeholder="Computer Science" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Resume / CV</Label>
                             <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-primary-400 hover:bg-primary-50 transition-all cursor-pointer group bg-slate-50/50">
                                <Upload className="w-8 h-8 text-slate-200 group-hover:text-primary-600 transition-colors" />
                                <p className="text-xs font-semibold text-slate-300 group-hover:text-slate-600">Click to upload or drag & drop</p>
                             </div>
                           </div>
                        </div>
                      )}

                      {selectedRole === 'company' && (
                        <div className="space-y-6">
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Company Name</Label>
                             <Input placeholder="Acme Inc." className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Industry</Label>
                             <Input placeholder="Software Development" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Company Website</Label>
                             <Input placeholder="https://acme.com" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                        </div>
                      )}

                      {(selectedRole === 'lecturer' || selectedRole === 'admin') && (
                        <div className="space-y-6">
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Faculty / Department</Label>
                             <Input placeholder="School of Engineering" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                           <div className="space-y-2">
                             <Label className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">Specialization</Label>
                             <Input placeholder="Artificial Intelligence" className="h-12 bg-slate-50 border-slate-200 rounded-xl text-slate-900 font-medium placeholder:text-slate-300 shadow-sm" />
                           </div>
                        </div>
                      )}

                      <div className="pt-4 space-y-4">
                        <Button 
                          onClick={handleNextStep} 
                          disabled={isLoading}
                          className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold text-sm shadow-xl shadow-primary-600/10 border-none relative overflow-hidden"
                        >
                           {isLoading ? (
                             <div className="flex items-center gap-2">
                               <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                               Finalizing Profile...
                             </div>
                           ) : 'Complete Registration'}
                        </Button>
                        <Button variant="ghost" onClick={handlePrevStep} className="w-full text-slate-400 hover:text-slate-950 hover:bg-slate-50 rounded-xl h-14 font-semibold text-sm">
                            Go Back
                        </Button>
                      </div>
                   </CardContent>
                 </Card>
              </motion.div>
            )}

            {step === 'complete' && (
              <motion.div key="complete" variants={containerVariants} initial="initial" animate="animate" className="text-center space-y-12">
                 <div className="relative inline-block">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="w-40 h-40 bg-primary-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-primary-600/20 relative z-10"
                    >
                       <CheckCircle2 className="w-20 h-20 text-white" />
                    </motion.div>
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                      transition={{ duration: 2, repeat }}
                      className="absolute inset-0 bg-primary-600/20 rounded-full blur-3xl -z-10" 
                    />
                 </div>

                 <div className="space-y-6">
                    <h2 className="text-4xl font-bold tracking-tight text-slate-950">Registration Successful</h2>
                    <p className="text-slate-500 text-xl max-w-lg mx-auto font-normal">
                      You are now part of the most advanced career network. Welcome to the future of professional growth.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                      onClick={() => navigate('/login')}
                      size="lg" 
                      className="h-14 px-10 text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 rounded-full shadow-xl shadow-primary-600/20 border-none"
                    >
                       Go to Login
                    </Button>
                    <Link to="/">
                       <Button variant="ghost" size="lg" className="h-14 px-10 text-sm font-semibold text-slate-400 hover:text-slate-950 hover:bg-slate-50 rounded-full">
                          Return Home
                       </Button>
                    </Link>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step == 'complete' && (
          <p className="text-center mt-12 text-slate-300 text-sm font-medium">
              By joining, you agree to our <a href="#" className="text-slate-500 hover:text-slate-900 font-bold underline underline-offset-4">Terms</a> and <a href="#" className="text-slate-500 hover:text-slate-900 font-bold underline underline-offset-4">Privacy Policy</a>.
          </p>
        )}
      </div>
    </div>
  );
}
