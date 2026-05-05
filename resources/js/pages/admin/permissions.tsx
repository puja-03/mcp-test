import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';
import {
    Key,
    Trash2,
    Edit2,
    Plus,
    ShieldCheck,
    Search,
    ShieldAlert,
    ChevronRight,
    Activity
} from 'lucide-react';
import { Head, useForm, usePage } from '@inertiajs/react';

type Permission = { id: number; name: string; roles_count: number };

export default function Permissions({ permissions }: { permissions: Permission[] }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';

    const [editPermission, setEditPermission] = useState<Permission | null>(null);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: '',
    });

    const openCreateModal = () => {
        reset();
        setEditPermission(null);
        setOpen(true);
    };

    const openEditModal = (permission: Permission) => {
        setData({ name: permission.name });
        setEditPermission(permission);
        setOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editPermission) {
            put(`/admin/permissions/${editPermission.id}`, { onSuccess: () => setOpen(false) });
        } else {
            post('/admin/permissions', { onSuccess: () => setOpen(false) });
        }
    };

    const handleDelete = (permission: Permission) => {
        if (confirm('Are you sure you want to delete this permission? It may affect multiple roles.')) {
            destroy(`/admin/permissions/${permission.id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Granular Permissions
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Configure individual access keys for the platform</p>
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
                                New Permission
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[450px] rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
                            <div className="bg-slate-900 p-8 text-white">
                                <DialogHeader>
                                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-4">
                                        <Key size={24} className="text-emerald-400" />
                                    </div>
                                    <DialogTitle className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {editPermission ? 'Modify Key' : 'Generate Key'}
                                    </DialogTitle>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Define internal permission identifier</p>
                                </DialogHeader>
                            </div>
                            <form onSubmit={submit} className="p-8 space-y-6 bg-white">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Internal Name (Slug)</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. manage-billing"
                                        className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 transition-all outline-none font-mono text-black"
                                    />
                                    <p className="text-[10px] font-bold text-gray-400 mt-2">Use lowercase with hyphens for technical identifiers.</p>
                                    {errors.name && <p className="text-xs font-bold text-rose-500 mt-1">{errors.name}</p>}
                                </div>
                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => setOpen(false)}
                                        className="h-12 px-6 rounded-xl font-bold text-gray-500 hover:text-slate-900"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-12 px-8 rounded-xl font-bold text-white shadow-lg"
                                        style={{
                                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                        }}
                                    >
                                        {processing ? 'Processing...' : 'Save Permission'}
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Permissions List */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Permission Identity</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Association Matrix</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {permissions.map((p) => (
                                <tr key={p.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                                                <Key size={18} />
                                            </div>
                                            <div>
                                                <div className="font-mono text-sm font-bold text-slate-900 tracking-tight">
                                                    {p.name}
                                                </div>
                                                <div className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider mt-0.5">System Lock</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700">
                                                <Activity size={12} />
                                                <span className="text-xs font-bold">{p.roles_count} Roles Affected</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => openEditModal(p)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p)}
                                                disabled={p.roles_count > 0}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {permissions.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <ShieldAlert size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Permissions Defined</h3>
                                                <p className="text-sm text-gray-500 mt-1">Initialize your system access control matrix.</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
