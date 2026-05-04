import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Head } from '@inertiajs/react';
import { 
    Users, 
    Building2, 
    BookOpen, 
    CreditCard, 
    TrendingUp, 
    ShieldCheck, 
    Zap,
    ArrowUpRight,
    Search
} from 'lucide-react';

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
        <AppEliteCoachLayout title="Admin Command Center">
            <Head title="Admin Dashboard" />

            {/* Premium Admin Hero */}
            <div
                className="px-6 lg:px-12 py-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' }}
            >
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-indigo-500 hover:bg-indigo-600 text-white border-none px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                                    System Administrator
                                </Badge>
                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                                    <ShieldCheck size={12} className="text-indigo-400" />
                                    Security Status: Optimal
                                </span>
                            </div>
                            <h1
                                className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight"
                                style={{ fontFamily: 'Manrope, sans-serif' }}
                            >
                                Platform Overview
                            </h1>
                            <p className="text-slate-400 text-lg font-medium opacity-90 max-w-xl leading-relaxed">
                                EliteCoach SaaS performance and multi-tenant ecosystem management.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button className="bg-white/10 hover:bg-white/20 text-white border-white/10 backdrop-blur-md h-11 px-6 rounded-xl font-bold text-sm">
                                System Logs
                            </Button>
                            <Button 
                                className="h-11 px-6 rounded-xl font-bold text-white shadow-lg shadow-indigo-900/40"
                                style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)' }}
                            >
                                <Zap size={16} className="mr-2 fill-current" />
                                Run Analytics
                            </Button>
                        </div>
                    </div>
                </div>
                
                {/* Visual decoration */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
            </div>

            {/* Main Stats Grid */}
            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 -mt-8 flex-1">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
                    {[
                        { 
                            label: 'Total Tenants', 
                            value: stats.total_tenants, 
                            icon: Building2, 
                            color: 'indigo',
                            desc: 'Multi-tenant centers' 
                        },
                        { 
                            label: 'Total Users', 
                            value: stats.total_users.toLocaleString(), 
                            icon: Users, 
                            color: 'blue',
                            desc: 'Platform reach' 
                        },
                        { 
                            label: 'Total Courses', 
                            value: stats.total_courses, 
                            icon: BookOpen, 
                            color: 'purple',
                            desc: 'Educational assets' 
                        },
                        { 
                            label: 'Total Revenue', 
                            value: `$${stats.total_payments.toLocaleString()}`, 
                            icon: CreditCard, 
                            color: 'emerald',
                            desc: 'Gross collections' 
                        }
                    ].map((s) => (
                        <div
                            key={s.label}
                            className="group relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${s.color}-50 text-${s.color}-600 transition-colors group-hover:bg-${s.color}-600 group-hover:text-white`}>
                                    <s.icon size={24} />
                                </div>
                                <ArrowUpRight className="text-gray-300 group-hover:text-gray-400 transition-colors" size={20} />
                            </div>
                            <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest mb-1">{s.label}</h3>
                            <div className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {s.value}
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mt-2 flex items-center gap-1">
                                <span className="text-emerald-500 uppercase tracking-tighter">● Online</span>
                                {s.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Recent Payments Section */}
                    <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    Global Revenue Feed
                                </h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Real-time payment audit</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-indigo-600 font-bold text-xs hover:bg-indigo-50 px-4">
                                View Ledger
                            </Button>
                        </div>
                        <div className="p-4 flex-1">
                            {stats.recent_payments.length > 0 ? (
                                <div className="space-y-2">
                                    {stats.recent_payments.map((payment) => (
                                        <div key={payment.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                                    <TrendingUp className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{payment.user?.name || 'External User'}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                        {payment.enrollment?.course?.name || 'General Transaction'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-extrabold text-slate-900">${payment.amount}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                    {new Date(payment.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 font-medium italic">No transaction records found in the current cycle.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Tenants Section */}
                    <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                    New Institutions
                                </h3>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Tenant Acquisition</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-indigo-600 font-bold text-xs hover:bg-indigo-50 px-4">
                                Manage
                            </Button>
                        </div>
                        <div className="p-4 flex-1">
                            {stats.recent_tenants.length > 0 ? (
                                <div className="space-y-2">
                                    {stats.recent_tenants.map((tenant) => (
                                        <div key={tenant.id} className="group flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:bg-indigo-50/30 hover:border-indigo-100 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-extrabold text-xl shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                    {tenant.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{tenant.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tenant.domain}</p>
                                                </div>
                                            </div>
                                            <Badge className="bg-indigo-50 text-indigo-600 border-none px-3 py-1 text-[10px] font-bold group-hover:bg-white transition-colors">
                                                Active
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-20 text-center">
                                    <p className="text-gray-400 font-medium italic">No new tenants recorded recently.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}

