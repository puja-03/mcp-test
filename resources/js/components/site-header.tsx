import { Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';

export default function SiteHeader() {
    const { auth, branding } = usePage().props as any;

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-16 py-4"
            style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(16px)',
                borderBottom: `1px solid ${branding?.primary_color || '#4f46e5'}15`,
            }}
        >
            <Link href="/" className="flex items-center gap-2.5">
                {branding?.logo_url ? (
                    <img src={branding.logo_url} alt={branding.name} className="h-8 w-auto rounded-lg" />
                ) : (
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `linear-gradient(135deg, ${branding?.primary_color || '#4f46e5'}, ${branding?.primary_color || '#4338ca'}dd)` }}
                    >
                        <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                        </svg>
                    </div>
                )}
                <span
                    className="font-bold text-lg text-gray-900"
                    style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                    {branding?.name || 'EliteCoach'}
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
                            className="text-sm font-medium text-gray-600 transition-colors"
                            style={{ '--hover-color': branding?.primary_color || '#4f46e5' } as React.CSSProperties}
                            onMouseEnter={(e) => (e.currentTarget.style.color = branding?.primary_color || '#4f46e5')}
                            onMouseLeave={(e) => (e.currentTarget.style.color = '')}
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
                            style={{ background: branding?.primary_color || '#4f46e5' }}
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="text-sm font-medium text-gray-700 transition-colors px-4 py-2"
                                onMouseEnter={(e) => (e.currentTarget.style.color = branding?.primary_color || '#4f46e5')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                            >
                                Sign in
                            </Link>
                            <Link
                                href={register()}
                                className="h-9 px-5 rounded-lg text-sm font-semibold text-white flex items-center"
                                style={{
                                    background: branding?.primary_color || '#4f46e5',
                                    boxShadow: `0 2px 8px ${branding?.primary_color || '#4f46e5'}4d`,
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
