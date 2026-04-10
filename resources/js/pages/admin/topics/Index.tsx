import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Index({ topics, chapters, filters }: any) {
    const [chapterId, setChapterId] = useState(filters.chapter_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/topics', { chapter_id: chapterId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this topic?')) {
            router.delete(`/admin/topics/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Topics" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Topics</h1>
                    <Button onClick={() => router.visit(`/admin/topics/create${chapterId ? `?chapter_id=${chapterId}` : ''}`)}>New Topic</Button>
                </div>

                <form onSubmit={handleFilter} className="flex items-center gap-2">
                    <select
                        value={chapterId}
                        onChange={e => setChapterId(e.target.value)}
                        className="flex h-10 w-[350px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        <option value="">All Chapters</option>
                        {chapters.map((ch: any) => (
                            <option key={ch.id} value={ch.id}>{ch.chapter_title} ({ch.course?.name})</option>
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
                                    <th className="h-12 px-4 text-left font-medium">Topic Title</th>
                                    <th className="h-12 px-4 text-left font-medium">Chapter / Course</th>
                                    <th className="h-12 px-4 text-left font-medium">Video</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {topics.data.map((topic: any) => (
                                    <tr key={topic.id} className="border-b">
                                        <td className="p-4 align-middle font-mono text-muted-foreground">{topic.order_index}</td>
                                        <td className="p-4 align-middle font-medium">{topic.topic_title}</td>
                                        <td className="p-4 align-middle">
                                            <div className="text-sm">{topic.chapter?.chapter_title}</div>
                                            <div className="text-xs text-muted-foreground">{topic.chapter?.course?.name}</div>
                                        </td>
                                        <td className="p-4 align-middle">
                                            {topic.video_url ? (
                                                <a href={topic.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">View</a>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/topics/${topic.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(topic.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {topics.data.length === 0 && (
                                    <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No topics found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {topics.links.map((link: any, key: number) => (
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
