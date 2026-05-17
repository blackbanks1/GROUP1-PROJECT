import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  BookOpen, 
  ShieldCheck, 
  Users, 
  Building2, 
  ArrowRight 
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    // If already signed in, go straight to the CURRENT user's dashboard regardless of which card was clicked
    const signedInId = localStorage.getItem('careerlink_user_id');
    const savedRole = localStorage.getItem('careerlink_role');

    if (signedInId && savedRole) {
      navigate(`/${savedRole}/dashboard`);
    } else {
      // If not signed in, force login to the clicked role's context
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden font-sans flex flex-col">
      {/* Simple Navbar */}
      <nav className="w-full border-b border-slate-100 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-600/20">
              <Zap className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-950">CareerLink</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-slate-600 hover:text-primary-600 font-bold text-sm rounded-lg">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-lg px-5 h-10 font-bold text-sm shadow-md shadow-primary-600/10 transition-all border-none">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content: The 4 Role Cards */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-primary-50/40 blur-[100px] rounded-full -z-10" />
        
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 uppercase">
              Your Professional <span className="text-primary-600 font-extrabold">Ecosystem</span>
            </h1>
            <p className="text-slate-600 text-lg font-bold max-w-xl mx-auto leading-relaxed uppercase">
              A unified marketplace connecting students, educators, and industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard 
              role="Student"
              title="Learn & Earn"
              desc="Enroll in industry-led training and secure high-impact internships."
              icon={<BookOpen className="w-8 h-8" />}
              accent="primary"
              onClick={() => handleRoleSelection('student')}
            />
            <RoleCard 
              role="Lecturer"
              title="Mentor Talent"
              desc="Guide student journeys and bridge the gap between classroom and career."
              icon={<Users className="w-8 h-8" />}
              accent="primary-light"
              onClick={() => handleRoleSelection('lecturer')}
            />
            <RoleCard 
              role="Company"
              title="Find Talent"
              desc="Provide industrial training and discover verified professional talent."
              icon={<Building2 className="w-8 h-8" />}
              accent="primary"
              onClick={() => handleRoleSelection('company')}
            />
            <RoleCard 
              role="Admin"
              title="Academic Office"
              desc="Oversee partnerships, verify credentials, and ensure excellence."
              icon={<ShieldCheck className="w-8 h-8" />}
              accent="slate"
              onClick={() => handleRoleSelection('admin')}
            />
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-10 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
          &copy; 2024 CareerLink Campus. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function RoleCard({ role, title, desc, icon, accent, onClick }) {
  const accentClasses = {
    'primary': 'bg-white border-slate-100 hover:border-primary-600 hover:ring-1 hover:ring-primary-600 shadow-sm',
    'slate': 'bg-white border-slate-100 hover:border-slate-900 hover:ring-1 hover:ring-slate-900 shadow-sm',
    'dark': 'bg-slate-950 text-white border-slate-900 shadow-lg shadow-slate-950/20',
    'primary-light': 'bg-primary-50 text-primary-900 border-primary-100 shadow-sm'
  };

  const iconClasses = {
    'primary': 'bg-primary-50 text-primary-600',
    'slate': 'bg-slate-50 text-slate-900',
    'dark': 'bg-white/10 text-white',
    'primary-light': 'bg-white text-primary-600 shadow-sm'
  };

  return (
    <div 
      onClick={onClick}
      className={`p-8 rounded-2xl flex flex-col h-full group transition-all duration-300 border cursor-pointer hover:-translate-y-1 ${accentClasses[accent]}`}
    >
      <div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconClasses[accent]}`}>
        {icon}
      </div>
      
      <div className="flex flex-col h-full space-y-3">
        <span className={`text-xs font-bold tracking-wider uppercase opacity-100 ${accent === 'dark' ? 'text-white' : 'text-primary-600'}`}>
           {role}
        </span>
        <h3 className={`text-xl font-bold tracking-tight uppercase ${accent === 'dark' ? 'text-white' : 'text-slate-900'}`}>
           {title}
        </h3>
        <p className={`text-sm font-bold leading-relaxed flex-1 uppercase ${accent === 'dark' ? 'text-white/90' : 'text-slate-600'}`}>
           {desc}
        </p>
        
        <div className="pt-4 mt-auto">
           <Button variant="ghost" className={`p-0 h-auto font-bold text-xs uppercase tracking-widest transition-all hover:bg-transparent flex items-center gap-2 ${accent === 'dark' ? 'text-white' : 'text-primary-600'}`}>
              Access Portal <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
           </Button>
        </div>
      </div>
    </div>
  );
}
