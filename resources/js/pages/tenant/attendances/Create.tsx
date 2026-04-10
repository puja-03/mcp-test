import { Head, useForm, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label'; import { useEffect, useState } from 'react';
export default function Create({ sessions, students, selected_session_id }: any) {
    const [sessionId, setSessionId] = useState(selected_session_id || '');
    const { data, setData, post, processing, reset } = useForm({ class_session_id: sessionId, student_id: '', status: 'present', remarks: '' });
    
    useEffect(() => { if (sessionId !== selected_session_id) router.get('/tenant/attendances/create', { session_id: sessionId }, { preserveState: true }); }, [sessionId]);

    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Mark Attendance" /><h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>
        <div className="space-y-4 mb-6">
            <div className="space-y-2"><Label>Select Session to Load Students</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={sessionId} onChange={e => {setSessionId(e.target.value); setData('class_session_id', e.target.value);}}><option value="">Select Session</option>{sessions.map((s:any)=><option key={s.id} value={s.id}>{s.session_date} - {s.batch?.name}</option>)}</select></div>
        </div>
        {sessionId && students.length > 0 && (
            <form onSubmit={e => { e.preventDefault(); post('/tenant/attendances', { onSuccess: () => reset('student_id', 'remarks') }); }} className="space-y-4 border top-2 p-4 rounded bg-card">
                <div className="space-y-2"><Label>Student</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.student_id} onChange={e => setData('student_id', e.target.value)} required><option value="">Select Student</option>{students.map((s:any)=><option key={s.id} value={s.id}>{s.name} ({s.email})</option>)}</select></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Status</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.status} onChange={e => setData('status', e.target.value as any)}><option value="present">Present</option><option value="absent">Absent</option><option value="late">Late</option></select></div><div className="space-y-2"><Label>Remarks</Label><Input value={data.remarks} onChange={e => setData('remarks', e.target.value)} /></div></div>
                <Button disabled={processing} type="submit">Save Attendance</Button>
            </form>
        )}
        {sessionId && students.length === 0 && <p className="text-muted-foreground">No students enrolled in this session's batch.</p>}
    </div>);
}
