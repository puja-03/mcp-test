import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, BookOpen, CreditCard, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Stat = {
    total_tenants: number;
    total_users: number;
    total_courses: number;
    total_payments: number;
    recent_tenants: any[];
    recent_payments: any[];
};

export default function Dashboard({ stats }: { stats: Stat }) {
    return (
        <AppLayout>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Overview of your coaching SaaS platform.</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
                            <Building2 className="h-4 w-4 text-indigo-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_tenants}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500 font-medium flex items-center gap-1">
                                    Active institutions
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                            <Users className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_users}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500 font-medium flex items-center gap-1">
                                    Platform-wide users
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500/10 to-transparent border-purple-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                            <BookOpen className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_courses}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500 font-medium flex items-center gap-1">
                                    Across all tenants
                                </span>
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <CreditCard className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${stats.total_payments.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground mt-1">
                                <span className="text-emerald-500 font-medium flex items-center gap-1">
                                    All-time collection
                                </span>
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-4">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Payments</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">Latest transactions across the platform.</p>
                                </div>
                                <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_payments.length > 0 ? (
                                    stats.recent_payments.map((payment) => (
                                        <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                                    <TrendingUp className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{payment.user?.name || 'Unknown User'}</p>
                                                    <p className="text-xs text-muted-foreground">{payment.enrollment?.course?.name || 'Course Payment'}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-emerald-600">${payment.amount}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(payment.created_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">No recent payments found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-3">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle>Recent Tenants</CardTitle>
                                    <p className="text-sm text-muted-foreground mt-1">Newly joined coaching centers.</p>
                                </div>
                                <Building2 className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {stats.recent_tenants.length > 0 ? (
                                    stats.recent_tenants.map((tenant) => (
                                        <div key={tenant.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/30 transition-all">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 font-bold">
                                                    {tenant.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{tenant.name}</p>
                                                    <p className="text-xs text-muted-foreground">{tenant.domain}</p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary" className="bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border-transparent">
                                                Active
                                            </Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm text-muted-foreground text-center py-8">No recent tenants found.</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
