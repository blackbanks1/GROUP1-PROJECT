import { motion } from 'motion/react';
import { Search, Filter, MapPin, Briefcase, DollarSign, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const MOCK_INTERNSHIPS = [
  {
    id: '1',
    title: 'Product Design Intern',
    company: 'FinTech Solutions',
    location: 'Remote',
    salary: '$2,500/mo',
    type: 'Full-time',
    duration: '6 Months',
    tags: ['UI/UX', 'Figma', 'Product Thinking'],
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=FT'
  },
  {
    id: '2',
    title: 'Junior Frontend Developer',
    company: 'EcoTech Startup',
    location: 'Kigali, Rwanda',
    salary: 'Negotiable',
    type: 'Part-time',
    duration: '3 Months',
    tags: ['React', 'Tailwind', 'Next.js'],
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=ET'
  },
  {
    id: '3',
    title: 'Marketing & Growth Intern',
    company: 'Creative Hub',
    location: 'Nairobi, Kenya',
    salary: '$800/mo',
    type: 'Hybrid',
    duration: '4 Months',
    tags: ['SEO', 'Content', 'Social Media'],
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=CH'
  },
  {
    id: '4',
    title: 'Cybersecurity Analyst (TVET Focus)',
    company: 'SecureNet',
    location: 'On-site',
    salary: '$1,200/mo',
    type: 'Full-time',
    duration: '12 Months',
    tags: ['Networking', 'Linux', 'Security'],
    logo: 'https://api.dicebear.com/7.x/initials/svg?seed=SN'
  }
];

export default function ExploreOpportunities() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight font-display text-slate-950">
          Explore <span className="text-primary-600">Opportunities</span>
        </h1>
        <p className="text-slate-500 text-lg font-medium max-w-2xl">
          Discover high-impact internships and career-entry roles curated for your specific roadmap and expertise level.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
          <Input 
            placeholder="Search roles, companies, or skills..." 
            className="bg-slate-50 border-slate-200 h-14 pl-12 rounded-2xl focus-visible:ring-primary-500/50 text-slate-900 placeholder:text-slate-400"
          />
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <Button variant="outline" className="h-14 px-6 border-slate-200 bg-white rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-50 flex-1 lg:flex-none">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </Button>
          <Button className="h-14 px-8 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl shadow-lg shadow-primary-600/10 flex-1 lg:flex-none">
            Find Opportunities
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
        {['All Roles', 'Software', 'Design', 'Marketing', 'Business', 'TVET / Technical', 'Security', 'Data Science'].map((cat) => (
          <Button key={cat} variant="ghost" className="whitespace-nowrap rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-900 px-6 font-bold text-xs uppercase tracking-widest">
            {cat}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_INTERNSHIPS.map((job, idx) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="bg-white border-slate-200 hover:border-primary-400/50 transition-all group overflow-hidden cursor-pointer relative shadow-sm">
              <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-30 transition-opacity" />
              <CardContent className="p-8 relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center group-hover:bg-white transition-colors">
                      <img src={job.logo} alt={job.company} className="w-full h-full rounded-lg" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xl group-hover:text-primary-600 transition-colors mb-1 text-slate-900">{job.title}</h3>
                      <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
                        {job.company} &bull; <MapPin className="w-3 h-3" /> {job.location}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-400 group-hover:text-primary-600 rounded-xl h-12 w-12 bg-slate-50">
                    <ArrowUpRight className="w-6 h-6" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Salary</p>
                    <div className="flex items-center gap-1.5 text-primary-600 font-bold text-xs">
                       <DollarSign className="w-3 h-3" /> {job.salary}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Type</p>
                    <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                       <Briefcase className="w-3 h-3" /> {job.type}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Duration</p>
                    <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                       <Clock className="w-3 h-3" /> {job.duration}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {job.tags.map(tag => (
                    <Badge key={tag} className="bg-slate-50 text-slate-500 border border-slate-100 rounded-lg px-3 py-1 font-bold text-[9px] uppercase tracking-widest">
                      {tag}
                    </Badge>
                  ))}
                  <div className="ml-auto">
                     <Badge className="bg-primary-600 text-white border-none rounded-lg px-3 py-1 font-black text-[9px] uppercase tracking-widest shadow-md shadow-primary-600/10">
                        Top Choice
                     </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center pt-10">
         <Button variant="outline" className="text-slate-400 hover:text-primary-600 hover:bg-slate-50 border-slate-200 rounded-2xl h-14 px-12 text-sm font-bold uppercase tracking-widest transition-all">
            Load More Opportunities
            <Sparkles className="w-4 h-4 ml-3" />
         </Button>
      </div>
    </div>
  );
}
