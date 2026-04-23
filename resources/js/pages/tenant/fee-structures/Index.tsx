import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Pencil, Trash2, FileText, Banknote, CreditCard, Receipt, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function FeeStructuresIndex({ feeStructures, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/fee-structures', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this fee structure?')) {
            router.delete(`/tenant/fee-structures/${id}`);
        }
    };

    return (
        <>
            <Head title="Fee Architecture" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Receipt className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Revenue Plans</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Define complex fee structures, installments, and billing cycles.</p>
                    </div>
                    <Button asChild className="h-12 px-6 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px] gap-2">
                        <Link href="/tenant/fee-structures/create">
                            <Plus className="h-4 w-4" />
                            Design Fee Plan
                        </Link>
                    </Button>
                </div>

                {/* Filter & Search Bar */}
                <div className="bg-card p-4 rounded-2xl border shadow-sm ring-1 ring-border/50">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by plan name or course reference..."
                                className="pl-10 h-10 border-muted-foreground/20 font-medium focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Query Plans</Button>
                        {search && (
                            <Button type="button" variant="ghost" className="h-10 text-[11px] font-bold uppercase tracking-widest" onClick={() => { setSearch(''); router.get('/tenant/fee-structures', {}, { preserveState: true }); }}>
                                Reset
                            </Button>
                        )}
                    </form>
                </div>

                {/* Fee Plans Grid/Table */}
                <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Structure Name</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Target Course</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Total Value</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Payment Split</th>
                                    <th className="h-14 px-6 text-right font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {feeStructures.data.map((fs: any) => (
                                    <tr key={fs.id} className="group hover:bg-muted/30 transition-all duration-200">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/10">
                                                    <FileText className="h-6 w-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-foreground text-sm group-hover:text-primary transition-colors">{fs.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5">Billing Logic</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-xs">{fs.course?.name || 'GENERIC-POOL'}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium italic">{fs.course?.code || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                                                    <Banknote className="h-4 w-4 text-emerald-600" />
                                                </div>
                                                <span className="text-sm font-black text-emerald-600">₹{Number(fs.total_amount).toLocaleString()}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-3.5 h-3.5 text-muted-foreground" />
                                                <span className="text-xs font-black uppercase tracking-tighter">
                                                    {fs.installment_count} {fs.installment_count === 1 ? 'Instalment' : 'Split Payments'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all" asChild title="Edit Structure">
                                                    <Link href={`/tenant/fee-structures/${fs.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg border-muted-foreground/20 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                                                    onClick={() => handleDelete(fs.id)}
                                                    title="Delete Structure"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/5 hover:text-primary">
                                                    <ArrowRight className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {feeStructures.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-60 text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <Receipt className="h-10 w-10 text-muted-foreground/40" />
                                                </div>
                                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No fee structures configured</p>
                                                <Button asChild variant="outline" className="mt-2 h-10 font-bold uppercase tracking-widest text-[10px]">
                                                    <Link href="/tenant/fee-structures/create">Create First Plan</Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Displaying <span className="text-foreground">{feeStructures.from ?? 0}–{feeStructures.to ?? 0}</span> of <span className="text-foreground">{feeStructures.total}</span> Billing Models
                    </div>
                    <div className="flex items-center gap-1.5">
                        {feeStructures.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                className={`h-9 w-9 p-0 font-black text-[10px] transition-all ${link.active ? 'shadow-lg shadow-primary/20 scale-110 z-10' : 'hover:scale-105 hover:bg-muted/50'}`}
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

FeeStructuresIndex.layout = {
    breadcrumbs: [
        {
            title: 'Fee Structures',
            href: '/tenant/fee-structures',
        },
    ],
};
