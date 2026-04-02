import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type Permission = { id: number; name: string; roles_count: number };

export default function Permissions({ permissions }: { permissions: Permission[] }) {
    const [editPermission, setEditPermission] = useState<Permission | null>(null);
    const [open, setOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, reset, processing, errors } = useForm({
        name: '',
    });

    const openCreateModal = () => {
        reset();
        setEditPermission(null);
        setOpen(true);
    };

    const openEditModal = (permission: Permission) => {
        setData({ name: permission.name });
        setEditPermission(permission);
        setOpen(true);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editPermission) {
            put(`/admin/permissions/${editPermission.id}`, { onSuccess: () => setOpen(false) });
        } else {
            post('/admin/permissions', { onSuccess: () => setOpen(false) });
        }
    };

    const handleDelete = (permission: Permission) => {
        if (confirm('Are you sure you want to delete this permission?')) {
            destroy(`/admin/permissions/${permission.id}`);
        }
    };

    return (
        <>
            <Head title="Manage Permissions" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Permissions</h1>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button onClick={openCreateModal}>Create Permission</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>{editPermission ? 'Edit Permission' : 'Create Permission'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submit} className="space-y-4 pt-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Permission Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g. view-dashboard"
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
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
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assigned to Roles (Count)</th>
                                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {permissions.map((p) => (
                                    <tr key={p.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{p.name}</td>
                                        <td className="p-4 align-middle">{p.roles_count}</td>
                                        <td className="p-4 align-middle text-right flex justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => openEditModal(p)}>
                                                Edit
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() => handleDelete(p)}
                                                disabled={p.roles_count > 0}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {permissions.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="p-4 text-center text-muted-foreground">No permissions found.</td>
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
