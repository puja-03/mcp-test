import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Pencil, Trash2, Award } from 'lucide-react';
import { useState } from 'react';

export default function ResultsIndex({ results, exams, filters }: any) {
    const [examId, setExamId] = useState(filters.exam_id || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/results', { exam_id: examId === 'all' ? '' : examId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this result?')) {
            router.delete(`/tenant/results/${id}`);
        }
    };

    const getGrade = (obtained: number, max: number, passing: number | null) => {
        const pct = (obtained / max) * 100;
        if (passing !== null && obtained < passing) return { label: 'Fail', variant: 'destructive' as const };
        if (pct >= 90) return { label: 'A+', variant: 'default' as const };
        if (pct >= 75) return { label: 'A', variant: 'default' as const };
        if (pct >= 60) return { label: 'B', variant: 'secondary' as const };
        if (pct >= 45) return { label: 'C', variant: 'secondary' as const };
        return { label: 'D', variant: 'outline' as const };
    };

    return (
        <>
            <Head title="Results" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Award className="h-7 w-7 text-primary" />
                            Results
                        </h1>
                        <p className="text-muted-foreground mt-1">View and manage student exam results</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/results/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Enter Result
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={examId} onValueChange={setExamId}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="All Exams" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Exams</SelectItem>
                            {exams.map((ex: any) => (
                                <SelectItem key={ex.id} value={ex.id.toString()}>
                                    {ex.title} — {ex.batch?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {examId !== 'all' && (
                        <Button type="button" variant="ghost" onClick={() => { setExamId('all'); router.get('/tenant/results', {}, { preserveState: true }); }}>
                            Clear
                        </Button>
                    )}
                </form>

                {/* Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Exam</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Student</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Marks Obtained</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Grade</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Remarks</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {results.data.map((result: any) => {
                                    const grade = getGrade(
                                        result.marks_obtained,
                                        result.exam?.max_marks ?? 100,
                                        result.exam?.passing_marks ?? null,
                                    );
                                    return (
                                        <tr key={result.id} className="border-b hover:bg-muted/30 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium">{result.exam?.title}</div>
                                                <div className="text-xs text-muted-foreground">{result.exam?.batch?.name}</div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold">{result.student?.name}</div>
                                                <div className="text-xs text-muted-foreground">{result.student?.email}</div>
                                            </td>
                                            <td className="p-4 font-medium">
                                                {result.marks_obtained}
                                                <span className="text-muted-foreground font-normal"> / {result.exam?.max_marks}</span>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={grade.variant}>{grade.label}</Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">{result.remarks || '—'}</td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button variant="ghost" size="icon" asChild>
                                                        <Link href={`/tenant/results/${result.id}/edit`}>
                                                            <Pencil className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleDelete(result.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {results.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-24 text-center text-muted-foreground italic">
                                            No results found. Select an exam or enter student results.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {results.from ?? 0}–{results.to ?? 0} of {results.total} results
                    </p>
                    <div className="flex items-center gap-1">
                        {results.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
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
