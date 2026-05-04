import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    FileText,
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
    Video,
    PlayCircle,
    BookOpen,
    Eye
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ topics, chapters, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [chapterId, setChapterId] = useState(filters.chapter_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/topics', { chapter_id: chapterId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this topic? All student progress linked to this topic will be lost.')) {
            router.delete(`/admin/topics/${id}`);
        }
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Granular Curriculum
                    </h1>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manage individual lessons and educational assets within chapters</p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/admin/topics/create${chapterId ? `?chapter_id=${chapterId}` : ''}`}
                        className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                        style={{
                            background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                            boxShadow: `0 8px 20px ${primaryColor}4d`
                        }}
                    >
                        <Plus size={18} />
                        Create Lesson
                    </Link>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                <form onSubmit={handleFilter} className="flex flex-1 items-center gap-2 w-full">
                    <div className="h-11 px-4 bg-gray-50/50 rounded-xl border-transparent flex flex-1 items-center gap-3 group">
                        <BookOpen size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        <select
                            value={chapterId}
                            onChange={e => setChapterId(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
                        >
                            <option value="">FILTER BY CURRICULUM CHAPTER</option>
                            {chapters.map((ch: any) => (
                                <option key={ch.id} value={ch.id}>
                                    {ch.chapter_title.toUpperCase()} — {ch.course?.name.toUpperCase()}
                                </option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                        Filter Directory
                    </Button>
                </form>
            </div>

            {/* Main Table Container */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50 bg-gray-50/30">
                                <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Order</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Lesson Identity</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Organizational Path</th>
                                <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Media Asset</th>
                                <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {topics.data.map((topic: any) => (
                                <tr key={topic.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-5 text-center">
                                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50 text-gray-400 text-xs font-black group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                                            {topic.order_index.toString().padStart(2, '0')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-slate-600 group-hover:scale-110 transition-transform shadow-sm">
                                                <FileText size={20} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                    {topic.topic_title}
                                                </div>
                                                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5">Instructional Unit</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                                                <BookOpen size={12} className="text-indigo-400" />
                                                {topic.chapter?.chapter_title}
                                            </div>
                                            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-[18px]">
                                                {topic.chapter?.course?.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex justify-center">
                                            {topic.video_url ? (
                                                <a
                                                    href={topic.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-tight hover:bg-emerald-600 hover:text-white transition-all shadow-sm group/btn"
                                                >
                                                    <PlayCircle size={14} className="group-hover/btn:scale-110 transition-transform" />
                                                    Preview
                                                </a>
                                            ) : (
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-tight opacity-50 border border-dashed border-gray-200">
                                                    No Media
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/admin/topics/${topic.id}/edit`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                            >
                                                <Edit2 size={18} />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(topic.id)}
                                                className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {topics.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                <ListTree size={32} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900">No Lessons Found</h3>
                                                <p className="text-sm text-gray-500 mt-1">Institutional curriculum lesson directory is currently empty.</p>
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
                        Showing {topics.from}-{topics.to} of {topics.total} Lessons
                    </div>

                    <div className="flex items-center gap-1.5">
                        {topics.links.map((link: any, index: number) => {
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
