import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Pencil, Trash2, FileText } from 'lucide-react';
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
            <Head title="Fee Structures" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <FileText className="h-7 w-7 text-primary" />
                            Fee Structures
                        </h1>
                        <p className="text-muted-foreground mt-1">Define fee plans and installment schedules for courses</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/fee-structures/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Structure
                        </Link>
                    </Button>
                </div>

                {/* Search */}
                <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name or course..."
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit" variant="secondary">Search</Button>
                    {search && (
                        <Button type="button" variant="ghost" onClick={() => { setSearch(''); router.get('/tenant/fee-structures', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Course</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Total Amount</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Installments</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feeStructures.data.map((fs: any) => (
                                    <tr key={fs.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-semibold">{fs.name}</td>
                                        <td className="p-4 text-muted-foreground">{fs.course?.name || '—'}</td>
                                        <td className="p-4 font-medium text-primary">
                                            ₹{Number(fs.total_amount).toLocaleString()}
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {fs.installment_count} installment{fs.installment_count !== 1 ? 's' : ''}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/fee-structures/${fs.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(fs.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {feeStructures.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                            No fee structures found. Create one to define payment plans.
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
                        Showing {feeStructures.from ?? 0}–{feeStructures.to ?? 0} of {feeStructures.total} structures
                    </p>
                    <div className="flex items-center gap-1">
                        {feeStructures.links.map((link: any, index: number) => (
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
