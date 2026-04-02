import { Head, useForm } from '@inertiajs/react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type Role = { id: number; name: string };
type User = { id: number; name: string; email: string; role_id: number | null; role: Role | null; created_at: string };

export default function Users({ users, roles }: { users: User[]; roles: Role[] }) {
    const { put } = useForm();

    const changeRole = (userId: number, roleId: string) => {
        put(`/admin/users/${userId}`, {
            data: { role_id: roleId === 'none' ? null : Number(roleId) },
        });
    };

    return (
        <>
            <Head title="Manage Users" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Users</h1>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {users.map((user) => (
                                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{user.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{user.email}</td>
                                        <td className="p-4 align-middle">
                                            <Select
                                                defaultValue={user.role_id?.toString() || 'none'}
                                                onValueChange={(val) => changeRole(user.id, val)}
                                            >
                                                <SelectTrigger className="w-[180px]">
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
                </div>
            </div>
        </>
    );
}
