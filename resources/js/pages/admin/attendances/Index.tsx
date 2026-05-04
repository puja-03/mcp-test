import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    UserCheck, 
    Plus, 
    Search, 
    Calendar, 
    User, 
    Layers,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Clock,
    ClipboardCheck,
    ArrowRight
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ attendances, sessions, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [sessionId, setSessionId] = useState(filters.class_session_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/attendances', { class_session_id: sessionId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this attendance record? This will permanently remove the entry.')) {
            router.delete(`/admin/attendances/${id}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'present': return <CheckCircle2 size={12} />;
            case 'absent': return <XCircle size={12} />;
            default: return <Clock size={12} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'present': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'absent': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-amber-50 text-amber-700 border-amber-100';
        }
    };

    return (
        <AppEliteCoachLayout title="Attendance Tracker">
            <Head title="Manage Attendances" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Institutional Attendance
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Audit and record student presence across all active sessions</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/attendances/create"
                            className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ 
                                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                boxShadow: `0 8px 20px ${primaryColor}4d`
                            }}
                        >
                            <Plus size={18} />
                            Mark Attendance
                        </Link>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 w-full">
                        <div className="h-11 px-4 bg-gray-50/50 rounded-xl border-transparent flex flex-1 items-center gap-3 group">
                            <Calendar size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <select 
                                value={sessionId} 
                                onChange={e => setSessionId(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
                            >
                                <option value="">SELECT A CLASS SESSION TO FILTER</option>
                                {sessions.map((s: any) => (
                                    <option key={s.id} value={s.id}>
                                        {s.session_date} — {s.batch?.name} ({s.topic || 'General Session'})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                            Apply Filter
                        </Button>
                    </form>
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Session Context</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Student Payer</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Recorded By</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {attendances.data.map((attendance: any) => (
                                    <tr key={attendance.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                                                    <Calendar size={22} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                        {attendance.class_session?.session_date}
                                                    </div>
                                                    <div className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                                        <Layers size={10} /> {attendance.class_session?.batch?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div 
                                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black shadow-md"
                                                    style={{ background: primaryColor }}
                                                >
                                                    {attendance.student?.name.charAt(0)}
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{attendance.student?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase tracking-tight">
                                                    <User size={12} className="text-gray-400" />
                                                    {attendance.marker?.name || 'Automated System'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-widest ${getStatusColor(attendance.status)}`}>
                                                    {getStatusIcon(attendance.status)}
                                                    {attendance.status}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/attendances/${attendance.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(attendance.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {attendances.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                    <ClipboardCheck size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">No Attendance Records</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Institutional presence audit is currently empty.</p>
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
                            Showing {attendances.from}-{attendances.to} of {attendances.total} Records
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {attendances.links.map((link: any, index: number) => {
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
