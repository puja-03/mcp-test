import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Plus, Trash2, CheckSquare, Calendar, Users, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const statusConfig: Record<string, { label: string; variant: 'default' | 'destructive' | 'secondary' | 'outline'; bg: string; color: string }> = {
    present: { label: 'Present', variant: 'default', bg: 'bg-emerald-500/10', color: 'text-emerald-600' },
    absent: { label: 'Absent', variant: 'destructive', bg: 'bg-destructive/10', color: 'text-destructive' },
    late: { label: 'Late', variant: 'secondary', bg: 'bg-amber-500/10', color: 'text-amber-600' },
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
            <Head title="Attendance Logs" />
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-muted/10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <CheckSquare className="h-6 w-6 text-primary" />
                            </div>
                            <h1 className="text-3xl font-black tracking-tight">Attendance Registry</h1>
                        </div>
                        <p className="text-muted-foreground font-medium">Track student presence, punctuality, and participation across sessions.</p>
                    </div>
                    <Button asChild className="h-12 px-6 shadow-lg shadow-primary/20 font-black uppercase tracking-widest text-[11px] gap-2">
                        <Link href="/tenant/attendances/create">
                            <Plus className="h-4 w-4" />
                            Mark New Attendance
                        </Link>
                    </Button>
                </div>

                {/* Advanced Filter Bar */}
                <div className="bg-card p-5 rounded-2xl border shadow-sm ring-1 ring-border/50">
                    <form onSubmit={handleFilter} className="flex flex-col lg:flex-row items-end gap-6">
                        <div className="flex-1 space-y-2 w-full">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Class Session</label>
                            <Select value={sessionId} onValueChange={setSessionId}>
                                <SelectTrigger className="h-11 bg-muted/30 border-muted-foreground/20 font-bold">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        <SelectValue placeholder="All Sessions" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="font-bold">All Recorded Sessions</SelectItem>
                                    {sessions.map((s: any) => (
                                        <SelectItem key={s.id} value={s.id.toString()} className="font-medium">
                                            {s.session_date ? new Date(s.session_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : s.session_date} — {s.batch?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full lg:w-[200px] space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="h-11 bg-muted/30 border-muted-foreground/20 font-bold uppercase text-[10px] tracking-widest">
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-3.5 h-3.5" />
                                        <SelectValue placeholder="All Status" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all" className="font-bold uppercase text-[10px] tracking-widest">All Status</SelectItem>
                                    <SelectItem value="present" className="font-bold uppercase text-[10px] tracking-widest text-emerald-600">Present</SelectItem>
                                    <SelectItem value="absent" className="font-bold uppercase text-[10px] tracking-widest text-destructive">Absent</SelectItem>
                                    <SelectItem value="late" className="font-bold uppercase text-[10px] tracking-widest text-amber-600">Late</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2 w-full lg:w-auto">
                            <Button type="submit" className="h-11 px-8 font-black uppercase tracking-wider text-[11px] shadow-sm">Apply Filters</Button>
                            {(sessionId !== 'all' || status !== 'all') && (
                                <Button type="button" variant="ghost" className="h-11 font-bold uppercase tracking-widest text-[10px]" onClick={() => {
                                    setSessionId('all');
                                    setStatus('all');
                                    router.get('/tenant/attendances', {}, { preserveState: true });
                                }}>
                                    Clear
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Attendance List Table */}
                <div className="rounded-2xl border bg-card shadow-xl overflow-hidden ring-1 ring-border/50">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/40">
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Session / Group</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Student Identity</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Status</th>
                                    <th className="h-14 px-6 text-left font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Observations</th>
                                    <th className="h-14 px-6 text-right font-black text-muted-foreground uppercase tracking-[0.2em] text-[10px]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {attendances.data.map((attendance: any) => {
                                    const cfg = statusConfig[attendance.status] ?? { label: attendance.status, variant: 'secondary' as const, bg: 'bg-muted', color: 'text-muted-foreground' };
                                    return (
                                        <tr key={attendance.id} className="group hover:bg-muted/30 transition-all duration-200">
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-primary/10">
                                                        <Calendar className="h-6 w-6" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-foreground text-sm">{attendance.class_session?.session_date ? new Date(attendance.class_session.session_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                                                        <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                                            <Users className="w-3 h-3" /> {attendance.class_session?.batch?.name || 'GEN-BATCH'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-foreground text-sm">{attendance.student?.name}</span>
                                                    <span className="text-[11px] text-muted-foreground font-medium">{attendance.student?.email}</span>
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <Badge className={`font-black uppercase text-[9px] tracking-[0.15em] px-3 py-1 border-none shadow-sm ${cfg.bg} ${cfg.color}`}>
                                                    {cfg.label}
                                                </Badge>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-start gap-2 max-w-[250px]">
                                                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" />
                                                    <p className="text-xs font-medium text-muted-foreground line-clamp-2 italic">
                                                        {attendance.remarks || 'No remarks provided.'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-6 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-9 w-9 rounded-lg border-muted-foreground/20 text-destructive hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                                                        onClick={() => handleDelete(attendance.id)}
                                                        title="Delete Record"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-primary/5 hover:text-primary">
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {attendances.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="h-60 text-center py-20">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="p-4 bg-muted rounded-full">
                                                    <CheckSquare className="h-10 w-10 text-muted-foreground/40" />
                                                </div>
                                                <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">No attendance data found</p>
                                                <Button asChild variant="outline" className="mt-2 h-10 font-bold uppercase tracking-widest text-[10px]">
                                                    <Link href="/tenant/attendances/create">Mark First Attendance</Link>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination Section */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-foreground">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        Displaying <span className="text-foreground">{attendances.from ?? 0}–{attendances.to ?? 0}</span> of <span className="text-foreground">{attendances.total}</span> Logged Records
                    </div>
                    <div className="flex items-center gap-1.5">
                        {attendances.links.map((link: any, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? 'default' : 'outline'}
                                size="sm"
                                disabled={!link.url}
                                className={`h-9 w-9 p-0 font-black text-[10px] transition-all ${link.active ? 'shadow-lg shadow-primary/20 scale-110 z-10' : 'hover:scale-105 hover:bg-muted/50'}`}
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

AttendancesIndex.layout = {
    breadcrumbs: [
        {
            title: 'Attendance',
            href: '/tenant/attendances',
        },
    ],
};
