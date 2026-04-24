import { Head } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, BookOpen, CheckSquare, Award, User, Mail, Calendar } from 'lucide-react';

type Enrollment = {
    id: number;
    batch: {
        name: string;
        course: {
            name: string;
        };
    };
    status: string;
    enrollment_date: string;
};

type Attendance = {
    id: number;
    status: string;
    session: {
        session_date: string;
        start_time: string;
    };
};

type Result = {
    id: number;
    score: number;
    exam: {
        name: string;
        total_marks: number;
    };
};

type StudentProfile = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    enrollments: Enrollment[];
    attendances: Attendance[];
    results: Result[];
};

export default function Show({ user }: { user: StudentProfile }) {
    return (
        <>
            <Head title={`Student: ${user.name}`} />
            <div className="flex flex-col gap-6 p-6">
                {/* Header / Profile Info */}
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b pb-8">
                    <div className="flex items-center gap-6">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary border-4 border-background shadow-sm">
                            <User className="h-10 w-10" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                            <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground">
                                <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-1.5 transition-colors hover:text-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Registered {new Date(user.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Areas */}
                    <div className="lg:col-span-2 space-y-6">
                        <Tabs defaultValue="courses" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="courses">Enrollments</TabsTrigger>
                                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                                <TabsTrigger value="results">Academic Results</TabsTrigger>
                            </TabsList>

                            <TabsContent value="courses" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <GraduationCap className="h-5 w-5 text-primary" />
                                            Active Enrollments
                                        </CardTitle>
                                        <CardDescription>Courses and batches this student is currently attending.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {user.enrollments.map((enrollment) => (
                                                <div key={enrollment.id} className="flex items-center justify-between p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors">
                                                    <div>
                                                        <p className="font-semibold text-base">{enrollment.batch.course.name}</p>
                                                        <p className="text-sm text-muted-foreground font-medium">{enrollment.batch.name}</p>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-2">
                                                        <Badge variant={enrollment.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                                                            {enrollment.status}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground italic">Enrolled: {new Date(enrollment.enrollment_date).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            ))}
                                            {user.enrollments.length === 0 && (
                                                <div className="text-center py-10 text-muted-foreground animate-in fade-in zoom-in duration-300">
                                                    <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                                    No active enrollments found.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="attendance" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <CheckSquare className="h-5 w-5 text-primary" />
                                            Attendance History
                                        </CardTitle>
                                        <CardDescription>Recent class attendance records.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            {user.attendances.map((attendance) => (
                                                <div key={attendance.id} className="flex items-center justify-between p-3 border-b last:border-0 hover:bg-muted/30 rounded-md transition-colors">
                                                    <div>
                                                        <p className="font-medium">{new Date(attendance.session.session_date).toLocaleDateString()}</p>
                                                        <p className="text-xs text-muted-foreground">{attendance.session.start_time}</p>
                                                    </div>
                                                    <Badge variant={attendance.status === 'present' ? 'default' : 'destructive'} className="capitalize shadow-sm">
                                                        {attendance.status}
                                                    </Badge>
                                                </div>
                                            ))}
                                            {user.attendances.length === 0 && (
                                                <div className="text-center py-10 text-muted-foreground animate-in fade-in zoom-in duration-300">
                                                    <CheckSquare className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                                    No attendance records found.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="results" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl flex items-center gap-2">
                                            <Award className="h-5 w-5 text-primary" />
                                            Exam Performance
                                        </CardTitle>
                                        <CardDescription>Tracking academic progress through test results.</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {user.results.map((result) => (
                                                <div key={result.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20 hover:to-muted/40 transition-all border-l-4 border-l-primary shadow-sm hover:shadow-md">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h4 className="font-bold text-lg">{result.exam.name}</h4>
                                                        <Badge className="text-lg py-1 px-3 tabular-nums">
                                                            {result.score}/{result.exam.total_marks}
                                                        </Badge>
                                                    </div>
                                                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden shadow-inner">
                                                        <div
                                                            className="bg-primary h-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(var(--primary),0.5)]"
                                                            style={{ width: `${(result.score / result.exam.total_marks) * 100}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-right text-xs mt-1 text-muted-foreground font-semibold">
                                                        {Math.round((result.score / result.exam.total_marks) * 100)}% Overall Score
                                                    </p>
                                                </div>
                                            ))}
                                            {user.results.length === 0 && (
                                                <div className="text-center py-10 text-muted-foreground animate-in fade-in zoom-in duration-300">
                                                    <Award className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                                    No exam results available yet.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Sidebar / Stats */}
                    <div className="space-y-6">
                        <Card className="bg-primary text-primary-content overflow-hidden relative shadow-lg">
                            <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                            <CardHeader className="relative z-10">
                                <CardTitle className="text-white">Quick Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="relative z-10 space-y-4">
                                <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm transition-transform hover:scale-[1.02]">
                                    <span className="text-white/80 font-medium">Courses</span>
                                    <span className="text-2xl font-bold text-white tabular-nums">{user.enrollments.length}</span>
                                </div>
                                <div className="flex justify-between items-center bg-white/10 p-4 rounded-xl backdrop-blur-sm transition-transform hover:scale-[1.02]">
                                    <span className="text-white/80 font-medium">Attendance Rate</span>
                                    <span className="text-2xl font-bold text-white tabular-nums">
                                        {user.attendances.length > 0
                                            ? Math.round((user.attendances.filter(a => a.status === 'present').length / user.attendances.length) * 100)
                                            : 0}%
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
