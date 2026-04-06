import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type Tenant = { id: number; name: string; domain: string; users_count: number; admin_email?: string | null; admin_joined_at?: string | null };

export default function Tenants({ tenants }: { tenants: Tenant[] }) {
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this tenant?')) {
            fetch(`/admin/tenants/${id}`, {
                method: 'DELETE',
                headers: { 'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '' },
            }).then(() => location.reload());
        }
    };

    return (
        <>
            <Head title="Manage Tenants" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Tenants</h1>
                    <Button onClick={() => (location.href = '/admin/tenants/create')}>Create Tenant</Button>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Domain</th>
                                    <th className="h-12 px-4 text-left font-medium text-muted-foreground">Users</th>
                                    <th className="h-12 px-4 text-right font-medium text-muted-foreground">Admin Email</th>
                                    <th className="h-12 px-4 text-right font-medium text-muted-foreground">Admin Joined</th>
                                    <th className="h-12 px-4 text-right font-medium text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {tenants.map((t) => (
                                    <tr key={t.id} className="border-b">
                                        <td className="p-4 align-middle font-medium">{t.name}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{t.domain}</td>
                                        <td className="p-4 align-middle">{t.users_count}</td>
                                        <td className="p-4 align-middle text-right">{t.admin_email ?? '—'}</td>
                                        <td className="p-4 align-middle text-right">{t.admin_joined_at ?? '—'}</td>

                                        <td className="p-4 align-middle text-right">
                                            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDelete(t.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {tenants.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-4 text-center text-muted-foreground">No tenants found.</td>
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
