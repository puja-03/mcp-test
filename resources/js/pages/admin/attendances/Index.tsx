import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

export default function Index({ attendances, sessions, filters }: any) {
    const [sessionId, setSessionId] = useState(filters.class_session_id || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/attendances', { class_session_id: sessionId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this attendance record?')) {
            router.delete(`/admin/attendances/${id}`);
        }
    };

    return (
        <>
            <Head title="Manage Attendances" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Attendances</h1>
                    <Button onClick={() => router.visit('/admin/attendances/create')}>Mark Attendance</Button>
                </div>

                <div className="flex items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 flex-wrap">
                        <select 
                            value={sessionId} 
                            onChange={e => setSessionId(e.target.value)}
                            className="flex h-10 w-full max-w-sm items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        >
                            <option value="">All Sessions</option>
                            {sessions.map((s: any) => (
                                <option key={s.id} value={s.id}>{s.session_date} — {s.batch?.name} ({s.topic || 'No topic'})</option>
                            ))}
                        </select>

                        <Button type="submit" variant="secondary">Filter Options</Button>
                    </form>
                </div>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Session</th>
                                    <th className="h-12 px-4 text-left font-medium">Student</th>
                                    <th className="h-12 px-4 text-left font-medium">Status</th>
                                    <th className="h-12 px-4 text-left font-medium">Recorded By</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {attendances.data.map((attendance: any) => (
                                    <tr key={attendance.id} className="border-b">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{attendance.class_session?.session_date}</div>
                                            <div className="text-xs text-muted-foreground">{attendance.class_session?.batch?.name}</div>
                                        </td>
                                        <td className="p-4 align-middle font-medium">{attendance.student?.name}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={attendance.status === 'present' ? 'default' : attendance.status === 'absent' ? 'destructive' : 'secondary'}>
                                                {attendance.status.toUpperCase()}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-sm text-muted-foreground">
                                            {attendance.marker?.name || '—'}
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/attendances/${attendance.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(attendance.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {attendances.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-muted-foreground">No attendance records found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {attendances.links.map((link: any, key: number) => (
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
