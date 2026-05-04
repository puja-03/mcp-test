import { Link } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthEliteCoachLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fcf8ff] p-6 lg:p-12 font-sans relative overflow-hidden selection:bg-indigo-100 selection:text-indigo-700">
            {/* Soft decorative blobs for depth */}
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-indigo-50/50 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[35vw] h-[35vw] rounded-full bg-indigo-50/30 blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-white/20 blur-[150px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Branding */}
                <div className="mb-10 text-center">
                    <Link href={home()} className="inline-flex flex-col items-center gap-4 group">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-xl shadow-indigo-100/50"
                            style={{ background: 'linear-gradient(135deg, #4f46e5, #3525cd)' }}>
                            <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="drop-shadow-sm">
                                <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                            </svg>
                        </div>
                        <span className="text-slate-900 font-extrabold text-3xl tracking-tighter" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            EliteCoach
                        </span>
                    </Link>
                </div>

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

                {/* Footer / Trust Badge */}
                <div className="mt-12 flex flex-col items-center gap-8">
                    <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest shadow-sm">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-500">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Secure Workspace Access
                    </div>
                    
                    <div className="flex items-center gap-8 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <a href="#" className="hover:text-indigo-600 transition-colors">Terms</a>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
