import { Head, Link, usePage } from '@inertiajs/react';
import { login, register, dashboard } from '@/routes';

// ─── Reused Navbar ─────────────────────────────────────────────────────────────
function Navbar({ auth }: { auth: any }) {
    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4"
            style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(79,70,229,0.08)',
            }}
        >
            <Link href="/" className="flex items-center gap-2.5">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}
                >
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                    </svg>
                </div>
                <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    EliteCoach
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {[
                    { label: 'Features', href: '/#features' },
                    { label: 'Methodology', href: '/#methodology' },
                    { label: 'About Us', href: '/about' },
                ].map((item) => (
                    <a key={item.label} href={item.href}
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                        {item.label}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-3">
                {auth?.user ? (
                    <Link href={dashboard()}
                        className="h-9 px-5 rounded-lg text-sm font-semibold text-white flex items-center"
                        style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)' }}>
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link href={login()} className="text-sm font-medium text-gray-700 hover:text-indigo-600 px-4 py-2">
                            Sign in
                        </Link>
                        <Link href={register()}
                            className="h-9 px-5 rounded-lg text-sm font-semibold text-white flex items-center"
                            style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)', boxShadow: '0 2px 8px rgba(79,70,229,0.3)' }}>
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-md flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}>
                                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                                </svg>
                            </div>
                            <span className="font-bold text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>EliteCoach</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-500">The premium platform for coaches who demand precision.</p>
                    </div>
                    {[
                        { title: 'Product', links: ['Features', 'Pricing', 'Changelog'] },
                        { title: 'Company', links: ['About', 'Blog', 'Careers'] },
                        { title: 'Legal', links: ['Privacy', 'Terms', 'Help Center'] },
                    ].map((col) => (
                        <div key={col.title}>
                            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">{col.title}</h4>
                            <ul className="space-y-2.5">
                                {col.links.map((l) => (
                                    <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
                    <p className="text-xs text-gray-600">© 2024 EliteCoach Premium. All rights reserved.</p>
                    <p className="text-xs text-gray-600">6 Continents · 5,000+ Coaches</p>
                </div>
            </div>
        </footer>
    );
}

export default function About() {
    const { auth } = usePage().props as any;

    const values = [
        {
            icon: '🤝',
            title: 'Empathy',
            desc: 'Listening deeply to understand the unique challenges and aspirations of every client we serve.',
        },
        {
            icon: '⭐',
            title: 'Excellence',
            desc: 'Striving for the highest standards in everything from our code to our coaching methodology.',
        },
        {
            icon: '💡',
            title: 'Innovation',
            desc: 'Continuously evolving our tools to stay ahead of the changing landscape of global business.',
        },
        {
            icon: '🛡️',
            title: 'Integrity',
            desc: 'Building trust through radical transparency, data security, and ethical mentorship practices.',
        },
    ];

    const team = [
        {
            name: 'Dr. Elena Thorne',
            role: 'Founder & CEO',
            bio: 'Former Chief of Strategy with 15 years experience in executive leadership development.',
            initials: 'ET',
            color: '#4f46e5',
        },
        {
            name: 'Marcus Chen',
            role: 'CTO',
            bio: 'Pioneer in AI-driven matching systems and secure digital communication infrastructure.',
            initials: 'MC',
            color: '#0891b2',
        },
        {
            name: 'Julian Vane',
            role: 'Head of Coach Success',
            bio: 'Specializes in curator excellence and maintaining the elite status of our mentor network.',
            initials: 'JV',
            color: '#7c3aed',
        },
    ];

    return (
        <>
            <Head title="About Us — EliteCoach">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap"
                    rel="stylesheet"
                />
                <meta name="description" content="Learn about EliteCoach — our mission, values, and the team behind the platform." />
            </Head>

            <div className="bg-[#f7f9fb] min-h-screen" style={{ fontFamily: 'Inter, sans-serif' }}>
                <Navbar auth={auth} />

                {/* ── Hero ── */}
                <section
                    className="pt-36 pb-24 px-6 lg:px-16 text-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f7f9fb 80%)' }}
                >
                    <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full opacity-20 pointer-events-none"
                        style={{ background: 'radial-gradient(circle, #a5b4fc 0%, transparent 70%)', filter: 'blur(40px)' }} />

                    <div className="max-w-3xl mx-auto relative z-10">
                        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-4 block">
                            Our Story
                        </span>
                        <h1
                            className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                            style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}
                        >
                            We believe the barrier between potential and success shouldn't be access.
                        </h1>
                        <p className="text-lg text-gray-500 leading-relaxed">
                            EliteCoach connects high-potential talent with industry titans through a precision-engineered digital platform.
                        </p>
                    </div>
                </section>

                {/* ── Story ── */}
                <section className="py-24 px-6 lg:px-16 bg-white">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">
                                A Vision Born from Precision
                            </span>
                            <h2
                                className="text-3xl font-bold text-gray-900 mb-6"
                                style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                            >
                                Built for the Coaches Who Shape the World's Leaders
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                Founded in 2018, EliteCoach began with a simple observation: the world's most successful leaders all had one thing in common—a dedicated mentor. Yet, for most people, this level of guidance was out of reach.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Our founders set out to build more than just a coaching app; they built a global infrastructure for professional evolution—one that pairs elite coaches with high-potential clients through AI-driven precision.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: '2018', label: 'Founded' },
                                { value: '5,000+', label: 'Active Coaches' },
                                { value: '6', label: 'Continents' },
                                { value: '50K+', label: 'Sessions Completed' },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-2xl p-8"
                                    style={{ background: '#f7f9fb' }}
                                >
                                    <div
                                        className="text-3xl font-bold text-indigo-600 mb-1"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {s.value}
                                    </div>
                                    <div className="text-sm text-gray-500">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Scale ── */}
                <section className="py-24 px-6 lg:px-16" style={{ background: '#f7f9fb' }}>
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        {/* Visual */}
                        <div
                            className="rounded-3xl p-12 text-center"
                            style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)' }}
                        >
                            <div className="text-6xl font-bold text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                6
                            </div>
                            <div className="text-indigo-300 text-lg mb-8">Continents Served</div>
                            <div className="grid grid-cols-3 gap-3">
                                {['Americas', 'Europe', 'Asia', 'Africa', 'Oceania', 'MENA'].map((c) => (
                                    <div key={c} className="rounded-xl py-2 px-3 text-xs text-indigo-200 font-medium"
                                        style={{ background: 'rgba(255,255,255,0.1)' }}>
                                        {c}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">
                                Global Reach
                            </span>
                            <h2
                                className="text-3xl font-bold text-gray-900 mb-6"
                                style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                            >
                                Scaling Human Potential Across the Globe
                            </h2>
                            <p className="text-gray-500 leading-relaxed mb-6">
                                Today, EliteCoach serves thousands of individuals across six continents. Our proprietary matching algorithm paired with rigorous human vetting ensures that every connection is a catalyst for growth.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Every session is backed by our commitment to excellence—from the technology that powers our platform to the standards we hold our coaches to.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ── Values ── */}
                <section className="py-24 px-6 lg:px-16 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">Core Values</span>
                            <h2
                                className="text-3xl font-bold text-gray-900"
                                style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                            >
                                What We Stand For
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map((v) => (
                                <div
                                    key={v.title}
                                    className="rounded-2xl p-8 group hover:shadow-lg transition-all"
                                    style={{ background: '#f7f9fb', boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
                                >
                                    <div className="text-3xl mb-5">{v.icon}</div>
                                    <h3
                                        className="text-lg font-semibold text-gray-900 mb-3"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {v.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Team ── */}
                <section className="py-24 px-6 lg:px-16" style={{ background: '#f7f9fb' }}>
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-600 mb-3 block">Meet the Team</span>
                            <h2
                                className="text-3xl font-bold text-gray-900 mb-3"
                                style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.01em' }}
                            >
                                The Team Dedicated to Your Professional Peak Performance
                            </h2>
                        </div>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {team.map((member) => (
                                <div
                                    key={member.name}
                                    className="rounded-2xl p-8 group hover:shadow-md transition-all"
                                    style={{ background: '#ffffff', boxShadow: '0 0 0 1px rgba(0,0,0,0.06)' }}
                                >
                                    {/* Avatar */}
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-6 transition-transform group-hover:scale-105"
                                        style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}cc)` }}
                                    >
                                        {member.initials}
                                    </div>
                                    <h4
                                        className="text-lg font-semibold text-gray-900 mb-1"
                                        style={{ fontFamily: 'Manrope, sans-serif' }}
                                    >
                                        {member.name}
                                    </h4>
                                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-4">
                                        {member.role}
                                    </p>
                                    <p className="text-sm text-gray-500 leading-relaxed">{member.bio}</p>
                                </div>
                            ))}
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
                            Ready to Join the Elite?
                        </h2>
                        <p className="text-indigo-300 mb-10">
                            Start your journey with EliteCoach today. Free for 14 days.
                        </p>
                        <Link
                            href={register()}
                            className="h-12 px-8 rounded-xl text-base font-semibold text-indigo-700 bg-white inline-flex items-center gap-2 hover:bg-indigo-50 transition-colors"
                        >
                            Get Started Free
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
