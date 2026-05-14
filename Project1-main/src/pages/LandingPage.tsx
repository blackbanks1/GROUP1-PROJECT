import * as React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Briefcase, 
  GraduationCap, 
  Building2, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Search, 
  MessageSquare, 
  TrendingUp,
  Layout,
  Network,
  Clock,
  Heart
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-950 font-display italic uppercase">CareerLink <span className="text-primary-600">Campus</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-400">
            <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
            <a href="#companies" className="hover:text-primary-600 transition-colors">Companies</a>
            <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-500 hover:text-primary-600 hover:bg-primary-50 font-bold uppercase tracking-widest text-[10px]">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 h-11 shadow-lg shadow-primary-600/10 transition-all hover:translate-y-[-2px] active:translate-y-0 font-bold uppercase tracking-widest text-[10px]">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 px-4 overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-primary-100/30 blur-[160px] rounded-full -z-10 animate-pulse" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15] -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block py-2 px-6 rounded-full border border-slate-200 bg-white shadow-xl shadow-slate-200/20 text-primary-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
              Next-Gen Career Intelligence
            </span>
            <h1 className="text-7xl md:text-9xl xl:text-[11rem] font-bold tracking-tighter leading-[0.8] mb-12 font-display text-slate-950 uppercase italic max-w-5xl">
              Syncing <br />
              <span className="text-primary-600 underline decoration-slate-950/5 underline-offset-[20px]">Ecosystems</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-500 max-w-3xl mb-16 leading-tight font-medium font-display">
              A unified terminal connecting <span className="text-slate-950 font-bold italic">students</span>, <span className="text-slate-950 font-bold italic">lecturers</span>, and <span className="text-slate-950 font-bold italic">recruiters</span> into one professional loop.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register">
                <Button size="lg" className="h-20 px-12 text-xs bg-slate-950 hover:bg-primary-600 text-white rounded-[2rem] group border-none shadow-2xl shadow-slate-950/20 font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95">
                  Establish Connection
                  <Zap className="ml-3 w-5 h-5 group-hover:scale-125 transition-transform" fill="currentColor" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-20 px-12 text-xs rounded-[2rem] border-slate-200 text-slate-400 hover:bg-slate-50 hover:text-slate-950 font-black uppercase tracking-[0.3em] bg-white shadow-sm transition-all">
                Explore The Network
              </Button>
            </div>
          </motion.div>

          {/* Live Pulse Bar */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-32 w-full max-w-4xl py-6 px-10 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl flex flex-wrap justify-between items-center gap-8 shadow-sm border-dashed"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Online</span>
            </div>
            <div className="flex gap-12">
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none">12.4k+</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Active Nodes</span>
               </div>
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none text-primary-600">890</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Open Pipelines</span>
               </div>
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none">98%</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Sync Rate</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento Roles Grid */}
      <section className="py-48 px-4 bg-slate-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-32 space-y-6">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-950 font-display uppercase italic">One Platform. <br /><span className="text-primary-600">All Identities.</span></h2>
            <p className="text-slate-400 text-xl font-medium max-w-2xl mx-auto">Tailored workstreams for every stakeholder in the academic lifecycle.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-[1200px] md:h-[900px]">
            {/* Student Card */}
            <RoleCard 
              className="md:col-span-2 md:row-span-2"
              role="Student Terminal"
              title="Architect Your Future"
              desc="Build a verified technical profile, discover high-tier internships, and sync with industry mentors."
              icon={<GraduationCap className="w-12 h-12" />}
              image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              accent="primary"
            />
            {/* Recruiter Card */}
            <RoleCard 
              className="md:col-span-2"
              role="Recruiter Node"
              title="Streamline Acquisition"
              desc="Access a filtered pool of academic talent with verified skillsets and performance metrics."
              icon={<Briefcase className="w-8 h-8" />}
              accent="slate"
            />
            {/* Lecturer Card */}
            <RoleCard 
              className="md:col-span-1"
              role="Oversight Mode"
              title="Faculty Control"
              desc="Monitor clinical hours and technical progress in real-time."
              icon={<Users className="w-8 h-8" />}
              accent="primary-light"
            />
            {/* Admin Card */}
            <RoleCard 
              className="md:col-span-1"
              role="Root Access"
              title="Platform Intelligence"
              desc="Manage nodes and global ecosystem configurations."
              icon={<Building2 className="w-8 h-8" />}
              accent="dark"
            />
          </div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section id="companies" className="py-24 border-y border-slate-100 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <p className="text-slate-400 uppercase tracking-[0.4em] text-[10px] font-black mb-16">Trusted by Future-First Innovators</p>
            <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8" />
            </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-48 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600 mb-6 block">Capabilities</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tight font-display text-slate-950 uppercase italic leading-[0.85]">Engineered for <span className="text-primary-600">Success</span></h2>
            </div>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-sm">
              We've redesigned the career lifecycle from the ground up, focusing on clarity and metrics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Internship Tracking"
              description="Real-time progress reports and milestone verification for students and lecturers."
              accent="primary"
            />
            <FeatureCard 
              icon={<Search className="w-8 h-8" />}
              title="Smart Recruitment"
              description="AI-driven matching between student skills and company requirements."
              accent="slate"
            />
            <FeatureCard 
              icon={<Network className="w-8 h-8" />}
              title="Global Networking"
              description="Direct channels between recruiters, students, and university faculties."
              accent="primary"
            />
          </div>
        </div>
      </section>

      {/* Platform Flow */}
      <section className="py-48 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-slate-100" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-32 items-start">
            <div className="sticky top-48">
               <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary-600 mb-8 block font-display italic">Deployment Phase</span>
               <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-950 font-display uppercase italic leading-none mb-12">The <span className="text-primary-600">Evolution</span> <br />Cycle</h2>
               <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">Our standardized protocol ensures every participant in the ecosystem is verified and optimized for performance.</p>
               
               <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex items-center gap-6">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                     <Clock className="w-7 h-7 text-primary-600" />
                  </div>
                  <div>
                     <p className="text-slate-950 font-bold uppercase italic font-display text-sm tracking-tight">Average Sync Time</p>
                     <p className="text-2xl font-black text-primary-600 font-display italic">48 Hours</p>
                  </div>
               </div>
            </div>
            
            <div className="space-y-32 relative">
               <div className="absolute left-12 top-0 bottom-0 w-px bg-slate-100 -z-10" />
               <FlowStep number="01" title="Protocol Initiation" desc="Stakeholders register via the primary terminal, providing academic or corporate credentials for immediate verification." />
               <FlowStep number="02" title="Node Discovery" desc="The AI engine analyzes profiles and vacancies to suggest optimal pairings in the global internship network." />
               <FlowStep number="03" title="Active Linkage" desc="Lecturers provide real-time oversight of the internship lifecycle through synchronized evaluation modules." />
               <FlowStep number="04" title="Final Integration" desc="Successful placements transition into permanent roles, completing the career evolution loop." />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Support */}
      <section className="py-24 px-4 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter font-display uppercase italic leading-none">System <br /><span className="text-primary-600">Support</span></h2>
            <div className="space-y-12">
               <FaqItem question="Is verification required for all accounts?" answer="Yes. To maintain ecosystem integrity, all students, companies, and lecturers must undergo professional verification upon registration." />
               <FaqItem question="How do lecturers monitor student progress?" answer="Lecturers have access to a dedicated supervision terminal with real-time logs and milestone tracking capabilities." />
               <FaqItem question="Can companies post multiple internships?" answer="Absolutely. Recruiters can post and manage an unlimited number of internship pipelines through their dashboard node." />
            </div>
          </div>
          <div className="flex items-center justify-center">
             <div className="w-full max-w-md p-1 bg-white/5 rounded-[3rem] backdrop-blur-xl border border-white/10">
                <div className="bg-slate-900 rounded-[2.8rem] p-12 text-center space-y-10">
                   <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary-600/40">
                      <MessageSquare className="w-10 h-10 text-white" />
                   </div>
                   <h3 className="text-3xl font-bold font-display italic uppercase">Need Assistance?</h3>
                   <p className="text-slate-400 font-medium">Our tactical support team is available 24/7 for system troubleshooting and platform guidance.</p>
                   <Button className="w-full h-16 bg-white text-slate-950 hover:bg-primary-600 hover:text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all">
                      Open Support Ticket
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-950 font-display uppercase italic">Success <span className="text-primary-600">Stories</span></h2>
             <p className="text-slate-400 text-lg font-medium">Real results from our global campus partners.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
             <TestimonialCard 
                quote="CareerLink helped me land my dream internship at Meta. The tracking tools made it so easy to stay in touch with my lecturer."
                name="Sarah Johnson"
                role="Engineering Student"
                avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
             />
             <TestimonialCard 
                quote="The quality of candidates on this platform is unmatched. We've streamlined our entire intern recruitment pipeline."
                name="David Chen"
                role="Talent Lead @ Google"
                avatar="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
             />
             <TestimonialCard 
                quote="Visibility into my students' work progress has never been clearer. Managing 50+ interns is finally efficient."
                name="Dr. Elena Rodriguez"
                role="CS Faculty Dean"
                avatar="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150"
             />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-40 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto rounded-[4rem] bg-slate-950 p-12 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,41,59,0.3)]">
          <div className="absolute inset-0 bg-primary-600/10 pointer-events-none" />
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white font-display uppercase italic leading-[0.85]">Start Building <br />Your Career Journey</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
              Join thousands of students and companies bridging the gap to success.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link to="/register">
                <Button size="lg" className="h-16 px-12 text-xs bg-white text-slate-950 hover:bg-slate-100 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl">
                  Create Free Account
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="h-16 px-12 text-xs text-white hover:bg-white/10 rounded-2xl border border-white/20 font-black uppercase tracking-[0.2em]">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-950 font-display italic">CareerLink.</span>
            </div>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed">
              Empowering the next generation of professionals through a unified campus recruitment ecosystem.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-slate-300">Platform</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Students</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Companies</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Universities</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-slate-300">Resources</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">API Reference</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Guides</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-[10px] tracking-[0.3em] text-slate-300">Company</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Press</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors uppercase tracking-tight">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-32 pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">&copy; 2024 CareerLink Campus. Modern Excellence.</p>
          <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-300">
             <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RoleCard({ className, role, title, desc, icon, image, accent }: { className?: string; role: string; title: string; desc: string; icon: React.ReactNode; image?: string; accent: 'primary' | 'slate' | 'dark' | 'primary-light' }) {
  const accentClasses = {
    'primary': 'bg-primary-600 text-white',
    'slate': 'bg-white text-slate-950 border border-slate-100',
    'dark': 'bg-slate-950 text-white',
    'primary-light': 'bg-primary-50 text-primary-600 border border-primary-100'
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`p-12 rounded-[3.5rem] relative overflow-hidden flex flex-col group shadow-sm transition-all duration-500 ${accentClasses[accent]} ${className}`}
    >
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block font-display italic opacity-60">
           {role}
        </span>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-display uppercase italic leading-none max-w-sm">
           {title}
        </h3>
        <p className={`text-lg font-medium leading-relaxed max-w-sm flex-1 ${accent === 'primary' || accent === 'dark' ? 'text-white/60' : 'text-slate-400'}`}>
           {desc}
        </p>
        
        <Link to="/register" className="mt-12">
           <Button variant="ghost" className={`p-0 h-auto font-black text-[10px] uppercase tracking-[0.3em] hover:bg-transparent ${accent === 'primary' || accent === 'dark' ? 'text-white' : 'text-primary-600'}`}>
              Access Terminal <ArrowRight className="w-4 h-4 ml-3" />
           </Button>
        </Link>
      </div>

      {image && (
        <div className="absolute bottom-0 right-0 w-3/4 h-1/2 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4 grayscale group-hover:grayscale-0 transition-all duration-1000">
          <img src={image} alt="" className="w-full h-full object-cover rounded-tl-[4rem]" />
        </div>
      )}
    </motion.div>
  );
}

function FeatureCard({ icon, title, description, accent }: { icon: React.ReactNode, title: string, description: string, accent: 'primary' | 'slate' }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="p-12 rounded-[3rem] bg-white border border-slate-100 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-primary-600/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`mb-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 ${accent === 'primary' ? 'bg-primary-50 text-primary-600' : 'bg-slate-50 text-slate-900 group-hover:bg-primary-600 group-hover:text-white'}`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-slate-950 font-display uppercase italic tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
}

function FlowStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex gap-12 group relative">
      <div className="w-24 h-24 min-w-[96px] bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-primary-600 font-display text-4xl font-black shadow-sm group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary-600/20 transition-all duration-500 italic">
        {number}
      </div>
      <div className="space-y-4 pt-4">
        <h4 className="text-3xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors uppercase tracking-tight italic font-display leading-none">{title}</h4>
        <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  return (
    <div className="space-y-4">
       <h4 className="text-2xl font-bold text-white font-display italic uppercase tracking-tight">{question}</h4>
       <p className="text-slate-400 text-lg font-medium leading-relaxed">{answer}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, role, avatar }: { quote: string, name: string, role: string, avatar: string }) {
  return (
    <Card className="p-10 rounded-[3rem] bg-white border border-slate-100 relative group h-full flex flex-col shadow-sm hover:shadow-md transition-all">
       <Heart className="absolute top-10 right-10 w-6 h-6 text-slate-100 group-hover:text-primary-600 group-hover:fill-primary-600 transition-all" />
       <div className="flex-1">
         <p className="text-slate-600 italic text-lg mb-10 leading-relaxed font-medium">"{quote}"</p>
       </div>
       <div className="mt-8 flex items-center gap-5">
          <Avatar className="w-14 h-14 border-2 border-primary-50 shadow-sm">
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback className="bg-slate-100 text-slate-400 font-bold">{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-950 text-base tracking-tight">{name}</p>
            <p className="text-[10px] uppercase font-black text-primary-600 tracking-[0.2em] mt-0.5">{role}</p>
          </div>
       </div>
    </Card>
  );
}
