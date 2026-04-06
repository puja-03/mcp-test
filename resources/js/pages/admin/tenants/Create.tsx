import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateTenant() {
    const { data, setData, post, processing, errors } = useForm({ name: '', domain: '', admin_name: '', admin_email: '', admin_password: '' });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/tenants');
    };

    return (
        <>
            <Head title="Create Tenant" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Create Tenant</h1>
                </div>

                <div className="rounded-md border bg-card p-6">
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Tenant Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="domain">Domain (subdomain)</Label>
                            <Input id="domain" value={data.domain} onChange={(e) => setData('domain', e.target.value)} placeholder="demo" />
                            {errors.domain && <p className="text-sm text-destructive">{errors.domain}</p>}
                        </div>

                        <div>
                            <Label htmlFor="admin_name">Administrator Name (optional)</Label>
                            <Input id="admin_name" value={data.admin_name} onChange={(e) => setData('admin_name', e.target.value)} />
                            {errors.admin_name && <p className="text-sm text-destructive">{errors.admin_name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="admin_email">Administrator Email (optional)</Label>
                            <Input id="admin_email" value={data.admin_email} onChange={(e) => setData('admin_email', e.target.value)} />
                            {errors.admin_email && <p className="text-sm text-destructive">{errors.admin_email}</p>}
                        </div>

                        <div>
                            <Label htmlFor="admin_password">Administrator Password (optional)</Label>
                            <Input id="admin_password" type="password" value={data.admin_password} onChange={(e) => setData('admin_password', e.target.value)} />
                            {errors.admin_password && <p className="text-sm text-destructive">{errors.admin_password}</p>}
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>Create</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
