import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ batches, courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/batches', { search, status, course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this batch?')) {
            router.delete(`/admin/batches/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Batches" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Batches</h1>
                    <Button onClick={() => router.visit('/admin/batches/create')}>Create Batch</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search batches..." 
                            className="max-w-[200px]"
                        />
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Statuses</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <select 
                            value={courseId} 
                            onChange={e => setCourseId(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Courses</option>
                            {courses.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
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
                                    <th className="h-12 px-4 text-left font-medium">Name / Code</th>
                                    <th className="h-12 px-4 text-left font-medium">Course</th>
                                    <th className="h-12 px-4 text-left font-medium">Dates</th>
                                    <th className="h-12 px-4 text-left font-medium">Enrollment</th>
                                    <th className="h-12 px-4 text-left font-medium">Status</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {batches.data.map((batch: any) => (
                                    <tr key={batch.id} className="border-b">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{batch.name}</div>
                                            <div className="text-xs text-muted-foreground">{batch.batch_code || '—'}</div>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">{batch.course?.name}</td>
                                        <td className="p-4 align-middle text-sm">
                                            {batch.start_date} <br/>to {batch.end_date}
                                        </td>
                                        <td className="p-4 align-middle text-sm text-center">
                                            {batch.enrolled_count} / {batch.capacity || '∞'}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={batch.status === 'active' ? 'default' : 'outline'}>
                                                {batch.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/batches/${batch.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(batch.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {batches.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">No batches found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex justify-end gap-2 mt-4">
                    {batches.links.map((link: any, key: number) => (
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
