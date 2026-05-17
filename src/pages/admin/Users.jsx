import * as React from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  ShieldCheck, 
  Building2, 
  GraduationCap,
  Filter,
  CheckCircle2,
  X,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { api } from '@/lib/api';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedRole, setSelectedRole] = React.useState('all');
  
  React.useEffect(() => {
    async function loadUsers() {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (error) {
        toast.error('Failed to load user directory');
      } finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleAction = (msg) => {
    toast.info(msg);
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700 font-sans pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
             <div className="h-0.5 w-4 bg-primary-600 rounded-full" />
             <span className="text-xs font-bold uppercase tracking-wide text-primary-600">User Management</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">Ecosystem Directory</h1>
          <p className="text-slate-600 text-base">Oversee all active participants, roles, and verification statuses.</p>
        </div>
        <Button onClick={() => handleAction('Opening user provisioning wizard...')} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 px-6 font-bold text-xs uppercase shadow-xl shadow-primary-600/10 border-none">
          <UserPlus className="w-4 h-4 mr-2" /> Provision New User
        </Button>
      </div>

      <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/20">
           <div className="flex items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-10 h-10 bg-white border-slate-200 rounded-xl"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-1.5 p-1 bg-white border border-slate-100 rounded-xl">
                 {['all', 'student', 'lecturer', 'company', 'admin'].map(role => (
                   <button
                     key={role}
                     onClick={() => setSelectedRole(role)}
                     className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${selectedRole === role ? 'bg-primary-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-900'}`}
                   >
                     {role}
                   </button>
                 ))}
              </div>
           </div>
           <Button variant="outline" onClick={() => handleAction('Generating advanced CSV/PDF export...')} className="rounded-xl border-slate-100 h-10 text-xs font-bold uppercase text-slate-500">
              <Filter className="w-4 h-4 mr-2" /> Advanced Export
           </Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-slate-100">
                <TableHead className="w-[300px] h-14 text-xs font-bold uppercase tracking-wide text-slate-500 pl-8">Participant</TableHead>
                <TableHead className="h-14 text-xs font-bold uppercase tracking-wide text-slate-500">Role & Access</TableHead>
                <TableHead className="h-14 text-xs font-bold uppercase tracking-wide text-slate-500">Verification</TableHead>
                <TableHead className="h-14 text-xs font-bold uppercase tracking-wide text-slate-500">Engagement</TableHead>
                <TableHead className="h-14 text-right pr-8 h-14 text-xs font-bold uppercase tracking-wide text-slate-500">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-slate-50/50 border-slate-50 transition-colors">
                  <TableCell className="py-5 pl-8">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border border-slate-100 shadow-sm">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="font-bold text-xs bg-slate-100 text-slate-600">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold text-slate-900 uppercase">{user.name}</p>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`border-none font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full ${
                      user.role === 'admin' ? 'bg-slate-900 text-white' :
                      user.role === 'company' ? 'bg-emerald-50 text-emerald-600' :
                      user.role === 'lecturer' ? 'bg-violet-50 text-violet-600' :
                      'bg-primary-50 text-primary-600'
                    }`}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase">Verified</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5 w-32">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>Activity</span>
                          <span>84%</span>
                        </div>
                        <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full w-[84%] bg-primary-600" />
                        </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="icon" onClick={() => handleAction(`Managing ${user.name}'s permissions...`)} className="text-slate-400 hover:text-slate-900">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-40 text-center text-slate-500 text-sm font-medium uppercase">
                    No participants found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between">
           <p className="text-xs font-bold text-slate-500 uppercase">Showing {filteredUsers.length} total participants</p>
           <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => toast.info('Loading previous page...')} className="text-xs font-bold text-slate-500 uppercase h-8" disabled>Previous</Button>
              <Button variant="ghost" size="sm" onClick={() => toast.info('Loading next page...')} className="text-xs font-bold text-primary-600 uppercase h-8">Next Page</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
