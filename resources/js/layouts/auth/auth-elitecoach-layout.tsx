import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthEliteCoachLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row font-sans">
            {/* Left Panel — EliteCoach branding */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 75%, #4f46e5 100%)' }}>

                {/* Glassmorphic blob decorations */}
                <div className="absolute top-[-80px] right-[-80px] w-80 h-80 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)' }} />
                <div className="absolute bottom-[-60px] left-[-60px] w-64 h-64 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, #c7d2fe 0%, transparent 70%)' }} />
                <div className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full opacity-10"
                    style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)' }} />

                {/* Logo */}
                <Link href={home()} className="relative z-10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                        </svg>
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        EliteCoach
                    </span>
                </Link>

                {/* Hero copy */}
                <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-200 uppercase tracking-widest"
                        style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
                        Trusted by 5,000+ Coaches Worldwide
                    </div>
                    <h2 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                        Empower Your Expertise.
                        <span className="block text-indigo-300">Scale Your Business.</span>
                    </h2>
                    <p className="text-indigo-200 text-base leading-relaxed max-w-sm">
                        The all-in-one platform for elite coaches who demand precision. Manage schedules, automate payments, and gain AI-driven client insights.
                    </p>

                    {/* Feature list */}
                    <div className="space-y-3 pt-2">
                        {[
                            { icon: '📅', label: 'Intelligent Scheduling' },
                            { icon: '💳', label: 'Automated Payments' },
                            { icon: '🤖', label: 'AI-Powered Insights' },
                        ].map((f) => (
                            <div key={f.label} className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                                    style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }}>
                                    {f.icon}
                                </span>
                                <span className="text-indigo-100 text-sm font-medium">{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stat badges */}
                <div className="relative z-10 flex gap-4">
                    {[
                        { value: '5,000+', label: 'Elite Coaches' },
                        { value: '+124%', label: 'Avg. ROI' },
                        { value: '6', label: 'Continents' },
                    ].map((s) => (
                        <div key={s.label} className="flex-1 rounded-xl p-4 text-center"
                            style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                            <div className="text-xl font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{s.value}</div>
                            <div className="text-xs text-indigo-300 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Panel — Auth form */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 lg:px-16 bg-white">
                {/* Mobile logo */}
                <div className="lg:hidden mb-8 text-center">
                    <Link href={home()} className="inline-flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                            </svg>
                        </div>
                        <span className="font-bold text-xl text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>EliteCoach</span>
                    </Link>
                </div>

                <div className="w-full max-w-md">
                    {title && (
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                {title}
                            </h1>
                            {description && (
                                <p className="text-gray-500 text-sm">{description}</p>
                            )}
                        </div>
                    )}
                    {children}

                    {/* Footer trust badge */}
                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Secure & Encrypted · Privacy Policy · Terms
                    </div>
                </div>
            </div>
        </div>
    );
}
