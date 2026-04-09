import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ payments, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/payments', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this payment? This will also revert any installments marked paid by this payment.')) {
            router.delete(`/admin/payments/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Payments" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Payments</h1>
                    <Button onClick={() => router.visit('/admin/payments/create')}>Record Payment</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Student name, receipt, or transaction ID..." 
                            className="max-w-[300px]"
                        />

                        <Button type="submit" variant="secondary">Search</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Receipt No</th>
                                    <th className="h-12 px-4 text-left font-medium">Student / Batch</th>
                                    <th className="h-12 px-4 text-left font-medium">Date</th>
                                    <th className="h-12 px-4 text-left font-medium">Amount</th>
                                    <th className="h-12 px-4 text-left font-medium">Method</th>
                                    <th className="h-12 px-4 text-left font-medium">Status</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {payments.data.map((p: any) => (
                                    <tr key={p.id} className="border-b">
                                        <td className="p-4 align-middle font-medium text-muted-foreground">{p.receipt_number || '—'}</td>
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{p.enrollment?.student?.name}</div>
                                            <div className="text-xs text-muted-foreground">{p.enrollment?.batch?.name}</div>
                                        </td>
                                        <td className="p-4 align-middle">{p.payment_date}</td>
                                        <td className="p-4 align-middle font-medium">${p.amount}</td>
                                        <td className="p-4 align-middle text-muted-foreground capitalize">{p.payment_method || '—'}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={p.status === 'completed' ? 'default' : p.status === 'refunded' ? 'destructive' : 'secondary'}>
                                                {p.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/payments/${p.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {payments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="p-4 text-center text-muted-foreground">No payments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {payments.links.map((link: any, key: number) => (
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
