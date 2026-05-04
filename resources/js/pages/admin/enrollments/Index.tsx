import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    UserCheck, 
    Plus, 
    Search, 
    Filter, 
    Layers, 
    Calendar,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    GraduationCap,
    Clock,
    CheckCircle2,
    Timer,
    AlertCircle,
    XCircle,
    Mail
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ enrollments, batches, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [batchId, setBatchId] = useState(filters.batch_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/enrollments', { search, status, batch_id: batchId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this enrollment? This will remove the student from the batch.')) {
            router.delete(`/admin/enrollments/${id}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active': return <CheckCircle2 size={12} />;
            case 'pending': return <Timer size={12} />;
            case 'completed': return <GraduationCap size={12} />;
            case 'dropped': return <XCircle size={12} />;
            default: return <AlertCircle size={12} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'completed': return 'bg-indigo-50 text-indigo-700 border-indigo-100';
            case 'dropped': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-gray-50 text-gray-500 border-gray-200';
        }
    };

    return (
        <AppEliteCoachLayout title="Student Enrollment">
            <Head title="Manage Enrollments" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Active Enrollments
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Monitor and manage institutional student admissions</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/enrollments/create"
                            className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ 
                                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                boxShadow: `0 8px 20px ${primaryColor}4d`
                            }}
                        >
                            <Plus size={18} />
                            Register Student
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
                                placeholder="Search by student name..."
                                className="h-11 w-full pl-11 pr-4 bg-gray-50/50 border-transparent rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all"
                            />
                        </div>
                        
                        <div className="h-11 px-3 bg-gray-50/50 rounded-xl border-transparent flex items-center gap-2">
                            <Filter size={14} className="text-gray-400" />
                            <select 
                                value={status} 
                                onChange={e => setStatus(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700 uppercase tracking-wider outline-none"
                            >
                                <option value="">ALL STATUSES</option>
                                <option value="active">ACTIVE</option>
                                <option value="pending">PENDING</option>
                                <option value="completed">COMPLETED</option>
                                <option value="dropped">DROPPED</option>
                            </select>
                        </div>

                        <div className="h-11 px-3 bg-gray-50/50 rounded-xl border-transparent flex items-center gap-2">
                            <Layers size={14} className="text-gray-400" />
                            <select 
                                value={batchId} 
                                onChange={e => setBatchId(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700 uppercase tracking-wider outline-none w-[160px]"
                            >
                                <option value="">ALL BATCHES</option>
                                {batches.map((b: any) => (
                                    <option key={b.id} value={b.id}>{b.name.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                            Search
                        </Button>
                    </form>
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Student Profile</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Assigned Batch</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Registration</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {enrollments.data.map((enrollment: any) => (
                                    <tr key={enrollment.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div 
                                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg group-hover:scale-110 transition-transform"
                                                    style={{ background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)` }}
                                                >
                                                    {enrollment.student?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                        {enrollment.student?.name}
                                                    </div>
                                                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                                        <Mail size={10} /> {enrollment.student?.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-2">
                                                <Layers size={14} className="text-indigo-400" />
                                                <span className="text-sm font-bold text-slate-700">{enrollment.batch?.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                                                    <Calendar size={12} className="text-gray-400" />
                                                    {new Date(enrollment.enrollment_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-widest ${getStatusColor(enrollment.status)}`}>
                                                    {getStatusIcon(enrollment.status)}
                                                    {enrollment.status}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/enrollments/${enrollment.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(enrollment.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {enrollments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                    <UserCheck size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">No Enrollments Found</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Start registering students into active batches.</p>
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
                            Showing {enrollments.from}-{enrollments.to} of {enrollments.total} Enrollments
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {enrollments.links.map((link: any, index: number) => {
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
