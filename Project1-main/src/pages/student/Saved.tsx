import { motion } from 'motion/react';
import { 
  Bookmark, 
  Trash2, 
  Zap, 
  ArrowUpRight, 
  Search, 
  Filter, 
  Clock, 
  Briefcase, 
  Building2,
  MapPin
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const SAVED_ITEMS = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'FinTech Solutions',
    type: 'Internship',
    salary: '$2,500/mo',
    savedOn: '2 days ago',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FT'
  },
  {
    id: '2',
    title: 'Junior Frontend Developer',
    company: 'EcoTech Startup',
    type: 'Job',
    salary: 'Negotiable',
    savedOn: '5 days ago',
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=ET'
  }
];

export default function SavedOpportunities() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary-600">
             <div className="p-2 bg-primary-100 rounded-lg">
                <Bookmark className="w-5 h-5" />
             </div>
             <span className="text-[10px] uppercase font-black tracking-[0.4em]">Vault of Interests</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
            Saved <span className="text-primary-600">Items</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium max-w-2xl">
            A curated list of opportunities you've bookmarked for strategic evaluation and future application.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <div className="lg:col-span-3 h-20 bg-slate-50 border border-slate-200 rounded-3xl flex items-center px-8 group focus-within:border-primary-400 transition-all shadow-sm">
            <Search className="w-6 h-6 text-slate-400 group-focus-within:text-primary-600 transition-colors mr-6" />
            <Input 
              placeholder="Filter your saved opportunities..." 
              className="bg-transparent border-none focus-visible:ring-0 text-xl placeholder:text-slate-400 text-slate-900 font-medium" 
            />
         </div>
         <Button variant="outline" className="h-20 border-slate-200 rounded-3xl flex items-center justify-center gap-4 bg-white hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 w-full group">
            <Trash2 className="w-5 h-5 group-hover:text-red-500 transition-colors" />
            <span className="font-black text-xs uppercase tracking-widest">Clear All</span>
         </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SAVED_ITEMS.length > 0 ? (
          SAVED_ITEMS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-white border-slate-200 group hover:border-primary-400/50 transition-all overflow-hidden flex flex-col rounded-[2.5rem] shadow-sm hover:shadow-md">
                 <CardContent className="p-8 space-y-8 flex-1 flex flex-col">
                    <div className="flex items-start justify-between">
                       <div className="flex gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:bg-primary-50 transition-colors">
                             <img src={item.logo} alt={item.company} className="w-full h-full rounded-lg" />
                          </div>
                          <div>
                             <h4 className="font-bold text-lg text-slate-950 group-hover:text-primary-600 transition-colors leading-tight">{item.title}</h4>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 mt-1">
                                <Building2 className="w-3 h-3" /> {item.company}
                             </p>
                          </div>
                       </div>
                       <Button variant="ghost" size="icon" className="text-primary-600 hover:text-white hover:bg-primary-600 transition-all rounded-xl h-10 w-10">
                          <Bookmark className="w-5 h-5 fill-current" />
                       </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                       <div className="space-y-1">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Salary</p>
                          <p className="font-bold text-slate-900 text-xs">{item.salary}</p>
                       </div>
                       <div className="space-y-1 text-right">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Saved On</p>
                          <p className="font-bold text-slate-500 text-xs">{item.savedOn}</p>
                       </div>
                    </div>

                    <div className="flex gap-2">
                       <Button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-600/10 transition-all">
                          Apply Now
                       </Button>
                       <Button variant="outline" className="w-12 h-12 rounded-xl bg-white border-slate-200 text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all p-0">
                          <ArrowUpRight className="w-5 h-5" />
                       </Button>
                    </div>
                 </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="lg:col-span-3 py-20 text-center opacity-60">
             <Bookmark className="w-20 h-20 mx-auto mb-6 text-slate-300" />
             <h3 className="text-2xl font-bold uppercase tracking-widest text-slate-400">No Saved Items</h3>
             <p className="text-sm font-bold uppercase tracking-widest text-slate-300">Explore opportunities to build your vault.</p>
          </div>
        )}
      </div>
    </div>
  );
}
