import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';

export default function AuthEliteCoachLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';

    return (
        <div 
            className="min-h-screen flex flex-col font-sans selection:text-white"
            style={{ 
                backgroundColor: `${primaryColor}05`,
                '--selection-bg': primaryColor 
            } as React.CSSProperties}
        >
            <style dangerouslySetInnerHTML={{ __html: `::selection { background-color: ${primaryColor}; }` }} />
            <SiteHeader />

            <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden pt-40 pb-28">
                {/* Soft decorative blobs for depth */}
                <div 
                    className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full blur-[120px] pointer-events-none opacity-20" 
                    style={{ backgroundColor: primaryColor }}
                />
                <div 
                    className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full blur-[100px] pointer-events-none opacity-10" 
                    style={{ backgroundColor: primaryColor }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-white/20 blur-[150px] pointer-events-none" />

                <div className="w-full max-w-md relative z-10 mt-12">
                    {/* Auth Card */}
                    <div className="bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-[0_30px_60px_-15px_rgba(79,70,229,0.1)] border border-white/60 backdrop-blur-sm relative">
                        {/* Header info inside card */}
                        {(title || description) && (
                            <div className="mb-10 text-center">
                                {title && (
                                    <h1 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                                        {title}
                                    </h1>
                                )}
                                {description && (
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed">{description}</p>
                                )}
                            </div>
                        )}

                        {children}
                    </div>

                    {/* Trust Badge / Sub-footer info */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: primaryColor }}>
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Secure Workspace Access
                        </div>
                    </div>
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
