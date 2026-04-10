import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

export default function InstructorDashboard({ stats }: { stats: any }) {
    const statItems = [
        { title: 'My Courses', value: stats.courses, icon: BookOpen, color: 'text-blue-600' },
        { title: 'Active Students', value: stats.students, icon: Users, color: 'text-green-600' },
    ];

    return (
        <>
            <Head title="Instructor Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
                        <p className="text-muted-foreground">Welcome back! Here's what's happening in your courses today.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {statItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-md bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                                <p className="text-xs text-muted-foreground italic">Total assigned records</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-7">
                    <Card className="md:col-span-4 border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Teaching Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                You are currently managing <strong>{stats.courses}</strong> courses. 
                                You can manage your curriculum, add chapters, and upload video topics for each course.
                            </p>
                            <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> Latest Sessions</div>
                                <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Upcoming Tasks</div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="md:col-span-3 border-none shadow-md bg-blue-50/50">
                        <CardHeader>
                            <CardTitle>Assistant Info</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground leading-relaxed">
                                Use the sidebar to access 'My Courses' for building curriculum. Student attendance and results can be updated once sessions are scheduled.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
