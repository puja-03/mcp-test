import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function TopicsIndex({ topics, chapters, filters }: any) {
    const [chapterId, setChapterId] = useState(filters.chapter_id || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/topics', { chapter_id: chapterId === 'all' ? '' : chapterId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this topic?')) {
            router.delete(`/tenant/topics/${id}`);
        }
    };

    return (
        <>
            <Head title="Topics" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <span className="text-primary">📝</span>
                            Topics
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage lesson topics within chapters</p>
                    </div>
                    <Button asChild>
                        <Link href={`/tenant/topics/create${chapterId !== 'all' ? `?chapter_id=${chapterId}` : ''}`}>
                            <Plus className="h-4 w-4 mr-2" />
                            New Topic
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={chapterId} onValueChange={setChapterId}>
                        <SelectTrigger className="w-[320px]">
                            <SelectValue placeholder="All Chapters" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Chapters</SelectItem>
                            {chapters.map((ch: any) => (
                                <SelectItem key={ch.id} value={ch.id.toString()}>
                                    {ch.chapter_title} — {ch.course?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {chapterId !== 'all' && (
                        <Button type="button" variant="ghost" onClick={() => { setChapterId('all'); router.get('/tenant/topics', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Topic Title</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Chapter</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Course</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Video</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topics.data.map((topic: any) => (
                                    <tr key={topic.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-mono text-muted-foreground text-xs">{topic.order_index}</td>
                                        <td className="p-4 font-semibold">{topic.topic_title}</td>
                                        <td className="p-4 text-muted-foreground">{topic.chapter?.chapter_title}</td>
                                        <td className="p-4 text-muted-foreground text-xs">{topic.chapter?.course?.name}</td>
                                        <td className="p-4">
                                            {topic.video_url ? (
                                                <a
                                                    href={topic.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-primary hover:underline text-xs"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                    View
                                                </a>
                                            ) : (
                                                <span className="text-muted-foreground text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/topics/${topic.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(topic.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {topics.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="h-24 text-center text-muted-foreground italic">
                                            No topics found. Select a chapter or create a new topic.
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
                        Showing {topics.from ?? 0}–{topics.to ?? 0} of {topics.total} topics
                    </p>
                    <div className="flex items-center gap-1">
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
            </div>
        </>
    );
}
