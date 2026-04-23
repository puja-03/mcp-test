import { Head, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Search, Plus, Trash2, User, Mail, Shield, ShieldCheck, UserPlus } from 'lucide-react';

type Role = { id: number; name: string };
type UserType = { id: number; name: string; email: string; role_id: number | null; role: Role | null; created_at: string };

export default function TenantUsers({ users, tenant, roles, filters }: { users: any; tenant: any; roles: Role[]; filters: any }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || 'all');
    const [isAdding, setIsAdding] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role_id: '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/users', { search, role: roleFilter === 'all' ? '' : roleFilter }, { preserveState: true });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/users', {
            onSuccess: () => {
                reset();
                setIsAdding(false);
            },
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(`/tenant/users/${id}`);
        }
    };

    const changeRole = (userId: number, roleId: string) => {
        router.put(`/tenant/users/${userId}`, {
            role_id: roleId === 'none' ? null : Number(roleId)
        }, { preserveScroll: true });
    };

    return (
        <>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Staff & Users</h1>
                        <p className="text-muted-foreground font-medium">{tenant?.name} — Manage your team, instructors, and students.</p>
                    </div>
                    <Button onClick={() => setIsAdding(!isAdding)} className="gap-2 shadow-md">
                        {isAdding ? 'Cancel' : <><UserPlus className="h-4 w-4" /> Add User</>}
                    </Button>
                </div>

                {/* Add User Form - Animated Dropdown style */}
                {isAdding && (
                    <div className="rounded-2xl border bg-card p-8 shadow-xl ring-1 ring-border/50 animate-in slide-in-from-top-4 duration-300">
                        <div className="flex items-center gap-2 mb-6 pb-2 border-b border-dashed">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <h2 className="text-lg font-bold uppercase tracking-widest text-foreground/80">Register New Staff / Student</h2>
                        </div>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. John Doe" className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                {errors.name && <p className="text-xs text-destructive font-bold">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="email@example.com" className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                {errors.email && <p className="text-xs text-destructive font-bold">{errors.email}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role_id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Assign Role</Label>
                                <Select onValueChange={(v) => setData('role_id', v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold uppercase text-[10px] tracking-widest">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none" className="font-bold uppercase text-[10px] tracking-widest">No Specific Role</SelectItem>
                                        {roles.map((r) => (
                                            <SelectItem key={r.id} value={r.id.toString()} className="font-bold uppercase text-[10px] tracking-widest">{r.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.role_id && <p className="text-xs text-destructive font-bold">{errors.role_id}</p>}
                            </div>
                            <Button type="submit" disabled={processing} className="h-12 gap-2 font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20">
                                <Plus className="h-4 w-4" /> Create User
                            </Button>
                        </form>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="pl-10 h-10 border-muted-foreground/20"
                            />
                        </div>
                        <Select value={roleFilter} onValueChange={setRoleFilter}>
                            <SelectTrigger className="w-[180px] h-10 border-muted-foreground/20 font-bold uppercase text-[10px] tracking-widest">
                                <Shield className="w-4 h-4 mr-2 text-primary" />
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" className="font-bold uppercase text-[10px] tracking-widest">All Roles</SelectItem>
                                {roles.map((r) => (
                                    <SelectItem key={r.id} value={r.name} className="font-bold uppercase text-[10px] tracking-widest">{r.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Filter</Button>
                    </form>
                    <div className="text-sm font-bold text-muted-foreground">
                        {users.total} Total Users
                    </div>
                </div>

                {/* Users Table */}
                <div className="rounded-xl border bg-card shadow-lg overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">User Details</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Role / Status</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Joined</th>
                                    <th className="h-14 px-6 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {users.data.map((u: UserType) => (
                                    <tr key={u.id} className="hover:bg-muted/30 transition-all group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-foreground text-sm mb-0.5">{u.name}</span>
                                                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                                                        <Mail className="h-3 w-3" /> {u.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <Select value={u.role_id?.toString() || 'none'} onValueChange={(val) => changeRole(u.id, val)}>
                                                <SelectTrigger className="w-[160px] h-9 border-none bg-primary/5 hover:bg-primary/10 transition-colors font-black uppercase text-[10px] tracking-widest text-primary focus:ring-0">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none" className="font-bold uppercase text-[10px] tracking-widest">No Role</SelectItem>
                                                    {roles.map((r) => (
                                                        <SelectItem key={r.id} value={r.id.toString()} className="font-bold uppercase text-[10px] tracking-widest">{r.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="p-6 text-muted-foreground font-medium">
                                            {new Date(u.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="p-6 text-right">
                                            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive shadow-sm hover:text-white transition-all opacity-0 group-hover:opacity-100" onClick={() => handleDelete(u.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {users.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="h-40 text-center py-10 text-muted-foreground font-bold">
                                            No users found for the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center space-x-2 pt-6">
                    {users.links.map((link: any, index: number) => (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            disabled={!link.url}
                            className={`h-10 w-10 p-0 font-black text-xs transition-all ${link.active ? 'shadow-lg shadow-primary/20 scale-110' : 'hover:scale-105'}`}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

TenantUsers.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/tenant/users',
        },
    ],
};
