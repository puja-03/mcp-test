import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Trash2, CheckSquare } from 'lucide-react';
import { useState } from 'react';

const statusConfig: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline' }> = {
    present: { label: 'Present', variant: 'default' },
    absent: { label: 'Absent', variant: 'destructive' },
    late: { label: 'Late', variant: 'secondary' },
};

export default function AttendancesIndex({ attendances, sessions, filters }: any) {
    const [sessionId, setSessionId] = useState(filters.session_id || 'all');
    const [status, setStatus] = useState(filters.status || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/attendances', {
            session_id: sessionId === 'all' ? '' : sessionId,
            status: status === 'all' ? '' : status,
        }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this attendance record?')) {
            router.delete(`/tenant/attendances/${id}`);
        }
    };

    return (
        <>
            <Head title="Attendance" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <CheckSquare className="h-7 w-7 text-primary" />
                            Attendance
                        </h1>
                        <p className="text-muted-foreground mt-1">Track student attendance across class sessions</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/attendances/create">
                            <Plus className="h-4 w-4 mr-2" />
                            Mark Attendance
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={sessionId} onValueChange={setSessionId}>
                        <SelectTrigger className="w-[300px]">
                            <SelectValue placeholder="All Sessions" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Sessions</SelectItem>
                            {sessions.map((s: any) => (
                                <SelectItem key={s.id} value={s.id.toString()}>
                                    {s.session_date ? new Date(s.session_date).toLocaleDateString() : s.session_date} — {s.batch?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {(sessionId !== 'all' || status !== 'all') && (
                        <Button type="button" variant="ghost" onClick={() => {
                            setSessionId('all');
                            setStatus('all');
                            router.get('/tenant/attendances', {}, { preserveState: true });
                        }}>
                            Clear
                        </Button>
                    )}
                </form>

                {/* Table */}
                <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/50">
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Session</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Student</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Status</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Remarks</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendances.data.map((attendance: any) => {
                                    const cfg = statusConfig[attendance.status] ?? { label: attendance.status, variant: 'secondary' as const };
                                    return (
                                        <tr key={attendance.id} className="border-b hover:bg-muted/30 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium">
                                                    {attendance.class_session?.session_date
                                                        ? new Date(attendance.class_session.session_date).toLocaleDateString()
                                                        : '—'}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {attendance.class_session?.batch?.name}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="font-semibold">{attendance.student?.name}</div>
                                                <div className="text-xs text-muted-foreground">{attendance.student?.email}</div>
                                            </td>
                                            <td className="p-4">
                                                <Badge variant={cfg.variant}>{cfg.label}</Badge>
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {attendance.remarks || '—'}
                                            </td>
                                            <td className="p-4 text-right">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(attendance.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {attendances.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        Showing {attendances.from ?? 0}–{attendances.to ?? 0} of {attendances.total} records
                    </p>
                    <div className="flex items-center gap-1">
                        {attendances.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
