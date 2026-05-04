import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Head, router } from '@inertiajs/react';
import { 
    Plus, 
    Search, 
    BookOpen, 
    MoreVertical, 
    Settings, 
    Layers, 
    Trash2,
    Eye,
    ChevronRight,
    Filter
} from 'lucide-react';
import { useState } from 'react';

export default function Index({ courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/courses', { search }, { preserveState: true });
    };

    return (
        <AppEliteCoachLayout title="My Courses">
            <Head title="Course Management" />

            {/* Header Section */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <BookOpen size={18} />
                                </div>
                                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                                    Course Management
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                Assigned Curriculum
                            </h1>
                        </div>
                        
                        <Button 
                            onClick={() => router.visit('/instructor/courses/create')}
                            className="h-11 px-6 rounded-xl font-bold text-white shadow-lg shadow-indigo-100"
                            style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)' }}
                        >
                            <Plus size={18} className="mr-2" />
                            Launch New Course
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10">
                {/* Search and Filters */}
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input 
                            value={search} 
                            onChange={e => setSearch(e.target.value)} 
                            placeholder="Find a course..." 
                            className="pl-12 h-12 rounded-2xl bg-gray-50 border-none focus-visible:ring-2 focus-visible:ring-indigo-500 transition-all font-medium"
                        />
                    </form>
                    
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="h-12 px-6 rounded-2xl border-gray-100 font-bold text-gray-600 hover:bg-gray-50">
                            <Filter size={18} className="mr-2" />
                            Filters
                        </Button>
                        <Button type="submit" onClick={handleSearch} className="h-12 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all">
                            Refresh Results
                        </Button>
                    </div>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Course Identity</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Academic Code</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Sections</th>
                                    <th className="px-6 py-5 text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Visibility</th>
                                    <th className="px-8 py-5 text-right text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {courses.data.map((c: any) => (
                                    <tr key={c.id} className="group hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-extrabold shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                    {c.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                                                        {c.name}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                                        Last updated: {new Date().toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <Badge className="bg-slate-100 text-slate-600 border-none px-3 py-1 text-[10px] font-extrabold rounded-lg">
                                                {c.code || 'NO-CODE'}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-6">
                                            <div className="flex items-center gap-2">
                                                <Layers size={14} className="text-gray-300" />
                                                <span className="text-sm font-bold text-slate-700">{c.chapters_count} Chapters</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            {c.is_published ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Published</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Draft</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="h-9 px-4 rounded-xl border-gray-100 font-bold text-xs text-slate-600 hover:bg-white hover:shadow-md transition-all"
                                                    onClick={() => router.visit(`/instructor/courses/${c.slug}`)}
                                                >
                                                    <Eye size={14} className="mr-2" />
                                                    Syllabus
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="h-9 px-4 rounded-xl border-gray-100 font-bold text-xs text-slate-600 hover:bg-white hover:shadow-md transition-all"
                                                    onClick={() => router.visit(`/instructor/courses/${c.slug}/edit`)}
                                                >
                                                    <Settings size={14} className="mr-2" />
                                                    Settings
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm" 
                                                    className="h-9 w-9 p-0 rounded-xl border-gray-100 text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all"
                                                    onClick={() => { if(confirm('Are you sure?')) router.delete(`/instructor/courses/${c.slug}`); }}
                                                >
                                                    <Trash2 size={14} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {courses.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4">
                                                    <BookOpen size={32} />
                                                </div>
                                                <h3 className="text-lg font-bold text-slate-900">No courses assigned</h3>
                                                <p className="text-sm text-gray-400 mt-1">Start by creating your first educational module.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-10 flex items-center justify-between bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Showing {courses.from || 0} to {courses.to || 0} of {courses.total} entries
                    </p>
                    <div className="flex items-center gap-2">
                        {courses.links.map((l: any, k: number) => (
                            <Button 
                                key={k} 
                                variant={l.active ? "default" : "outline"} 
                                disabled={!l.url} 
                                className={`h-10 px-4 rounded-xl font-bold text-xs ${l.active ? 'bg-indigo-600 text-white' : 'border-gray-100 text-slate-600'}`}
                                onClick={() => l.url && router.visit(l.url)}
                                dangerouslySetInnerHTML={{ __html: l.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}

