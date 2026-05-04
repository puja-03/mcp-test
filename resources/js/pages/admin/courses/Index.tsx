import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    BookOpen, 
    Plus, 
    Search, 
    MoreHorizontal, 
    Eye, 
    Edit2, 
    Trash2, 
    ChevronLeft, 
    ChevronRight,
    User,
    CreditCard,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ courses, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/courses', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course? This will remove all associated curriculum data.')) {
            router.delete(`/admin/courses/${id}`);
        }
    };

    return (
        <AppEliteCoachLayout title="Curriculum Management">
            <Head title="Manage Courses" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Course Catalog
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Design and manage your elite curriculum</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <form onSubmit={handleSearch} className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                            <input 
                                type="text" 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..." 
                                className="h-10 pl-10 pr-4 bg-white border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all w-64"
                            />
                        </form>
                        <Link 
                            href="/admin/courses/create"
                            className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ 
                                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                boxShadow: `0 8px 20px ${primaryColor}4d`
                            }}
                        >
                            <Plus size={18} />
                            Create Course
                        </Link>
                    </div>
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Course Detail</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Instructor</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Investment</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Visibility</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {courses.data.map((course: any) => (
                                    <tr key={course.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                                    <BookOpen size={22} strokeWidth={1.5} />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                        {course.name}
                                                    </div>
                                                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5">ID: {course.code || 'UNASSIGNED'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200">
                                                    <User size={14} />
                                                </div>
                                                <span className="text-sm font-bold text-slate-700">{course.instructor?.name || 'Staff'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                                                    <CreditCard size={14} className="text-emerald-500" />
                                                    ₹{course.total_fees.toLocaleString()}
                                                </div>
                                                <span className="text-[10px] font-extrabold text-gray-400 uppercase mt-0.5 tracking-tight">Full Program Fee</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                {course.is_active ? (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-extrabold uppercase tracking-widest">
                                                        <CheckCircle2 size={12} />
                                                        Active
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 border border-gray-200 text-[10px] font-extrabold uppercase tracking-widest">
                                                        <XCircle size={12} />
                                                        Draft
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/courses/${course.slug}`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                >
                                                    <Eye size={18} />
                                                </Link>
                                                <Link 
                                                    href={`/admin/courses/${course.slug}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(course.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {courses.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                    <BookOpen size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">No Courses Available</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Launch your first course to begin enrollment.</p>
                                                </div>
                                                <Link 
                                                    href="/admin/courses/create"
                                                    className="mt-2 text-sm font-bold text-indigo-600 hover:underline"
                                                >
                                                    Design a new course
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
                            Showing {courses.from}-{courses.to} of {courses.total} Courses
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {courses.links.map((link: any, index: number) => {
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
