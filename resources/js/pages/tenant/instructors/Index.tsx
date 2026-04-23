import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Plus, Trash2, Edit, User, Mail, GraduationCap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';

type Instructor = {
    id: number;
    name: string;
    email: string;
    instructor_profile: {
        specialization: string | null;
        experience_years: number | null;
    } | null;
    created_at: string;
};

export default function Index({ instructors, filters }: { instructors: any; filters: any }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/instructors', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this instructor?')) {
            router.delete(`/tenant/instructors/${id}`);
        }
    };

    return (
        <>
            <Head title="Instructors" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Instructors</h1>
                        <p className="text-muted-foreground font-medium">Manage your teaching staff and their profiles.</p>
                    </div>
                    <Button asChild className="gap-2 shadow-md">
                        <Link href="/tenant/instructors/create">
                            <Plus className="h-4 w-4" /> Add New Instructor
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
                                placeholder="Search by name or email..."
                                className="pl-10 h-10 border-muted-foreground/20 focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Filter Results</Button>
                    </form>
                    <div className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        {instructors.total} Instructors Found
                    </div>
                </div>

                {/* Instructors Table */}
                <div className="rounded-xl border bg-card shadow-lg overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Instructor Details</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Specialization</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Experience</th>
                                    <th className="h-14 px-6 text-left font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Joined</th>
                                    <th className="h-14 px-6 text-right font-bold text-muted-foreground uppercase tracking-widest text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {instructors.data.map((item: Instructor) => (
                                    <tr key={item.id} className="hover:bg-muted/30 transition-all group">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-foreground text-sm mb-0.5">{item.name}</span>
                                                    <span className="text-[11px] text-muted-foreground font-medium flex items-center gap-1.5">
                                                        <Mail className="h-3 w-3" /> {item.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-semibold text-foreground">
                                                    {item.instructor_profile?.specialization || 'Not set'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <Badge variant="outline" className="font-bold bg-muted/20 border-muted-foreground/20">
                                                {item.instructor_profile?.experience_years ? `${item.instructor_profile.experience_years} Years` : 'N/A'}
                                            </Badge>
                                        </td>
                                        <td className="p-6 text-muted-foreground font-medium">
                                            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all shadow-sm" asChild>
                                                    <Link href={`/tenant/instructors/${item.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive shadow-sm hover:text-white transition-all" onClick={() => handleDelete(item.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {instructors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-40 text-center py-10">
                                            <div className="flex flex-col items-center gap-3 animate-in fade-in duration-500">
                                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-inner">
                                                    <User className="h-8 w-8 text-muted-foreground opacity-20" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-muted-foreground">No instructors found</h3>
                                                    <p className="text-xs text-muted-foreground font-medium max-w-[200px] mx-auto">No records match your current search criteria.</p>
                                                </div>
                                                <Button asChild variant="outline" size="sm" className="mt-2 font-bold uppercase tracking-wider text-[10px] h-8">
                                                    <Link href="/tenant/instructors/create">
                                                        Add First Instructor
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
                <div className="flex items-center justify-center space-x-2 pt-6">
                    {instructors.links.map((link: any, index: number) => (
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
            </div>
        </>
    );
}
