import { Head, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Clock, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StudentDashboard({ stats }: { stats: any }) {
    return (
        <>
            <Head title="Learning Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Ready to continue your learning journey?</p>
                    </div>
                    <Button onClick={() => router.visit('/student/courses')} className="gap-2">
                        <BookOpen className="w-4 h-4" /> Browse My Courses
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="overflow-hidden border-none shadow-md bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                            <GraduationCap className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.enrolled_courses}</div>
                            <p className="text-xs text-muted-foreground">Active enrollments</p>
                        </CardContent>
                    </Card>

                    <Card className="md:col-span-2 border-none shadow-md bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <PlayCircle className="w-5 h-5 text-primary" /> Continue Watching
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground italic">
                                Your last watched topics will appear here. Pick up right where you left off.
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Announcements</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>No new announcements from your instructors at this time.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Upcoming Exams</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>You have no scheduled exams in the next 7 days.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
