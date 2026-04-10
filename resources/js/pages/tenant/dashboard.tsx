import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, Layers, GraduationCap } from 'lucide-react';

export default function TenantDashboard({ tenant, user, stats }: { tenant: any; user: any; stats: any }) {
    const statItems = [
        { title: 'Students', value: stats.students_count, icon: Users, color: 'text-blue-600' },
        { title: 'Courses', value: stats.courses_count, icon: BookOpen, color: 'text-green-600' },
        { title: 'Batches', value: stats.batches_count, icon: Layers, color: 'text-purple-600' },
        { title: 'Enrollments', value: stats.enrollments_count, icon: GraduationCap, color: 'text-orange-600' },
    ];

    return (
        <>
            <Head title="Tenant Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{tenant?.name}</h1>
                        <p className="text-muted-foreground">Welcome back, {user?.name}. Here's an overview of your coaching center.</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-md bg-gradient-to-br from-background to-muted/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                <item.icon className={`h-4 w-4 ${item.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{item.value}</div>
                                <p className="text-xs text-muted-foreground">Total records in system</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-4 border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Welcome to your LMS</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                You are now managing **{tenant?.name}**. Use the sidebar to navigate through courses, batches, and student enrollments. 
                                You can also manage your branch users, mark attendance, and publish exam results.
                            </p>
                            <div className="bg-muted/50 rounded-lg p-4 text-xs font-mono">
                                Domain: <span className="text-blue-500 underline">{tenant?.domain}</span><br />
                                Role: <span className="text-purple-500 font-bold uppercase tracking-wider">{user?.role?.name || user?.role}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="lg:col-span-3 border-none shadow-md bg-primary/5">
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-sm text-muted-foreground italic">
                                Activity tracking will appear here soon...
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}
