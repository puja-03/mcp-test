import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { Bell, Search, UserCircle, Settings, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const { auth, branding } = usePage().props as any;
    const [isScrolled, setIsScrolled] = useState(false);
    const primaryColor = branding?.primary_color || '#4f46e5';
    const role = (auth.user?.role && typeof auth.user.role === 'object') ? (auth.user.role as any).name : auth.user?.role;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            className={`sticky top-0 z-40 w-full transition-all duration-300 flex h-16 shrink-0 items-center justify-between gap-2 px-6 ${
                isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="flex items-center gap-4">
                <SidebarTrigger className="-ml-2 hover:bg-gray-100" />
                <div className="hidden sm:block">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Search Bar (Desktop) */}
                <div className="hidden md:flex items-center relative group">
                    <Search className="absolute left-3.5 h-4 w-4 text-gray-400 group-focus-within:text-[var(--primary)] transition-colors" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="h-10 pl-10 pr-4 bg-white/60 border border-gray-200 rounded-xl text-sm w-48 focus:w-64 focus:bg-white focus:ring-2 focus:ring-[var(--primary-glow)] focus:border-[var(--primary-border)] transition-all outline-none shadow-sm"
                        style={{ 
                            '--primary': primaryColor,
                            '--primary-glow': `${primaryColor}33`,
                            '--primary-border': `${primaryColor}4d`
                        } as React.CSSProperties}
                    />
                </div>

                {/* Notifications */}
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="relative rounded-xl text-gray-500 transition-colors bg-white/60 border border-gray-200 shadow-sm"
                    onMouseEnter={(e) => {
                        e.currentTarget.style.color = primaryColor;
                        e.currentTarget.style.backgroundColor = `${primaryColor}15`;
                        e.currentTarget.style.borderColor = `${primaryColor}33`;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.backgroundColor = '';
                        e.currentTarget.style.borderColor = '';
                    }}
                >
                    <Bell className="w-4 h-4" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-1 pl-3 rounded-2xl bg-white/60 shadow-sm transition-all group border border-gray-200 hover:border-gray-300">
                            <div className="flex flex-col items-end hidden sm:flex">
                                <span 
                                    className="text-xs font-bold text-gray-900 transition-colors"
                                    onMouseEnter={(e) => (e.currentTarget.style.color = primaryColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                                >
                                    {auth.user.name}
                                </span>
                                <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: primaryColor }}>{role}</span>
                            </div>
                            <Avatar className="w-8 h-8 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                <AvatarImage src={auth.user.avatar} />
                                <AvatarFallback className="text-white font-bold text-[10px]" style={{ backgroundColor: primaryColor }}>
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2 rounded-2xl p-2 border-gray-200/50 shadow-xl shadow-gray-200/50" align="end">
                        <DropdownMenuLabel className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">My Account</DropdownMenuLabel>
                        <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer">
                            <UserCircle className="w-4 h-4 mr-2 opacity-70" />
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-indigo-50 focus:text-indigo-600 cursor-pointer">
                            <Settings className="w-4 h-4 mr-2 opacity-70" />
                            Account Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-100 my-1 mx-2" />
                        <Link href="/logout" method="post" as="div" className="w-full">
                            <DropdownMenuItem className="rounded-xl px-3 py-2.5 focus:bg-rose-50 focus:text-rose-600 cursor-pointer text-rose-600 font-medium">
                                <LogOut className="w-4 h-4 mr-2 opacity-70" />
                                Logout
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
