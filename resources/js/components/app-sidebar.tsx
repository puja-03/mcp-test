import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen, BookOpenCheck, FolderGit2, LayoutGrid, Shield, Key, Users,
    GraduationCap, Calendar, CheckSquare, CreditCard, DollarSign,
    FileEdit, Award, FileText, Video, UserCheck, User2,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem, Auth } from '@/types';

// ─── ADMIN NAV ───
const adminSystemItems: NavItem[] = [
    { title: 'Users', href: '/admin/users', icon: Users },
    { title: 'Tenants', href: '/admin/tenants', icon: Users },
    { title: 'Roles', href: '/admin/roles', icon: Shield },
    { title: 'Permissions', href: '/admin/permissions', icon: Key },
];
const adminAcademicItems: NavItem[] = [
    { title: 'Courses', href: '/admin/courses', icon: BookOpen },
    { title: 'Chapters', href: '/admin/chapters', icon: BookOpenCheck },
    { title: 'Topics', href: '/admin/topics', icon: Video },
    { title: 'Batches', href: '/admin/batches', icon: Users },
    { title: 'Enrollments', href: '/admin/enrollments', icon: GraduationCap },
    { title: 'Class Sessions', href: '/admin/class-sessions', icon: Calendar },
    { title: 'Attendances', href: '/admin/attendances', icon: CheckSquare },
];
const adminFinancialItems: NavItem[] = [
    { title: 'Fee Structures', href: '/admin/fee-structures', icon: FileText },
    { title: 'Installments', href: '/admin/installments', icon: CreditCard },
    { title: 'Payments', href: '/admin/payments', icon: DollarSign },
];
const adminExamItems: NavItem[] = [
    { title: 'Exams', href: '/admin/exams', icon: FileEdit },
    { title: 'Results', href: '/admin/results', icon: Award },
];
const adminInstructorItems: NavItem[] = [
    { title: 'Instructor Profiles', href: '/admin/instructors', icon: UserCheck },
];

// ─── TENANT NAV ───
const tenantAcademicItems: NavItem[] = [
    { title: 'Dashboard', href: '/tenant/dashboard', icon: LayoutGrid },
    { title: 'Users', href: '/tenant/users', icon: Users },
    { title: 'Courses', href: '/tenant/courses', icon: BookOpen },
    { title: 'Chapters', href: '/tenant/chapters', icon: BookOpenCheck },
    { title: 'Topics', href: '/tenant/topics', icon: Video },
    { title: 'Batches', href: '/tenant/batches', icon: Users },
    { title: 'Enrollments', href: '/tenant/enrollments', icon: GraduationCap },
];
const tenantAttendanceItems: NavItem[] = [
    { title: 'Class Sessions', href: '/tenant/class-sessions', icon: Calendar },
    { title: 'Attendances', href: '/tenant/attendances', icon: CheckSquare },
];
const tenantFinancialItems: NavItem[] = [
    { title: 'Fee Structures', href: '/tenant/fee-structures', icon: FileText },
];
const tenantExamItems: NavItem[] = [
    { title: 'Exams', href: '/tenant/exams', icon: FileEdit },
    { title: 'Results', href: '/tenant/results', icon: Award },
];

// ─── INSTRUCTOR NAV ───
const instructorItems: NavItem[] = [
    { title: 'Dashboard', href: '/instructor/dashboard', icon: LayoutGrid },
    { title: 'My Courses', href: '/instructor/courses', icon: BookOpen },
    { title: 'Chapters', href: '/instructor/chapters', icon: BookOpenCheck },
    { title: 'Topics', href: '/instructor/topics', icon: Video },
    { title: 'My Profile', href: '/instructor/profile', icon: User2 },
];

// ─── STUDENT NAV ───
const studentItems: NavItem[] = [
    { title: 'Dashboard', href: '/student/dashboard', icon: LayoutGrid },
    { title: 'My Courses', href: '/student/courses', icon: BookOpen },
];

const footerNavItems: NavItem[] = [
    { title: 'Repository', href: 'https://github.com/laravel/react-starter-kit', icon: FolderGit2 },
    { title: 'Documentation', href: 'https://laravel.com/docs/starter-kits#react', icon: BookOpen },
];

export function AppSidebar() {
    const { auth } = usePage<{ auth: Auth }>().props;
    const roleName = auth.user?.role?.name || auth.user?.role || '';
    const isAdmin = roleName === 'admin';
    const isTenantAdmin = roleName === 'tenant-admin';
    const isInstructor = roleName === 'instructor';
    const isStudent = roleName === 'student';

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
                <NavMain items={[{ title: 'Dashboard', href: dashboard(), icon: LayoutGrid }]} />

                {/* ── Admin ── */}
                {isAdmin && (
                    <>
                        <NavMain items={adminAcademicItems} label="Academic" />
                        <NavMain items={adminInstructorItems} label="Instructors" />
                        <NavMain items={adminFinancialItems} label="Financials" />
                        <NavMain items={adminExamItems} label="Exams & Results" />
                        <NavMain items={adminSystemItems} label="System" />
                    </>
                )}

                {/* ── Tenant Admin ── */}
                {isTenantAdmin && (
                    <>
                        <NavMain items={tenantAcademicItems} label="Academic" />
                        <NavMain items={tenantAttendanceItems} label="Attendance" />
                        <NavMain items={tenantFinancialItems} label="Financials" />
                        <NavMain items={tenantExamItems} label="Exams & Results" />
                    </>
                )}

                {/* ── Instructor ── */}
                {isInstructor && <NavMain items={instructorItems} label="Instructor" />}

                {/* ── Student ── */}
                {isStudent && <NavMain items={studentItems} label="Student" />}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
