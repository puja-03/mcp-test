import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Plus, LayoutGrid, BookOpen, Trash2, Edit } from 'lucide-react';

export default function Index({ chapters, courses, filters }: any) {
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/chapters', { course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure? This will remove all topics under this chapter.')) {
            router.delete(`/instructor/chapters/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Chapters" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Chapters</h1>
                        <p className="text-muted-foreground">Manage sections and modules for your courses.</p>
                    </div>
                    <Button onClick={() => router.visit('/instructor/chapters/create')}>
                        <Plus className="w-4 h-4 mr-2" /> Add Chapter
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <form onSubmit={handleFilter} className="flex gap-2 w-full max-w-sm">
                        <select 
                            value={courseId} 
                            onChange={(e) => setCourseId(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors"
                        >
                            <option value="">All Courses</option>
                            {courses.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <Button type="submit" variant="secondary">Filter</Button>
                    </form>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-muted/50 transition-colors text-muted-foreground font-semibold">
                                <th className="h-12 px-4 text-left">Order</th>
                                <th className="h-12 px-4 text-left">Chapter Title</th>
                                <th className="h-12 px-4 text-left">Course</th>
                                <th className="h-12 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chapters.data.map((c: any) => (
                                <tr key={c.id} className="border-b hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-xs">{c.order_index}</td>
                                    <td className="p-4 font-medium">{c.chapter_title}</td>
                                    <td className="p-4 text-muted-foreground">{c.course?.name}</td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                        <Button variant="ghost" size="icon" onClick={() => router.visit(`/instructor/chapters/${c.id}/edit`)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(c.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {chapters.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="h-24 text-center text-muted-foreground italic">No chapters found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-end space-x-2">
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
        </>
    );
}
