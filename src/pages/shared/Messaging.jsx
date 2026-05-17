import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Send, 
  MoreVertical, 
  Image as ImageIcon, 
  Smile, 
  Paperclip,
  CheckCheck,
  Zap,
  ShieldCheck,
  Clock,
  ArrowLeft
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { MOCK_USERS } from '@/mocks';

export default function MessagingPage() {
  const [selectedChat, setSelectedChat] = useState(MOCK_USERS[1].id);
  const activeChatUser = MOCK_USERS.find(u => u.id === selectedChat);

  return (
    <div className="h-[calc(100vh-12rem)] flex gap-8 animate-in fade-in duration-700 font-sans">
      {/* Sidebar: Conversations */}
      <Card className="w-96 hidden lg:flex flex-col bg-white border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden border-none">
        <div className="p-8 border-b border-slate-50">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Transmissions</h2>
             <Button variant="ghost" size="icon" className="text-slate-400">
               <MoreVertical className="w-5 h-5" />
             </Button>
           </div>
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <Input 
               placeholder="Search partners..." 
               className="bg-slate-50 border-none pl-10 h-11 rounded-xl"
             />
           </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar">
           {MOCK_USERS.slice(1).map((user) => (
             <button
               key={user.id}
               onClick={() => setSelectedChat(user.id)}
               className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${selectedChat === user.id ? 'bg-primary-600 text-white shadow-xl shadow-primary-600/20' : 'hover:bg-slate-50'}`}
             >
                <div className="relative flex-shrink-0">
                  <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={`font-bold ${selectedChat === user.id ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-600'}`}>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${user.role === 'company' ? 'bg-emerald-500' : 'bg-primary-500'}`} />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className={`font-bold text-sm tracking-tight uppercase truncate ${selectedChat === user.id ? 'text-white' : 'text-slate-900 group-hover:text-primary-600'}`}>{user.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wide truncate ${selectedChat === user.id ? 'text-white/60' : 'text-slate-400'}`}>{user.role}</p>
                </div>
             </button>
           ))}
        </div>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col bg-white border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden border-none relative">
        {activeChatUser ? (
          <>
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
               <div className="flex items-center gap-5">
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <ArrowLeft className="w-6 h-6" />
                  </Button>
                  <Avatar className="w-14 h-14 border border-slate-100 shadow-sm">
                    <AvatarImage src={activeChatUser.avatar} />
                    <AvatarFallback>{activeChatUser.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 uppercase tracking-tight">{activeChatUser.name}</h4>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Active Discussion</span>
                    </div>
                  </div>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" className="rounded-xl border-slate-100 bg-white font-bold text-[10px] uppercase h-10 px-4">
                     View Identity
                  </Button>
                  <Button variant="ghost" size="icon" className="text-slate-300">
                    <MoreVertical className="w-5 h-5" />
                  </Button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
               <Message bubble="received" text="I've reviewed your microservices draft. Exceptional technical clarity on the redundancy protocols." time="10:24 AM" />
               <Message bubble="sent" text="Thank you, Dr. Smith. I'm focusing on ensuring zero-downtime during the migration phase." time="10:26 AM" />
               <Message bubble="received" text="Excellent. Let's schedule a deep dive for tomorrow at 2 PM." time="10:28 AM" isLast />
            </div>

            <div className="p-8 bg-slate-50/50">
               <div className="relative">
                  <textarea 
                    placeholder="Input technical transmission..."
                    className="w-full bg-white border border-slate-200 rounded-3xl p-6 pr-40 text-sm font-medium focus:ring-1 focus:ring-primary-500/20 min-h-[80px] max-h-[200px] resize-none outline-none shadow-sm"
                  />
                  <div className="absolute right-4 bottom-4 flex items-center gap-2">
                     <Button variant="ghost" size="icon" onClick={() => handleAction('Attaching ecosystem data...')} className="text-slate-400 hover:text-primary-600 h-10 w-10">
                        <Paperclip className="w-5 h-5" />
                     </Button>
                     <Button variant="ghost" size="icon" onClick={() => handleAction('Opening media vault...')} className="text-slate-400 hover:text-primary-600 h-10 w-10">
                        <ImageIcon className="w-5 h-5" />
                     </Button>
                     <Button onClick={() => toast.success('Transmission successfully dispatched')} className="bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-11 px-6 font-bold text-xs uppercase shadow-lg shadow-primary-600/10 border-none">
                        Send <Send className="w-4 h-4 ml-2" />
                     </Button>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
             <div className="w-32 h-32 rounded-full bg-slate-50 flex items-center justify-center mb-8">
                <Zap className="w-16 h-16 text-slate-200" />
             </div>
             <h3 className="text-3xl font-bold tracking-tight uppercase text-slate-900">Ecosystem Link</h3>
             <p className="text-slate-400 text-lg font-medium max-w-md mt-4 leading-relaxed">
               Select a professional transmission from the sidebar to engage with the CareerLink network.
             </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function Message({ bubble, text, time, isLast }) {
  return (
    <div className={`flex flex-col ${bubble === 'sent' ? 'items-end' : 'items-start'} space-y-2`}>
       <div className={`max-w-[70%] p-6 rounded-[2rem] text-sm font-medium leading-relaxed ${bubble === 'sent' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'}`}>
          {text}
       </div>
       <div className="flex items-center gap-2 px-2">
          <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{time}</span>
          {bubble === 'sent' && <CheckCheck className="w-3.5 h-3.5 text-primary-500" />}
       </div>
    </div>
  );
}
