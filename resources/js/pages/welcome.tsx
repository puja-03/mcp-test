import { Head, Link, usePage } from '@inertiajs/react';
import { about, login, register, dashboard } from '@/routes';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

// ─── Welcome / Home page ───────────────────────────────────────────────────────
export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    const { auth } = usePage().props as any;

    return (
        <>
            <Head title="EliteCoach — Empower Your Expertise">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <meta name="description" content="EliteCoach — the all-in-one platform for elite coaches who demand precision. Manage schedules, automate payments, and gain AI-driven insights." />
            </Head>

            <div className="bg-[#f7f9fb] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
                <SiteHeader />

                {/* ── Hero ── */}
                <section
                    className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24 pb-20 relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f7f9fb 60%)' }}
                >
                    {/* Background blobs */}
                    <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-25 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', filter: 'blur(40px)' }} />
                    <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full opacity-20 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(40px)' }} />

                    <div className="relative z-10 max-w-4xl mx-auto">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 mb-8">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            Trusted by 5,000+ Coaches Worldwide · +124% Avg. ROI
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-5xl lg:text-7xl font-bold text-gray-900 leading-none tracking-tight mb-6"
                            style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}
                        >
                            Empower Your Expertise.
                            <span
                                className="block mt-2"
                                style={{ background: 'linear-gradient(135deg, #4f46e5, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                            >
                                Scale Your Coaching Business.
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
                            The all-in-one platform for elite coaches who demand precision. Manage schedules, automate payments, and gain AI-driven client insights in a single premium environment.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={register()}
                                className="h-12 px-8 rounded-xl text-base font-semibold text-white inline-flex items-center gap-2 transition-transform hover:scale-105"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                    boxShadow: '0 8px 24px rgba(79,70,229,0.35)',
                                }}
                            >
                                Start Free Today
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <a
                                href="#features"
                                className="h-12 px-8 rounded-xl text-base font-semibold text-gray-700 bg-white border border-gray-200 inline-flex items-center gap-2 hover:border-indigo-200 hover:text-indigo-600 transition-all"
                            >
                                See How It Works
                            </a>
                        </div>

                        {/* Social proof */}
                        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-gray-400">
                            {['No credit card required', 'Free 14-day trial', 'Cancel anytime'].map((t, i) => (
                                <span key={t} className="flex items-center gap-1.5">
                                    {i > 0 && <span className="w-1 h-1 rounded-full bg-gray-300" />}
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2.5">
                                        <path d="M20 6L9 17l-5-5" />
                                    </svg>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section id="features" className="py-24 px-6 lg:px-16" style={{ background: '#ffffff' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">Precision Tools</span>
                            <h2
                                className="text-4xl font-bold text-gray-900 mb-4"
                                style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                            >
                                Precision Tools for Precision Coaching
                            </h2>
                            <p className="text-gray-500 max-w-xl mx-auto">
                                EliteCoach provides the infrastructure you need to focus on what matters most: your clients' transformation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    ),
                                    title: 'Intelligent Scheduling',
                                    desc: 'Intelligent booking systems that sync across all your calendars, automatically adjusting for time zones and buffer periods between high-stakes sessions.',
                                    color: '#eef2ff',
                                    stroke: '#4f46e5',
                                },
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                            <line x1="1" y1="10" x2="23" y2="10" />
                                        </svg>
                                    ),
                                    title: 'Automated Payments',
                                    desc: 'Secure, global transaction handling with automated invoicing and recurring subscription models designed for high-ticket coaching programs.',
                                    color: '#f0fdf4',
                                    stroke: '#16a34a',
                                },
                                {
                                    icon: (
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M8 12h8M12 8l4 4-4 4" />
                                        </svg>
                                    ),
                                    title: 'AI Insights',
                                    desc: 'Analyze client progress patterns and sentiment using advanced AI. Anticipate needs and deliver proactive coaching that ensures retention.',
                                    color: '#fdf4ff',
                                    stroke: '#9333ea',
                                },
                            ].map((feat) => (
                                <div
                                    key={feat.title}
                                    className="rounded-2xl p-8 border border-transparent hover:border-indigo-100 transition-all group"
                                    style={{ background: '#f7f9fb', boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
                                >
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                                        style={{ background: feat.color, color: feat.stroke }}
                                    >
                                        {feat.icon}
                                    </div>
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-3"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {feat.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Methodology ── */}
                <section id="methodology" className="py-24 px-6 lg:px-16" style={{ background: '#f7f9fb' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">Our Methodology</span>
                                <h2
                                    className="text-4xl font-bold text-gray-900 mb-6"
                                    style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                                >
                                    Ready to Elevate Your Practice?
                                </h2>
                                <p className="text-gray-500 leading-relaxed mb-8">
                                    Join thousands of top-tier coaches who have optimized their workflow and doubled their capacity with EliteCoach. Our platform is engineered for the elite.
                                </p>

                                <div className="space-y-5">
                                    {[
                                        { step: '01', title: 'Onboard in Minutes', desc: 'Set up your coaching profile, availability, and payment details in under 10 minutes.' },
                                        { step: '02', title: 'Connect With Clients', desc: 'Intelligent matching surfaces the right clients for your expertise and schedule.' },
                                        { step: '03', title: 'Grow With Data', desc: 'AI-powered analytics give you the insights to retain and grow your client base.' },
                                    ].map((step) => (
                                        <div key={step.step} className="flex gap-4">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-indigo-600"
                                                style={{ background: '#eef2ff' }}
                                            >
                                                {step.step}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                                    {step.title}
                                                </h4>
                                                <p className="text-sm text-gray-500">{step.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={register()}
                                    className="mt-10 inline-flex h-11 items-center gap-2 px-7 rounded-xl text-sm font-semibold text-white"
                                    style={{
                                        background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                        boxShadow: '0 4px 14px rgba(79,70,229,0.3)',
                                    }}
                                >
                                    Get Started Free
                                </Link>
                            </div>

                            {/* Stats card grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { value: '5,000+', label: 'Elite Coaches', bg: '#4f46e5', text: '#fff' },
                                    { value: '+124%', label: 'Average Client ROI', bg: '#eef2ff', text: '#4f46e5' },
                                    { value: '6', label: 'Continents Served', bg: '#eef2ff', text: '#4f46e5' },
                                    { value: '98%', label: 'Satisfaction Rate', bg: '#4f46e5', text: '#fff' },
                                ].map((s) => (
                                    <div
                                        key={s.label}
                                        className="rounded-2xl p-8 flex flex-col justify-between"
                                        style={{ background: s.bg }}
                                    >
                                        <div
                                            className="text-3xl font-bold mb-2"
                                            style={{ fontFamily: 'Manrope, sans-serif', color: s.text }}
                                        >
                                            {s.value}
                                        </div>
                                        <div className="text-sm font-medium" style={{ color: s.text, opacity: 0.75 }}>
                                            {s.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CTA ── */}
                <section
                    className="py-24 px-6 text-center"
                    style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)' }}
                >
                    <div className="max-w-2xl mx-auto">
                        <h2
                            className="text-4xl font-bold text-white mb-4"
                            style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                        >
                            Start Your Elite Coaching Journey
                        </h2>
                        <p className="text-indigo-300 mb-10">
                            No contracts. No hidden fees. Cancel anytime. Start free for 14 days.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href={register()}
                                className="h-12 px-8 rounded-xl text-base font-semibold text-indigo-700 bg-white inline-flex items-center gap-2 hover:bg-indigo-50 transition-colors"
                            >
                                Get Started Free
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <Link
                                href="/about"
                                className="h-12 px-8 rounded-xl text-base font-semibold text-white border border-indigo-400 inline-flex items-center hover:bg-white/10 transition-colors"
                            >
                                Learn About Us
                            </Link>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}
