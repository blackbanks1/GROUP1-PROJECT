import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Github, Chrome, Linkedin, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSimulateLogin = (role: string) => {
    setIsLoading(true);
    setTimeout(() => {
      toast.success(`Logged in as ${role}`);
      navigate(`/${role}/dashboard`);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your credentials');
      return;
    }
    // Defaulting to student for direct login simulation
    handleSimulateLogin('student');
  };

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side: Visuals */}
      <div className="hidden md:flex flex-1 relative items-center justify-center p-12 overflow-hidden bg-slate-50 border-r border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-100 blur-[120px] rounded-full" 
        />

        <div className="relative z-10 max-w-lg space-y-8">
           <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-600/40"
              >
                <Zap className="w-10 h-10 text-white" fill="white" />
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl font-bold tracking-tighter leading-tight font-display uppercase italic text-slate-900"
              >
                The Future of <br /> Campus <span className="text-primary-600">Networking</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg font-medium leading-relaxed"
              >
                "CareerLink has revolutionized how we connect with top-tier talent. It's the essential hub for modern professional growth."
              </motion.p>
           </div>

           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3 }}
             className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-200"
           >
              <div>
                 <div className="text-3xl font-bold font-display italic text-slate-900">2.5k+</div>
                 <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-300">Hiring Partners</div>
              </div>
              <div>
                 <div className="text-3xl font-bold font-display italic text-slate-900">92%</div>
                 <div className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-300">Success Rate</div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="md:hidden flex justify-center mb-12">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-slate-950 font-display italic">CareerLink</span>
              </Link>
          </div>

          <div className="space-y-3 text-center md:text-left">
              <h1 className="text-4xl font-bold tracking-tight text-slate-950 font-display uppercase italic">Sign In</h1>
              <p className="text-slate-500 font-medium">Continue your professional journey with CareerLink.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
             <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-400 font-black text-[10px] uppercase tracking-widest px-1">Email address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu" 
                    className="bg-slate-50 border-slate-200 rounded-2xl h-14 focus-visible:ring-primary-400 transition-all placeholder:text-slate-300 text-slate-900 font-medium shadow-sm" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Password</Label>
                    <a href="#" className="text-[10px] text-primary-600 hover:text-primary-700 font-bold uppercase tracking-widest">Forgot Password?</a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-50 border-slate-200 rounded-2xl h-14 focus-visible:ring-primary-400 transition-all pr-12 text-slate-900 font-medium shadow-sm" 
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
                className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 text-xs font-black uppercase tracking-[0.2em] group shadow-xl shadow-primary-600/10 border-none relative overflow-hidden"
             >
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      Sign In to Platform
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
             </Button>
          </form>

          <div className="space-y-4">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-100"></span>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]">
                  <span className="bg-white px-4 text-slate-300">Or Continue With</span>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="bg-white hover:bg-slate-50 rounded-2xl h-14 border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-all overflow-hidden group">
                   <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button variant="outline" className="bg-white hover:bg-slate-50 rounded-2xl h-14 border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-all overflow-hidden group">
                   <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
                <Button variant="outline" className="bg-white hover:bg-slate-50 rounded-2xl h-14 border border-slate-200 shadow-sm text-slate-500 hover:text-slate-900 transition-all overflow-hidden group">
                   <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-100">
             <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Quick Simulation (Dev Mode)</p>
             <div className="flex flex-wrap gap-2">
                {['student', 'company', 'lecturer', 'admin'].map(role => (
                  <button 
                    key={role}
                    onClick={() => handleSimulateLogin(role)}
                    className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-primary-50 hover:border-primary-200 hover:text-primary-600 transition-all shadow-sm active:scale-95"
                  >
                    {role}
                  </button>
                ))}
             </div>
          </div>

          <p className="text-center text-slate-500 text-sm font-medium">
              New to the ecosystem? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold underline underline-offset-4">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
