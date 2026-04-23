import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Plus, CreditCard, User, Calendar, DollarSign, Trash2, Edit, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


type Installment = {
    id: number;
    enrollment_id: number;
    enrollment: {
        student: { name: string };
        batch: { name: string };
    };
    fee_structure: { name: string } | null;
    due_date: string;
    amount: number;
    status: 'pending' | 'paid' | 'partially_paid' | 'overdue';
};

type Props = {
    installments: {
        data: Installment[];
        links: any[];
        total: number;
        from: number;
        to: number;
    };
    filters: { search?: string };
};

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, class: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    paid: { label: 'Paid', icon: CheckCircle2, class: 'bg-green-100 text-green-800 border-green-200' },
    partially_paid: { label: 'Partial', icon: AlertCircle, class: 'bg-blue-100 text-blue-800 border-blue-200' },
    overdue: { label: 'Overdue', icon: AlertCircle, class: 'bg-red-100 text-red-800 border-red-200' },
};

export default function Index({ installments, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/installments', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this installment?')) {
            router.delete(`/instructor/installments/${id}`);
        }
    };

    return (
        <>
            <Head title="Installment Tracking" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Fee Installments</h1>
                        <p className="text-muted-foreground transition-all">Track student payment schedules across your courses.</p>
                    </div>
                    <Button asChild className="gap-2 shadow-sm">
                        <Link href="/instructor/installments/create">
                            <Plus className="h-4 w-4" /> Schedule Installment
                        </Link>
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-lg">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by student name..."
                                className="pl-9 h-10 border-muted-foreground/20 focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10">Filter</Button>
                    </form>
                    <div className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        Total: {installments.total} Records
                    </div>
                </div>

                {/* Installments Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Student / Batch</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Plan</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Due Date</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Amount</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Status</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {installments.data.map((item) => {
                                    const status = statusConfig[item.status] || statusConfig.pending;
                                    const StatusIcon = status.icon;
                                    
                                    return (
                                        <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/5 text-primary group-hover:bg-primary/10 transition-colors">
                                                        <User className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-foreground leading-none mb-1">{item.enrollment.student.name}</p>
                                                        <p className="text-[11px] text-muted-foreground font-semibold flex items-center gap-1 uppercase">
                                                            <Calendar className="h-3 w-3" /> {item.enrollment.batch.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tight py-0.5">
                                                    {item.fee_structure?.name || 'Custom Plan'}
                                                </Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground font-medium">
                                                {new Date(item.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-bold text-base tabular-nums">
                                                    <DollarSign className="h-4 w-4 text-primary" />
                                                    {item.amount}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-bold uppercase tracking-wider ${status.class} shadow-sm`}>
                                                    <StatusIcon className="h-3.5 w-3.5" />
                                                    {status.label}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors" asChild>
                                                        <Link href={`/instructor/installments/${item.id}/edit`}>
                                                            <Edit className="h-4 w-4" />
                                                        </Link>
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors" onClick={() => handleDelete(item.id)}>
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {installments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-32 text-center text-muted-foreground italic font-medium">
                                            <div className="flex flex-col items-center gap-2">
                                                <CreditCard className="h-8 w-8 opacity-20" />
                                                No installments scheduled for your students yet.
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {installments.total > 15 && (
                    <div className="flex items-center justify-center space-x-1 pt-4">
                        {installments.links.map((link, index) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                className="h-9 w-9 p-0 font-bold"
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
