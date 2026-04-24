import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, BookOpen, ChevronRight, Video, FileText } from 'lucide-react';
import { useState } from 'react';

export default function Index({ courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [hoveredCourseId, setHoveredCourseId] = useState<number | null>(null);
    const [hoveredChapterId, setHoveredChapterId] = useState<number | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/student/courses', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="My Courses" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 lg:p-8 bg-slate-50/50 min-h-screen">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Enrolled Courses</h1>
                        <p className="text-sm text-slate-500">Access your learning materials and track your progress.</p>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search your courses..."
                                className="pl-9 bg-slate-50 rounded-full"
                            />
                        </div>
                        <Button type="submit" className="rounded-full shadow-sm">Search</Button>
                    </form>
                </div>

                {courses.data.length === 0 ? (
                    <div className="text-center p-12 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No courses found</h3>
                        <p className="text-slate-500 mt-2">You aren't enrolled in any courses matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Course List */}
                        <div className="md:col-span-4 flex flex-col gap-3">
                            {courses.data.map((course: any) => (
                                <div 
                                    key={course.id}
                                    onMouseEnter={() => {
                                        setHoveredCourseId(course.id);
                                        setHoveredChapterId(null);
                                    }}
                                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                        hoveredCourseId === course.id 
                                            ? 'bg-primary text-primary-foreground border-primary shadow-md transform scale-[1.02]' 
                                            : 'bg-white border-slate-200 hover:border-primary/50 text-slate-800'
                                    }`}
                                >
                                    <div className="font-semibold">{course.name}</div>
                                    <ChevronRight className={`w-5 h-5 ${hoveredCourseId === course.id ? 'text-primary-foreground' : 'text-slate-400'}`} />
                                </div>
                            ))}
                        </div>

                        {/* Chapters & Topics Panel */}
                        <div className="md:col-span-8">
                            {hoveredCourseId ? (
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-full">
                                    <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {courses.data.find((c: any) => c.id === hoveredCourseId)?.name} Content
                                        </h3>
                                        <Button size="sm" variant="outline" onClick={() => router.visit(`/student/courses/${courses.data.find((c: any) => c.id === hoveredCourseId)?.slug}`)}>
                                            Go to Course Page
                                        </Button>
                                    </div>
                                    
                                    <div className="p-6">
                                        {(() => {
                                            const activeCourse = courses.data.find((c: any) => c.id === hoveredCourseId);
                                            const chapters = activeCourse?.chapters || [];

                                            if (chapters.length === 0) {
                                                return <p className="text-slate-500 italic">No chapters available for this course yet.</p>;
                                            }

                                            return (
                                                <div className="space-y-4">
                                                    {chapters.map((chapter: any) => (
                                                        <div 
                                                            key={chapter.id}
                                                            onMouseEnter={() => setHoveredChapterId(chapter.id)}
                                                            className={`rounded-xl overflow-hidden border transition-all ${
                                                                hoveredChapterId === chapter.id ? 'border-primary/50 shadow-sm' : 'border-slate-100'
                                                            }`}
                                                        >
                                                            {/* Chapter Header */}
                                                            <div className={`p-4 font-semibold flex items-center justify-between ${
                                                                hoveredChapterId === chapter.id ? 'bg-primary/5 text-primary' : 'bg-slate-50 text-slate-700'
                                                            }`}>
                                                                <div className="flex items-center gap-2">
                                                                    <BookOpen className="w-4 h-4" />
                                                                    {chapter.chapter_title}
                                                                </div>
                                                                <ChevronRight className={`w-4 h-4 transition-transform ${hoveredChapterId === chapter.id ? 'rotate-90' : ''}`} />
                                                            </div>

                                                            {/* Topics (Shows on hover of chapter) */}
                                                            {hoveredChapterId === chapter.id && (
                                                                <div className="p-4 bg-white border-t border-slate-100 flex flex-col gap-2">
                                                                    {chapter.topics?.length === 0 ? (
                                                                        <p className="text-sm text-slate-400 italic py-2">No topics in this chapter.</p>
                                                                    ) : (
                                                                        chapter.topics?.map((topic: any) => (
                                                                            <Link 
                                                                                href={`/student/topics/${topic.topic_slug}`}
                                                                                key={topic.id}
                                                                                className="flex items-center justify-between p-3 rounded-lg border border-slate-100 hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors group"
                                                                            >
                                                                                <div className="flex items-center gap-3">
                                                                                    {topic.video_url ? (
                                                                                        <Video className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                                                                    ) : (
                                                                                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                                                                                    )}
                                                                                    <span className="font-medium text-sm text-slate-700 group-hover:text-primary">{topic.topic_title}</span>
                                                                                </div>
                                                                                <Button variant="ghost" size="sm" className="h-8 group-hover:bg-primary group-hover:text-white rounded-full">
                                                                                    {topic.video_url ? 'Watch Video' : 'Read Topic'}
                                                                                </Button>
                                                                            </Link>
                                                                        ))
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl h-full min-h-[300px] flex items-center justify-center text-slate-400">
                                    <div className="text-center">
                                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                        <p>Hover over a course to view its chapters and topics.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-center space-x-2 mt-auto">
                    {courses.links.map((link: any, index: number) => (
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
