import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type Permission = { id: number; name: string };
type Role = { id: number; name: string; users_count: number; permissions: Permission[] };

export default function Roles({ roles, permissions }: { roles: Role[]; permissions: Permission[] }) {
    const [editRole, setEditRole] = useState<Role | null>(null);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        permissions: [] as number[],
    });

    const openCreateModal = () => {
        reset();
        setEditRole(null);
        setOpen(true);
    };

    const openEditModal = (role: Role) => {
        setData({
            name: role.name,
            permissions: role.permissions.map((p) => p.id),
        });
        setEditRole(role);
        setOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editRole) {
            put(`/admin/roles/${editRole.id}`, { onSuccess: () => setOpen(false) });
        } else {
            post('/admin/roles', { onSuccess: () => setOpen(false) });
        }
    };

    const handleDelete = (role: Role) => {
        if (confirm('Are you sure you want to delete this role?')) {
            destroy(`/admin/roles/${role.id}`);
        }
    };

    const togglePermission = (id: number) => {
        if (data.permissions.includes(id)) {
            setData('permissions', data.permissions.filter((p) => p !== id));
        } else {
            setData('permissions', [...data.permissions, id]);
        }
    };

    return (
        <>
            <Head title="Manage Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Roles</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Create Role</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{editRole ? 'Edit Role' : 'Create Role'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Role Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. editor"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Permissions</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {permissions.map((p) => (
                                            <div key={p.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`perm-${p.id}`}
                                                    checked={data.permissions.includes(p.id)}
                                                    onCheckedChange={() => togglePermission(p.id)}
                                                />
                                                <Label htmlFor={`perm-${p.id}`} className="font-normal">
                                                    {p.name}
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.permissions && <p className="text-sm text-destructive">{errors.permissions}</p>}
                                </div>
                                <div className="flex justify-end pt-4">
                                    <Button type="submit" disabled={processing}>
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Permissions</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assigned Users</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {roles.map((role) => (
                                    <tr key={role.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{role.name}</td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-wrap gap-1">
                                                {role.permissions.map((p) => (
                                                    <span key={p.id} className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold">
                                                        {p.name}
                                                    </span>
                                                ))}
                                                {role.permissions.length === 0 && <span className="text-muted-foreground italic text-xs">None</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle">{role.users_count}</td>
                                        <td className="p-4 align-middle text-right">
                                            <Button variant="ghost" size="sm" onClick={() => openEditModal(role)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(role)}
                                                disabled={role.name === 'admin' || role.users_count > 0}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {roles.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-muted-foreground">No roles found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
