import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Shield, Key, Users, GraduationCap, Calendar, CheckSquare, CreditCard, DollarSign, FileEdit, Award, FileText, UserCircle } from 'lucide-react';
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

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    // Role extraction based on nested structure or string
    const role = (auth.user?.role && typeof auth.user.role === 'object') ? (auth.user.role as any).name : auth.user?.role;
    const isAdmin = role === 'admin';
    const isTenantAdmin = role === 'tenant-admin';
    const isInstructor = role === 'instructor';
    const isStudent = role === 'student';

    return (
        <Sidebar collapsible="icon" variant="sidebar">
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
                
                {isTenantAdmin && (
                    <>
                        <NavMain
                            items={[
                                { title: 'Dashboard', href: '/tenant/dashboard', icon: LayoutGrid },
                                { title: 'Users', href: '/tenant/users', icon: Users },
                            ]}
                            label="Tenant"
                        />
                        <NavMain
                            items={[
                                { title: 'Courses', href: '/tenant/courses', icon: BookOpen },
                                { title: 'Batches', href: '/tenant/batches', icon: Users },
                                { title: 'Enrollments', href: '/tenant/enrollments', icon: GraduationCap },
                                { title: 'Chapters', href: '/tenant/chapters', icon: BookOpen },
                                { title: 'Topics', href: '/tenant/topics', icon: BookOpen },
                                { title: 'Class Sessions', href: '/tenant/class-sessions', icon: Calendar },
                                { title: 'Attendance', href: '/tenant/attendances', icon: CheckSquare },
                            ]}
                            label="Academic"
                        />
                        <NavMain
                            items={[
                                { title: 'Fee Structures', href: '/tenant/fee-structures', icon: FileText },
                            ]}
                            label="Financials"
                        />
                        <NavMain
                            items={[
                                { title: 'Exams', href: '/tenant/exams', icon: FileEdit },
                                { title: 'Results', href: '/tenant/results', icon: Award },
                            ]}
                            label="Exams & Results"
                        />
                    </>
                )}

                {isInstructor && (
                    <>
                        <NavMain
                            items={[
                                { title: 'Students', href: '/instructor/users', icon: Users },
                                { title: 'Profile', href: '/instructor/profile', icon: UserCircle },
                            ]}
                            label="Instructor Menu"
                        />
                        <NavMain
                            items={[
                                { title: 'Courses', href: '/instructor/courses', icon: BookOpen },
                                { title: 'Chapters', href: '/instructor/chapters', icon: BookOpen },
                                { title: 'Topics', href: '/instructor/topics', icon: BookOpen },
                                { title: 'Attendances', href: '/instructor/attendances', icon: CheckSquare },
                            ]}
                            label="Academic"
                        />
                        <NavMain
                            items={[
                                { title: 'Fee Structures', href: '/instructor/fee-structures', icon: FileText },
                                { title: 'Installments', href: '/instructor/installments', icon: CreditCard },
                                { title: 'Payments', href: '/instructor/payments', icon: DollarSign },
                            ]}
                            label="Financials"
                        />
                        <NavMain
                            items={[
                                { title: 'Exams', href: '/instructor/exams', icon: FileEdit },
                                { title: 'Results', href: '/instructor/results', icon: Award },
                            ]}
                            label="Exams & Results"
                        />
                    </>
                )}

                {isStudent && (
                    <>
                        <NavMain
                            items={[
                                { title: 'Dashboard', href: '/student/dashboard', icon: LayoutGrid },
                                { title: 'Courses', href: '/student/courses', icon: BookOpen },
                            ]}
                            label="Student Menu"
                        />
                    </>
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
