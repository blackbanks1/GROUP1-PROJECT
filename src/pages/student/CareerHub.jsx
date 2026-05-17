import * as React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  Building2,
  Calendar,
  CheckCircle2,
  Zap,
  Award,
  Globe
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MOCK_OPPORTUNITIES } from '@/mocks';
import { toast } from 'sonner';

export default function CareerHub() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleApply = (title) => {
    toast.success(`Application for ${title} submitted to verified company dashboard.`);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 font-sans pb-20">
      {/* Search & Filter Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-slate-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-xs font-bold uppercase tracking-wide text-primary-600">Talent Marketplace</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Career Hub</h1>
          <p className="text-slate-600 text-base">Access premium industrial training and high-impact internship roles.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input 
            placeholder="Search roles or companies..." 
            className="pl-12 h-12 bg-white border-slate-200 rounded-xl shadow-xl shadow-slate-100/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-bold text-slate-900">Curated Opportunities</h3>
              <Button variant="ghost" className="text-primary-600 font-bold text-xs uppercase tracking-wide">Filter Results</Button>
           </div>

           <div className="grid grid-cols-1 gap-6">
              {MOCK_OPPORTUNITIES.map((opp) => (
                <Card key={opp.id} className="group border-slate-100 bg-white hover:border-primary-100 hover:shadow-2xl hover:shadow-primary-600/5 transition-all duration-500 rounded-[2rem] overflow-hidden">
                   <CardContent className="p-10">
                      <div className="flex flex-col md:flex-row gap-8">
                         <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-primary-50 transition-all shrink-0 shadow-sm">
                            <Building2 className="w-10 h-10 text-slate-300 group-hover:text-primary-600" />
                         </div>
                         <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                               <div>
                                  <h4 className="text-2xl font-bold text-slate-950 group-hover:text-primary-600 transition-colors uppercase tracking-tight">{opp.title}</h4>
                                  <div className="flex items-center gap-2 mt-1">
                                     <span className="text-sm font-bold text-slate-500">{opp.companyName}</span>
                                     <span className="text-slate-300">&bull;</span>
                                     <span className="text-xs font-bold text-primary-600 uppercase bg-primary-50 px-2 py-0.5 rounded-md">Verified Partner</span>
                                  </div>
                               </div>
                               <Badge className="bg-emerald-50 text-emerald-600 border-none font-bold text-xs uppercase px-4 py-1.5">Open Now</Badge>
                            </div>

                            <p className="text-base text-slate-600 leading-relaxed font-medium line-clamp-2">
                               {opp.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 pt-4">
                               <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                                  <MapPin className="w-4 h-4" />
                                  {opp.location}
                               </div>
                               <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase">
                                  <Clock className="w-4 h-4" />
                                  {opp.duration}
                               </div>
                            </div>
                            
                            <div className="pt-8 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
                               <div className="flex gap-2 flex-wrap">
                                  {opp.skills.map(skill => (
                                    <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-500 font-bold text-[10px] uppercase border-none px-3">
                                      {skill}
                                    </Badge>
                                  ))}
                               </div>
                               <Button onClick={() => handleApply(opp.title)} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-12 px-10 font-bold uppercase text-xs border-none shadow-xl shadow-primary-600/10 transition-all hover:scale-105 group-hover:bg-primary-700">
                                  Apply Portal <ArrowUpRight className="w-4 h-4 ml-2" />
                               </Button>
                            </div>
                         </div>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 space-y-10">
           <Card className="bg-slate-900 border-none rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
              <div className="relative z-10 space-y-8">
                 <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary-400 border border-white/10">
                    <Zap className="w-8 h-8" />
                 </div>
                 <h3 className="text-3xl font-bold tracking-tight uppercase leading-tight">Mastery Placement</h3>
                 <p className="text-slate-400 font-medium text-base leading-relaxed">
                   Industry partners give 2x higher priority to students with completed verified mastery certifications.
                 </p>
                 <Button onClick={() => toast.info('Accessing mastery certification tracks...')} className="w-full h-14 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-bold uppercase tracking-wide text-xs">
                    Get Certified
                 </Button>
              </div>
           </Card>

           <div className="space-y-4 px-2">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Market Signals</h3>
              <div className="space-y-3">
                 <div className="p-5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between group hover:border-primary-100 transition-all cursor-pointer shadow-sm">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                          <Globe className="w-5 h-5" />
                       </div>
                       <div>
                          <p className="text-sm font-bold text-slate-950 uppercase group-hover:text-primary-600 transition-colors">Remote Adoption</p>
                          <p className="text-xs font-bold text-slate-500 uppercase">+24% This Month</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
