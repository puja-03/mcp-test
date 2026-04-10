import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Plus, Video, LayoutGrid, Trash2, Edit, ExternalLink } from 'lucide-react';

export default function Index({ topics, chapters, filters }: any) {
    const [chapterId, setChapterId] = useState(filters.chapter_id || '');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/topics', { chapter_id: chapterId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this topic?')) {
            router.delete(`/instructor/topics/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Topics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Topics</h1>
                        <p className="text-muted-foreground">Manage your lessons, videos, and content.</p>
                    </div>
                    <Button onClick={() => router.visit('/instructor/topics/create')}>
                        <Plus className="w-4 h-4 mr-2" /> Add Topic
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <form onSubmit={handleFilter} className="flex gap-2 w-full max-w-sm">
                        <select 
                            value={chapterId} 
                            onChange={(e) => setChapterId(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors"
                        >
                            <option value="">All Chapters</option>
                            {chapters.map((c: any) => (
                                <option key={c.id} value={c.id}>{c.chapter_title} ({c.course?.name})</option>
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
                                <th className="h-12 px-4 text-left">Topic Title</th>
                                <th className="h-12 px-4 text-left">Chapter / Course</th>
                                <th className="h-12 px-4 text-left">Content</th>
                                <th className="h-12 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.data.map((t: any) => (
                                <tr key={t.id} className="border-b hover:bg-muted/30 transition-colors">
                                    <td className="p-4 font-mono text-xs">{t.order_index}</td>
                                    <td className="p-4 font-medium">{t.topic_title}</td>
                                    <td className="p-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm">{t.chapter?.chapter_title}</span>
                                            <span className="text-xs text-muted-foreground">{t.chapter?.course?.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        {t.video_url && (
                                            <Badge variant="secondary" className="gap-1">
                                                <Video className="w-3 h-3" /> Video Attached
                                            </Badge>
                                        )}
                                        {!t.video_url && t.content && (
                                            <Badge variant="outline">Text Content</Badge>
                                        )}
                                    </td>
                                    <td className="p-4 text-right flex gap-2 justify-end">
                                        {t.video_url && (
                                            <Button variant="ghost" size="icon" asChild>
                                                <a href={t.video_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="icon" onClick={() => router.visit(`/instructor/topics/${t.id}/edit`)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(t.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {topics.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="h-24 text-center text-muted-foreground italic">No topics found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-end space-x-2">
                    {topics.links.map((link: any, index: number) => (
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
