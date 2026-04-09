import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Index({ sessions, batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [batchId, setBatchId] = useState(filters.batch_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/class-sessions', { search, batch_id: batchId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this class session?')) {
            router.delete(`/admin/class-sessions/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Class Sessions" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Class Sessions</h1>
                    <Button onClick={() => router.visit('/admin/class-sessions/create')}>New Session</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search topic..." 
                            className="max-w-[200px]"
                        />
                        <select 
                            value={batchId} 
                            onChange={e => setBatchId(e.target.value)}
                            className="flex h-10 w-[200px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Batches</option>
                            {batches.map((b: any) => (
                                <option key={b.id} value={b.id}>{b.name}</option>
                            ))}
                        </select>

                        <Button type="submit" variant="secondary">Search</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Date</th>
                                    <th className="h-12 px-4 text-left font-medium">Batch</th>
                                    <th className="h-12 px-4 text-left font-medium">Topic</th>
                                    <th className="h-12 px-4 text-left font-medium">Time Context</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {sessions.data.map((session: any) => (
                                    <tr key={session.id} className="border-b">
                                        <td className="p-4 align-middle font-medium">{session.session_date}</td>
                                        <td className="p-4 align-middle text-muted-foreground">{session.batch?.name}</td>
                                        <td className="p-4 align-middle text-sm">{session.topic || '—'}</td>
                                        <td className="p-4 align-middle text-sm text-muted-foreground">
                                            {session.start_time || '—'} to {session.end_time || '—'}
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/class-sessions/${session.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(session.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {sessions.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No sessions found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {sessions.links.map((link: any, key: number) => (
                        <Button 
                           key={key} 
                           variant={link.active ? "default" : "outline"}
                           disabled={!link.url}
                           dangerouslySetInnerHTML={{ __html: link.label }}
                           onClick={() => link.url && router.visit(link.url)}
                           size="sm"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
