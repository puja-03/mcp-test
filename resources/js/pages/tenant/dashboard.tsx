import { Head } from '@inertiajs/react';

export default function TenantDashboard({ tenant, user }: { tenant: any; user: any }) {
    return (
        <>
            <Head title="Tenant Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">{tenant?.name} — Dashboard</h1>
                </div>

                <div className="rounded-md border bg-card p-6">
                    <p>Welcome, {user?.name}.</p>
                    <p className="mt-4">Domain: {tenant?.domain}</p>
                </div>
            </div>
        </>
    );
}
