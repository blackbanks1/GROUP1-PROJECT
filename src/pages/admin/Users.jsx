import * as React from 'react';
import { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Shield, 
  CheckCircle2, 
  Trash2,
  Download,
  Upload,
  UserCheck,
  UserCog,
  User
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TagInput } from "@/components/ui/tag-input";
import { MOCK_USERS } from '@/mocks';
import { toast } from 'sonner';

export default function AdminUsers() {
  const [users, setUsers] = useState(MOCK_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [isBulkAddOpen, setIsBulkAddOpen] = useState(false);
  const [bulkTags, setBulkTags] = useState([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || user.role === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleBulkAdd = () => {
    if (bulkTags.length === 0) {
      toast.error('Please add at least one email address');
      return;
    }

    const newUsers = bulkTags.map((email, idx) => ({
      id: `new-${Date.now()}-${idx}`,
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      role: 'lecturer',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      createdAt: new Date().toISOString()
    }));

    setUsers([...newUsers, ...users]);
    setIsBulkAddOpen(false);
    setBulkTags([]);
    toast.success(`Successfully added ${bulkTags.length} lecturers`);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
    toast.success('User removed from platform');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return <Badge className="bg-red-50 text-red-600 border-none">Admin</Badge>;
      case 'lecturer': return <Badge className="bg-blue-50 text-blue-600 border-none">Lecturer</Badge>;
      case 'company': return <Badge className="bg-emerald-50 text-emerald-600 border-none">Company</Badge>;
      case 'student': return <Badge className="bg-primary-50 text-primary-600 border-none">Student</Badge>;
      default: return <Badge variant="outline">{role}</Badge>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-px w-6 bg-primary-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-primary-600">User Management</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950">
            Platform <span className="text-primary-600">Directory</span>
          </h1>
          <p className="text-slate-500 text-sm font-normal max-w-2xl leading-relaxed">Manage access, roles, and onboarding for all ecosystem participants.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-xl h-10 px-4 font-semibold text-xs border-slate-200">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          
          <Dialog open={isBulkAddOpen} onOpenChange={setIsBulkAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-10 px-6 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary-600/10 border-none transition-all active:scale-95">
                <UserPlus className="w-4 h-4 mr-2" /> Bulk Add Lecturers
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary-600" />
              <DialogHeader className="p-2">
                <DialogTitle className="text-2xl font-bold tracking-tight text-slate-900">Add Academic Staff</DialogTitle>
                <DialogDescription className="text-slate-500 font-medium">
                  Paste a list of emails to instantly generate lecturer accounts.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-widest text-slate-400">Lecturer Emails</label>
                  <TagInput 
                    placeholder="Enter email and press Enter..." 
                    tags={bulkTags}
                    setTags={setBulkTags}
                  />
                  <p className="text-[10px] text-slate-400 italic">Type an email and press Enter to add to the list.</p>
                </div>
              </div>
              <DialogFooter className="p-2 gap-2">
                <Button variant="ghost" onClick={() => setIsBulkAddOpen(false)} className="rounded-xl font-bold text-xs uppercase tracking-widest">Cancel</Button>
                <Button onClick={handleBulkAdd} className="bg-primary-600 hover:bg-primary-700 text-white rounded-xl px-8 font-bold text-xs uppercase tracking-widest">Create Accounts</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList className="bg-slate-100/50 p-1 rounded-xl border border-slate-100">
            <TabsTrigger value="all" className="rounded-lg px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-primary-600 data-[state=active]:shadow-sm">All Users</TabsTrigger>
            <TabsTrigger value="student" className="rounded-lg px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-primary-600">Students</TabsTrigger>
            <TabsTrigger value="lecturer" className="rounded-lg px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-primary-600">Lecturers</TabsTrigger>
            <TabsTrigger value="company" className="rounded-lg px-4 text-xs font-bold uppercase tracking-wider data-[state=active]:bg-white data-[state=active]:text-primary-600">Companies</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
          <Input 
            placeholder="Search name or email..." 
            className="pl-10 rounded-xl border-slate-200 bg-white shadow-sm focus:ring-primary-600/10 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <Card className="glass border-slate-200/50 shadow-xl overflow-hidden rounded-3xl">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-slate-100">
              <TableHead className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-4 px-6">User Identity</TableHead>
              <TableHead className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-4 px-6">Access Role</TableHead>
              <TableHead className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-4 px-6">Platform Activity</TableHead>
              <TableHead className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-4 px-6">Status</TableHead>
              <TableHead className="text-[10px] uppercase font-black tracking-widest text-slate-400 py-4 px-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="border-slate-100 hover:bg-primary-50/30 transition-all duration-300 group/row cursor-pointer">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-10 h-10 border border-slate-200 group-hover/row:border-primary-600/50 group-hover/row:scale-105 transition-all duration-300">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="bg-primary-50 text-primary-700 font-bold text-xs">{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 group-hover/row:text-primary-600 transition-colors truncate">{user.name}</p>
                        <p className="text-[11px] text-slate-400 font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-[10px] font-bold text-slate-600">Joined Platform</p>
                      <p className="text-[10px] text-slate-400 font-medium">{user.createdAt || 'May 12, 2024'}</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Active</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
                        <UserCog className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(user.id);
                        }}
                        className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="py-20 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                      <Users className="w-8 h-8 text-slate-200" />
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No users found matching your search</p>
                    <Button variant="link" onClick={() => { setSearchTerm(''); setActiveTab('all'); }} className="text-primary-600 text-xs font-bold uppercase tracking-widest">Clear all filters</Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="p-4 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {filteredUsers.length} total users</p>
           <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest h-8" disabled>Previous</Button>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold text-primary-600 uppercase tracking-widest h-8">Next Page</Button>
           </div>
        </div>
      </Card>
    </div>
  );
}
