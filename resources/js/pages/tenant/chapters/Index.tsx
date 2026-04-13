import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { useState } from 'react';

export default function ChaptersIndex({ chapters, courses, filters }: any) {
    const [courseId, setCourseId] = useState(filters.course_id || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/chapters', { course_id: courseId === 'all' ? '' : courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this chapter?')) {
            router.delete(`/tenant/chapters/${id}`);
        }
    };

    return (
        <>
            <Head title="Chapters" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <BookOpen className="h-7 w-7 text-primary" />
                            Chapters
                        </h1>
                        <p className="text-muted-foreground mt-1">Organize course content into chapters</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/chapters/create">
                            <Plus className="h-4 w-4 mr-2" />
                            New Chapter
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={courseId} onValueChange={setCourseId}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="All Courses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Courses</SelectItem>
                            {courses.map((c: any) => (
                                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {courseId !== 'all' && (
                        <Button type="button" variant="ghost" onClick={() => { setCourseId('all'); router.get('/tenant/chapters', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground w-16">#</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Chapter Title</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Course</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chapters.data.map((chapter: any) => (
                                    <tr key={chapter.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-mono text-muted-foreground text-xs">{chapter.order_index}</td>
                                        <td className="p-4 font-semibold">{chapter.chapter_title}</td>
                                        <td className="p-4 text-muted-foreground">{chapter.course?.name}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/tenant/topics?chapter_id=${chapter.id}`}>Topics</Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/chapters/${chapter.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(chapter.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {chapters.data.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="h-24 text-center text-muted-foreground italic">
                                            No chapters found. Add chapters to organize your course content.
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
                        Showing {chapters.from ?? 0}–{chapters.to ?? 0} of {chapters.total} chapters
                    </p>
                    <div className="flex items-center gap-1">
                        {chapters.links.map((link: any, index: number) => (
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
