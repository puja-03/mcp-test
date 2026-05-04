import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register, home } from '@/routes';
import { UserCircle, LogOut, LayoutGrid, BookOpen, Settings, Bell, Search, Menu, X } from 'lucide-react';
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
import AppLogo from '@/components/app-logo';

interface Props {
    children: React.ReactNode;
    title?: string;
}

export default function AppEliteCoachLayout({ children, title }: Props) {
    const { auth } = usePage().props as any;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Role-based navigation
    const role = (auth.user?.role && typeof auth.user.role === 'object') ? (auth.user.role as any).name : auth.user?.role;
    
    const navItems = [
        { label: 'Dashboard', href: dashboard(), icon: LayoutGrid },
    ];

    if (role === 'student') {
        navItems.push({ label: 'My Courses', href: '/student/courses', icon: BookOpen });
    } else if (role === 'instructor') {
        navItems.push({ label: 'Instructor Panel', href: '/instructor/courses', icon: BookOpen });
    } else if (role === 'admin') {
        navItems.push({ label: 'Admin Panel', href: '/admin/users', icon: Settings });
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans text-gray-900">
            <Head title={title ? `${title} — EliteCoach` : 'EliteCoach'} />

            {/* Premium Sticky Header */}
            <header 
                className={`sticky top-0 z-50 w-full transition-all duration-300 ${
                    isScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm' : 'bg-transparent'
                }`}
            >
                <div className="max-w-[1600px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <AppLogo />
                        
                        <nav className="hidden lg:flex items-center gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                                        usePage().url.startsWith(item.href)
                                            ? 'text-indigo-600 bg-indigo-50/50'
                                            : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-100/50'
                                    }`}
                                >
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Search Bar (Desktop) */}
                        <div className="hidden md:flex items-center relative group">
                            <Search className="absolute left-3.5 h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Search everything..." 
                                className="h-10 pl-10 pr-4 bg-gray-100/50 border-transparent rounded-xl text-sm w-64 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                            />
                        </div>

                        {/* Notifications */}
                        <Button variant="ghost" size="icon" className="relative rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                        </Button>

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-3 p-1 pl-3 rounded-2xl hover:bg-gray-100/50 transition-all group border border-transparent hover:border-gray-200/50">
                                    <div className="flex flex-col items-end hidden sm:flex">
                                        <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{auth.user.name}</span>
                                        <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider">{role}</span>
                                    </div>
                                    <Avatar className="w-9 h-9 border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                                        <AvatarImage src={auth.user.avatar} />
                                        <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
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

                        {/* Mobile Menu Toggle */}
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="lg:hidden rounded-xl text-gray-500"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top-4 duration-200">
                        <nav className="p-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center gap-3 ${
                                        usePage().url.startsWith(item.href)
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/* Premium Footer */}
            <footer className="py-8 px-6 lg:px-12 border-t border-gray-200/50 bg-white/50 backdrop-blur-sm mt-auto">
                <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-indigo-600">EliteCoach</span>
                        <span>© 2024 · Premium Mentorship Excellence</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
