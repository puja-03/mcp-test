import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    Calendar,
    CheckSquare,
    ChevronRight,
    FileEdit,
    Plus,
    Users
} from 'lucide-react';

type Stats = {
    courses: number;
    students: number;
    sessions: number;
    exams: number;
    results: number;
    attendance_rate: number;
};

type Course = {
    id: number;
    name: string;
    code: string | null;
    is_published: boolean;
    active_students: number;
};

type Exam = {
    id: number;
    title: string;
    batch_name: string | null;
    exam_date: string | null;
    max_marks: number;
};

type Props = {
    stats: Stats;
    recentCourses: Course[];
    recentExams: Exam[];
};

export default function InstructorDashboard({ stats, recentCourses, recentExams }: Props) {
    const statCards = [
        {
            title: 'My Courses',
            value: stats.courses,
            icon: BookOpen,
            color: '#4f46e5',
            href: '/instructor/courses',
        },
        {
            title: 'Active Students',
            value: stats.students,
            icon: Users,
            color: '#7c3aed',
            href: '/instructor/users',
        },
        {
            title: 'Class Sessions',
            value: stats.sessions,
            icon: Calendar,
            color: '#0891b2',
            href: '/instructor/attendances',
        },
        {
            title: 'Exams Created',
            value: stats.exams,
            icon: FileEdit,
            color: '#059669',
            href: '/instructor/exams',
        },
        {
            title: 'Results Entered',
            value: stats.results,
            icon: Award,
            color: '#e11d48',
            href: '/instructor/results',
        },
        {
            title: 'Attendance Rate',
            value: `${stats.attendance_rate}%`,
            icon: CheckSquare,
            color: '#d97706',
            href: '/instructor/attendances',
        },
    ];

    return (
        <AppEliteCoachLayout title="Instructor Dashboard">
            <Head title="Instructor Dashboard" />

            {/* Premium Hero Section */}
            <div
                className="px-6 lg:px-12 py-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
            >
                <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full fill-white">
                        <path d="M0 0 L100 0 L100 100 Z" />
                    </svg>
                </div>
                
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 
                                className="text-3xl lg:text-4xl font-extrabold text-white mb-2 tracking-tight"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Instructor Console
                            </h1>
                            <p className="text-indigo-100 text-lg font-medium opacity-90">
                                Management portal for elite mentorship and academic excellence.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button asChild className="bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-md rounded-xl font-bold px-6">
                                <Link href="/instructor/exams/create">
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Exam
                                </Link>
                            </Button>
                            <Button asChild className="bg-white text-indigo-700 hover:bg-indigo-50 rounded-xl font-bold px-6 shadow-lg shadow-indigo-900/20">
                                <Link href="/instructor/courses">
                                    Manage Courses
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 -mt-8 flex-1">
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 mb-10">
                    {statCards.map((card, index) => (
                        <Link 
                            key={index} 
                            href={card.href}
                            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                                    style={{ background: `${card.color}10` }}
                                >
                                    <card.icon className="w-6 h-6" style={{ color: card.color }} />
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <div className="text-3xl font-extrabold text-gray-900 mb-1 tabular-nums tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {card.value}
                            </div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                {card.title}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Column: Courses */}
                    <div className="lg:col-span-7 space-y-8">
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    My Courses
                                </h3>
                                <Link href="/instructor/courses" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                                    View All
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                            <div className="p-2">
                                {recentCourses.length === 0 ? (
                                    <div className="py-20 text-center">
                                        <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-500 font-medium">No courses assigned yet.</p>
                                    </div>
                                ) : (
                                    <div className="divide-y divide-gray-50">
                                        {recentCourses.map((course) => (
                                            <Link
                                                key={course.id}
                                                href={`/instructor/courses/${course.id}`}
                                                className="flex items-center justify-between p-6 hover:bg-gray-50/80 rounded-2xl transition-colors group"
                                            >
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner group-hover:scale-105 transition-transform">
                                                        <BookOpen className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                            {course.name}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1">
                                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">
                                                                {course.code || 'NO CODE'}
                                                            </span>
                                                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                            <span className="text-xs font-bold text-indigo-500">
                                                                {course.active_students} Students
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge 
                                                    className={`rounded-lg px-3 py-1 font-bold text-[10px] uppercase tracking-wider ${
                                                        course.is_published 
                                                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' 
                                                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {course.is_published ? 'Live' : 'Draft'}
                                                </Badge>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Exams & Actions */}
                    <div className="lg:col-span-5 space-y-8">
                        
                        {/* Recent Exams */}
                        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    Recent Exams
                                </h3>
                                <Link href="/instructor/exams" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                                    History
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                            <div className="p-2">
                                {recentExams.length === 0 ? (
                                    <div className="py-16 text-center text-gray-400">
                                        <p className="text-sm">No recent exams found.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {recentExams.map((exam) => (
                                            <Link
                                                key={exam.id}
                                                href={`/instructor/results/create?exam_id=${exam.id}`}
                                                className="flex items-center justify-between p-5 hover:bg-gray-50 rounded-2xl transition-colors group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                                                        <FileEdit className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                                            {exam.title}
                                                        </h4>
                                                        <p className="text-xs font-medium text-gray-400 mt-0.5">
                                                            {exam.batch_name || 'All Batches'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xs font-bold text-gray-900">{exam.max_marks} Marks</div>
                                                    <div className="text-[10px] font-bold text-gray-400 uppercase mt-0.5">
                                                        {exam.exam_date ? new Date(exam.exam_date).toLocaleDateString() : 'NO DATE'}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-2 gap-4">
                            <Link 
                                href="/instructor/attendances/create"
                                className="bg-indigo-600 p-6 rounded-3xl text-white hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 group"
                            >
                                <CheckSquare className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-lg leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    Mark<br />Attendance
                                </div>
                            </Link>
                            <Link 
                                href="/instructor/results/create"
                                className="bg-white p-6 rounded-3xl text-gray-900 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group"
                            >
                                <Award className="w-8 h-8 text-rose-500 mb-4 group-hover:scale-110 transition-transform" />
                                <div className="font-bold text-lg leading-tight text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    Enter<br />Results
                                </div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}

