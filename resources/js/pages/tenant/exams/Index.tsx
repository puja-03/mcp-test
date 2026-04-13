import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Pencil, Trash2, FileEdit } from 'lucide-react';
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
            <Head title="Exams" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <FileEdit className="h-7 w-7 text-primary" />
                            Exams
                        </h1>
                        <p className="text-muted-foreground mt-1">Create and manage exams for your batches</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/exams/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Exam
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter */}
                <form onSubmit={handleFilter} className="flex flex-wrap gap-3 items-center">
                    <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search exams..."
                            className="pl-9"
                        />
                    </div>
                    <Select value={batchId} onValueChange={setBatchId}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="All Batches" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Batches</SelectItem>
                            {batches.map((b: any) => (
                                <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Search</Button>
                    {(search || batchId !== 'all') && (
                        <Button type="button" variant="ghost" onClick={() => {
                            setSearch('');
                            setBatchId('all');
                            router.get('/tenant/exams', {}, { preserveState: true });
                        }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Exam Title</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Batch</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Date</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Max Marks</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Passing Marks</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {exams.data.map((exam: any) => (
                                    <tr key={exam.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-semibold">{exam.title}</td>
                                        <td className="p-4 text-muted-foreground">{exam.batch?.name || '—'}</td>
                                        <td className="p-4">
                                            {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="p-4 font-medium">{exam.max_marks}</td>
                                        <td className="p-4 text-muted-foreground">{exam.passing_marks ?? '—'}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/tenant/results/create?exam_id=${exam.id}`}>
                                                        Enter Results
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/exams/${exam.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(exam.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {exams.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-24 text-center text-muted-foreground italic">
                                            No exams found. Create an exam to evaluate your students.
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
                        Showing {exams.from ?? 0}–{exams.to ?? 0} of {exams.total} exams
                    </p>
                    <div className="flex items-center gap-1">
                        {exams.links.map((link: any, index: number) => (
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
