import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ enrollments, batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [batchId, setBatchId] = useState(filters.batch_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/enrollments', { search, status, batch_id: batchId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this enrollment?')) {
            router.delete(`/admin/enrollments/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Enrollments" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Enrollments</h1>
                    <Button onClick={() => router.visit('/admin/enrollments/create')}>New Enrollment</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search student..." 
                            className="max-w-[200px]"
                        />
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Statuses</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        <select 
                            value={batchId} 
                            onChange={e => setBatchId(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Batches</option>
                            {batches.map((b: any) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>

                        <Button type="submit" variant="secondary">Search</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Student</th>
                                    <th className="h-12 px-4 text-left font-medium">Batch</th>
                                    <th className="h-12 px-4 text-left font-medium">Date enrolled</th>
                                    <th className="h-12 px-4 text-left font-medium">Status</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {enrollments.data.map((enrollment: any) => (
                                    <tr key={enrollment.id} className="border-b">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{enrollment.student?.name}</div>
                                            <div className="text-xs text-muted-foreground">{enrollment.student?.email}</div>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">{enrollment.batch?.name}</td>
                                        <td className="p-4 align-middle text-sm">{enrollment.enrollment_date}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={enrollment.status === 'active' ? 'default' : 'secondary'}>
                                                {enrollment.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/enrollments/${enrollment.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(enrollment.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {enrollments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No enrollments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-2 mt-4">
                    {enrollments.links.map((link: any, key: number) => (
                        <Button 
                           key={key} 
                           variant={link.active ? "default" : "outline"}
                           disabled={!link.url}
                           dangerouslySetInnerHTML={{ __html: link.label }}
                           onClick={() => link.url && router.visit(link.url)}
                           size="sm"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
