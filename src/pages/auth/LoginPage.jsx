import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Zap, 
  ArrowRight, 
  Github, 
  Chrome, 
  Linkedin, 
  Eye, 
  EyeOff,
  ArrowLeft,
  GraduationCap,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState('role'); // 'role' or 'credentials'
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const roles = [
    { id: 'student', icon: <GraduationCap className="w-8 h-8" />, label: 'Student', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'company', icon: <Building2 className="w-8 h-8" />, label: 'Company', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'lecturer', icon: <Users className="w-8 h-8" />, label: 'Lecturer', color: 'border-primary-100 text-primary-600 bg-primary-50' },
    { id: 'admin', icon: <ShieldCheck className="w-8 h-8" />, label: 'Admin', color: 'border-primary-100 text-primary-600 bg-primary-50' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    try {
      const user = await api.login(email, password, selectedRole);
      localStorage.setItem('careerlink_role', user.role);
      localStorage.setItem('careerlink_user_id', user.id);
      
      toast.success(`Welcome back, ${user.name}`);
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-slate-50 border-r border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-100 blur-[120px] rounded-full" 
        />
        <div className="relative z-10 max-w-lg space-y-8">
           <div className="space-y-6">
              <Link to="/" className="inline-block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-600/40"
                >
                  <Zap className="w-10 h-10 text-white" fill="white" />
                </motion.div>
              </Link>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold tracking-tight leading-tight text-slate-900 uppercase"
              >
                Connect to <br /> Your <span className="text-primary-600">Future</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg font-medium leading-relaxed"
              >
                Access the most advanced career network for students and industry leaders.
              </motion.p>
           </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative bg-white">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div key="role" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                <div className="space-y-2 text-center md:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Identify Role</h1>
                    <p className="text-slate-500 font-medium">Select your portal access level to continue.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => setSelectedRole(role.id)}
                            className={`p-6 rounded-3xl border transition-all flex flex-col items-center text-center gap-4 group relative overflow-hidden shadow-sm ${
                                selectedRole === role.id 
                                    ? 'bg-slate-50 border-primary-600 ring-4 ring-primary-600/5' 
                                    : 'bg-white border-slate-100 hover:border-slate-200'
                            }`}
                        >
                            <div className={`p-3 rounded-xl border ${role.color} transition-all`}>
                                {role.icon}
                            </div>
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">{role.label}</h3>
                            {selectedRole === role.id && (
                              <motion.div layoutId="check-login" className="absolute top-4 right-4">
                                <CheckCircle2 className="w-4 h-4 text-primary-600" />
                              </motion.div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col gap-4">
                   <Button 
                     onClick={() => selectedRole && setStep('credentials')} 
                     disabled={!selectedRole}
                     className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold uppercase text-xs shadow-xl shadow-primary-600/10 border-none"
                   >
                      Next Step
                   </Button>
                   <Link to="/" className="w-full">
                      <Button variant="ghost" className="w-full h-14 text-slate-400 hover:text-slate-900 rounded-2xl font-bold uppercase text-xs">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                      </Button>
                   </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div key="credentials" variants={containerVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                <div className="space-y-2 text-center md:text-left">
                    <button onClick={() => setStep('role')} className="text-primary-600 hover:text-primary-700 font-bold text-xs uppercase flex items-center mb-4">
                       <ArrowLeft className="w-3 h-3 mr-1" /> Change Role
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Sign In</h1>
                    <p className="text-slate-500 font-medium">Authenticating as <span className="text-primary-600 font-bold uppercase">{selectedRole}</span></p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Email Registry</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@school.edu" 
                        className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-primary-500/20 text-slate-900 font-medium" 
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between px-1">
                        <Label htmlFor="password" className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Access Key</Label>
                        <a href="#" className="text-[10px] text-primary-600 hover:text-primary-700 font-bold uppercase">Reset?</a>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? 'text' : 'password'} 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-primary-500/20 text-slate-900 font-medium" 
                        />
                        <button 
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 text-xs font-bold shadow-xl shadow-primary-600/10 border-none uppercase"
                  >
                    {isLoading ? 'Verifying Credentials...' : 'Finalize Login'}
                  </Button>
                </form>

                <div className="space-y-4">
                  <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-100"></span>
                      </div>
                      <div className="relative flex justify-center text-[10px] font-bold uppercase">
                        <span className="bg-white px-4 text-slate-300 tracking-widest">Third-Party Auth</span>
                      </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                      <Button variant="outline" className="bg-white border-slate-200 rounded-xl h-12 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                        <Chrome className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" className="bg-white border-slate-200 rounded-xl h-12 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                        <Linkedin className="w-5 h-5" />
                      </Button>
                      <Button variant="outline" className="bg-white border-slate-200 rounded-xl h-12 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                        <Github className="w-5 h-5" />
                      </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-slate-500 text-sm font-medium pt-8">
              New to the ecosystem? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
