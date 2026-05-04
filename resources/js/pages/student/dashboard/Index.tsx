import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
import {
    BookOpen,
    ChevronDown,
    ChevronUp,
    FileText,
    Play,
    PlayCircle,
    Video
} from 'lucide-react';
import { useState } from 'react';

interface Topic {
    id: number;
    topic_title: string;
    topic_slug: string;
    video_url?: string;
}

interface Chapter {
    id: number;
    chapter_title: string;
    topics?: Topic[];
}

interface Course {
    id: number;
    name: string;
    chapters?: Chapter[];
}

interface Stats {
    enrolled?: number;
    completed?: number;
    inProgress?: number;
}

export default function StudentDashboard({
    stats = {},
    courses = [],
}: {
    stats: Stats;
    courses: Course[];
}) {
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

    const toggleChapter = (chapterId: number) => {
        setExpandedChapters((prev) =>
            prev.includes(chapterId) ? prev.filter((id) => id !== chapterId) : [...prev, chapterId],
        );
    };

    const expandCourse = (courseId: number) => {
        if (selectedCourseId === courseId) {
            setSelectedCourseId(null);
        } else {
            setSelectedCourseId(courseId);
            const course = courses.find((c) => c.id === courseId);
            if (course?.chapters && course.chapters.length > 0) {
                setExpandedChapters([course.chapters[0].id]);
            } else {
                setExpandedChapters([]);
            }
        }
    };

    return (
        <AppEliteCoachLayout title="My Learning">
            <Head title="My Learning" />

            {/* Premium Hero Section */}
            <div
                className="px-6 lg:px-12 py-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
            >
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-3">Student Portal</p>
                            <h1
                                className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                My Learning
                            </h1>
                            <p className="text-indigo-100 text-lg font-medium opacity-90 max-w-xl leading-relaxed">
                                Welcome back! Continue your professional evolution right where you left off.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 w-full md:w-auto min-w-[360px]">
                            {[
                                { value: stats.enrolled ?? courses.length, label: 'Enrolled' },
                                { value: stats.inProgress ?? 0, label: 'In Progress' },
                                { value: stats.completed ?? 0, label: 'Completed' },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-2xl p-4 text-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
                                >
                                    <div
                                        className="text-2xl font-extrabold text-white mb-0.5 tracking-tight"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 -mt-8 flex-1">
                <div className="flex items-center justify-between mb-8">
                    <h2
                        className="text-xl font-extrabold text-gray-900 tracking-tight"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        Enrolled Courses
                    </h2>
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-tight">
                        {courses.length} Active Enrollment{courses.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Empty state */}
                {courses.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 bg-indigo-50 text-indigo-500">
                            <BookOpen size={32} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Start Your Journey
                        </h3>
                        <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                            You haven't enrolled in any courses yet. Discover elite coaching materials in our catalog.
                        </p>
                        <Button 
                            onClick={() => router.visit('/student/courses')}
                            className="h-12 px-8 rounded-xl font-bold text-white shadow-lg shadow-indigo-200"
                            style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)' }}
                        >
                            Explore Catalog
                        </Button>
                    </div>
                ) : (
                    /* Course Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courses.map((course) => {
                            const isSelected = selectedCourseId === course.id;
                            const chapters = course.chapters ?? [];

                            return (
                                <div
                                    key={course.id}
                                    onClick={() => expandCourse(course.id)}
                                    className={`group rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 bg-white border ${
                                        isSelected 
                                            ? 'border-indigo-500 shadow-2xl shadow-indigo-100 -translate-y-1' 
                                            : 'border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                                    }`}
                                >
                                    {/* Thumbnail Placeholder */}
                                    <div className="aspect-video relative overflow-hidden bg-slate-900">
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-800 opacity-80" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <PlayCircle className="text-white/20 group-hover:text-white/40 transition-colors" size={52} />
                                        </div>
                                        
                                        {/* Play Hover Overlay */}
                                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/40 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110">
                                                <Play className="text-indigo-600 fill-indigo-600 ml-1" size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-6">
                                        <h3
                                            className="font-bold text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors"
                                            style={{ fontFamily: 'Manrope, sans-serif' }}
                                        >
                                            {course.name}
                                        </h3>
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">
                                                {chapters.length} Section{chapters.length !== 1 ? 's' : ''}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-gray-200" />
                                            <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest">
                                                In Progress
                                            </span>
                                        </div>

                                        {/* Premium Progress Bar */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                                                <span>Course Completion</span>
                                                <span className="text-indigo-600">0%</span>
                                            </div>
                                            <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-1000"
                                                    style={{
                                                        width: '0%',
                                                        background: 'linear-gradient(90deg, #4f46e5, #818cf8)',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Curriculum Expanded View */}
                {selectedCourseId !== null &&
                    (() => {
                        const activeCourse = courses.find((c) => c.id === selectedCourseId);
                        if (!activeCourse) return null;

                        return (
                            <div className="mt-12 rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-indigo-100 animate-in slide-in-from-bottom-6 duration-500">
                                {/* Curriculum header */}
                                <div
                                    className="px-10 py-8 flex items-center justify-between relative overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)' }}
                                >
                                    <div className="relative z-10">
                                        <p className="text-indigo-300 text-[10px] uppercase tracking-widest font-extrabold mb-2 opacity-80">
                                            Academic Curriculum
                                        </p>
                                        <h3
                                            className="text-2xl font-extrabold text-white tracking-tight"
                                            style={{ fontFamily: 'Manrope, sans-serif' }}
                                        >
                                            {activeCourse.name}
                                        </h3>
                                    </div>
                                    <Button
                                        onClick={() => setSelectedCourseId(null)}
                                        className="relative z-10 h-10 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md transition-all font-bold text-xs"
                                    >
                                        Close Expanded View
                                    </Button>
                                    
                                    {/* Abstract header decoration */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-20 -mt-20 blur-3xl" />
                                </div>

                                {/* Chapters List */}
                                <div className="bg-white">
                                    {!activeCourse.chapters || activeCourse.chapters.length === 0 ? (
                                        <div className="p-20 text-center">
                                            <p className="text-gray-400 font-medium italic">Curriculum content is being finalized by your instructor.</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-50">
                                            {activeCourse.chapters.map((chapter, index) => {
                                                const isExpanded = expandedChapters.includes(chapter.id);
                                                return (
                                                    <div key={chapter.id} className="group/chapter">
                                                        <button
                                                            onClick={() => toggleChapter(chapter.id)}
                                                            className={`w-full flex items-center justify-between px-10 py-6 hover:bg-gray-50/50 transition-all text-left ${isExpanded ? 'bg-indigo-50/20' : ''}`}
                                                        >
                                                            <div className="flex items-center gap-6">
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-extrabold transition-all ${isExpanded ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-indigo-50 text-indigo-600'}`}>
                                                                    {String(index + 1).padStart(2, '0')}
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold text-gray-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                                        {chapter.chapter_title}
                                                                    </span>
                                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                                                        {chapter.topics?.length ?? 0} Learning Units
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                                                <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-indigo-600' : 'text-gray-300'}`} />
                                                            </div>
                                                        </button>

                                                        {/* Topics Grid-like List */}
                                                        {isExpanded && (
                                                            <div className="bg-white px-10 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                                                {!chapter.topics || chapter.topics.length === 0 ? (
                                                                    <div className="py-4 pl-16 text-xs text-gray-400 italic">No topics available in this section.</div>
                                                                ) : (
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                                                                        {chapter.topics.map((topic) => (
                                                                            <Link
                                                                                href={`/student/topics/${topic.topic_slug}`}
                                                                                key={topic.id}
                                                                                className="flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50 border border-transparent hover:border-indigo-100 transition-all group/topic"
                                                                            >
                                                                                <div className="flex items-center gap-4">
                                                                                    <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover/topic:bg-white group-hover/topic:text-indigo-600 transition-colors shadow-inner">
                                                                                        {topic.video_url ? <Video size={16} /> : <FileText size={16} />}
                                                                                    </div>
                                                                                    <span className="text-sm font-bold text-gray-700 group-hover/topic:text-indigo-900 transition-colors">
                                                                                        {topic.topic_title}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-transparent group-hover/topic:bg-white group-hover/topic:shadow-md transition-all opacity-0 group-hover/topic:opacity-100">
                                                                                    <Play className="w-3 h-3 text-indigo-600 fill-indigo-600 ml-0.5" />
                                                                                </div>
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
                                    )}
                                </div>
                            </div>
                        );
                    })()}
            </div>
        </AppEliteCoachLayout>
    );
}

