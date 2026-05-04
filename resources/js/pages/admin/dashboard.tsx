import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Head, usePage } from '@inertiajs/react';
import { 
    Users, 
    Building2, 
    BookOpen, 
    CreditCard, 
    TrendingUp, 
    ArrowUpRight,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type Stat = {
    total_tenants: number;
    total_users: number;
    total_courses: number;
    total_payments: number;
    recent_tenants: any[];
    recent_payments: any[];
};

export default function Dashboard({ stats }: { stats: Stat }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    return (
        <div className="w-full flex-1 p-6 lg:p-10">
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
                                <div 
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors group-hover:text-white"
                                    style={{ 
                                        backgroundColor: s.color === 'indigo' ? `${primaryColor}15` : (s.color === 'blue' ? '#eff6ff' : (s.color === 'purple' ? '#faf5ff' : '#ecfdf5')),
                                        color: s.color === 'indigo' ? primaryColor : (s.color === 'blue' ? '#2563eb' : (s.color === 'purple' ? '#9333ea' : '#059669')),
                                    }}
                                    onMouseEnter={(e) => {
                                        if (s.color === 'indigo') e.currentTarget.style.backgroundColor = primaryColor;
                                    }}
                                    onMouseLeave={(e) => {
                                        if (s.color === 'indigo') e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                                    }}
                                >
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
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="font-bold text-xs px-4 transition-colors"
                                style={{ color: primaryColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primaryColor}15`)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                            >
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
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                className="font-bold text-xs px-4 transition-colors"
                                style={{ color: primaryColor }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${primaryColor}15`)}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                            >
                                Manage
                            </Button>
                        </div>
                        <div className="p-4 flex-1">
                            {stats.recent_tenants.length > 0 ? (
                                <div className="space-y-2">
                                    {stats.recent_tenants.map((tenant) => (
                                        <div 
                                            key={tenant.id} 
                                            className="group flex items-center justify-between p-4 rounded-2xl border border-gray-50 transition-all"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `${primaryColor}05`;
                                                e.currentTarget.style.borderColor = `${primaryColor}20`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '';
                                                e.currentTarget.style.borderColor = '';
                                            }}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div 
                                                    className="h-12 w-12 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-inner group-hover:text-white transition-colors"
                                                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = primaryColor)}
                                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${primaryColor}15`)}
                                                >
                                                    {tenant.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{tenant.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tenant.domain}</p>
                                                </div>
                                            </div>
                                            <Badge 
                                                className="border-none px-3 py-1 text-[10px] font-bold transition-colors"
                                                style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                                            >
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
    );
}
