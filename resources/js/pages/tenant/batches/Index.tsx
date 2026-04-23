import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, Trash2, Users, Calendar, Layers, ArrowRight, UserCheck, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

export default function BatchesIndex({ batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/batches', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this batch?')) {
            router.delete(`/tenant/batches/${id}`);
        }
    };

    return (
        <>
            <Head title="Batch Management" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Layers className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Active Batches</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Coordinate your course delivery schedules and student groups.</p>
                    </div>
                    <Button asChild className="h-12 px-6 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px] gap-2">
                        <Link href="/tenant/batches/create">
                            <Plus className="h-4 w-4" />
                            Launch New Batch
                        </Link>
                    </Button>
                </div>

                {/* Filter & Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-2xl border shadow-sm ring-1 ring-border/50">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-2xl">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by batch name, code or course..."
                                className="pl-10 h-10 border-muted-foreground/20 font-medium focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Filter Batches</Button>
                        {search && (
                            <Button type="button" variant="ghost" className="h-10 text-[11px] font-bold uppercase tracking-widest" onClick={() => { setSearch(''); router.get('/tenant/batches', {}, { preserveState: true }); }}>
                                Clear
                            </Button>
                        )}
                    </form>
                    <div className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <UserCheck className="w-4 h-4" />
                        {batches.total} Ongoing Batches
                    </div>
                </div>

                {/* Batch Grid/Table */}
                <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Batch Info</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Associated Course</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Timeline</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Stats / Status</th>
                                    <th className="h-14 px-6 text-right font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {batches.data.map((batch: any) => (
                                    <tr key={batch.id} className="group hover:bg-muted/30 transition-all duration-200">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/10">
                                                    <Layers className="h-6 w-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-foreground text-sm group-hover:text-primary transition-colors">{batch.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                                        <ShieldAlert className="w-3 h-3 text-amber-500" /> {batch.code || 'NO-CODE'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-foreground text-xs">{batch.course?.name || 'Unlinked'}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium italic">{batch.course?.code || '—'}</span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                                                    <Calendar className="w-3.5 h-3.5 text-primary" />
                                                    {batch.start_date ? new Date(batch.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                                                </div>
                                                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">
                                                    TO {batch.end_date ? new Date(batch.end_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '∞'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                                                    <span className="text-xs font-black uppercase tracking-tighter">Cap: {batch.max_students ?? '∞'}</span>
                                                </div>
                                                <Badge className={`w-fit font-black uppercase text-[9px] tracking-widest px-2 py-0.5 ${batch.is_active ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/20'}`} variant="outline">
                                                    {batch.is_active ? 'Active' : 'Archived'}
                                                </Badge>
                                            </div>
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all" asChild title="Edit Batch">
                                                    <Link href={`/tenant/batches/${batch.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg border-muted-foreground/20 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                                                    onClick={() => handleDelete(batch.id)}
                                                    title="Delete Batch"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/5 hover:text-primary" asChild>
                                                    <Link href={`/tenant/batches/${batch.id}`}>
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {batches.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-60 text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <Layers className="h-10 w-10 text-muted-foreground/40" />
                                                </div>
                                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No batches scheduled yet</p>
                                                <Button asChild variant="outline" className="mt-2 h-10 font-bold uppercase tracking-widest text-[10px]">
                                                    <Link href="/tenant/batches/create">Create First Batch</Link>
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
                    <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                        Displaying <span className="text-foreground">{batches.from ?? 0}–{batches.to ?? 0}</span> of <span className="text-foreground">{batches.total}</span> Batches
                    </p>
                    <div className="flex items-center gap-1.5">
                        {batches.links.map((link: any, index: number) => (
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

BatchesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Batches',
            href: '/tenant/batches',
        },
    ],
};
