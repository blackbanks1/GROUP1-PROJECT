import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare,
  Search, 
  Send, 
  ImageIcon, 
  Paperclip, 
  MoreVertical,
  Phone,
  Video,
  Info,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_USERS } from '@/mocks';

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(MOCK_USERS[1].id);
  const currentUser = MOCK_USERS[0];
  const activeChatUser = MOCK_USERS.find(u => u.id === selectedChat);

  return (
    <div className="h-[calc(100vh-14rem)] bg-white border-slate-100 shadow-xl rounded-[3rem] overflow-hidden flex animate-in fade-in slide-in-from-bottom-4 duration-1000 border-none font-sans">
      {/* Sidebar List */}
      <div className="w-full md:w-96 border-r border-slate-50 flex flex-col bg-slate-50/30">
        <div className="p-8 border-b border-slate-50 bg-white/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tighter font-display uppercase italic text-slate-900">Transmissions</h2>
            <div className="p-2 bg-primary-50 rounded-lg shadow-sm border border-primary-100">
               <Zap className="w-4 h-4 text-primary-600" />
            </div>
          </div>
          <div className="relative">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
             <Input placeholder="Search transmissions..." className="bg-slate-50 border-slate-200 pl-11 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 placeholder:text-slate-300 focus-visible:ring-primary-400 shadow-sm transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 custom-scrollbar">
          {MOCK_USERS.filter(u => u.id == currentUser.id).map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedChat(user.id)}
              className={`w-full p-4 rounded-[1.8rem] flex items-center gap-4 transition-all group relative overflow-hidden ${
                selectedChat === user.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20 active:scale-95' : 'hover:bg-white text-slate-400'
              }`}
            >
              {selectedChat === user.id && (
                <motion.div layoutId="activeChat" className="absolute inset-0 bg-primary-600 -z-10" />
              )}
              <div className="relative flex-shrink-0">
                <Avatar className={`w-14 h-14 border-2 shadow-sm ${selectedChat === user.id ? 'border-primary-400' : 'border-slate-50'}`}>
                  <AvatarImage src={user.avatar} className="object-cover" />
                  <AvatarFallback className="bg-primary-50 text-primary-600 font-bold italic font-display">{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
              </div>
              <div className="flex-1 text-left overflow-hidden space-y-1">
                <div className="flex justify-between items-baseline">
                    <p className={`font-bold text-sm tracking-tight uppercase italic truncate font-display ${selectedChat === user.id ? 'text-white' : 'text-slate-900 group-hover:text-primary-600'}`}>{user.name}</p>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${selectedChat === user.id ? 'text-white/60' : 'text-slate-300'}`}>12m</span>
                </div>
                <p className={`text-[11px] truncate font-medium ${selectedChat === user.id ? 'text-white/80' : 'text-slate-400'}`}>Transmission established...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative bg-white">
        <AnimatePresence mode="wait">
          {activeChatUser ? (
            <motion.div 
              key={activeChatUser.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-1 flex flex-col h-full"
            >
              {/* Chat Header */}
              <div className="h-24 border-b border-slate-50 px-8 flex items-center justify-between bg-white/80 backdrop-blur-3xl relative z-10">
                <div className="flex items-center gap-5">
                   <div className="relative">
                      <Avatar className="w-12 h-12 border-2 border-primary-50 shadow-sm relative z-10">
                         <AvatarImage src={activeChatUser.avatar} className="object-cover" />
                         <AvatarFallback className="bg-primary-600 text-white font-bold">{activeChatUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1.5 -right-1.5 z-20">
                         <ShieldCheck className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                      </div>
                   </div>
                   <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg text-slate-900 uppercase tracking-tight italic font-display">{activeChatUser.name}</h4>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                      </div>
                      <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Verified Link &bull; Active Now</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                   <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600 hover:bg-primary-50 rounded-2xl w-12 h-12 border border-slate-50 transition-all shadow-sm"><Phone className="w-5 h-5" /></Button>
                   <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600 hover:bg-primary-50 rounded-2xl w-12 h-12 border border-slate-50 transition-all shadow-sm"><Video className="w-5 h-5" /></Button>
                   <Button variant="ghost" size="icon" className="text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-2xl w-12 h-12 border border-slate-50 transition-all shadow-sm"><Info className="w-5 h-5" /></Button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar bg-slate-50/20">
                  <div className="flex justify-center mb-8">
                     <Badge className="bg-white text-slate-300 border border-slate-100 px-6 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-sm">Secure Channel Established - Today</Badge>
                  </div>
                  <Message bubble="Greetings Alex. I've analyzed your recent portfolio submissions and the architectural depth is significant. Would you be available for a technical strategic sync tomorrow?" time="10:30 AM" isOwn={false} />
                  <Message bubble="Acknowledged. Thank you for the reach-out. I'm currently optimizing several deployments but I can allocate a window anytime after 14:00 UTC." time="10:32 AM" isOwn={true} />
                  <Message bubble="Perfect. Synchronizing for 15:00 UTC. Cal-invite broadcast incoming. Looking forward to deep-diving into your workflow." time="10:45 AM" isOwn={false} />
              </div>

              {/* Chat Input */}
              <div className="p-8 border-t border-slate-50 bg-white">
                <div className="bg-slate-50/50 p-2.5 pl-4 rounded-[2rem] flex items-center gap-3 border border-slate-100 focus-within:border-primary-400 focus-within:bg-white transition-all shadow-sm">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600 rounded-xl w-10 h-10 transition-all"><Paperclip className="w-5 h-5" /></Button>
                    <Button variant="ghost" size="icon" className="text-slate-300 hover:text-primary-600 rounded-xl w-10 h-10 transition-all"><ImageIcon className="w-5 h-5" /></Button>
                  </div>
                  <Input placeholder="Type secure message..." className="bg-transparent border-none focus-visible:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-300" />
                  <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-[1.5rem] px-8 h-12 shadow-xl shadow-primary-600/10 border-none group transition-all">
                    <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    <span className="font-black text-[10px] uppercase tracking-widest">Send</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20 space-y-8 bg-slate-50/10">
                <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center border border-slate-50 shadow-xl shadow-slate-200/50">
                   <MessageSquare className="w-12 h-12 text-slate-200" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold tracking-tighter uppercase font-display italic text-slate-900">Ecosystem Link</h3>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">Select a terminal frequency to begin secure professional transmissions.</p>
                </div>
                <Button className="bg-primary-600 text-white hover:bg-primary-700 rounded-2xl h-14 px-10 text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-primary-600/10 border-none">
                  <Sparkles className="w-4 h-4 mr-3" /> Start New Broadcast
                </Button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Message({ bubble, time, isOwn }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} max-w-[85%] ${isOwn ? 'ml-auto' : 'mr-auto'}`}
    >
      <div className={`p-6 rounded-[2.2rem] text-[15px] leading-relaxed font-medium shadow-sm relative border-none ${
        isOwn 
          ? 'bg-primary-600 text-white rounded-br-none shadow-xl shadow-primary-600/10' 
          : 'bg-white text-slate-600 rounded-bl-none border border-slate-100 shadow-sm'
      }`}>
        {bubble}
      </div>
      <span className={`text-[9px] font-black uppercase tracking-[0.2em] mt-3 px-2 ${isOwn ? 'text-primary-600' : 'text-slate-300'}`}>{time}</span>
    </motion.div>
  );
}
