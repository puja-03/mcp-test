import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Pencil, Trash2, FileEdit, Calendar, Users, Trophy, Target, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ExamsIndex({ exams, batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [batchId, setBatchId] = useState(filters.batch_id || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/exams', {
            search,
            batch_id: batchId === 'all' ? '' : batchId,
        }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this exam?')) {
            router.delete(`/tenant/exams/${id}`);
        }
    };

    return (
        <>
            <Head title="Examination Center" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <FileEdit className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Academic Exams</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Design evaluations, set benchmarks, and track student performance.</p>
                    </div>
                    <Button asChild className="h-12 px-6 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px] gap-2">
                        <Link href="/tenant/exams/create">
                            <Plus className="h-4 w-4" />
                            Create New Exam
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter Bar */}
                <div className="bg-card p-4 rounded-2xl border shadow-sm ring-1 ring-border/50">
                    <form onSubmit={handleFilter} className="flex flex-col lg:flex-row items-center gap-4">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search exams by title or objective..."
                                className="pl-10 h-10 border-muted-foreground/20 font-medium focus:ring-primary/30"
                            />
                        </div>
                        <div className="w-full lg:w-[240px]">
                            <Select value={batchId} onValueChange={setBatchId}>
                                <SelectTrigger className="h-10 bg-muted/30 border-muted-foreground/20 font-bold uppercase text-[10px] tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-3.5 h-3.5" />
                                        <SelectValue placeholder="All Batches" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="font-bold uppercase text-[10px] tracking-widest">All Batches</SelectItem>
                                    {batches.map((b: any) => (
                                        <SelectItem key={b.id} value={b.id.toString()} className="font-bold uppercase text-[10px] tracking-widest">{b.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 w-full lg:w-auto">
                            <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Filter Exams</Button>
                            {(search || batchId !== 'all') && (
                                <Button type="button" variant="ghost" className="h-10 font-bold uppercase tracking-widest text-[10px]" onClick={() => {
                                    setSearch('');
                                    setBatchId('all');
                                    router.get('/tenant/exams', {}, { preserveState: true });
                                }}>
                                    Clear
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Exams List Table */}
                <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Exam Info</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Batch Group</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Exam Schedule</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Score Metrics</th>
                                    <th className="h-14 px-6 text-right font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {exams.data.map((exam: any) => (
                                    <tr key={exam.id} className="group hover:bg-muted/30 transition-all duration-200">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/10">
                                                    <FileEdit className="h-6 w-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-foreground text-sm group-hover:text-primary transition-colors">{exam.title}</span>
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">Formal Assessment</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-xs uppercase tracking-tight">{exam.batch?.name || 'GENERIC'}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium italic">{exam.batch?.course?.name || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                                                <Calendar className="w-3.5 h-3.5 text-primary" />
                                                {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'NOT SCHEDULED'}
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2">
                                                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                                                    <span className="text-xs font-black uppercase tracking-tighter">Max: {exam.max_marks}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Target className="w-3.5 h-3.5 text-emerald-500" />
                                                    <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">Pass: {exam.passing_marks ?? '—'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="default" size="sm" className="h-9 font-black uppercase tracking-widest text-[9px] shadow-lg shadow-primary/10" asChild>
                                                    <Link href={`/tenant/results/create?exam_id=${exam.id}`}>
                                                        Post Results
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all" asChild title="Edit Exam">
                                                    <Link href={`/tenant/exams/${exam.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg border-muted-foreground/20 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                                                    onClick={() => handleDelete(exam.id)}
                                                    title="Delete Exam"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {exams.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-60 text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <FileEdit className="h-10 w-10 text-muted-foreground/40" />
                                                </div>
                                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No exams have been created yet</p>
                                                <Button asChild variant="outline" className="mt-2 h-10 font-bold uppercase tracking-widest text-[10px]">
                                                    <Link href="/tenant/exams/create">Create First Exam</Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Showing <span className="text-foreground">{exams.from ?? 0}–{exams.to ?? 0}</span> of <span className="text-foreground">{exams.total}</span> Total Assessments
                    </div>
                    <div className="flex items-center gap-1.5">
                        {exams.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                className={`h-9 w-9 p-0 font-black text-[10px] transition-all ${link.active ? 'shadow-lg shadow-primary/20 scale-110 z-10' : 'hover:scale-105 hover:bg-muted/50'}`}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

ExamsIndex.layout = {
    breadcrumbs: [
        {
            title: 'Exams',
            href: '/tenant/exams',
        },
    ],
};
