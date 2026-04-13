import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, Trash2, Users } from 'lucide-react';
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
            <Head title="Batches" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="h-7 w-7 text-primary" />
                            Batches
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage course batches and schedules</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/batches/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Batch
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
                            placeholder="Search batches..."
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit" variant="secondary">Search</Button>
                    {search && (
                        <Button type="button" variant="ghost" onClick={() => { setSearch(''); router.get('/tenant/batches', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Batch Name</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Course</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Start Date</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">End Date</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Capacity</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.data.map((batch: any) => (
                                    <tr key={batch.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-semibold">{batch.name}</td>
                                        <td className="p-4 text-muted-foreground">{batch.course?.name || '—'}</td>
                                        <td className="p-4">{batch.start_date ? new Date(batch.start_date).toLocaleDateString() : '—'}</td>
                                        <td className="p-4 text-muted-foreground">{batch.end_date ? new Date(batch.end_date).toLocaleDateString() : '—'}</td>
                                        <td className="p-4 text-muted-foreground">{batch.max_students ?? '—'}</td>
                                        <td className="p-4">
                                            <Badge variant={batch.is_active ? 'default' : 'secondary'}>
                                                {batch.is_active ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/batches/${batch.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(batch.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {batches.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="h-24 text-center text-muted-foreground italic">
                                            No batches found. Create your first batch to get started.
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
                        Showing {batches.from ?? 0}–{batches.to ?? 0} of {batches.total} batches
                    </p>
                    <div className="flex items-center gap-1">
                        {batches.links.map((link: any, index: number) => (
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
