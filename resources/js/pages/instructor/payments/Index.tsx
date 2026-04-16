import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Plus, DollarSign, User, Calendar, Receipt, Trash2, Edit, CheckCircle2, Clock, XCircle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

type Payment = {
    id: number;
    enrollment_id: number;
    enrollment: {
        student: { name: string };
        batch: { name: string };
    };
    amount: number;
    payment_date: string;
    payment_method: string;
    transaction_id: string | null;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
};

type Props = {
    payments: {
        data: Payment[];
        links: any[];
        total: number;
        from: number;
        to: number;
    };
    filters: { search?: string };
};

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, class: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    completed: { label: 'Completed', icon: CheckCircle2, class: 'bg-green-100 text-green-800 border-green-200' },
    failed: { label: 'Failed', icon: XCircle, class: 'bg-red-100 text-red-800 border-red-200' },
    refunded: { label: 'Refunded', icon: RefreshCw, class: 'bg-gray-100 text-gray-800 border-gray-200' },
};

export default function Index({ payments, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/payments', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this payment record?')) {
            router.delete(`/instructor/payments/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Payment History" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Payments History</h1>
                        <p className="text-muted-foreground font-medium">Record and track payments received from your students.</p>
                    </div>
                    <Button asChild className="gap-2 shadow-md">
                        <Link href="/instructor/payments/create">
                            <Plus className="h-4 w-4" /> Record New Payment
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-lg">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by student or transaction ID..."
                                className="pl-10 h-10 border-muted-foreground/20 focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Filter Results</Button>
                    </form>
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                            {payments.total} Records Found
                        </div>
                    </div>
                </div>

                {/* Payments Table */}
                <div className="rounded-xl border bg-card shadow-lg overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Student Details</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Reference</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Payment Info</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Amount</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Status</th>
                                    <th className="h-14 px-6 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {payments.data.map((item) => {
                                    const status = statusConfig[item.status] || statusConfig.pending;
                                    const StatusIcon = status.icon;
                                    
                                    return (
                                        <tr key={item.id} className="hover:bg-muted/30 transition-all group">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                        <User className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground leading-none mb-1.5">{item.enrollment.student.name}</p>
                                                        <p className="text-[11px] text-muted-foreground font-bold flex items-center gap-1.5 uppercase tracking-wider">
                                                            <Calendar className="h-3 w-3" /> {item.enrollment.batch.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-tighter">Transaction ID</span>
                                                    <code className="text-[12px] font-mono text-primary font-bold bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                                                        {item.transaction_id || 'N/A'}
                                                    </code>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 font-bold text-sm text-foreground">
                                                        <Receipt className="h-3.5 w-3.5 text-muted-foreground" />
                                                        {item.payment_method}
                                                    </div>
                                                    <p className="text-[11px] font-bold text-muted-foreground uppercase">
                                                        {new Date(item.payment_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-1.5 font-black text-lg tabular-nums text-foreground group-hover:text-primary transition-colors">
                                                    <DollarSign className="h-4 w-4 text-primary" />
                                                    {item.amount}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-widest shadow-sm ${status.class}`}>
                                                    <StatusIcon className="h-3.5 w-3.5" />
                                                    {status.label}
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                    <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all" asChild title="Edit Record">
                                                        <Link href={`/instructor/payments/${item.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive shadow-sm hover:text-white transition-all" onClick={() => handleDelete(item.id)} title="Delete Record">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {payments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-40 text-center py-10">
                                            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
                                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-inner">
                                                    <DollarSign className="h-8 w-8 text-muted-foreground opacity-20" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-muted-foreground">No payments found</h3>
                                                    <p className="text-xs text-muted-foreground font-medium max-w-[200px] mx-auto">No financial records have been found for your students.</p>
                                                </div>
                                                <Button asChild variant="outline" size="sm" className="mt-2 font-bold uppercase tracking-wider text-[10px] h-8">
                                                    <Link href="/instructor/payments/create">
                                                        Add First Payment
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {payments.total > 15 && (
                    <div className="flex items-center justify-center space-x-2 pt-6">
                        {payments.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                className={`h-10 w-10 p-0 font-black text-xs transition-all ${link.active ? 'shadow-lg shadow-primary/20 scale-110' : 'hover:scale-105'}`}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
