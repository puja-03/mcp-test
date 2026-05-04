import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function SiteHeader() {
    const { auth } = usePage().props as any;

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
                <span
                    className="font-bold text-lg text-gray-900"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    EliteCoach
                </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
                {[
                    { label: 'Features', href: '/#features' },
                    { label: 'Methodology', href: '/#methodology' },
                    { label: 'Pricing', href: '/#pricing' },
                    { label: 'About', href: '/about' },
                ].map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </div>

            <div className="flex items-center gap-3">
                {auth?.user ? (
                    <Link
                        href={dashboard()}
                        className="h-9 px-5 rounded-lg text-sm font-semibold text-white flex items-center"
                        style={{ background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)' }}
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={login()}
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors px-4 py-2"
                        >
                            Sign in
                        </Link>
                        <Link
                            href={register()}
                            className="h-9 px-5 rounded-lg text-sm font-semibold text-white flex items-center"
                            style={{
                                background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                boxShadow: '0 2px 8px rgba(79,70,229,0.3)',
                            }}
                        >
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
