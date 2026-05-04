import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import {
    CreditCard,
    Plus,
    Search,
    Layers,
    DollarSign,
    ArrowRight,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Wallet,
    CalendarClock,
    ShieldCheck,
    BarChart3
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ feeStructures, courses, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [search, setSearch] = useState(filters.search || '');
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/fee-structures', { search, course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this fee structure? Existing student installments will be affected.')) {
            router.delete(`/admin/fee-structures/${id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Fee Architecture
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Design and manage institutional pricing and payment plans</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/fee-structures/create"
                        className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                            boxShadow: `0 8px 20px ${primaryColor}4d`
                        }}
                    >
                        <Plus size={18} />
                        New Pricing Plan
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 w-full flex-wrap md:flex-nowrap">
                    <div className="relative flex-1 min-w-[200px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search plan name..."
                            className="h-11 w-full pl-11 pr-4 bg-gray-50/50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all"
                        />
                    </div>

                    <div className="h-11 px-3 bg-gray-50/50 rounded-xl border-transparent flex items-center gap-2">
                        <Layers size={14} className="text-gray-400" />
                        <select
                            value={courseId}
                            onChange={e => setCourseId(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700 uppercase tracking-wider outline-none w-[200px]"
                        >
                            <option value="">ALL COURSES</option>
                            {courses.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>

                    <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                        Apply
                    </Button>
                </form>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Plan Identity</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Associated Program</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Investment Total</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Payment Cycle</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {feeStructures.data.map((fs: any) => (
                                <tr key={fs.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                <Wallet size={22} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {fs.name}
                                                </div>
                                                <div className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                                    <ShieldCheck size={10} /> Verified Fiscal Plan
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-slate-700 truncate max-w-[200px]">
                                            {fs.course?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                                                <DollarSign size={14} className="text-emerald-500" />
                                                {fs.total_amount.toLocaleString()}
                                            </div>
                                            <span className="text-[10px] font-extrabold text-gray-400 uppercase mt-0.5 tracking-tight">Contract Value</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-extrabold uppercase tracking-widest">
                                                <CalendarClock size={12} className="text-indigo-400" />
                                                {fs.installment_count} Stages
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/fee-structures/${fs.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(fs.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {feeStructures.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <BarChart3 size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Fee Structures Defined</h3>
                                                <p className="text-sm text-gray-500 mt-1">Configure your first institutional pricing plan to enable enrollments.</p>
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
                        Showing {feeStructures.from}-{feeStructures.to} of {feeStructures.total} Plans
                    </div>

                    <div className="flex items-center gap-1.5">
                        {feeStructures.links.map((link: any, index: number) => {
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
