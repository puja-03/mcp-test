import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Head } from '@inertiajs/react';
import { LayoutGrid, TrendingUp, Users, Zap } from 'lucide-react';

export default function Dashboard() {
    return (
        <AppEliteCoachLayout title="EliteCoach Dashboard">
            <Head title="Dashboard" />
            
            {/* Welcome Hero */}
            <div
                className="px-6 lg:px-12 py-12 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
            >
                <div className="max-w-[1600px] mx-auto relative z-10">
                    <h1
                        className="text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                        Welcome to EliteCoach
                    </h1>
                    <p className="text-indigo-100 text-lg font-medium opacity-90 max-w-xl leading-relaxed">
                        Your central hub for professional coaching and advanced learning management.
                    </p>
                </div>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-10 -mt-8 flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {[
                        { label: 'Active Sessions', value: '12', icon: Zap, color: 'indigo' },
                        { label: 'New Members', value: '48', icon: Users, color: 'emerald' },
                        { label: 'Growth Rate', value: '+24%', icon: TrendingUp, color: 'blue' },
                    ].map((s) => (
                        <div key={s.label} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-10 h-10 rounded-xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center`}>
                                    <s.icon size={20} />
                                </div>
                                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">{s.label}</span>
                            </div>
                            <div className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {s.value}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
                    <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-6">
                        <LayoutGrid size={32} />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Dashboard Initialized
                    </h3>
                    <p className="text-gray-500 font-medium max-w-md mx-auto">
                        We're preparing your personalized analytics and modules. Check back soon for the full experience.
                    </p>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}
