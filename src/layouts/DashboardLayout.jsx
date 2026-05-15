import { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Rss, 
  MessageSquare, 
  UserCircle, 
  Briefcase, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Menu,
  X,
  FileText,
  Users,
  Building2,
  Calendar,
  Zap,
  Globe,
  Compass,
  Map,
  Activity,
  Award,
  BookOpen,
  Trophy,
  ShieldCheck,
  FileBadge,
  Palette,
  Bookmark,
  HelpCircle,
  GraduationCap
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_USERS } from '@/mocks';

// Helper to get navigation based on role
const getNavItems = (role) => {
  const common = [
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Messages', path: '/messages' },
    { icon: <Bell className="w-5 h-5" />, label: 'Notifications', path: '/notifications' },
  ];

  switch (role) {
    case 'student':
      return [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Academic Dashboard', path: '/student/dashboard' },
        { icon: <Briefcase className="w-5 h-5" />, label: 'Career Hub', path: '/student/career' },
        { icon: <UserCircle className="w-5 h-5" />, label: 'Profile & Assets', path: `/profile/${currentUser.id}` },
        { icon: <Rss className="w-5 h-5" />, label: 'Community Feed', path: '/feed' },
        ...common,
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
        { icon: <HelpCircle className="w-5 h-5" />, label: 'Help Center', path: '/help' },
      ];
    case 'company':
      return [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Recruiter Hub', path: '/company/dashboard' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
        ...common,
        { icon: <Users className="w-5 h-5" />, label: 'Applicants', path: '/company/applicants' },
        { icon: <Building2 className="w-5 h-5" />, label: 'Internships', path: '/company/posts' },
      ];
    case 'lecturer':
      return [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview', path: '/lecturer/dashboard' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
        ...common,
        { icon: <Users className="w-5 h-5" />, label: 'Assigned Students', path: '/lecturer/students' },
        { icon: <FileText className="w-5 h-5" />, label: 'Evaluations', path: '/lecturer/reports' },
      ];
    case 'admin':
      return [
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Admin Panel', path: '/admin/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/admin/users' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
        ...common,
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
      ];
    default:
      return common;
  }
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock dynamic user (Smart Caching)
  const savedRole = localStorage.getItem('careerlink_role') || 'student';
  const currentUser = MOCK_USERS.find(u => u.role === savedRole) || MOCK_USERS[0];
  const navItems = getNavItems(currentUser.role);
  return (
    <div className="min-h-screen bg-white text-slate-900 flex overflow-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary-600/[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-primary-600/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: sidebarOpen ? 300 : 100 }}
        className="fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-50 overflow-hidden hidden md:flex flex-col shadow-2xl shadow-slate-200/20"
      >
        <div className="p-10 h-32 flex items-center justify-between overflow-hidden whitespace-nowrap border-b border-slate-50">
          <div className="flex items-center gap-4 group">
            <div className="w-12 min-w-[48px] h-12 bg-slate-950 rounded-[1rem] flex items-center justify-center group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-slate-950/20 group-hover:bg-primary-600 group-hover:shadow-primary-600/20">
              <Zap className="w-6 h-6 text-white" fill="white" />
            </div>
            
            <AnimatePresence>
              {sidebarOpen && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="text-xl font-bold tracking-tight text-slate-950 leading-none">Career<span className="text-primary-600">Link</span></span>
                  <span className="text-[10px] font-medium text-slate-400 mt-1">Platform Console</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <nav className="flex-1 px-6 py-12 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="block">
                <motion.div
                  className={`flex items-center gap-4 px-5 py-3 rounded-xl transition-all group relative ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-950 hover:bg-slate-50'
                  }`}
                >
                  {isActive && <motion.div layoutId="nav-pill" className="absolute left-0 w-1 h-6 bg-primary-600 rounded-r-full" />}
                  <div className={`min-w-[20px] transition-all duration-300 ${isActive ? 'text-primary-600' : 'group-hover:text-primary-600 opacity-70 group-hover:opacity-100'}`}>
                    {item.icon}
                  </div>
                  
                  <AnimatePresence>
                    {sidebarOpen && (
                      <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className={`text-sm font-medium whitespace-nowrap transition-colors ${isActive ? 'text-primary-600' : 'text-inherit'}`}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="p-8 border-t border-slate-50 bg-slate-50/20">
          <Link to={`/profile/${currentUser.id}`}>
            <div className={`flex items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-slate-200/10 transition-all text-slate-500 hover:text-slate-950 group border border-transparent hover:border-slate-100`}>
              <div className="relative">
                <Avatar className="w-10 h-10 rounded-xl ring-2 ring-transparent group-hover:ring-primary-600/10 transition-all shadow-sm border border-slate-100 p-0.5 bg-white">
                  <AvatarImage src={currentUser.avatar} className="rounded-lg object-cover" />
                  <AvatarFallback className="bg-slate-900 text-white font-semibold rounded-lg">{currentUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              {sidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-semibold truncate tracking-tight text-slate-950 leading-none mb-1">{currentUser.name}</p>
                  <p className="text-[10px] font-medium text-slate-400 leading-none capitalize">{currentUser.role} Account</p>
                </div>
              )}
            </div>
          </Link>
          <Button 
            variant="ghost" 
            onClick={() => {
                localStorage.removeItem('careerlink_role');
                navigate('/');
            }} 
            className="w-full justify-start gap-3 mt-4 text-red-500 hover:text-red-600 hover:bg-red-50 font-medium text-sm transition-all rounded-xl h-10 group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            {sidebarOpen && <span>Terminate Session</span>}
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${sidebarOpen ? 'md:ml-[300px]' : 'md:ml-[100px]'}`}
      >
        {/* Top Header */}
        <header className="h-24 bg-white/80 backdrop-blur-3xl border-b border-slate-50 sticky top-0 z-40 px-10 flex items-center justify-between">
          <div className="max-w-xl w-full relative hidden sm:block">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Search global directory..." 
              className="bg-slate-50 border-none shadow-inner pl-16 focus-visible:ring-2 focus-visible:ring-primary-600/10 rounded-2xl h-14 text-slate-950 placeholder:text-slate-400 text-sm transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <Link to="/notifications">
              <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-2xl w-14 h-14 border border-slate-100 transition-all shadow-sm">
                <Bell className="w-6 h-6" />
                <span className="absolute top-4 right-4 w-2 h-2 bg-primary-600 rounded-full border-2 border-white" />
              </Button>
            </Link>
            <div className="h-8 w-px bg-slate-100 mx-2" />
            <Link to="/messages" className="hidden lg:block">
              <Button className="bg-slate-950 hover:bg-primary-600 text-white rounded-xl h-12 px-6 font-semibold text-sm transition-all shadow-lg shadow-slate-950/10 active:scale-95 border-none">
                 Global Channels
              </Button>
            </Link>
            <Avatar className="w-12 h-12 border border-slate-100 md:hidden">
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback className="bg-slate-950 text-white font-bold">{currentUser.name[0]}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 md:p-14 max-w-[1600px] mx-auto w-full flex-1 overflow-y-auto custom-scrollbar relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
