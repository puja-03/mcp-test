import { Head, Link, router } from '@inertiajs/react';
import { PlayCircle, Video, FileText, BookOpen, Play, ChevronDown, ChevronUp, LogOut, User } from 'lucide-react';
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
        <div className="min-h-screen flex flex-col" style={{ background: '#f7f9fb', fontFamily: 'Inter, sans-serif' }}>
            <Head title="My Learning — EliteCoach">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
            </Head>

            {/* ── Navbar ── */}
            <header
                className="sticky top-0 z-40 flex items-center justify-between px-6 lg:px-12 py-4"
                style={{
                    background: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(16px)',
                    borderBottom: '1px solid rgba(79,70,229,0.08)',
                }}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5">
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}
                    >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                        </svg>
                    </div>
                    <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        EliteCoach
                    </span>
                </Link>

                {/* Nav links */}
                <div className="hidden md:flex items-center gap-6">
                    <span className="text-sm font-semibold text-indigo-600 border-b-2 border-indigo-500 pb-0.5">
                        My Learning
                    </span>
                    <button
                        onClick={() => router.visit('/student/courses')}
                        className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                        Browse Courses
                    </button>
                </div>

                {/* User actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.visit('/student/courses')}
                        className="hidden sm:flex h-9 items-center gap-2 px-4 rounded-lg text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    >
                        Browse Catalog
                    </button>
                    <button
                        onClick={() => router.visit('/logout')}
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                        title="Sign out"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </header>

            {/* ── Page header ── */}
            <div
                className="px-6 lg:px-12 py-10"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
            >
                <div className="max-w-6xl mx-auto">
                    <p className="text-indigo-300 text-xs font-semibold uppercase tracking-widest mb-2">Student Portal</p>
                    <h1
                        className="text-3xl lg:text-4xl font-bold text-white mb-2"
                        style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                    >
                        My Learning
                    </h1>
                    <p className="text-indigo-300 text-sm">
                        Welcome back! Continue your journey right where you left off.
                    </p>

                    {/* Stats */}
                    <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                        {[
                            { value: stats.enrolled ?? courses.length, label: 'Enrolled' },
                            { value: stats.inProgress ?? 0, label: 'In Progress' },
                            { value: stats.completed ?? 0, label: 'Completed' },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-xl p-4 text-center"
                                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}
                            >
                                <div
                                    className="text-2xl font-bold text-white"
                                    style={{ fontFamily: 'Manrope, sans-serif' }}
                                >
                                    {s.value}
                                </div>
                                <div className="text-xs text-indigo-300 mt-0.5">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <main className="flex-1 px-6 lg:px-12 py-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2
                            className="text-xl font-bold text-gray-900"
                            style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                            All Courses
                        </h2>
                        <span className="text-sm text-gray-400">{courses.length} course{courses.length !== 1 ? 's' : ''} enrolled</span>
                    </div>

                    {/* Empty state */}
                    {courses.length === 0 ? (
                        <div
                            className="rounded-2xl p-16 text-center"
                            style={{ background: '#ffffff', boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }}
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                style={{ background: '#eef2ff' }}
                            >
                                <BookOpen className="text-indigo-500" size={28} />
                            </div>
                            <h3
                                className="text-xl font-bold text-gray-900 mb-2"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                No courses yet
                            </h3>
                            <p className="text-gray-500 text-sm mb-8">
                                You haven't enrolled in any courses. Browse the catalog to get started!
                            </p>
                            <button
                                onClick={() => router.visit('/student/courses')}
                                className="h-11 px-7 rounded-xl text-sm font-semibold text-white inline-flex items-center gap-2"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                    boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
                                }}
                            >
                                Explore Catalog
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    ) : (
                        /* Course Grid */
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {courses.map((course) => {
                                const isSelected = selectedCourseId === course.id;
                                const chapters = course.chapters ?? [];

                                return (
                                    <div
                                        key={course.id}
                                        onClick={() => expandCourse(course.id)}
                                        className="rounded-2xl overflow-hidden cursor-pointer transition-all group"
                                        style={{
                                            background: '#ffffff',
                                            boxShadow: isSelected
                                                ? '0 0 0 2px #4f46e5, 0 8px 24px rgba(79,70,229,0.15)'
                                                : '0 0 0 1px rgba(0,0,0,0.06)',
                                            transform: isSelected ? 'translateY(-2px)' : 'none',
                                        }}
                                    >
                                        {/* Thumbnail */}
                                        <div
                                            className="aspect-video relative overflow-hidden"
                                            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }}
                                        >
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <PlayCircle className="text-white/20" size={52} />
                                            </div>
                                            {/* Hover/selected overlay */}
                                            <div
                                                className="absolute inset-0 flex items-center justify-center transition-opacity"
                                                style={{ background: 'rgba(0,0,0,0.4)', opacity: isSelected ? 1 : 0 }}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                                                    <Play className="text-indigo-600 fill-indigo-600" size={18} style={{ marginLeft: 2 }} />
                                                </div>
                                            </div>
                                            <div
                                                className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-100 opacity-0"
                                                style={{ background: 'rgba(0,0,0,0.3)' }}
                                            >
                                                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                                    <Play className="text-indigo-600 fill-indigo-600" size={18} style={{ marginLeft: 2 }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Card body */}
                                        <div className="p-5">
                                            <h3
                                                className="font-semibold text-gray-900 leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors"
                                                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '0.9rem' }}
                                            >
                                                {course.name}
                                            </h3>
                                            <p className="text-xs text-gray-400 mb-4">
                                                {chapters.length} section{chapters.length !== 1 ? 's' : ''}
                                            </p>

                                            {/* Progress bar */}
                                            <div>
                                                <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                                                    <span>Progress</span>
                                                    <span>0%</span>
                                                </div>
                                                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all"
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

                    {/* ── Curriculum Expanded View ── */}
                    {selectedCourseId !== null &&
                        (() => {
                            const activeCourse = courses.find((c) => c.id === selectedCourseId);
                            if (!activeCourse) return null;

                            return (
                                <div
                                    className="mt-8 rounded-2xl overflow-hidden"
                                    style={{
                                        boxShadow: '0 0 0 1px rgba(79,70,229,0.12), 0 8px 32px rgba(79,70,229,0.08)',
                                        animation: 'fadeInUp 0.25s ease-out',
                                    }}
                                >
                                    {/* Curriculum header */}
                                    <div
                                        className="px-8 py-6 flex items-center justify-between"
                                        style={{
                                            background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                                        }}
                                    >
                                        <div>
                                            <p className="text-indigo-300 text-xs uppercase tracking-widest font-semibold mb-1">
                                                Course Content
                                            </p>
                                            <h3
                                                className="text-xl font-bold text-white"
                                                style={{ fontFamily: 'Manrope, sans-serif' }}
                                            >
                                                {activeCourse.name}
                                            </h3>
                                        </div>
                                        <button
                                            onClick={() => setSelectedCourseId(null)}
                                            className="flex items-center gap-1.5 text-indigo-300 hover:text-white text-sm transition-colors px-4 py-2 rounded-lg hover:bg-white/10"
                                        >
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 6L6 18M6 6l12 12" />
                                            </svg>
                                            Close
                                        </button>
                                    </div>

                                    {/* Chapters */}
                                    <div className="bg-white">
                                        {!activeCourse.chapters || activeCourse.chapters.length === 0 ? (
                                            <div className="p-12 text-center text-gray-400 text-sm">
                                                No content available for this course yet.
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-100">
                                                {activeCourse.chapters.map((chapter, index) => {
                                                    const isExpanded = expandedChapters.includes(chapter.id);
                                                    return (
                                                        <div key={chapter.id}>
                                                            {/* Chapter row */}
                                                            <button
                                                                onClick={() => toggleChapter(chapter.id)}
                                                                className="w-full flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors text-left"
                                                            >
                                                                <div className="flex items-center gap-4">
                                                                    <div
                                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0"
                                                                        style={{ background: '#eef2ff' }}
                                                                    >
                                                                        {String(index + 1).padStart(2, '0')}
                                                                    </div>
                                                                    <span
                                                                        className="font-semibold text-gray-900 text-sm"
                                                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                                                    >
                                                                        {chapter.chapter_title}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center gap-3 text-gray-400">
                                                                    <span className="text-xs">
                                                                        {chapter.topics?.length ?? 0} lectures
                                                                    </span>
                                                                    {isExpanded ? (
                                                                        <ChevronUp size={16} />
                                                                    ) : (
                                                                        <ChevronDown size={16} />
                                                                    )}
                                                                </div>
                                                            </button>

                                                            {/* Topics */}
                                                            {isExpanded && (
                                                                <div
                                                                    className="border-t border-gray-50"
                                                                    style={{ background: '#fafbff' }}
                                                                >
                                                                    {!chapter.topics || chapter.topics.length === 0 ? (
                                                                        <div className="px-8 py-4 text-sm text-gray-400 pl-20">
                                                                            No topics in this section.
                                                                        </div>
                                                                    ) : (
                                                                        <div className="divide-y divide-gray-100/60">
                                                                            {chapter.topics.map((topic) => (
                                                                                <Link
                                                                                    href={`/student/topics/${topic.topic_slug}`}
                                                                                    key={topic.id}
                                                                                    className="flex items-center justify-between px-8 py-4 pl-20 hover:bg-indigo-50/50 transition-colors group/topic"
                                                                                >
                                                                                    <div className="flex items-center gap-3">
                                                                                        <div
                                                                                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                                                                            style={{ background: '#f0f0ff' }}
                                                                                        >
                                                                                            {topic.video_url ? (
                                                                                                <Video
                                                                                                    size={13}
                                                                                                    className="text-indigo-400 group-hover/topic:text-indigo-600"
                                                                                                />
                                                                                            ) : (
                                                                                                <FileText
                                                                                                    size={13}
                                                                                                    className="text-indigo-400 group-hover/topic:text-indigo-600"
                                                                                                />
                                                                                            )}
                                                                                        </div>
                                                                                        <span className="text-sm text-gray-700 group-hover/topic:text-indigo-700 font-medium transition-colors">
                                                                                            {topic.topic_title}
                                                                                        </span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="text-xs font-semibold text-indigo-600 opacity-0 group-hover/topic:opacity-100 transition-opacity flex items-center gap-1"
                                                                                    >
                                                                                        {topic.video_url ? 'Watch' : 'Read'}
                                                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                                                                        </svg>
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
                                        )}
                                    </div>
                                </div>
                            );
                        })()}
                </div>
            </main>

            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(16px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
