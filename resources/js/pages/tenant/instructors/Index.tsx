import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, Plus, Trash2, Edit, User, Mail, GraduationCap, ShieldCheck, ArrowRight, UserPlus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
            <Head title="Faculty Management" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <GraduationCap className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Academic Faculty</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Manage your teaching staff, their specializations, and professional profiles.</p>
                    </div>
                    <Button asChild className="h-12 px-6 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px] gap-2">
                        <Link href="/tenant/instructors/create">
                            <UserPlus className="h-4 w-4" />
                            Register Instructor
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
                                placeholder="Search by name, email or specialization..."
                                className="pl-10 h-10 border-muted-foreground/20 font-medium focus:ring-primary/30"
                            />
                        </div>
                        <Button type="submit" variant="secondary" className="h-10 px-6 font-bold uppercase tracking-wider text-[11px]">Find Faculty</Button>
                        {search && (
                            <Button type="button" variant="ghost" className="h-10 text-[11px] font-bold uppercase tracking-widest" onClick={() => { setSearch(''); router.get('/tenant/instructors', {}, { preserveState: true }); }}>
                                Reset
                            </Button>
                        )}
                    </form>
                    <div className="hidden lg:flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        {instructors.total} Verified Educators
                    </div>
                </div>

                {/* Instructors Grid/Table */}
                <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Instructor Profile</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Expertise</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Seniority</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Joined</th>
                                    <th className="h-14 px-6 text-right font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {instructors.data.map((item: Instructor) => (
                                    <tr key={item.id} className="group hover:bg-muted/30 transition-all duration-200">
                                        <td className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/10">
                                                    <User className="h-6 w-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-foreground text-sm group-hover:text-primary transition-colors">{item.name}</span>
                                                    <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                                                        <Mail className="h-3 w-3 text-muted-foreground/60" /> {item.email}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <div className="flex items-center gap-2">
                                                <div className="p-1.5 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                                    <GraduationCap className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="font-bold text-foreground text-xs uppercase tracking-tight">
                                                    {item.instructor_profile?.specialization || 'General Faculty'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-6">
                                            <Badge variant="outline" className="font-black uppercase text-[9px] tracking-widest px-2.5 py-1 bg-muted/20 border-muted-foreground/20 group-hover:border-primary/40 group-hover:text-primary transition-colors">
                                                {item.instructor_profile?.experience_years ? `${item.instructor_profile.experience_years} Years EXP` : 'New Entry'}
                                            </Badge>
                                        </td>
                                        <td className="p-6 text-muted-foreground font-bold text-xs uppercase tracking-tighter">
                                            {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="outline" size="icon" className="h-9 w-9 rounded-lg border-muted-foreground/20 hover:bg-primary hover:text-white hover:border-primary transition-all" asChild title="Edit Profile">
                                                    <Link href={`/tenant/instructors/${item.id}/edit`}>
                                                        <Edit className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-lg border-muted-foreground/20 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                                                    onClick={() => handleDelete(item.id)}
                                                    title="Remove Instructor"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/5 hover:text-primary" asChild>
                                                    <Link href={`/tenant/instructors/${item.id}`}>
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {instructors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-60 text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <User className="h-10 w-10 text-muted-foreground/40" />
                                                </div>
                                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No faculty members found</p>
                                                <Button asChild variant="outline" className="mt-2 h-10 font-bold uppercase tracking-widest text-[10px]">
                                                    <Link href="/tenant/instructors/create">Register First Instructor</Link>
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
                        Displaying <span className="text-foreground">{instructors.from ?? 0}–{instructors.to ?? 0}</span> of <span className="text-foreground">{instructors.total}</span> Faculty Members
                    </p>
                    <div className="flex items-center gap-1.5">
                        {instructors.links.map((link: any, index: number) => (
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

Index.layout = {
    breadcrumbs: [
        {
            title: 'Instructors',
            href: '/tenant/instructors',
        },
    ],
};
