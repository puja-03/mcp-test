import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Index({ chapters, courses, filters }: any) {
    const [courseId, setCourseId] = useState(filters.course_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/chapters', { course_id: courseId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this chapter and all its topics?')) {
            router.delete(`/admin/chapters/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Chapters" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Chapters</h1>
                    <Button onClick={() => router.visit('/admin/chapters/create')}>New Chapter</Button>
                </div>

                <form onSubmit={handleFilter} className="flex items-center gap-2">
                    <select
                        value={courseId}
                        onChange={e => setCourseId(e.target.value)}
                        className="flex h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All Courses</option>
                        {courses.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <Button type="submit" variant="secondary">Filter</Button>
                </form>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Order</th>
                                    <th className="h-12 px-4 text-left font-medium">Chapter Title</th>
                                    <th className="h-12 px-4 text-left font-medium">Course</th>
                                    <th className="h-12 px-4 text-left font-medium">Slug</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {chapters.data.map((ch: any) => (
                                    <tr key={ch.id} className="border-b">
                                        <td className="p-4 align-middle font-mono text-muted-foreground">{ch.order_index}</td>
                                        <td className="p-4 align-middle font-medium">{ch.chapter_title}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{ch.course?.name}</td>
                                        <td className="p-4 align-middle text-xs text-muted-foreground">{ch.chapter_slug}</td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/topics?chapter_id=${ch.id}`)}>
                                                Topics
                                            </Button>
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/chapters/${ch.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(ch.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {chapters.data.length === 0 && (
                                    <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No chapters found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {chapters.links.map((link: any, key: number) => (
                        <Button
                            key={key}
                            variant={link.active ? "default" : "outline"}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={() => link.url && router.visit(link.url)}
                            size="sm"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
