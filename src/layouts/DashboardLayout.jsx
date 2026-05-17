import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
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
  Activity,
  Award,
  BookOpen,
  Trophy,
  ShieldCheck,
  GraduationCap,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { MOCK_USERS } from '@/mocks';

// Helper to get navigation based on role
const getNavItems = (user) => {
  if (!user) return [];
  switch (user.role) {
    case 'student':
      return [
        { icon: <Activity className="w-5 h-5" />, label: 'Activities', path: '/student/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Marketplace', path: '/student/applications' },
        { icon: <UserCircle className="w-5 h-5" />, label: 'Profile', path: `/profile/${user.id}` },
        { icon: <Briefcase className="w-5 h-5" />, label: 'Career Hub', path: '/student/career' },
        { icon: <Rss className="w-5 h-5" />, label: 'Announcements', path: '/feed' },
      ];
    case 'company':
      return [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/company/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Applicants', path: '/company/applicants' },
        { icon: <Building2 className="w-5 h-5" />, label: 'Internships', path: '/company/posts' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
      ];
    case 'lecturer':
      return [
        { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/lecturer/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Students', path: '/lecturer/students' },
        { icon: <FileText className="w-5 h-5" />, label: 'Evaluations', path: '/lecturer/reports' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
      ];
    case 'admin':
      return [
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Admin Panel', path: '/admin/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/admin/users' },
        { icon: <Rss className="w-5 h-5" />, label: 'Feed', path: '/feed' },
        { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/admin/settings' },
      ];
    default:
      return [
        { icon: <Rss className="w-5 h-5" />, label: 'Announcements', path: '/feed' },
      ];
  }
};

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [groupData, setGroupData] = useState(null);
  const [activities, setActivities] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Load user data once on mount
  React.useEffect(() => {
    async function loadUserData() {
      try {
        const userId = localStorage.getItem('careerlink_user_id');
        if (!userId) {
          navigate('/login');
          return;
        }

        const user = await api.getUser(userId);
        setCurrentUser(user);
        
        if (user.role === 'student') {
          const group = await api.getStudentGroup(user.id);
          setGroupData(group);
          const acts = await api.getGroupActivities(group.id);
          setActivities(acts);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    }
    loadUserData();
  }, [location.pathname, navigate]);

  const navItems = getNavItems(currentUser);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 flex overflow-hidden font-sans">
      {/* Sidebar */}
      <aside 
        style={{ width: sidebarOpen ? '280px' : '80px' }}
        className="fixed top-0 left-0 h-screen bg-white border-r border-slate-100 z-50 overflow-hidden hidden md:flex flex-col transition-all duration-300"
      >
        <div className="h-20 flex items-center px-6 border-b border-slate-50">
          <div className="flex items-center gap-3" onClick={() => setSidebarOpen(!sidebarOpen)} style={{ cursor: 'pointer' }}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center shadow-lg shadow-primary-600/20 flex-shrink-0">
              <Zap className="w-4.5 h-4.5 text-white" fill="currentColor" />
            </div>
            {sidebarOpen && (
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">CareerLink</span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    isActive 
                      ? 'bg-primary-50 text-primary-600' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className={`flex-shrink-0 ${isActive ? 'text-primary-600' : 'group-hover:text-primary-600'}`}>
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span className="text-sm font-semibold whitespace-nowrap uppercase tracking-wide">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Functional Group Section */}
          {currentUser?.role === 'student' && groupData && sidebarOpen && (
            <div className="mt-8 pt-8 border-t border-slate-50 px-3 space-y-6">
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">My Group</p>
                  <Badge className="bg-primary-50 text-primary-600 border-none text-[9px] px-1.5 py-0">Active</Badge>
               </div>
               
               <div className="space-y-4">
                  <div className="flex items-center justify-between group cursor-pointer">
                     <div className="flex -space-x-2">
                        {groupData.members.map((member, i) => (
                          <Avatar key={i} className="w-7 h-7 border-2 border-white shadow-sm hover:z-10 transition-all">
                             <AvatarImage src={member.avatar} />
                             <AvatarFallback className="bg-slate-100 text-[10px] font-bold">{member.name[0]}</AvatarFallback>
                          </Avatar>
                        ))}
                     </div>
                     <span className="text-[10px] font-bold text-slate-400 uppercase">{groupData.name}</span>
                  </div>

                  <div className="space-y-3 bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Activity className="w-3 h-3" /> Group Activities
                     </p>
                     {activities.map((act, i) => (
                       <div key={i} className="flex items-start gap-2.5 group cursor-pointer">
                          <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${act.progress === 100 ? 'bg-emerald-500' : 'bg-primary-500 animate-pulse'}`} />
                          <div className="overflow-hidden">
                             <p className="text-xs font-bold text-slate-600 truncate group-hover:text-primary-600 transition-colors uppercase leading-none">{act.name}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Due {act.dueDate}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-slate-50">
          <Link to={`/profile/${currentUser?.id}`}>
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-all group">
              <Avatar className="w-10 h-10 border border-slate-100 shadow-sm">
                <AvatarImage src={currentUser?.avatar} />
                <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
              </Avatar>
              {sidebarOpen && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate text-slate-900 uppercase">{currentUser?.name}</p>
                  <p className="text-xs font-semibold text-slate-500 capitalize">{currentUser?.role}</p>
                </div>
              )}
            </div>
          </Link>
          <button 
            onClick={() => {
                localStorage.removeItem('careerlink_role');
                navigate('/');
            }} 
            className="w-full flex items-center gap-3 px-2 py-2 mt-2 text-slate-500 hover:text-red-600 transition-all rounded-lg text-sm font-bold uppercase tracking-wide group"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main 
        style={{ marginLeft: sidebarOpen ? '280px' : '80px' }}
        className="flex-1 flex flex-col transition-all duration-300"
      >
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 px-8 flex items-center justify-between">
          <div className="max-w-md w-full relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search platform..." 
              className="bg-slate-50 border-none pl-10 h-10 text-sm font-medium focus-visible:ring-1 focus-visible:ring-primary-600/20"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 h-10 w-10">
              <Bell className="w-5 h-5" />
            </Button>
            <div className="h-6 w-px bg-slate-200" />
            <Avatar className="w-10 h-10 md:hidden border border-slate-100 shadow-sm">
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-bold text-slate-700 hidden lg:block uppercase tracking-wide">{currentUser?.role === 'admin' ? 'Admin Access' : 'Marketplace Active'}</span>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function Badge({ className, children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 ${className}`}>
      {children}
    </span>
  );
}
