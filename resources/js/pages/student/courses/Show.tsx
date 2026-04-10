import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlayCircle, FileText, ChevronLeft, User, BookOpen } from 'lucide-react';

export default function Show({ course }: any) {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Head title={course.name} />
            
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <Button variant="ghost" onClick={() => router.visit('/student/courses')} className="mb-4 -ml-4">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to My Courses
                    </Button>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">{course.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> instructor: {course.instructor?.name || 'TBA'}</div>
                        <div className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> {course.chapters.length} Chapters</div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <div className="aspect-video bg-muted flex items-center justify-center p-8 text-center">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Ready to start?</h3>
                                <p className="text-muted-foreground mb-4">Pick a topic from the curriculum below to begin your session.</p>
                                <Button size="lg" onClick={() => {
                                    const firstTopic = course.chapters[0]?.topics[0];
                                    if (firstTopic) router.visit(`/student/topics/${firstTopic.id}`);
                                }}>Start First Lesson</Button>
                            </div>
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Curriculum</h2>
                        <Accordion type="multiple" className="w-full space-y-2">
                            {course.chapters.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)).map((chapter: any, idx: number) => (
                                <AccordionItem key={chapter.id} value={`chapter-${chapter.id}`} className="border rounded-xl px-4 bg-white shadow-sm overflow-hidden">
                                    <AccordionTrigger className="hover:no-underline py-4">
                                        <div className="flex items-center gap-4 text-left">
                                            <Badge variant="outline" className="h-6 w-6 flex items-center justify-center p-0 rounded-full">{idx + 1}</Badge>
                                            <div>
                                                <div className="font-semibold text-lg">{chapter.chapter_title}</div>
                                                <div className="text-xs text-muted-foreground">{chapter.topics.length} Lessons</div>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4">
                                        <div className="space-y-1 pt-2">
                                            {chapter.topics.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)).map((topic: any, tidx: number) => (
                                                <div 
                                                    key={topic.id} 
                                                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-border"
                                                    onClick={() => router.visit(`/student/topics/${topic.id}`)}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {topic.video_url ? <PlayCircle className="w-4 h-4 text-primary" /> : <FileText className="w-4 h-4 text-muted-foreground" />}
                                                        <span className="font-medium">{tidx + 1}. {topic.topic_title}</span>
                                                    </div>
                                                    <Badge variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">Watch Now</Badge>
                                                </div>
                                            ))}
                                            {chapter.topics.length === 0 && (
                                                <p className="text-center py-4 text-muted-foreground italic">No topics uploaded for this chapter yet.</p>
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-sm overflow-hidden">
                        <CardHeader className="bg-primary/5">
                            <CardTitle className="text-lg">Course Description</CardTitle>
                        </CardHeader>
                        <CardContent className="py-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {course.description || "No description provided for this course."}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-sm overflow-hidden bg-muted/30">
                        <CardHeader>
                            <CardTitle className="text-md">Course Support</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm space-y-2">
                            <p>Contact your branch office for support regarding this course.</p>
                            <Button variant="outline" className="w-full text-xs h-8">View Batch Details</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
