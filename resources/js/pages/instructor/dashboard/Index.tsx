import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BookOpen, Users, Calendar, FileEdit, Award,
    CheckSquare, TrendingUp, ArrowRight, Clock,
    BarChart3, ChevronRight,
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
            color: 'text-blue-600',
            bg: 'bg-blue-50',
            href: '/instructor/courses',
        },
        {
            title: 'Active Students',
            value: stats.students,
            icon: Users,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
            href: '/instructor/users',
        },
        {
            title: 'Class Sessions',
            value: stats.sessions,
            icon: Calendar,
            color: 'text-orange-600',
            bg: 'bg-orange-50',
            href: '/instructor/attendances',
        },
        {
            title: 'Exams Created',
            value: stats.exams,
            icon: FileEdit,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
            href: '/instructor/exams',
        },
        {
            title: 'Results Entered',
            value: stats.results,
            icon: Award,
            color: 'text-rose-600',
            bg: 'bg-rose-50',
            href: '/instructor/results',
        },
        {
            title: 'Attendance Rate',
            value: `${stats.attendance_rate}%`,
            icon: CheckSquare,
            color: 'text-teal-600',
            bg: 'bg-teal-50',
            href: '/instructor/attendances',
        },
    ];

    return (
        <>
            <Head title="Instructor Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">

                {/* Page Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back! Here's a summary of your teaching activity.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground bg-muted/40 px-4 py-2 rounded-lg border">
                        <Clock className="h-4 w-4" />
                        <span>Data scoped to your account only</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {statCards.map((card, index) => (
                        <Link key={index} href={card.href} className="group">
                            <Card className="border-none shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer h-full">
                                <CardContent className="p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`p-2.5 rounded-xl ${card.bg}`}>
                                            <card.icon className={`h-5 w-5 ${card.color}`} />
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                                    </div>
                                    <div className="text-2xl font-bold tabular-nums">{card.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1 font-medium">{card.title}</p>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {/* Bottom Section: 2 columns */}
                <div className="grid gap-6 lg:grid-cols-2">

                    {/* My Courses */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                                My Courses
                            </CardTitle>
                            <Button variant="ghost" size="sm" asChild className="text-xs gap-1 text-muted-foreground hover:text-foreground">
                                <Link href="/instructor/courses">
                                    View All <ArrowRight className="h-3 w-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {recentCourses.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <BookOpen className="h-10 w-10 text-muted-foreground/20 mb-3" />
                                    <p className="text-sm text-muted-foreground font-medium">No courses assigned yet</p>
                                    <p className="text-xs text-muted-foreground mt-1">Contact your admin to get courses assigned.</p>
                                </div>
                            ) : (
                                recentCourses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={`/instructor/courses/${course.id}`}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                                <BookOpen className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                                    {course.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {course.code ?? 'No code'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <span className="text-xs text-muted-foreground font-medium">
                                                {course.active_students} students
                                            </span>
                                            <Badge variant={course.is_published ? 'default' : 'secondary'} className="text-[10px] px-1.5">
                                                {course.is_published ? 'Live' : 'Draft'}
                                            </Badge>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>

                    {/* Recent Exams */}
                    <Card className="border-none shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-3">
                            <CardTitle className="text-base font-semibold flex items-center gap-2">
                                <FileEdit className="h-4 w-4 text-emerald-600" />
                                Recent Exams
                            </CardTitle>
                            <Button variant="ghost" size="sm" asChild className="text-xs gap-1 text-muted-foreground hover:text-foreground">
                                <Link href="/instructor/exams">
                                    View All <ArrowRight className="h-3 w-3" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {recentExams.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-10 text-center">
                                    <FileEdit className="h-10 w-10 text-muted-foreground/20 mb-3" />
                                    <p className="text-sm text-muted-foreground font-medium">No exams created yet</p>
                                    <Button asChild size="sm" variant="outline" className="mt-3 gap-1 text-xs">
                                        <Link href="/instructor/exams/create">
                                            Create First Exam <ArrowRight className="h-3 w-3" />
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                recentExams.map((exam) => (
                                    <Link
                                        key={exam.id}
                                        href={`/instructor/results/create?exam_id=${exam.id}`}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                                    >
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                <FileEdit className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                                                    {exam.title}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {exam.batch_name ?? '—'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-xs font-semibold text-foreground">
                                                {exam.max_marks} marks
                                            </p>
                                            {exam.exam_date && (
                                                <p className="text-[11px] text-muted-foreground">
                                                    {new Date(exam.exam_date).toLocaleDateString()}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                ))
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card className="border-none shadow-sm bg-gradient-to-r from-primary/5 via-primary/3 to-transparent">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-base font-semibold flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:border-primary hover:text-primary transition-colors">
                                <Link href="/instructor/attendances/create">
                                    <CheckSquare className="h-4 w-4" /> Mark Attendance
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:border-primary hover:text-primary transition-colors">
                                <Link href="/instructor/exams/create">
                                    <FileEdit className="h-4 w-4" /> Create Exam
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:border-primary hover:text-primary transition-colors">
                                <Link href="/instructor/results/create">
                                    <Award className="h-4 w-4" /> Enter Results
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:border-primary hover:text-primary transition-colors">
                                <Link href="/instructor/users">
                                    <Users className="h-4 w-4" /> View Students
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm" className="gap-2 hover:border-primary hover:text-primary transition-colors">
                                <Link href="/instructor/fee-structures">
                                    <BarChart3 className="h-4 w-4" /> Fee Structures
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
        </>
    );
}
