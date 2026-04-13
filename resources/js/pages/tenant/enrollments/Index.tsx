import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Pencil, Trash2, GraduationCap } from 'lucide-react';
import { useState } from 'react';

const statusVariant: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    active: 'default',
    cancelled: 'destructive',
    completed: 'outline',
};

export default function EnrollmentsIndex({ enrollments, batches, filters }: any) {
    const [batchId, setBatchId] = useState(filters.batch_id || 'all');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/enrollments', {
            batch_id: batchId === 'all' ? '' : batchId,
            status: status === 'all' ? '' : status,
        }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this enrollment?')) {
            router.delete(`/tenant/enrollments/${id}`);
        }
    };

    return (
        <>
            <Head title="Enrollments" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <GraduationCap className="h-7 w-7 text-primary" />
                            Enrollments
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage student enrollments across batches</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/enrollments/create">
                            <Plus className="h-4 w-4 mr-2" />
                            New Enrollment
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={batchId} onValueChange={setBatchId}>
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="All Batches" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Batches</SelectItem>
                            {batches.map((b: any) => (
                                <SelectItem key={b.id} value={b.id.toString()}>
                                    {b.name} — {b.course?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[160px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {(batchId !== 'all' || status !== 'all') && (
                        <Button type="button" variant="ghost" onClick={() => { setBatchId('all'); setStatus('all'); router.get('/tenant/enrollments', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Student</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Batch / Course</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Enrolled On</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {enrollments.data.map((enrollment: any) => (
                                    <tr key={enrollment.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4">
                                            <div className="font-semibold">{enrollment.student?.name}</div>
                                            <div className="text-xs text-muted-foreground">{enrollment.student?.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium">{enrollment.batch?.name}</div>
                                            <div className="text-xs text-muted-foreground">{enrollment.batch?.course?.name}</div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {enrollment.enrollment_date ? new Date(enrollment.enrollment_date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="p-4">
                                            <Badge variant={statusVariant[enrollment.status] ?? 'secondary'} className="capitalize">
                                                {enrollment.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/enrollments/${enrollment.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(enrollment.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {enrollments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                            No enrollments found matching your filters.
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
                        Showing {enrollments.from ?? 0}–{enrollments.to ?? 0} of {enrollments.total} enrollments
                    </p>
                    <div className="flex items-center gap-1">
                        {enrollments.links.map((link: any, index: number) => (
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
