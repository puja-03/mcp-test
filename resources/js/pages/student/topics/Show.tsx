import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlayCircle, FileText, ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Show({ topic, course }: any) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const formatVideoUrl = (url: string) => {
        if (!url) return null;
        if (url.includes('youtube.com/watch?v=')) return url.replace('watch?v=', 'embed/');
        if (url.includes('youtu.be/')) return url.replace('youtu.be/', 'youtube.com/embed/');
        if (url.includes('vimeo.com/')) return url.replace('vimeo.com/', 'player.vimeo.com/video/');
        return url;
    };

    const videoSrc = formatVideoUrl(topic.video_url);

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background">
            <Head title={`${topic.topic_title} - ${course.name}`} />

            {/* Header / Nav */}
            <div className="h-14 border-b px-4 flex items-center justify-between bg-white z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => router.visit(`/student/courses/${course.slug}`)}>
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="hidden md:block">
                        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{course.name}</p>
                        <h1 className="text-sm font-bold truncate max-w-[300px]">{topic.topic_title}</h1>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Main Player Area */}
                <div className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? 'lg:mr-[350px]' : ''}`}>
                    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6">
                        {/* Video Player */}
                        {videoSrc ? (
                            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
                                <iframe
                                    src={videoSrc}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <Card className="aspect-video flex items-center justify-center bg-muted/50 border-dashed border-2">
                                <div className="text-center">
                                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold">Reading Material</h3>
                                    <p className="text-sm text-muted-foreground">This topic contains text-based content only.</p>
                                </div>
                            </Card>
                        )}

                        {/* Title and Content */}
                        <div className="space-y-6 pb-20">
                            <div>
                                <h2 className="text-3xl font-bold mb-2">{topic.topic_title}</h2>
                                <Badge variant="secondary">{topic.chapter?.chapter_title}</Badge>
                            </div>
                            
                            {topic.content && (
                                <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-border/40 leading-relaxed">
                                    <div dangerouslySetInnerHTML={{ __html: topic.content.replace(/\n/g, '<br />') }} />
                                </div>
                            )}
                            
                            {!topic.content && !topic.video_url && (
                                <p className="text-muted-foreground italic">No content has been added to this topic yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Desktop Sidebar (Course Content) */}
                <aside className={`fixed right-0 top-14 bottom-0 w-[350px] bg-white border-l z-10 transition-transform duration-300 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} hidden lg:block`}>
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b bg-muted/30">
                            <h3 className="font-bold flex items-center gap-2">
                                <Menu className="w-4 h-4" /> Course Curriculum
                            </h3>
                        </div>
                        <ScrollArea className="flex-1">
                            <div className="p-2 space-y-4">
                                {course.chapters.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)).map((chapter: any) => (
                                    <div key={chapter.id} className="space-y-1">
                                        <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-wider bg-muted/20 rounded-md">
                                            {chapter.chapter_title}
                                        </div>
                                        <div className="space-y-0.5">
                                            {chapter.topics.sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)).map((t: any) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => router.visit(`/student/topics/${t.id}`)}
                                                    className={`w-full text-left flex items-center gap-3 p-3 rounded-md text-sm transition-all duration-200 ${
                                                        t.id === topic.id 
                                                        ? 'bg-primary text-primary-foreground shadow-md font-semibold' 
                                                        : 'hover:bg-muted text-foreground'
                                                    }`}
                                                >
                                                    {t.video_url ? <PlayCircle className="w-4 h-4 shrink-0" /> : <FileText className="w-4 h-4 shrink-0" />}
                                                    <span className="truncate">{t.topic_title}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setSidebarOpen(false)}>
                        <div className="absolute right-0 top-0 bottom-0 w-[300px] bg-white animate-in slide-in-from-right" onClick={e => e.stopPropagation()}>
                            <div className="flex h-full flex-col">
                                <div className="p-4 border-b flex justify-between items-center">
                                    <span className="font-bold">Course Content</span>
                                    <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></Button>
                                </div>
                                <ScrollArea className="flex-1">
                                    {/* Sidebar content repeated for mobile */}
                                    <div className="p-2 space-y-4">
                                        {course.chapters.map((chapter: any) => (
                                            <div key={chapter.id} className="space-y-1">
                                                <div className="px-3 py-1 text-xs font-bold text-muted-foreground uppercase">{chapter.chapter_title}</div>
                                                {chapter.topics.map((t: any) => (
                                                    <button key={t.id} onClick={() => router.visit(`/student/topics/${t.id}`)} className={`w-full text-left flex items-center gap-3 p-3 rounded-md text-sm ${t.id === topic.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>
                                                        {t.video_url ? <PlayCircle className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                                        <span className="truncate">{t.topic_title}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
