import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
    Search,
    Plus,
    Trash2,
    Edit,
    User,
    Mail,
    GraduationCap,
    Building2,
    Briefcase,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Award
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Head, Link, router, usePage } from '@inertiajs/react';

type Instructor = {
    id: number;
    name: string;
    email: string;
    tenant: { id: number; name: string } | null;
    instructor_profile: {
        specialization: string | null;
        experience_years: number | null;
    } | null;
    created_at: string;
};

export default function Index({ instructors, tenants, filters }: { instructors: any; tenants: any[]; filters: any }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [search, setSearch] = useState(filters.search || '');
    const [tenantId, setTenantId] = useState(filters.tenant_id || 'all');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/instructors', {
            search,
            tenant_id: tenantId === 'all' ? '' : tenantId
        }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this instructor? This will terminate their access across all branches.')) {
            router.delete(`/admin/instructors/${id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Global Faculty
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage institutional mentors and instructors</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/instructors/create"
                        className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                            boxShadow: `0 8px 20px ${primaryColor}4d`
                        }}
                    >
                        <Plus size={18} />
                        Onboard Instructor
                    </Link>
                </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 w-full">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or email..."
                            className="h-11 w-full pl-11 pr-4 bg-gray-50/50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all"
                        />
                    </div>
                    <div className="h-11 px-3 bg-gray-50/50 rounded-xl border-transparent flex items-center gap-2">
                        <Building2 size={14} className="text-gray-400" />
                        <Select value={tenantId} onValueChange={setTenantId}>
                            <SelectTrigger className="border-none bg-transparent h-auto p-0 focus:ring-0 focus:ring-offset-0 text-xs font-bold text-slate-700 w-[160px] uppercase tracking-wider">
                                <SelectValue placeholder="All Branches" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-gray-100 shadow-xl">
                                <SelectItem value="all" className="text-[10px] font-bold uppercase py-2">ALL BRANCHES</SelectItem>
                                {tenants.map((t) => (
                                    <SelectItem key={t.id} value={t.id.toString()} className="text-[10px] font-bold uppercase py-2">{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                        Search
                    </Button>
                </form>
            </div>

            {/* Instructors List Container */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Faculty Member</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Expertise</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Seniority</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Onboarded</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {instructors.data.map((item: Instructor) => (
                                <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform"
                                                style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)` }}
                                            >
                                                {item.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {item.name}
                                                </div>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                                        <Mail size={10} /> {item.email}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                    <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest flex items-center gap-1">
                                                        <Building2 size={10} /> {item.tenant?.name || 'Global'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2.5">
                                            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                                                <GraduationCap size={14} />
                                            </div>
                                            <span className="text-sm font-bold text-slate-700">
                                                {item.instructor_profile?.specialization || 'Generalist Mentor'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-extrabold uppercase tracking-widest">
                                                    <Award size={12} className="text-amber-500" />
                                                    {item.instructor_profile?.experience_years ? `${item.instructor_profile.experience_years}Y Exp` : 'Junior'}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-500 font-bold text-xs">
                                                <Calendar size={12} className="text-gray-400" />
                                                {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/instructors/${item.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {instructors.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <User size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Faculty Members Found</h3>
                                                <p className="text-sm text-gray-500 mt-1">Onboard your first instructor to begin curriculum delivery.</p>
                                            </div>
                                            <Link
                                                href="/admin/instructors/create"
                                                className="mt-2 text-sm font-bold text-indigo-600 hover:underline"
                                            >
                                                Add new instructor
                                            </Link>
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
                        Showing {instructors.from}-{instructors.to} of {instructors.total} Faculty Members
                    </div>

                    <div className="flex items-center gap-1.5">
                        {instructors.links.map((link: any, index: number) => {
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
    );
}
