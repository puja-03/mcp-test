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

                <div className="w-full max-w-md relative z-10 lg:mt-12">
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
                </div>
            </main>

            <SiteFooter />
        </div>
    );
}
