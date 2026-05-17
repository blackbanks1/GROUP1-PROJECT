import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, Github, Chrome, Linkedin, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your credentials');
      return;
    }

    setIsLoading(true);
    try {
      const user = await api.login(email, password);
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

  return (
    <div className="min-h-screen bg-white text-slate-950 flex flex-col md:flex-row overflow-hidden font-sans">
      {/* Left Side */}
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
                className="text-5xl font-bold tracking-tight leading-tight text-slate-900"
              >
                The Future of <br /> Campus <span className="text-primary-600">Networking</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-slate-500 text-lg font-normal leading-relaxed"
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
                 <div className="text-3xl font-bold text-slate-900">2.5k+</div>
                 <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hiring Partners</div>
              </div>
              <div>
                 <div className="text-3xl font-bold text-slate-900">92%</div>
                 <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">Success Rate</div>
              </div>
           </motion.div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="max-w-md w-full space-y-8 relative z-10">
          <div className="md:hidden flex justify-center mb-12">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                    <Zap className="w-6 h-6 text-white" fill="white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-950">CareerLink</span>
              </Link>
          </div>

          <div className="space-y-2 text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Sign In</h1>
              <p className="text-slate-500 font-medium">Continue your professional journey with CareerLink.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
             <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Email address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@university.edu" 
                    className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-primary-500/20 text-slate-900" 
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</Label>
                    <a href="#" className="text-xs text-primary-600 hover:text-primary-700 font-bold">Forgot Password?</a>
                  </div>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type={showPassword ? 'text' : 'password'} 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-slate-50 border-slate-200 rounded-xl h-12 focus-visible:ring-primary-500/20 text-slate-900" 
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
                className="w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 text-sm font-bold shadow-lg shadow-primary-600/10 border-none uppercase"
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
                      Sign In
                      <ArrowRight className="w-4 h-4" />
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
                <div className="relative flex justify-center text-[10px] font-bold uppercase">
                  <span className="bg-white px-4 text-slate-300">Social Connect</span>
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

          <p className="text-center text-slate-500 text-sm font-medium">
              New to the ecosystem? <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
