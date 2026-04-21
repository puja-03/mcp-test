import { Head, router } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Search } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type Role = { id: number; name: string };
type User = { id: number; name: string; email: string; role_id: number | null; role: Role | null; created_at: string };

type Props = {
    users: {
        data: User[];
        links: { url: string | null; label: string; active: boolean }[];
        from: number;
        to: number;
        total: number;
    };
    roles: Role[];
    filters: {
        search?: string;
        role_id?: string;
    };
};

export default function Users({ users, roles, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/users', { ...filters, search }, { preserveState: true, preserveScroll: true });
    };

    const handleRoleFilter = (roleId: string) => {
        router.get('/admin/users', { ...filters, role_id: roleId === 'all' ? undefined : roleId }, { preserveState: true, preserveScroll: true });
    };

    const changeRole = (userId: number, roleId: string) => {
        router.put(`/admin/users/${userId}`, roleId === 'none' ? { role_id: null } : { role_id: Number(roleId) }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                        <p className="text-muted-foreground">Manage user roles and permissions.</p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-lg">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="pl-9 h-10"
                            />
                        </div>
                        <Button type="submit" className="h-10">Search</Button>
                    </form>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-muted-foreground">Filter by Role:</span>
                        <Select
                            defaultValue={filters.role_id || 'all'}
                            onValueChange={handleRoleFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="All Roles" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Roles</SelectItem>
                                <SelectItem value="none">No Role</SelectItem>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.id.toString()}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50 transition-colors">
                                    <th className="h-12 px-4 text-left align-middle font-semibold text-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-semibold text-foreground">Email</th>
                                    <th className="h-12 px-4 text-left align-middle font-semibold text-foreground">Role</th>
                                    <th className="h-12 px-4 text-left align-middle font-semibold text-foreground">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {users.data.map((user) => (
                                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/30">
                                        <td className="p-4 align-middle font-medium">{user.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{user.email}</td>
                                        <td className="p-4 align-middle">
                                            <Select
                                                defaultValue={user.role_id?.toString() || 'none'}
                                                onValueChange={(val) => changeRole(user.id, val)}
                                            >
                                                <SelectTrigger className="w-[160px] h-9">
                                                    <SelectValue placeholder="Select a role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">No Role</SelectItem>
                                                    {roles.map((role) => (
                                                        <SelectItem key={role.id} value={role.id.toString()}>
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {users.data.length === 0 && (
                        <div className="p-8 text-center text-muted-foreground">
                            No users found matching your criteria.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {users.total > 15 && (
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
                        <div className="text-sm text-muted-foreground">
                            Showing {users.from}-{users.to} of {users.total} users
                        </div>
                        <div className="flex items-center space-x-2">
                            {users.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.visit(link.url)}
                                    className="min-w-[36px]"
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
