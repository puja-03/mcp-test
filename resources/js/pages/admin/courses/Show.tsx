import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Show({ course }: any) {
    const [expandedChapter, setExpandedChapter] = useState<number | null>(null);

    const toggleChapter = (id: number) => {
        setExpandedChapter(expandedChapter === id ? null : id);
    };

    return (
        <>
            <Head title={`Course: ${course.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{course.name}</h1>
                        <div className="flex gap-2 mt-1">
                            {course.code && <span className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{course.code}</span>}
                            <span className={`text-xs px-2 py-0.5 rounded ${course.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {course.is_active ? 'Active' : 'Inactive'}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${course.is_published ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                {course.is_published ? 'Published' : 'Draft'}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => router.visit(`/admin/courses/${course.slug}/edit`)}>Edit Course</Button>
                        <Button onClick={() => router.visit(`/admin/chapters/create?course_id=${course.id}`)}>Add Chapter</Button>
                    </div>
                </div>

                {course.description && (
                    <p className="text-muted-foreground max-w-2xl">{course.description}</p>
                )}

                <div className="grid grid-cols-3 gap-4">
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Total Fees</div>
                        <div className="text-xl font-bold">₹{course.total_fees}</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Duration</div>
                        <div className="text-xl font-bold">{course.duration_months || '—'} months</div>
                    </div>
                    <div className="rounded-md border p-4">
                        <div className="text-sm text-muted-foreground">Instructor</div>
                        <div className="text-xl font-bold">{course.instructor?.name || '—'}</div>
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3">Chapters & Topics</h2>
                    {(!course.chapters || course.chapters.length === 0) && (
                        <p className="text-muted-foreground">No chapters yet. Add a chapter to get started.</p>
                    )}
                    <div className="space-y-2">
                        {(course.chapters || []).map((chapter: any) => (
                            <div key={chapter.id} className="rounded-md border">
                                <button
                                    onClick={() => toggleChapter(chapter.id)}
                                    className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-muted-foreground font-mono text-sm">{chapter.order_index}.</span>
                                        <span className="font-medium">{chapter.chapter_title}</span>
                                        <span className="text-xs text-muted-foreground">({(chapter.topics || []).length} topics)</span>
                                    </div>
                                    <span className="text-muted-foreground">{expandedChapter === chapter.id ? '▼' : '▶'}</span>
                                </button>

                                {expandedChapter === chapter.id && (
                                    <div className="border-t px-4 pb-4">
                                        <div className="flex justify-end pt-2 mb-2">
                                            <Button size="sm" variant="outline" onClick={() => router.visit(`/admin/topics/create?chapter_id=${chapter.id}`)}>
                                                Add Topic
                                            </Button>
                                        </div>
                                        {(chapter.topics || []).length === 0 && (
                                            <p className="text-muted-foreground text-sm py-2">No topics in this chapter.</p>
                                        )}
                                        <div className="space-y-1">
                                            {(chapter.topics || []).map((topic: any) => (
                                                <div key={topic.id} className="flex items-center justify-between rounded px-3 py-2 hover:bg-muted/30">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-muted-foreground font-mono text-xs">{topic.order_index}.</span>
                                                        <span className="text-sm">{topic.topic_title}</span>
                                                        {topic.video_url && (
                                                            <a href={topic.video_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs underline">
                                                                ▶ Video
                                                            </a>
                                                        )}
                                                    </div>
                                                    <Button size="sm" variant="ghost" onClick={() => router.visit(`/admin/topics/${topic.id}/edit`)}>
                                                        Edit
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-3">Batches</h2>
                    {(!course.batches || course.batches.length === 0) && (
                        <p className="text-muted-foreground">No batches for this course.</p>
                    )}
                    <div className="grid grid-cols-2 gap-3">
                        {(course.batches || []).map((batch: any) => (
                            <div key={batch.id} className="rounded-md border p-3">
                                <div className="font-medium">{batch.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {batch.start_date} — {batch.end_date || 'Ongoing'}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
