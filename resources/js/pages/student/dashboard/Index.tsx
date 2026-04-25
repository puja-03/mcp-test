import { Head, Link, router } from '@inertiajs/react';
import { PlayCircle, Video, FileText, BookOpen, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function StudentDashboard({ stats, courses = [] }: { stats: any, courses?: any[] }) {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

    const toggleChapter = (chapterId: number) => {
        setExpandedChapters(prev => 
            prev.includes(chapterId) ? prev.filter(id => id !== chapterId) : [...prev, chapterId]
        );
    };

    const expandCourse = (courseId: number) => {
        if (selectedCourseId === courseId) {
            setSelectedCourseId(null);
        } else {
            setSelectedCourseId(courseId);
            // Auto-expand first chapter when course is selected
            const course = courses.find(c => c.id === courseId);
            if (course?.chapters?.length > 0) {
                setExpandedChapters([course.chapters[0].id]);
            } else {
                setExpandedChapters([]);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            <Head title="My Learning" />
            
            {/* Udemy-like Dark Header */}
            <header className="bg-[#1c1d1f] text-white py-6 px-6 lg:px-12 border-b-4 border-indigo-500">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold font-serif mb-1 tracking-tight">My learning</h1>
                        <p className="text-gray-300 text-sm md:text-base font-light">Welcome back! Continue your journey right where you left off.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            onClick={() => router.visit('/student/courses')} 
                            className="bg-white text-[#1c1d1f] hover:bg-gray-200 font-bold px-6 py-4 rounded-none h-auto transition-colors"
                        >
                            Browse Courses
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-12 py-10">
                
                <h2 className="text-2xl font-bold text-[#1c1d1f] mb-8">All courses</h2>

                {courses.length === 0 ? (
                    <div className="text-center py-24 bg-gray-50 border border-gray-200">
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-500 mb-6">You haven't enrolled in any courses. Browse the catalog to get started!</p>
                        <Button className="bg-[#1c1d1f] text-white hover:bg-gray-800 rounded-none px-8 py-6 h-auto font-bold" onClick={() => router.visit('/student/courses')}>
                            Explore Catalog
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course) => {
                            const isSelected = selectedCourseId === course.id;
                            const chapters = course.chapters || [];
                            
                            return (
                                <div key={course.id} className="flex flex-col">
                                    <div 
                                        className={`group relative flex flex-col border transition-all cursor-pointer bg-white h-full ${
                                            isSelected ? 'border-indigo-500 shadow-md ring-1 ring-indigo-500' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                        }`}
                                        onClick={() => expandCourse(course.id)}
                                    >
                                        <div className="aspect-video w-full bg-[#1c1d1f] relative overflow-hidden">
                                            {/* Abstract background for course */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-indigo-900 flex items-center justify-center text-white">
                                                <PlayCircle className="w-16 h-16 opacity-20" />
                                            </div>
                                            {/* Hover overlay */}
                                            <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#1c1d1f] shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
                                                    <Play className="w-6 h-6 fill-current ml-1" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 flex-1 flex flex-col">
                                            <h3 className="font-bold text-[#1c1d1f] line-clamp-2 leading-tight mb-2 group-hover:text-indigo-700 transition-colors min-h-[40px]">
                                                {course.name}
                                            </h3>
                                            <div className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-wide">
                                                {chapters.length} Sections
                                            </div>
                                            <div className="mt-auto pt-4 border-t border-gray-100">
                                                <div className="flex justify-between text-xs text-gray-600 mb-2">
                                                    <span className="font-medium">0% complete</span>
                                                </div>
                                                <div className="h-1 w-full bg-gray-200 overflow-hidden">
                                                    <div className="h-full bg-indigo-600 w-0 transition-all duration-500"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                
                {/* Course Curriculum Expanded View */}
                {selectedCourseId && courses.find(c => c.id === selectedCourseId) && (
                    <div className="mt-12 border border-gray-200 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <div className="p-6 border-b border-gray-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h3 className="text-2xl font-bold text-[#1c1d1f] mb-1">
                                    {courses.find(c => c.id === selectedCourseId)?.name}
                                </h3>
                                <p className="text-sm text-gray-500">Course Content</p>
                            </div>
                            <Button variant="outline" onClick={() => setSelectedCourseId(null)} className="text-[#1c1d1f] rounded-none border-gray-300 hover:bg-gray-50 font-bold">
                                Close Expanded View
                            </Button>
                        </div>
                        <div className="bg-white">
                            {(() => {
                                const activeCourse = courses.find(c => c.id === selectedCourseId);
                                const chapters = activeCourse?.chapters || [];

                                if (chapters.length === 0) {
                                    return <div className="p-12 text-center text-gray-500">No content available for this course yet.</div>;
                                }

                                return (
                                    <div className="divide-y divide-gray-200">
                                        {chapters.map((chapter: any, index: number) => {
                                            const isExpanded = expandedChapters.includes(chapter.id);
                                            return (
                                                <div key={chapter.id} className="group/chapter">
                                                    <div 
                                                        className="p-5 bg-gray-50 flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                                                        onClick={() => toggleChapter(chapter.id)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {isExpanded ? (
                                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                                            ) : (
                                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                                            )}
                                                            <span className="text-[#1c1d1f] font-bold">Section {index + 1}: {chapter.chapter_title}</span>
                                                        </div>
                                                        <div className="text-sm text-gray-500 font-medium">
                                                            {chapter.topics?.length || 0} lectures
                                                        </div>
                                                    </div>
                                                    
                                                    {isExpanded && (
                                                        <div className="bg-white border-t border-gray-100">
                                                            {chapter.topics?.length === 0 ? (
                                                                <div className="p-5 text-sm text-gray-500 pl-14">No topics in this section.</div>
                                                            ) : (
                                                                <div className="divide-y divide-gray-100">
                                                                    {chapter.topics?.map((topic: any) => (
                                                                        <Link 
                                                                            href={`/student/topics/${topic.topic_slug}`}
                                                                            key={topic.id}
                                                                            className="flex items-center justify-between p-4 pl-14 hover:bg-gray-50 transition-colors group/topic"
                                                                        >
                                                                            <div className="flex items-center gap-4">
                                                                                {topic.video_url ? (
                                                                                    <Video className="w-4 h-4 text-gray-400 group-hover/topic:text-indigo-600" />
                                                                                ) : (
                                                                                    <FileText className="w-4 h-4 text-gray-400 group-hover/topic:text-indigo-600" />
                                                                                )}
                                                                                <span className="text-sm text-gray-700 group-hover/topic:text-indigo-600 font-medium">
                                                                                    {topic.topic_title}
                                                                                </span>
                                                                            </div>
                                                                            <span className="text-sm font-bold text-indigo-600 opacity-0 group-hover/topic:opacity-100 transition-opacity">
                                                                                {topic.video_url ? 'Watch' : 'Read'}
                                                                            </span>
                                                                        </Link>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

