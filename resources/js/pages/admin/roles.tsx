import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { 
    Shield, 
    Lock, 
    Users, 
    Settings, 
    Trash2, 
    Edit2, 
    Plus,
    CheckCircle2,
    Search,
    ShieldAlert
} from 'lucide-react';
import { Head, useForm, usePage } from '@inertiajs/react';

type Permission = { id: number; name: string };
type Role = { id: number; name: string; users_count: number; permissions: Permission[] };

export default function Roles({ roles, permissions }: { roles: Role[]; permissions: Permission[] }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    
    const [editRole, setEditRole] = useState<Role | null>(null);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const openCreateModal = () => {
        reset();
        setEditRole(null);
        setOpen(true);
    };

    const openEditModal = (role: Role) => {
        setData({
            name: role.name,
            permissions: role.permissions.map((p) => p.id),
        });
        setEditRole(role);
        setOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editRole) {
            put(`/admin/roles/${editRole.id}`, { onSuccess: () => setOpen(false) });
        } else {
            post('/admin/roles', { onSuccess: () => setOpen(false) });
        }
    };

    const handleDelete = (role: Role) => {
        if (confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
            destroy(`/admin/roles/${role.id}`);
        }
    };

    const togglePermission = (id: number) => {
        if (data.permissions.includes(id)) {
            setData('permissions', data.permissions.filter((p) => p !== id));
        } else {
            setData('permissions', [...data.permissions, id]);
        }
    };

    return (
        <AppEliteCoachLayout title="Access Control">
            <Head title="Manage Roles" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Access Roles
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Define permissions and organizational access levels</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button 
                                    onClick={openCreateModal}
                                    className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                                    style={{ 
                                        background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                        boxShadow: `0 8px 20px ${primaryColor}4d`
                                    }}
                                >
                                    <Plus size={18} />
                                    New Access Role
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                                <div className="bg-slate-900 p-8 text-white">
                                    <DialogHeader>
                                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                            <Shield size={24} className="text-indigo-400" />
                                        </div>
                                        <DialogTitle className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                            {editRole ? 'Modify Access Role' : 'Create Access Role'}
                                        </DialogTitle>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Configure role name and capabilities</p>
                                    </DialogHeader>
                                </div>
                                <form onSubmit={submit} className="p-8 space-y-8 bg-white">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Role Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="e.g. Content Curator"
                                            className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                        />
                                        {errors.name && <p className="text-xs font-bold text-rose-500 mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">System Capabilities</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {permissions.map((p) => (
                                                <label 
                                                    key={p.id} 
                                                    className={`
                                                        flex items-center gap-3 p-4 rounded-2xl border transition-all cursor-pointer group
                                                        ${data.permissions.includes(p.id) 
                                                            ? 'bg-indigo-50/50 border-indigo-200' 
                                                            : 'bg-white border-gray-100 hover:border-gray-200'}
                                                    `}
                                                >
                                                    <Checkbox
                                                        id={`perm-${p.id}`}
                                                        checked={data.permissions.includes(p.id)}
                                                        onCheckedChange={() => togglePermission(p.id)}
                                                        className="data-[state=checked]:bg-indigo-600 border-gray-300"
                                                    />
                                                    <span className={`text-sm font-bold tracking-tight transition-colors ${data.permissions.includes(p.id) ? 'text-indigo-900' : 'text-slate-600'}`}>
                                                        {p.name.replace('-', ' ')}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.permissions && <p className="text-xs font-bold text-rose-500 mt-1">{errors.permissions}</p>}
                                    </div>
                                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            onClick={() => setOpen(false)}
                                            className="h-12 px-6 rounded-xl font-bold text-gray-500 hover:text-slate-900"
                                        >
                                            Discard
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={processing}
                                            className="h-12 px-8 rounded-xl font-bold text-white shadow-lg"
                                            style={{ 
                                                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                            }}
                                        >
                                            {processing ? 'Processing...' : 'Deploy Configuration'}
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                {/* Roles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 items-start">
                    {roles.map((role) => (
                        <div 
                            key={role.id} 
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col h-full group hover:shadow-xl transition-all"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="p-3 rounded-2xl bg-slate-50 text-indigo-600 group-hover:scale-110 transition-transform">
                                    <Shield size={24} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => openEditModal(role)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(role)}
                                        disabled={role.name === 'admin' || role.users_count > 0}
                                        className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-extrabold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {role.name.toUpperCase()}
                            </h3>
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                                <Users size={12} />
                                {role.users_count} Global Assignments
                            </div>

                            <div className="space-y-2 mt-auto">
                                <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Capabilities</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {role.permissions.slice(0, 4).map((p) => (
                                        <span 
                                            key={p.id} 
                                            className="px-2.5 py-1 rounded-lg bg-gray-50 border border-gray-100 text-[10px] font-bold text-slate-600 uppercase tracking-tight"
                                        >
                                            {p.name.replace('-', ' ')}
                                        </span>
                                    ))}
                                    {role.permissions.length > 4 && (
                                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-[10px] font-bold text-indigo-600 uppercase tracking-tight">
                                            +{role.permissions.length - 4} More
                                        </span>
                                    )}
                                    {role.permissions.length === 0 && (
                                        <span className="text-[10px] font-bold text-slate-300 italic uppercase">No permissions assigned</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {roles.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50/50 rounded-[2rem] border-2 border-dashed border-gray-100">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-gray-300 shadow-sm">
                                    <ShieldAlert size={32} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">No Access Roles</h3>
                                    <p className="text-sm text-gray-500 mt-1">Start by defining roles for your organization.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}
