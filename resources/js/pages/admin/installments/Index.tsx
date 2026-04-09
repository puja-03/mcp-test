import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ installments, filters }: any) {
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/installments', { status }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this installment?')) {
            router.delete(`/admin/installments/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Installments" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Installments</h1>
                    <Button onClick={() => router.visit('/admin/installments/create')}>New Installment</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <select 
                            value={status} 
                            onChange={e => setStatus(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                            <option value="waived">Waived</option>
                        </select>
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Student / Batch</th>
                                    <th className="h-12 px-4 text-left font-medium">Fee Plan</th>
                                    <th className="h-12 px-4 text-left font-medium">Amount</th>
                                    <th className="h-12 px-4 text-left font-medium">Due Date</th>
                                    <th className="h-12 px-4 text-left font-medium">Status</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {installments.data.map((ins: any) => (
                                    <tr key={ins.id} className="border-b">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{ins.enrollment?.student?.name}</div>
                                            <div className="text-xs text-muted-foreground">{ins.enrollment?.batch?.name}</div>
                                        </td>
                                        <td className="p-4 align-middle mb-1">{ins.fee_structure?.name}</td>
                                        <td className="p-4 align-middle">${ins.amount}</td>
                                        <td className="p-4 align-middle">{ins.due_date}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={ins.status === 'paid' ? 'default' : ins.status === 'pending' ? 'secondary' : 'destructive'}>
                                                {ins.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/installments/${ins.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(ins.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {installments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="p-4 text-center text-muted-foreground">No installments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {installments.links.map((link: any, key: number) => (
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
