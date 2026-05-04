import { home } from '@/routes';
import { Link } from '@inertiajs/react';

export default function AppLogo() {
    return (
        <Link href={home()} className="flex items-center gap-2.5">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)' }}
            >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2L3 7v10h5v-6h4v6h5V7L10 2z" fill="white" />
                </svg>
            </div>
            <span
                className="font-bold text-lg text-gray-900 tracking-tight"
                style={{ fontFamily: 'Manrope, sans-serif' }}
            >
                EliteCoach
            </span>
        </Link>
    );
}

