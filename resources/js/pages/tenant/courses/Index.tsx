import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function CoursesIndex({ courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/courses', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(`/tenant/courses/${id}`);
        }
    };

    return (
        <>
            <Head title="Courses" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <BookOpen className="h-7 w-7 text-primary" />
                            Courses
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage your coaching center courses</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/courses/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Create Course
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
                            placeholder="Search by name or code..."
                            className="pl-9"
                        />
                    </div>
                    <Button type="submit" variant="secondary">Search</Button>
                    {search && (
                        <Button type="button" variant="ghost" onClick={() => { setSearch(''); router.get('/tenant/courses', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Course</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Code</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Instructor</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Duration</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Fee</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courses.data.map((course: any) => (
                                    <tr key={course.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4">
                                            <span className="font-semibold">{course.name}</span>
                                        </td>
                                        <td className="p-4 text-muted-foreground font-mono text-xs">
                                            {course.code || '—'}
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {course.instructor?.name || '—'}
                                        </td>
                                        <td className="p-4 text-muted-foreground">
                                            {course.duration_months ? `${course.duration_months} mo` : '—'}
                                        </td>
                                        <td className="p-4 font-medium">
                                            ₹{Number(course.total_fees).toLocaleString()}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-1 flex-wrap">
                                                <Badge variant={course.is_active ? 'default' : 'secondary'}>
                                                    {course.is_active ? 'Active' : 'Inactive'}
                                                </Badge>
                                                {course.is_published && (
                                                    <Badge variant="outline">Published</Badge>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/courses/${course.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(course.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {courses.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="h-24 text-center text-muted-foreground italic">
                                            No courses found. Create your first course to get started.
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
                        Showing {courses.from ?? 0}–{courses.to ?? 0} of {courses.total} courses
                    </p>
                    <div className="flex items-center gap-1">
                        {courses.links.map((link: any, index: number) => (
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
