import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Building2,
    Trash2,
    Users,
    ExternalLink,
    Calendar,
    Mail,
    Plus,
    Search,
    Filter
} from 'lucide-react';
import { router } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
    domain: string;
    users_count: number;
    admin_email?: string | null;
    admin_joined_at?: string | null
};

export default function Tenants({ tenants }: { tenants: Tenant[] }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tenant? This action is irreversible.')) {
            router.delete(`/admin/tenants/${id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Institutions
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage platform tenants and workgroups</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group hidden sm:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search institutions..."
                            className="h-10 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all w-64"
                        />
                    </div>
                    <Link
                        href="/admin/tenants/create"
                        className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                            boxShadow: `0 8px 20px ${primaryColor}4d`
                        }}
                    >
                        <Plus size={18} />
                        Add Tenant
                    </Link>
                </div>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Institution</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Configuration</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Growth</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Administrator</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {tenants.map((t) => (
                                <tr key={t.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                <Building2 size={22} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {t.name}
                                                </div>
                                                <div className="text-xs font-bold text-emerald-500 mt-0.5">Active</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-100/50 w-fit px-3 py-1.5 rounded-lg border border-slate-200/30">
                                            <ExternalLink size={14} className="text-slate-400" />
                                            {t.domain}.elitecoach.pro
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                                <Users size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-900">{t.users_count} Users</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                                <Mail size={12} className="text-slate-400" />
                                                {t.admin_email ?? '—'}
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                                <Calendar size={10} />
                                                Joined {t.admin_joined_at ?? '—'}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/tenants/${t.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Filter size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(t.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tenants.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <Building2 size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Institutions Found</h3>
                                                <p className="text-sm text-gray-500 mt-1">Start by provisioning your first tenant platform.</p>
                                            </div>
                                            <Link
                                                href="/admin/tenants/create"
                                                className="mt-2 text-sm font-bold text-indigo-600 hover:underline"
                                            >
                                                Create your first tenant
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer / Pagination Placeholder */}
                <div className="px-8 py-5 border-t border-gray-50 bg-gray-50/30 mt-auto flex items-center justify-between">
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Showing {tenants.length} of {tenants.length} institutions
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-400 bg-white border border-gray-100 disabled:opacity-50" disabled>Previous</button>
                        <button className="px-4 py-2 rounded-lg text-xs font-bold text-gray-400 bg-white border border-gray-100 disabled:opacity-50" disabled>Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
