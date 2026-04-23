import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Layers, GraduationCap, ArrowRight, TrendingUp, Calendar, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TenantDashboard({ tenant, user, stats }: { tenant: any; user: any; stats: any }) {
    const statItems = [
        { title: 'Total Students', value: stats.students_count, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10', trend: '+12%' },
        { title: 'Active Courses', value: stats.courses_count, icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-500/10', trend: '+2' },
        { title: 'Current Batches', value: stats.batches_count, icon: Layers, color: 'text-violet-500', bg: 'bg-violet-500/10', trend: '+5' },
        { title: 'New Enrollments', value: stats.enrollments_count, icon: GraduationCap, color: 'text-amber-500', bg: 'bg-amber-500/10', trend: '+18%' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-foreground">{tenant?.name}</h1>
                        <p className="text-muted-foreground font-medium mt-1">
                            Welcome back, <span className="text-primary font-bold">{user?.name}</span>. Here's what's happening at your branch today.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="icon" className="rounded-full h-10 w-10 border-muted-foreground/20">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button className="gap-2 shadow-lg shadow-primary/20 font-bold uppercase tracking-widest text-[11px] h-11 px-6">
                            <Calendar className="h-4 w-4" /> Schedule Batch
                        </Button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {statItems.map((item, index) => (
                        <Card key={index} className="overflow-hidden border-none shadow-xl bg-card hover:shadow-2xl transition-all duration-300 group cursor-default">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{item.title}</CardTitle>
                                <div className={`p-2.5 rounded-xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                    <item.icon className="h-5 w-5" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black tracking-tighter">{item.value}</div>
                                <div className="flex items-center gap-1.5 mt-2">
                                    <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-[11px] font-bold text-emerald-500 tracking-wider">{item.trend}</span>
                                    <span className="text-[11px] text-muted-foreground font-medium">vs last month</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-12">
                    {/* Welcome Card */}
                    <Card className="lg:col-span-8 border-none shadow-xl overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 group-hover:opacity-80 transition-opacity" />
                        <CardHeader className="relative">
                            <CardTitle className="text-2xl font-black">Center Overview</CardTitle>
                            <CardDescription className="text-base font-medium">Manage your academic infrastructure and operations efficiently.</CardDescription>
                        </CardHeader>
                        <CardContent className="relative space-y-6 pt-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Link href="/tenant/courses" className="flex items-center justify-between p-5 rounded-2xl bg-muted/40 hover:bg-primary/10 hover:ring-1 hover:ring-primary/40 transition-all group/item">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center shadow-sm border border-muted-foreground/10">
                                            <BookOpen className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">Course Catalog</h3>
                                            <p className="text-xs text-muted-foreground font-medium">Manage syllabus & fees</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                </Link>
                                <Link href="/tenant/instructors" className="flex items-center justify-between p-5 rounded-2xl bg-muted/40 hover:bg-primary/10 hover:ring-1 hover:ring-primary/40 transition-all group/item">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center shadow-sm border border-muted-foreground/10">
                                            <Users className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">Faculty Team</h3>
                                            <p className="text-xs text-muted-foreground font-medium">Manage instructors</p>
                                        </div>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover/item:text-primary transition-colors" />
                                </Link>
                            </div>
                            
                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">System Information</h4>
                                <div className="flex flex-wrap gap-x-8 gap-y-4">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Current Branch</span>
                                        <span className="text-sm font-bold">{tenant?.name}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Domain Endpoint</span>
                                        <span className="text-sm font-bold text-primary underline underline-offset-4">{tenant?.domain}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-tighter">Access Level</span>
                                        <span className="text-sm font-black uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5 rounded text-[10px]">
                                            {user?.role?.name || 'Administrator'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions / Recent Activity */}
                    <Card className="lg:col-span-4 border-none shadow-xl bg-card">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Live Pulse</CardTitle>
                            <CardDescription className="text-xs font-medium uppercase tracking-widest">Real-time updates</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 items-start pb-4 border-b border-muted last:border-0 last:pb-0">
                                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 animate-pulse" />
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold leading-none">New Enrollment Received</p>
                                        <p className="text-xs text-muted-foreground font-medium italic">Student "Aman Gupta" joined Course: "Full Stack Web Development"</p>
                                        <p className="text-[10px] text-muted-foreground/60 font-black uppercase tracking-tighter pt-1">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                            <Button variant="ghost" className="w-full font-black uppercase tracking-widest text-[10px] h-10 hover:bg-primary/5 hover:text-primary">
                                View Full Audit Log
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

TenantDashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: '/tenant/dashboard',
        },
    ],
};
