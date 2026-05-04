import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { 
    Search, 
    User, 
    Shield, 
    Calendar, 
    Mail, 
    Filter,
    MoreHorizontal,
    ChevronLeft,
    ChevronRight,
    UserCircle
} from 'lucide-react';
import { Head, router, usePage } from '@inertiajs/react';

type Role = { id: number; name: string };
type User = { id: number; name: string; email: string; role_id: number | null; role: Role | null; created_at: string };

type Props = {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
    roles: Role[];
    filters: {
        search?: string;
        role_id?: string;
    };
};

export default function Users({ users, roles, filters }: Props) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { ...filters, search }, { preserveState: true, preserveScroll: true });
    };

    const handleRoleFilter = (roleId: string) => {
        router.get('/admin/users', { ...filters, role_id: roleId === 'all' ? undefined : roleId }, { preserveState: true, preserveScroll: true });
    };

    const changeRole = (userId: number, roleId: string) => {
        router.put(`/admin/users/${userId}`, roleId === 'none' ? { role_id: null } : { role_id: Number(roleId) }, {
            preserveScroll: true,
        });
    };

    return (
        <AppEliteCoachLayout title="User Management">
            <Head title="Manage Users" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            User Directory
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage global access and role assignments</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <form onSubmit={handleSearch} className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..." 
                                className="h-10 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all w-72"
                            />
                        </form>
                        
                        <div className="h-10 px-4 rounded-xl border border-gray-100 bg-white flex items-center gap-2">
                            <Filter size={14} className="text-gray-400" />
                            <Select
                                defaultValue={filters.role_id || 'all'}
                                onValueChange={handleRoleFilter}
                            >
                                <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 focus:ring-offset-0 text-sm font-bold text-slate-700 w-[120px]">
                                    <SelectValue placeholder="All Roles" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                    <SelectItem value="all" className="text-xs font-bold py-2">All Roles</SelectItem>
                                    <SelectItem value="none" className="text-xs font-bold py-2">No Role</SelectItem>
                                    {roles.map((role) => (
                                        <SelectItem key={role.id} value={role.id.toString()} className="text-xs font-bold py-2">
                                            {role.name.replace('-', ' ').toUpperCase()}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">User Identity</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Communication</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Role Assignment</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">History</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Settings</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div 
                                                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
                                                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
                                                >
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900">{user.name}</div>
                                                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5">Verified User</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                                <Mail size={14} className="text-slate-400" />
                                                {user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                                    <Shield size={14} />
                                                </div>
                                                <Select
                                                    defaultValue={user.role_id?.toString() || 'none'}
                                                    onValueChange={(val) => changeRole(user.id, val)}
                                                >
                                                    <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 focus:ring-offset-0 text-sm font-bold text-slate-900 w-fit gap-2">
                                                        <SelectValue placeholder="Select a role" />
                                                    </SelectTrigger>
                                                    <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                                        <SelectItem value="none" className="text-xs font-bold py-2">NO ROLE</SelectItem>
                                                        {roles.map((role) => (
                                                            <SelectItem key={role.id} value={role.id.toString()} className="text-xs font-bold py-2">
                                                                {role.name.replace('-', ' ').toUpperCase()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <Calendar size={14} className="text-gray-400" />
                                                {new Date(user.created_at).toLocaleDateString(undefined, { 
                                                    year: 'numeric', 
                                                    month: 'short', 
                                                    day: 'numeric' 
                                                })}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100 transition-all">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                    <UserCircle size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">No Users Found</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Adjust your search or filters to see results.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-gray-50/30 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Showing {users.from}-{users.to} of {users.total} global users
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {users.links.map((link, index) => {
                                const isNext = link.label.includes('Next');
                                const isPrev = link.label.includes('Previous');
                                
                                return (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url)}
                                        className={`
                                            h-9 min-w-[36px] px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                                            ${link.active 
                                                ? 'bg-indigo-600 text-white shadow-md' 
                                                : 'bg-white border border-gray-100 text-slate-600 hover:bg-gray-50'
                                            }
                                            ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {isPrev && <ChevronLeft size={14} />}
                                        {!isPrev && !isNext && <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                        {isNext && <ChevronRight size={14} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}
