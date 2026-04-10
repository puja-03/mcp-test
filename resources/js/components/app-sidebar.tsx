import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Shield, Key, Users, GraduationCap, Calendar, CheckSquare, CreditCard, DollarSign, FileEdit, Award, FileText } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, Auth } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Users',
        href: '/admin/users',
        icon: Users,
    },
    {
        title: 'Tenants',
        href: '/admin/tenants',
        icon: Users,
    },
    {
        title: 'Roles',
        href: '/admin/roles',
        icon: Shield,
    },
    {
        title: 'Permissions',
        href: '/admin/permissions',
        icon: Key,
    },
];

const academicNavItems: NavItem[] = [
    { title: 'Courses', href: '/admin/courses', icon: BookOpen },
    { title: 'Batches', href: '/admin/batches', icon: Users },
    { title: 'Enrollments', href: '/admin/enrollments', icon: GraduationCap },
    { title: 'Class Sessions', href: '/admin/class-sessions', icon: Calendar },
    { title: 'Attendances', href: '/admin/attendances', icon: CheckSquare },
];

const financialNavItems: NavItem[] = [
    { title: 'Fee Structures', href: '/admin/fee-structures', icon: FileText },
    { title: 'Installments', href: '/admin/installments', icon: CreditCard },
    { title: 'Payments', href: '/admin/payments', icon: DollarSign },
];

const examNavItems: NavItem[] = [
    { title: 'Exams', href: '/admin/exams', icon: FileEdit },
    { title: 'Results', href: '/admin/results', icon: Award },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const isAdmin = auth.user?.role === 'admin' || auth.user?.role?.name === 'admin';

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {isAdmin && (
                    <>
                        <NavMain items={academicNavItems} label="Academic" />
                        <NavMain items={financialNavItems} label="Financials" />
                        <NavMain items={examNavItems} label="Exams & Results" />
                        <NavMain items={adminNavItems} label="System Administration" />
                    </>
                )}
                {/* Tenant navigation for users that belong to a tenant */}
                {auth.user?.tenant_id && (
                    <NavMain
                        items={[
                            { title: 'Tenant Dashboard', href: '/tenant/dashboard', icon: LayoutGrid },
                            { title: 'Users', href: '/tenant/users', icon: Users },
                        ]}
                        label="Tenant"
                    />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
