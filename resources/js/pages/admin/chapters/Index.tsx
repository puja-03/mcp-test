import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    BookOpen,
    Plus,
    Search,
    Layers,
    Hash,
    ArrowRight,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ListTree,
    FileText,
    ExternalLink
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ chapters, courses, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/chapters', { course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this chapter? All associated topics and educational materials will be permanently removed.')) {
            router.delete(`/admin/chapters/${id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Course Syllabus
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Organize institutional learning paths into structured chapters</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/chapters/create"
                        className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                            boxShadow: `0 8px 20px ${primaryColor}4d`
                        }}
                    >
                        <Plus size={18} />
                        Add Chapter
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                <form onSubmit={handleFilter} className="flex flex-1 items-center gap-2 w-full">
                    <div className="h-11 px-4 bg-gray-50/50 rounded-xl border-transparent flex flex-1 items-center gap-3 group">
                        <Layers size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        <select
                            value={courseId}
                            onChange={e => setCourseId(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
                        >
                            <option value="">FILTER BY ACADEMIC COURSE</option>
                            {courses.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
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
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Index</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Chapter Identity</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Course Context</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Resource Path</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {chapters.data.map((ch: any) => (
                                <tr key={ch.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-center">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-xs font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            {ch.order_index.toString().padStart(2, '0')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform">
                                                <BookOpen size={20} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {ch.chapter_title}
                                                </div>
                                                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5">Educational Module</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="text-sm font-bold text-slate-700 truncate max-w-[180px]">
                                            {ch.course?.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2 text-[11px] font-mono font-medium text-gray-400 group-hover:text-indigo-500 transition-colors bg-gray-50 px-2 py-1 rounded border border-gray-100 w-fit">
                                            /{ch.chapter_slug}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/topics?chapter_id=${ch.id}`}
                                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-tight hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                            >
                                                <ListTree size={14} />
                                                Topics
                                            </Link>
                                            <Link
                                                href={`/admin/chapters/${ch.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(ch.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {chapters.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <FileText size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Chapters Defined</h3>
                                                <p className="text-sm text-gray-500 mt-1">Populate your institutional curriculum with module chapters.</p>
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
                        Showing {chapters.from}-{chapters.to} of {chapters.total} Chapters
                    </div>

                    <div className="flex items-center gap-1.5">
                        {chapters.links.map((link: any, index: number) => {
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
