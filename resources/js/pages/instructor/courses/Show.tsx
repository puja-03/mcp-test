import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { CheckCircle2, Circle, Clock, Video } from 'lucide-react';
export default function Show({ course }: any) {
    return (<div className="p-6 max-w-4xl mx-auto"><Head title={course.name} />
        <div className="mb-8 flex items-center justify-between"><div><h1 className="text-3xl font-bold mb-2">{course.name}</h1><p className="text-muted-foreground">{course.description}</p></div><Button onClick={() => router.visit('/instructor/courses')}>Back to Courses</Button></div>
        <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Course Curriculum</h2><Button variant="outline" onClick={() => router.visit(`/instructor/chapters/create?course_id=${course.id}`)}>+ Add Chapter</Button></div>
            {course.chapters.length === 0 ? <div className="text-center p-8 bg-muted rounded-lg text-muted-foreground">No chapters have been added to this course yet.</div> : (
                <div className="space-y-4">{course.chapters.sort((a:any,b:any) => (a.order_index||0) - (b.order_index||0)).map((chapter:any, idx:number) => (
                    <div key={chapter.id} className="border rounded-lg overflow-hidden bg-card">
                        <div className="bg-muted p-4 flex items-center justify-between border-b"><div className="font-semibold text-lg">Section {idx+1}: {chapter.chapter_title}</div><div className="flex gap-2"><Button variant="ghost" size="sm" onClick={() => router.visit(`/instructor/topics/create?chapter_id=${chapter.id}`)}>+ Topic</Button><Button variant="ghost" size="sm" onClick={() => router.visit(`/instructor/chapters/${chapter.id}/edit`)}>Edit</Button></div></div>
                        <div className="divide-y">{chapter.topics.sort((a:any,b:any) => (a.order_index||0) - (b.order_index||0)).map((topic:any, tidx:number) => (
                            <div key={topic.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">{topic.video_url ? <Video className="w-5 h-5 text-blue-500" /> : <div className="w-5 h-5" />}<span>{tidx+1}. {topic.topic_title}</span></div>
                                <Button variant="ghost" size="sm" onClick={() => router.visit(`/instructor/topics/${topic.id}/edit`)}>Edit</Button>
                            </div>
                        ))}
                        {chapter.topics.length === 0 && <div className="p-4 text-center text-sm text-muted-foreground">No topics in this chapter.</div>}
                        </div>
                    </div>))}
                </div>
            )}
        </div>
    </div>);
}
