import * as React from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  MoreHorizontal, 
  Image as ImageIcon, 
  Send,
  TrendingUp,
  UserPlus,
  Sparkles,
  Zap,
  Globe,
  Users as UsersIcon,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function FeedPage() {
  const userId = localStorage.getItem('careerlink_user_id');
  const [currentUser, setCurrentUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [userGroup, setUserGroup] = React.useState(null);
  const [staffList, setStaffList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  // Post Creation State
  const [postContent, setPostContent] = React.useState('');
  const [commType, setCommType] = React.useState('broadcast'); // 'broadcast', 'multicast', 'unicast'
  const [targetId, setTargetId] = React.useState(null);
  const [targetName, setTargetName] = React.useState('Everyone');

  const loadFeedData = async () => {
    try {
      const [userData, postsData] = await Promise.all([
        api.getUser(userId),
        api.getPosts(userId)
      ]);
      setCurrentUser(userData);
      setPosts(postsData);

      if (userData.role === 'student') {
        try {
          const group = await api.getStudentGroup(userId);
          setUserGroup(group);
        } catch (e) {}
      }

      // Load lecturers/admins for unicast
      const allUsers = await api.getUsers();
      setStaffList(allUsers.filter(u => u.role === 'lecturer' || u.role === 'admin'));

    } catch (error) {
      toast.error('Failed to load feed');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (userId) {
      loadFeedData();
    }
  }, [userId]);

  const trends = [
    { tag: '#CloudMastery', count: '1.2k' },
    { tag: '#AITraining', count: '850' },
    { tag: '#FrontendStrategy', count: '640' },
  ];

  const handleBroadcast = async () => {
    if (!postContent.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }

    try {
      await api.createPost({
        authorId: currentUser.id,
        authorName: currentUser.name,
        authorRole: currentUser.role,
        authorAvatar: currentUser.avatar,
        content: postContent,
        type: commType,
        targetId: targetId
      });
      
      toast.success(`Message transmitted via ${commType}`);
      setPostContent('');
      setCommType('broadcast');
      setTargetId(null);
      setTargetName('Everyone');
      loadFeedData();
    } catch (error) {
      toast.error('Transmission failed');
    }
  };

  const selectTarget = (type, id, name) => {
    setCommType(type);
    setTargetId(id);
    setTargetName(name);
  };

  const handleAction = (action) => {
    toast.info(`${action} requested`);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans pb-20">
      {/* Left Column: Post Creation & Feed */}
      <div className="lg:col-span-8 space-y-8">
        {/* Create Post */}
        <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden bg-white border-none shadow-xl shadow-slate-200/50">
          <CardContent className="p-8">
            <div className="flex gap-4">
              <Avatar className="w-12 h-12 border border-slate-100">
                <AvatarImage src={currentUser?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'} />
                <AvatarFallback>{currentUser?.name?.[0] || 'U'}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                   <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Transmission Mode:</span>
                   <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                         <Button variant="outline" size="sm" className="h-7 px-3 rounded-full border-slate-100 text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 bg-slate-50 hover:bg-white transition-all">
                            {commType === 'broadcast' && <Globe className="w-3 h-3 text-primary-600" />}
                            {commType === 'multicast' && <UsersIcon className="w-3 h-3 text-accent-blue" />}
                            {commType === 'unicast' && <ShieldCheck className="w-3 h-3 text-accent-orange" />}
                            {targetName}
                            <ChevronDown className="w-3 h-3 opacity-40" />
                         </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-64 rounded-2xl border-slate-100 shadow-2xl p-2">
                         <DropdownMenuLabel className="text-[9px] font-bold uppercase text-slate-400 px-3 py-2 tracking-widest">Global Network</DropdownMenuLabel>
                         <DropdownMenuItem onClick={() => selectTarget('broadcast', null, 'Everyone')} className="rounded-xl text-[10px] font-bold uppercase gap-3 py-3 cursor-pointer">
                            <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center">
                               <Globe className="w-4 h-4 text-primary-600" />
                            </div>
                            <div>
                               <p className="text-slate-900">Broadcast</p>
                               <p className="text-[9px] text-slate-400 normal-case font-normal">Visible to all ecosystem participants.</p>
                            </div>
                         </DropdownMenuItem>
                         
                         {userGroup && (
                           <>
                              <DropdownMenuSeparator className="my-2 bg-slate-50" />
                              <DropdownMenuLabel className="text-[9px] font-bold uppercase text-slate-400 px-3 py-2 tracking-widest">Team Sync</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => selectTarget('multicast', userGroup.id, userGroup.name)} className="rounded-xl text-[10px] font-bold uppercase gap-3 py-3 cursor-pointer">
                                 <div className="w-8 h-8 rounded-lg bg-accent-blue/10 flex items-center justify-center">
                                    <UsersIcon className="w-4 h-4 text-accent-blue" />
                                 </div>
                                 <div>
                                    <p className="text-slate-900">Multicast: {userGroup.name}</p>
                                    <p className="text-[9px] text-slate-400 normal-case font-normal">Internal team communication.</p>
                                 </div>
                              </DropdownMenuItem>
                           </>
                         )}
                         
                         <DropdownMenuSeparator className="my-2 bg-slate-50" />
                         <DropdownMenuLabel className="text-[9px] font-bold uppercase text-slate-400 px-3 py-2 tracking-widest">Direct to Staff</DropdownMenuLabel>
                         {staffList.map(staff => (
                           <DropdownMenuItem key={staff.id} onClick={() => selectTarget('unicast', staff.id, staff.name)} className="rounded-xl text-[10px] font-bold uppercase gap-3 py-3 cursor-pointer">
                              <Avatar className="w-8 h-8 border border-slate-100">
                                 <AvatarImage src={staff.avatar} />
                                 <AvatarFallback>{staff.name[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                 <p className="text-slate-900">{staff.name}</p>
                                 <p className="text-[9px] text-slate-400 uppercase font-bold tracking-tighter">Verified {staff.role}</p>
                              </div>
                           </DropdownMenuItem>
                         ))}
                      </DropdownMenuContent>
                   </DropdownMenu>
                </div>

                <textarea 
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Initiate communication pulse..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-medium focus:ring-1 focus:ring-primary-500/10 min-h-[140px] resize-none outline-none placeholder:text-slate-300"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Media upload')} className="text-slate-500 hover:text-primary-600 rounded-xl px-4 font-bold text-[10px] uppercase tracking-widest">
                      <ImageIcon className="w-4 h-4 mr-2" /> Media
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Milestone tagging')} className="text-slate-500 hover:text-primary-600 rounded-xl px-4 font-bold text-[10px] uppercase tracking-widest">
                      <Zap className="w-4 h-4 mr-2" /> Milestone
                    </Button>
                  </div>
                  <Button onClick={handleBroadcast} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 px-10 font-bold text-[10px] uppercase tracking-widest border-none shadow-xl shadow-primary-600/20 transition-all hover:scale-105 active:scale-95">
                    Transmit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {posts.length > 0 ? posts.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-none bg-white shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:shadow-primary-600/5 transition-all duration-500 overflow-hidden">
              <CardHeader className="p-8 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <Avatar className="w-12 h-12 border-2 border-white shadow-md transition-transform group-hover:scale-105">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.authorName?.[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{post.authorName}</h4>
                      <div className="flex items-center gap-2">
                         <Badge variant="secondary" className="bg-primary-50 text-primary-600 border-none text-[9px] font-bold uppercase px-2 tracking-widest shadow-sm">Verified {post.authorRole}</Badge>
                         <div className="flex items-center gap-1.5 ml-2 text-[8px] font-bold uppercase text-slate-300 tracking-widest bg-slate-50 px-2 py-0.5 rounded-full">
                            {post.type === 'broadcast' && <><Globe className="w-2 h-2" /> Global</>}
                            {post.type === 'multicast' && <><UsersIcon className="w-2 h-2" /> Team Sync</>}
                            {post.type === 'unicast' && <><ShieldCheck className="w-2 h-2" /> Direct Pulse</>}
                         </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900 rounded-full h-10 w-10">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 py-6">
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="p-8 pt-0 flex items-center justify-between border-t border-slate-50/50 mt-4 bg-slate-50/20">
                <div className="flex items-center gap-8 pt-6">
                  <button className="flex items-center gap-2.5 text-slate-400 hover:text-red-500 transition-all group" onClick={() => handleAction('Like')}>
                    <div className="p-2.5 rounded-xl group-hover:bg-red-50 transition-all shadow-sm bg-white border border-slate-50">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-tighter">{post.likes || 0}</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-400 hover:text-primary-600 transition-all group" onClick={() => handleAction('Comment')}>
                    <div className="p-2.5 rounded-xl group-hover:bg-primary-50 transition-all shadow-sm bg-white border border-slate-50">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold tracking-tighter">{post.comments || 0}</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-500 transition-all group" onClick={() => handleAction('Share')}>
                    <div className="p-2.5 rounded-xl group-hover:bg-emerald-50 transition-all shadow-sm bg-white border border-slate-50">
                      <Share2 className="w-4 h-4" />
                    </div>
                  </button>
                </div>
                <div className="pt-6">
                   <Button variant="ghost" onClick={() => handleAction('Opening full discussion...')} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-primary-600 hover:bg-transparent px-0 h-auto">View Transmission Details</Button>
                </div>
              </CardFooter>
            </Card>
          )) : (
            <div className="py-32 text-center border-4 border-dashed border-slate-50 rounded-[4rem] bg-slate-50/10">
               <Sparkles className="w-16 h-16 text-slate-100 mx-auto mb-6" />
               <h4 className="font-bold text-2xl text-slate-900 uppercase tracking-tighter">Quiet Network</h4>
               <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mt-2 max-w-xs mx-auto">Initiate a transmission pulse to begin professional engagement.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Trending & Suggestions */}
      <div className="lg:col-span-4 space-y-8">
        <Card className="rounded-[3rem] border-none bg-white shadow-2xl shadow-slate-200/40 p-10">
          <div className="space-y-10">
            <div>
               <h3 className="font-bold text-[10px] uppercase text-primary-600 tracking-[0.2em] mb-1">Network Trends</h3>
               <p className="text-2xl font-bold text-slate-900 tracking-tighter uppercase">Market Pulse</p>
            </div>
            <div className="space-y-8">
              {trends.map((trend) => (
                <div key={trend.tag} className="group cursor-pointer" onClick={() => handleAction(`Trending: ${trend.tag}`)}>
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-sm font-bold group-hover:text-primary-600 transition-colors uppercase tracking-tight text-slate-900">{trend.tag}</p>
                    <Badge variant="outline" className="text-[9px] font-bold text-primary-600 border-primary-100 bg-primary-50 px-2 py-0.5 rounded-full">{trend.count}</Badge>
                  </div>
                  <div className="w-full h-1 bg-slate-50 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${Math.random() * 60 + 20}%` }} 
                        className="h-full bg-primary-600/20" 
                     />
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={() => handleAction('Generating intelligence report...')} className="w-full bg-slate-950 hover:bg-primary-600 text-white rounded-2xl h-14 text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-slate-950/10 border-none">
               Analyze Pulse
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
