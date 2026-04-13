import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

export default function ClassSessionsIndex({ sessions, batches, filters }: any) {
    const [batchId, setBatchId] = useState(filters.batch_id || 'all');

    const handleFilter = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/tenant/class-sessions', { batch_id: batchId === 'all' ? '' : batchId }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this class session?')) {
            router.delete(`/tenant/class-sessions/${id}`);
        }
    };

    return (
        <>
            <Head title="Class Sessions" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <Calendar className="h-7 w-7 text-primary" />
                            Class Sessions
                        </h1>
                        <p className="text-muted-foreground mt-1">Schedule and manage class sessions for each batch</p>
                    </div>
                    <Button asChild>
                        <Link href="/tenant/class-sessions/create">
                            <Plus className="h-4 w-4 mr-2" />
                            New Session
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <form onSubmit={handleFilter} className="flex flex-wrap items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select value={batchId} onValueChange={setBatchId}>
                        <SelectTrigger className="w-[250px]">
                            <SelectValue placeholder="All Batches" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Batches</SelectItem>
                            {batches.map((b: any) => (
                                <SelectItem key={b.id} value={b.id.toString()}>
                                    {b.name} — {b.course?.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button type="submit" variant="secondary">Apply Filter</Button>
                    {batchId !== 'all' && (
                        <Button type="button" variant="ghost" onClick={() => { setBatchId('all'); router.get('/tenant/class-sessions', {}, { preserveState: true }); }}>
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
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Session Date</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Batch</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Topic</th>
                                    <th className="h-12 px-4 text-left font-semibold text-muted-foreground">Time</th>
                                    <th className="h-12 px-4 text-right font-semibold text-muted-foreground">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.data.map((session: any) => (
                                    <tr key={session.id} className="border-b hover:bg-muted/30 transition-colors">
                                        <td className="p-4 font-semibold">
                                            {session.session_date ? new Date(session.session_date).toLocaleDateString() : '—'}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-medium">{session.batch?.name}</div>
                                            <div className="text-xs text-muted-foreground">{session.batch?.course?.name}</div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{session.topic || '—'}</td>
                                        <td className="p-4 text-muted-foreground text-sm">
                                            {session.start_time && session.end_time
                                                ? `${session.start_time} – ${session.end_time}`
                                                : '—'}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button variant="outline" size="sm" asChild>
                                                    <Link href={`/tenant/attendances/create?session_id=${session.id}`}>
                                                        Mark Attendance
                                                    </Link>
                                                </Button>
                                                <Button variant="ghost" size="icon" asChild>
                                                    <Link href={`/tenant/class-sessions/${session.id}/edit`}>
                                                        <Pencil className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                    onClick={() => handleDelete(session.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {sessions.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-24 text-center text-muted-foreground italic">
                                            No class sessions found. Schedule a session to get started.
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
                        Showing {sessions.from ?? 0}–{sessions.to ?? 0} of {sessions.total} sessions
                    </p>
                    <div className="flex items-center gap-1">
                        {sessions.links.map((link: any, index: number) => (
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
