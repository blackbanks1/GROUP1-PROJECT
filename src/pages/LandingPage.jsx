import * as React from 'react';
import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
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
  Heart,
  Award,
  BookOpen,
  Sparkles,
  Star
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const savedRole = localStorage.getItem('careerlink_role');
    if (savedRole) {
      navigate(`/${savedRole}/dashboard`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-100 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:rotate-12 transition-transform">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-950 font-display">CareerLink <span className="text-primary-600">Campus</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-slate-500">
            <a href="#marketplace" className="hover:text-primary-600 transition-colors">Marketplace</a>
            <a href="#dean" className="hover:text-primary-600 transition-colors">For Schools</a>
            <a href="#training" className="hover:text-primary-600 transition-colors">Training</a>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-500 hover:text-primary-600 hover:bg-primary-50 font-semibold text-sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 h-11 shadow-lg shadow-primary-600/10 transition-all hover:translate-y-[-2px] active:translate-y-0 font-semibold text-sm">
                Join Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-64 pb-48 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] bg-primary-100/30 blur-[160px] rounded-full -z-10 animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.15] -z-10" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block py-2 px-6 rounded-full border border-slate-200 bg-white shadow-xl shadow-slate-200/20 text-primary-600 text-xs font-semibold uppercase tracking-wider mb-12">
              The Industry-Academia Bridge
            </span>
            <h1 className="text-7xl md:text-9xl xl:text-9xl font-bold tracking-tight leading-tight mb-12 font-display text-slate-950 max-w-6xl">
              Professional <br />
              <span className="text-primary-600 underline decoration-slate-950/5 underline-offset-[10px]">Training Marketplace</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mb-16 leading-relaxed font-normal font-sans">
              A unified platform where <span className="text-slate-950 font-semibold">companies</span> train students, <span className="text-slate-950 font-semibold">schools</span> oversee excellence, and <span className="text-slate-950 font-semibold">students</span> build real-world mastery.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/register">
                <Button size="lg" className="h-16 px-10 text-sm bg-slate-950 hover:bg-primary-600 text-white rounded-2xl group border-none shadow-2xl shadow-slate-950/20 font-semibold transition-all hover:scale-105 active:scale-95">
                  Browse Opportunities
                  <Zap className="ml-3 w-4 h-4 group-hover:scale-125 transition-transform" fill="currentColor" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-16 px-10 text-sm rounded-2xl border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-950 font-semibold bg-white shadow-sm transition-all">
                For Dean of Studies
              </Button>
            </div>
          </motion.div>

          {/* Value Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-32 w-full max-w-4xl py-6 px-10 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl flex flex-wrap justify-between items-center gap-8 shadow-sm border-dashed"
          >
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Marketplace Live</span>
            </div>
            <div className="flex gap-12">
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none">450+</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Training Partners</span>
               </div>
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none text-primary-600">1.2k</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Skill Offers</span>
               </div>
               <div className="flex flex-col items-start leading-none">
                  <span className="text-2xl font-bold font-display italic leading-none">95%</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-1">Completion Rate</span>
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
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-950 font-display">Shared Success. <br /><span className="text-primary-600">Total Control.</span></h2>
            <p className="text-slate-500 text-xl font-normal max-w-2xl mx-auto">A win-win ecosystem engineered for high-performance professional growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-8 h-[1200px] md:h-[900px]">
            {/* Student Card */}
            <RoleCard 
              className="md:col-span-2 md:row-span-2"
              role="Student"
              title="Learn from the Best"
              desc="Enroll in professional training programs led by industry giants. Gain real-life skills and earn verified certificates."
              icon={<BookOpen className="w-12 h-12" />}
              image="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              accent="primary"
            />
            {/* Admin Card */}
            <RoleCard 
              className="md:col-span-2"
              role="Admin"
              title="Full Academic Oversight"
              desc="Oversee entire school progress, curate industry partners with star ratings, and approve verified certificates."
              icon={<ShieldCheck className="w-8 h-8" />}
              accent="slate"
            />
            {/* Lecturer Card */}
            <RoleCard 
              className="md:col-span-1"
              role="Lecturer"
              title="Shape Future Talent"
              desc="Directly mentor students based on their technical mastery and real-world project performance."
              icon={<Users className="w-8 h-8" />}
              accent="primary-light"
            />
            {/* Company Card */}
            <RoleCard 
              className="md:col-span-1"
              role="Companies"
              title="Industrial Training"
              desc="Offer paid training and internships to find the next generation of verified professional talent."
              icon={<Building2 className="w-8 h-8" />}
              accent="dark"
            />
          </div>
        </div>
      </section>

      {/* Trusted Training Partners */}
      <section id="companies" className="py-24 border-y border-slate-100 relative bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
            <p className="text-slate-400 uppercase tracking-widest text-[10px] font-bold mb-16">Verified Training Partners</p>
            <div className="flex flex-wrap justify-center gap-16 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_Technologies_logo.svg" alt="Slack" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-8" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-8" />
            </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section id="features" className="py-48 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-wider text-primary-600 mb-6 block">The Marketplace Logic</span>
              <h2 className="text-5xl md:text-8xl font-bold tracking-tight font-display text-slate-950 leading-tight">Engineered for <br /><span className="text-primary-600">Growth</span></h2>
            </div>
            <p className="text-slate-500 text-xl font-normal leading-relaxed max-w-sm">
              We've created a direct pipeline between company training and academic recognition.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8" />}
              title="Class Mastery"
              description="Deans monitor collective class progress and mastery levels in real-time across all partners."
              accent="primary"
            />
            <FeatureCard 
              icon={<Star className="w-8 h-8" />}
              title="Curated Partners"
              description="Schools rate training companies with a star system, ensuring only top-tier providers stay verified."
              accent="slate"
            />
            <FeatureCard 
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Verified Creds"
              description="Final certificates are signed by both company experts and school deans for maximum credibility."
              accent="primary"
            />
          </div>
        </div>
      </section>

      {/* FAQ / Support */}
      <section className="py-24 px-4 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 relative z-10">
          <div className="space-y-12">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight font-display leading-tight">Platform <br /><span className="text-primary-600">Protocol</span></h2>
            <div className="space-y-12">
               <FaqItem question="Who pays for the training programs?" answer="Programs can be school-sponsored for entire cohorts or independently purchased by students seeking specific industry skills." />
               <FaqItem question="How do schools verify company quality?" answer="The Dean of Studies console provides performance metrics and the ability to rate partners based on student outcomes." />
               <FaqItem question="Are certificates industry-recognized?" answer="Yes. Every certificate is issued by a verified company partner and officially approved by the school's Dean." />
            </div>
          </div>
          <div className="flex items-center justify-center">
             <div className="w-full max-w-md p-1 bg-white/5 rounded-[3rem] backdrop-blur-xl border border-white/10">
                <div className="bg-slate-900 rounded-[2.8rem] p-12 text-center space-y-10">
                   <div className="w-20 h-20 bg-primary-600 rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-primary-600/40">
                      <MessageSquare className="w-10 h-10 text-white" />
                   </div>
                   <h3 className="text-3xl font-bold font-display">Need Assistance?</h3>
                   <p className="text-slate-400 font-normal">Our marketplace support team is available 24/7 for system troubleshooting and onboarding guidance.</p>
                   <Button className="w-full h-16 bg-white text-slate-950 hover:bg-primary-600 hover:text-white rounded-2xl font-bold text-sm tracking-wide transition-all">
                      Contact Partner Support
                   </Button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-40 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto rounded-[4rem] bg-slate-950 p-12 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(30,41,59,0.3)]">
          <div className="absolute inset-0 bg-primary-600/10 pointer-events-none" />
          <div className="relative z-10 space-y-12">
            <h2 className="text-5xl md:text-8xl font-bold tracking-tight text-white font-display leading-tight">Scale Your <br />Industrial Training</h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto font-normal">
              Join the marketplace connecting the next generation of talent with global industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
              <Link to="/register">
                <Button size="lg" className="h-16 px-12 text-sm bg-white text-slate-950 hover:bg-slate-100 rounded-2xl font-bold shadow-xl">
                  Register as Institution
                </Button>
              </Link>
              <Button size="lg" variant="ghost" className="h-16 px-12 text-sm text-white hover:bg-white/10 rounded-2xl border border-white/20 font-bold">
                Become a Partner
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
              <span className="text-2xl font-bold tracking-tight text-slate-950 font-display">CareerLink.</span>
            </div>
            <p className="text-slate-500 max-w-sm font-normal leading-relaxed">
              Empowering professional growth through a verified industry training marketplace.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Marketplace</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Institutions</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Partners</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-wider text-slate-900">Training</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Course Catalog</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Certificates</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Case Studies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 uppercase text-xs tracking-wider text-slate-900">Company</h4>
            <ul className="space-y-4 text-sm font-medium text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

function RoleCard({ className, role, title, desc, icon, image, accent }: { className?; role; title; desc; icon.ReactNode; image?; accent: 'primary' | 'slate' | 'dark' | 'primary-light' }) {
  const accentClasses = {
    'primary': 'bg-primary-600 text-white',
    'slate': 'bg-white text-slate-950 border border-slate-100',
    'dark': 'bg-slate-950 text-white',
    'primary-light': 'bg-primary-50 text-primary-600 border border-primary-100'
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`p-12 rounded-[3rem] relative overflow-hidden flex flex-col group shadow-sm transition-all duration-500 ${accentClasses[accent]} ${className}`}
    >
      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      
      <div className="relative z-10 flex flex-col h-full">
        <span className="text-xs font-bold uppercase tracking-wider mb-6 block opacity-60">
           {role}
        </span>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 font-display leading-tight max-w-sm">
           {title}
        </h3>
        <p className={`text-lg font-normal leading-relaxed max-w-sm flex-1 ${accent === 'primary' || accent === 'dark' ? 'text-white/70' : 'text-slate-500'}`}>
           {desc}
        </p>
        
        <Link to="/register" className="mt-12">
           <Button variant="ghost" className={`p-0 h-auto font-bold text-sm tracking-wide hover:bg-transparent ${accent === 'primary' || accent === 'dark' ? 'text-white' : 'text-primary-600'}`}>
              Establish Node <ArrowRight className="w-4 h-4 ml-3" />
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

function FeatureCard({ icon, title, description, accent }: { icon.ReactNode, title, description, accent: 'primary' | 'slate' }) {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="p-12 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:shadow-primary-600/5 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50/30 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`mb-10 w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-12 ${accent === 'primary' ? 'bg-primary-50 text-primary-600' : 'bg-slate-50 text-slate-900 group-hover:bg-primary-600 group-hover:text-white'}`}>{icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-slate-950 font-display tracking-tight">{title}</h3>
      <p className="text-slate-500 leading-relaxed font-normal">
        {description}
      </p>
    </motion.div>
  );
}

function FlowStep({ number, title, desc }: { number, title, desc }) {
  return (
    <div className="flex gap-12 group relative">
      <div className="w-20 h-20 min-w-[80px] bg-white border border-slate-100 rounded-3xl flex items-center justify-center text-primary-600 font-display text-3xl font-bold shadow-sm group-hover:bg-primary-600 group-hover:text-white group-hover:shadow-xl group-hover:shadow-primary-600/20 transition-all duration-500">
        {number}
      </div>
      <div className="space-y-4 pt-2">
        <h4 className="text-3xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors tracking-tight font-display leading-tight">{title}</h4>
        <p className="text-slate-500 text-lg font-normal leading-relaxed max-w-sm">{desc}</p>
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question, answer }) {
  return (
    <div className="space-y-4">
       <h4 className="text-2xl font-bold text-white font-display tracking-tight">{question}</h4>
       <p className="text-slate-400 text-lg font-normal leading-relaxed">{answer}</p>
    </div>
  );
}

function TestimonialCard({ quote, name, role, avatar }: { quote, name, role, avatar }) {
  return (
    <Card className="p-10 rounded-[2.5rem] bg-white border border-slate-100 relative group h-full flex flex-col shadow-sm hover:shadow-md transition-all">
       <Heart className="absolute top-10 right-10 w-6 h-6 text-slate-100 group-hover:text-primary-600 group-hover:fill-primary-600 transition-all" />
       <div className="flex-1">
         <p className="text-slate-600 text-lg mb-10 leading-relaxed font-normal">"{quote}"</p>
       </div>
       <div className="mt-8 flex items-center gap-5">
          <Avatar className="w-14 h-14 border-2 border-primary-50 shadow-sm">
            <AvatarImage src={avatar} className="object-cover" />
            <AvatarFallback className="bg-slate-100 text-slate-400 font-bold">{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-slate-950 text-base tracking-tight">{name}</p>
            <p className="text-xs font-bold text-primary-600 tracking-wide mt-0.5">{role}</p>
          </div>
       </div>
    </Card>
  );
}
