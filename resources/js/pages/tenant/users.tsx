import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Role = { id: number; name: string };
type User = { id: number; name: string; email: string; role_id: number | null; role: Role | null; created_at: string };

export default function TenantUsers({ users, tenant, roles }: { users: User[]; tenant: any; roles: Role[] }) {
    const { data, setData, post, put, processing, errors } = useForm({ name: '', email: '', password: '', role_id: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/users');
    };

    const changeRole = (userId: number, roleId: string) => {
        put(`/tenant/users/${userId}`, { data: { role_id: roleId === 'none' ? null : Number(roleId) } });
    };

    const remove = (userId: number) => {
        if (confirm('Delete user?')) fetch(`/tenant/users/${userId}`, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '' } }).then(() => location.reload());
    };

    return (
        <>
            <Head title="Tenant Users" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{tenant?.name} — Users</h1>
                </div>

                <div className="rounded-md border bg-card p-4">
                    <form onSubmit={submit} className="grid grid-cols-3 gap-4">
                        <div>
                            <Label>Name</Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                        </div>
                        <div>
                            <Label>Role</Label>
                            <Select defaultValue="none" onValueChange={(v) => setData('role_id', v)}>
                                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select role" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">No Role</SelectItem>
                                    {roles.map((r) => <SelectItem key={r.id} value={r.id.toString()}>{r.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="col-span-3 flex justify-end">
                            <Button type="submit">Create</Button>
                        </div>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left">Name</th>
                                    <th className="h-12 px-4 text-left">Email</th>
                                    <th className="h-12 px-4 text-left">Role</th>
                                    <th className="h-12 px-4 text-left">Joined</th>
                                    <th className="h-12 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u.id} className="border-b">
                                        <td className="p-4">{u.name}</td>
                                        <td className="p-4">{u.email}</td>
                                        <td className="p-4">
                                            <Select defaultValue={u.role_id?.toString() || 'none'} onValueChange={(val) => changeRole(u.id, val)}>
                                                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Role" /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">No Role</SelectItem>
                                                    {roles.map((r) => <SelectItem key={r.id} value={r.id.toString()}>{r.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </td>
                                        <td className="p-4">{new Date(u.created_at).toLocaleDateString()}</td>
                                        <td className="p-4 text-right"><Button variant="ghost" onClick={() => remove(u.id)}>Delete</Button></td>
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
