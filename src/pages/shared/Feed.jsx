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
  Zap
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MOCK_USERS, MOCK_POSTS } from '@/mocks';
import { toast } from 'sonner';

export default function FeedPage() {
  const trends = [
    { tag: '#CloudMastery', count: '1.2k' },
    { tag: '#AITraining', count: '850' },
    { tag: '#FrontendStrategy', count: '640' },
  ];

  const handleBroadcast = () => {
    toast.success('Transmission broadcasted to elite network');
  };

  const handleAction = (action) => {
    toast.info(`${action} requested`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans pb-20">
      {/* Left Column: Post Creation & Feed */}
      <div className="lg:col-span-8 space-y-8">
        {/* Create Post */}
        <Card className="rounded-[2.5rem] border-slate-100 shadow-sm overflow-hidden bg-white border-none">
          <CardContent className="p-8">
            <div className="flex gap-4">
              <Avatar className="w-12 h-12 border border-slate-100">
                <AvatarImage src={MOCK_USERS[0].avatar} />
                <AvatarFallback>{MOCK_USERS[0].name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <textarea 
                  placeholder="Share a professional milestone or insight..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-medium focus:ring-1 focus:ring-primary-500/20 min-h-[120px] resize-none outline-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Media upload')} className="text-slate-600 hover:text-primary-600 rounded-xl px-4 font-bold text-xs uppercase tracking-wide">
                      <ImageIcon className="w-4 h-4 mr-2" /> Media
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleAction('Milestone tagging')} className="text-slate-600 hover:text-primary-600 rounded-xl px-4 font-bold text-xs uppercase tracking-wide">
                      <Zap className="w-4 h-4 mr-2" /> Milestone
                    </Button>
                  </div>
                  <Button onClick={handleBroadcast} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 font-bold text-xs uppercase tracking-wide border-none shadow-lg shadow-primary-600/10">
                    Broadcast
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feed Posts */}
        <div className="space-y-6">
          {MOCK_POSTS.map((post) => (
            <Card key={post.id} className="rounded-[2.5rem] border-slate-100 bg-white shadow-sm hover:border-primary-100 transition-all border-none">
              <CardHeader className="p-8 pb-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <Avatar className="w-12 h-12 border border-slate-100 transition-transform">
                      <AvatarImage src={post.authorAvatar} />
                      <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{post.authorName}</h4>
                      <div className="flex items-center gap-2">
                         <Badge variant="secondary" className="bg-primary-50 text-primary-600 border-none text-xs font-bold uppercase px-2 shadow-sm">Verified {post.authorRole}</Badge>
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">2h ago</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 py-6">
                <p className="text-slate-700 text-base leading-relaxed font-medium">
                  {post.content}
                </p>
              </CardContent>
              <CardFooter className="p-8 pt-0 flex items-center justify-between border-t border-slate-50 mt-4">
                <div className="flex items-center gap-8 pt-6">
                  <button className="flex items-center gap-2.5 text-slate-600 hover:text-red-500 transition-all group" onClick={() => handleAction('Like')}>
                    <div className="p-2 rounded-lg group-hover:bg-red-50 transition-all">
                      <Heart className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-600 hover:text-primary-600 transition-all group" onClick={() => handleAction('Comment')}>
                    <div className="p-2 rounded-lg group-hover:bg-primary-50 transition-all">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2.5 text-slate-600 hover:text-emerald-500 transition-all group" onClick={() => handleAction('Share')}>
                    <div className="p-2 rounded-lg group-hover:bg-emerald-50 transition-all">
                      <Share2 className="w-5 h-5" />
                    </div>
                  </button>
                </div>
                <div className="pt-6">
                   <Button variant="ghost" onClick={() => handleAction('Opening full discussion...')} className="text-xs font-bold uppercase tracking-wide text-slate-600 hover:text-primary-600">View Discussion</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column: Trending & Suggestions */}
      <div className="lg:col-span-4 space-y-8">
        <Card className="rounded-[2rem] border-slate-100 bg-white shadow-sm border-none p-8">
          <div className="space-y-6">
            <h3 className="font-bold text-xs uppercase text-slate-600 tracking-wider">Trending Topics</h3>
            <div className="space-y-4">
              {trends.map((trend) => (
                <div key={trend.tag} className="group cursor-pointer" onClick={() => handleAction(`Trending: ${trend.tag}`)}>
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold group-hover:text-primary-600 transition-colors uppercase tracking-tight text-slate-900">{trend.tag}</p>
                    <Badge variant="outline" className="text-xs font-bold text-slate-600 border-slate-100">{trend.count}</Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Active Discussions</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="rounded-[2rem] border-slate-100 bg-white shadow-sm border-none p-8">
          <div className="space-y-6">
             <h3 className="font-bold text-xs uppercase text-slate-600 tracking-wider">Elite Networkers</h3>
             <div className="space-y-6">
                {MOCK_USERS.slice(1, 4).map((user) => (
                  <div key={user.id} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border border-slate-100 shadow-sm">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate text-slate-900 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{user.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">{user.role}</p>
                      </div>
                    </div>
                    <Button size="icon" variant="ghost" onClick={() => handleAction(`Connecting with ${user.name}...`)} className="h-9 w-9 rounded-xl text-slate-500 hover:text-primary-600 hover:bg-primary-50 transition-all">
                      <UserPlus className="w-4.5 h-4.5" />
                    </Button>
                  </div>
                ))}
             </div>
             <Button onClick={() => handleAction('Generating custom recommendations...')} className="w-full bg-slate-900 hover:bg-slate-50 border-none text-white hover:text-slate-900 rounded-xl h-10 text-xs font-bold uppercase transition-all">
               View Recommended
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
