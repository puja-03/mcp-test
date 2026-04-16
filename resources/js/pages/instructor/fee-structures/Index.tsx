import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Plus, FileText, BookOpen, DollarSign, Settings2, Trash2, Edit } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type FeeStructure = {
    id: number;
    name: string;
    course_id: number;
    course: { name: string };
    total_amount: number;
    installment_count: number;
};

type Props = {
    feeStructures: {
        data: FeeStructure[];
        links: any[];
        total: number;
        from: number;
        to: number;
    };
    filters: { search?: string };
};

export default function Index({ feeStructures, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/fee-structures', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this fee structure?')) {
            router.delete(`/instructor/fee-structures/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Fee Structures" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Fee Structures</h1>
                        <p className="text-muted-foreground">Manage fees and installment plans for your courses.</p>
                    </div>
                    <Button asChild className="gap-2">
                        <Link href="/instructor/fee-structures/create">
                            <Plus className="h-4 w-4" /> Create New Structure
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
                                placeholder="Search by name..."
                                className="pl-9 h-10"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10">Search</Button>
                    </form>
                    <div className="text-sm text-muted-foreground">
                        Showing {feeStructures.from}-{feeStructures.to} of {feeStructures.total} structures
                    </div>
                </div>

                {/* Grid of Fee Structures */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {feeStructures.data.map((fs) => (
                        <div key={fs.id} className="group relative rounded-xl border bg-card overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 border-b">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 rounded-lg bg-background shadow-sm group-hover:bg-primary/10 transition-colors">
                                        <FileText className="h-5 w-5 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors truncate">{fs.name}</h3>
                                </div>
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    <span className="truncate">{fs.course.name}</span>
                                </div>
                            </div>
                            
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Amount</p>
                                        <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                                            <DollarSign className="h-4 w-4 text-primary" />
                                            <span>{fs.total_amount}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Installments</p>
                                        <div className="flex items-center gap-1 text-lg font-bold text-foreground">
                                            <Settings2 className="h-4 w-4 text-primary" />
                                            <span>{fs.installment_count} Plan</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex items-center justify-end gap-2 border-t mt-4">
                                    <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/10 hover:text-primary" asChild>
                                        <Link href={`/instructor/fee-structures/${fs.id}/edit`}>
                                            <Edit className="h-4 w-4" />
                                            Edit
                                        </Link>
                                    </Button>
                                    <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(fs.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {feeStructures.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                        <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-medium text-muted-foreground">No fee structures defined</h3>
                        <p className="text-muted-foreground mt-2 max-w-xs text-center">Define fee structures and installment plans for your assigned courses.</p>
                        <Button asChild className="mt-6 gap-2" variant="outline">
                            <Link href="/instructor/fee-structures/create">
                                <Plus className="h-4 w-4" /> Add Structure
                            </Link>
                        </Button>
                    </div>
                )}

                {/* Pagination */}
                {feeStructures.total > 15 && (
                    <div className="flex items-center justify-center space-x-2 pt-6">
                        {feeStructures.links.map((link, index) => (
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
                )}
            </div>
        </AppLayout>
    );
}
