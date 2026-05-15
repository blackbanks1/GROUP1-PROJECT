import { motion } from 'motion/react';
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
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MOCK_POSTS, MOCK_USERS } from '@/mocks';

export default function FeedPage() {
  const currentUser = MOCK_USERS[0];
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans">
      {/* Left Column */}
      <div className="lg:col-span-2 space-y-8">
        {/* Create Post */}
        <Card className="bg-white border-slate-100 overflow-hidden shadow-sm rounded-[2rem] border-none">
          <CardContent className="p-8">
            <div className="flex gap-6">
              <Avatar className="w-14 h-14 border-4 border-slate-50 shadow-sm">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="bg-primary-600 text-white font-bold">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-6">
                <Textarea 
                  placeholder="Share a milestone or insightful perspective..." 
                  className="bg-transparent border-none focus-visible:ring-0 text-xl resize-none p-0 placeholder:text-slate-300 text-slate-900 min-h-[100px] font-medium"
                />
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all font-black text-[10px] uppercase tracking-widest px-4 h-10 rounded-xl">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Media
                    </Button>
                    <Button variant="ghost" className="text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all font-black text-[10px] uppercase tracking-widest px-4 h-10 rounded-xl">
                      <Zap className="w-4 h-4 mr-2" />
                      Moment
                    </Button>
                  </div>
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-10 h-10 font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary-600/10 border-none transition-all hover:scale-105">
                    Broadcast
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Post List */}
        <div className="space-y-8">
          {MOCK_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-slate-100 hover:border-slate-200 transition-all overflow-hidden shadow-sm rounded-[2.5rem] group relative border-none">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50/[0.3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader className="p-8 pb-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12 border-2 border-slate-50 shadow-sm">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback className="bg-primary-600 text-white font-bold">{post.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-3 mb-0.5">
                          <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight italic font-display">{post.authorName}</h4>
                          <Badge className="bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-400 border border-slate-100 px-2 py-0.5 shadow-sm">
                            {post.authorRole}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em]">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'Just Now'}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-2xl w-10 h-10">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="px-8 py-4 relative z-10">
                  <p className="text-slate-600 leading-relaxed font-medium text-lg">
                    {post.content}
                  </p>
                  {post.image && (
                    <div className="mt-8 rounded-3xl overflow-hidden border border-slate-100 shadow-xl group/img relative">
                      <div className="absolute inset-0 bg-primary-600/5 opacity-0 group-hover/img:opacity-100 transition-opacity" />
                      <img src={post.image} alt="Post content" className="w-full h-auto object-cover max-h-[500px]" />
                    </div>
                  )}
                </CardContent>
                <CardFooter className="px-8 py-6 bg-slate-50/30 border-t border-slate-50 flex items-center gap-8 relative z-10">
                  <button className="flex items-center gap-3 text-slate-400 hover:text-primary-600 transition-all group/stat">
                    <div className="p-2.5 rounded-xl bg-white group-hover/stat:bg-primary-50 transition-all shadow-sm">
                       <Heart className="w-5 h-5 group-active/stat:scale-125 transition-transform" />
                    </div>
                    <span className="text-sm font-black italic">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-3 text-slate-400 hover:text-primary-600 transition-all group/stat">
                    <div className="p-2.5 rounded-xl bg-white group-hover/stat:bg-primary-50 transition-all shadow-sm">
                       <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-black italic">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-3 text-slate-400 hover:text-primary-600 transition-all group/stat ml-auto">
                    <div className="p-2.5 rounded-xl bg-white group-hover/stat:bg-primary-50 transition-all shadow-sm">
                       <Share2 className="w-5 h-5" />
                    </div>
                  </button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-8 hidden lg:block">
        {/* Trending */}
        <Card className="bg-white border-slate-100 shadow-sm overflow-hidden rounded-[2rem] border-none">
          <CardHeader className="p-8 pb-4 flex flex-row items-center gap-3 bg-slate-50/50 border-b border-slate-50 mb-6">
            <div className="p-2 bg-primary-600 rounded-lg shadow-lg shadow-primary-600/20">
               <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-slate-400 font-display italic">Trending Topics</h3>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-6">
            {[
              { tag: '#ProfessionalGrowth', posts: '12.4k' },
              { tag: '#FutureOfRecruitment', posts: '8.2k' },
              { tag: '#CampusInnovation', posts: '4.5k' },
              { tag: '#NetworkingElite', posts: '2.1k' },
            ].map((trend) => (
              <div key={trend.tag} className="group cursor-pointer space-y-1">
                <p className="text-sm font-bold group-hover:text-primary-600 transition-colors uppercase tracking-tight text-slate-900 italic font-display">{trend.tag}</p>
                <p className="text-[10px] text-slate-300 font-black uppercase tracking-widest">{trend.posts} broadcasts</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Suggestions */}
        <Card className="bg-white border-slate-100 shadow-sm overflow-hidden rounded-[2rem] border-none">
          <CardHeader className="p-8 pb-4 bg-slate-50/50 border-b border-slate-50 mb-6">
            <div className="flex items-center gap-3">
               <Sparkles className="w-4 h-4 text-primary-600" />
               <h3 className="font-black text-[10px] tracking-[0.3em] uppercase text-slate-400 font-display italic">Elite Networkers</h3>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8 space-y-8">
            {MOCK_USERS.filter(u => u.id == currentUser.id).slice(0, 3).map((user) => (
              <div key={user.id} className="flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-4 overflow-hidden">
                  <Avatar className="w-12 h-12 flex-shrink-0 border-2 border-slate-50 shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-primary-600 text-white text-[10px] font-bold">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="overflow-hidden space-y-1">
                    <p className="text-sm font-bold truncate text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight italic font-display">{user.name}</p>
                    <p className="text-[9px] text-slate-300 font-black uppercase tracking-widest">{user.role}</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-primary-600 hover:bg-primary-50 rounded-xl h-10 w-10 transition-all p-0 shadow-sm border border-slate-50">
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="ghost" className="w-full text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl h-10 text-[10px] font-black uppercase tracking-widest transition-all">
               View Recommended
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
