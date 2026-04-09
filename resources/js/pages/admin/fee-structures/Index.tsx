import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Index({ feeStructures, courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/fee-structures', { search, course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this fee structure?')) {
            router.delete(`/admin/fee-structures/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Fee Structures" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Fee Structures</h1>
                    <Button onClick={() => router.visit('/admin/fee-structures/create')}>New Fee Structure</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search name..." 
                            className="max-w-[200px]"
                        />
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
                                    <th className="h-12 px-4 text-left font-medium">Plan Name</th>
                                    <th className="h-12 px-4 text-left font-medium">Course</th>
                                    <th className="h-12 px-4 text-left font-medium">Total Amount</th>
                                    <th className="h-12 px-4 text-left font-medium">Installments</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {feeStructures.data.map((fs: any) => (
                                    <tr key={fs.id} className="border-b">
                                        <td className="p-4 align-middle font-medium">{fs.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{fs.course?.name}</td>
                                        <td className="p-4 align-middle">${fs.total_amount}</td>
                                        <td className="p-4 align-middle">{fs.installment_count}</td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/fee-structures/${fs.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(fs.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {feeStructures.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No fee structures found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {feeStructures.links.map((link: any, key: number) => (
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
