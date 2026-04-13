import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AttendancesCreate({ sessions, students, selected_session_id }: any) {
    const [sessionId, setSessionId] = useState<string>(selected_session_id?.toString() || '');
    const { data, setData, post, processing, reset } = useForm({
        class_session_id: sessionId,
        student_id: '',
        status: 'present',
        remarks: '',
    });

    useEffect(() => {
        if (sessionId && sessionId !== selected_session_id?.toString()) {
            router.get('/instructor/attendances/create', { session_id: sessionId }, { preserveState: true, preserveScroll: true });
        }
    }, [sessionId]);

    const handleSessionChange = (val: string) => {
        setSessionId(val);
        setData('class_session_id', val);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/instructor/attendances', {
            onSuccess: () => reset('student_id', 'remarks'),
        });
    };

    const selectedSession = sessions.find((s: any) => s.id.toString() === sessionId);

    return (
        <>
            <Head title="Mark Attendance" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <CheckSquare className="h-7 w-7 text-primary" />
                        Mark Attendance
                    </h1>
                    <p className="text-muted-foreground mt-1">Record student attendance for a class session</p>
                </div>

                {/* Step 1: Pick session */}
                <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
                    <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Step 1 — Select Session</h2>
                    <div className="space-y-2">
                        <Label>Class Session</Label>
                        <Select value={sessionId} onValueChange={handleSessionChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a session..." />
                            </SelectTrigger>
                            <SelectContent>
                                {sessions.map((s: any) => (
                                    <SelectItem key={s.id} value={s.id.toString()}>
                                        {s.session_date ? new Date(s.session_date).toLocaleDateString() : s.session_date} — {s.batch?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedSession && (
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline">{selectedSession.batch?.name}</Badge>
                            <Badge variant="outline">{selectedSession.batch?.course?.name}</Badge>
                            {selectedSession.start_time && (
                                <Badge variant="secondary">{selectedSession.start_time} – {selectedSession.end_time}</Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Step 2: Mark attendance */}
                {sessionId && students.length > 0 && (
                    <div className="rounded-xl border bg-card shadow-sm p-6">
                        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Step 2 — Mark Student</h2>
                        <form onSubmit={submit} className="space-y-5">
                            <div className="space-y-2">
                                <Label>Student <span className="text-destructive">*</span></Label>
                                <Select value={data.student_id} onValueChange={(v) => setData('student_id', v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select student..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((s: any) => (
                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                {s.name} — {s.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Status</Label>
                                    <Select defaultValue="present" onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="present">✅ Present</SelectItem>
                                            <SelectItem value="absent">❌ Absent</SelectItem>
                                            <SelectItem value="late">⏰ Late</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Remarks (Optional)</Label>
                                    <Input
                                        value={data.remarks}
                                        onChange={(e) => setData('remarks', e.target.value)}
                                        placeholder="Any notes..."
                                    />
                                </div>
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Attendance'}
                            </Button>
                        </form>
                    </div>
                )}

                {sessionId && students.length === 0 && (
                    <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
                        No students enrolled in this session's batch.
                    </div>
                )}
            </div>
        </>
    );
}
