import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Create({ sessions, students, selected_session_id }: any) {
    const { data, setData, post, processing, errors } = useForm({
        class_session_id: selected_session_id || '',
        student_id: '',
        status: 'present',
        remarks: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/attendances', {
            onSuccess: () => {
                // reset student selection after successful mark
                setData('student_id', '');
            }
        });
    };

    const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setData('class_session_id', val);
        router.get('/admin/attendances/create', { class_session_id: val }, { preserveState: true });
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Mark Attendance" />
            <h1 className="text-2xl font-bold mb-6">Mark Attendance</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="class_session_id">Class Session</Label>
                    <select 
                        id="class_session_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.class_session_id}
                        onChange={handleSessionChange}
                    >
                        <option value="">Select a Session</option>
                        {sessions.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.session_date} — {s.batch?.name} ({s.topic || 'No topic'})</option>
                        ))}
                    </select>
                    {errors.class_session_id && <div className="text-red-500 text-sm">{errors.class_session_id}</div>}
                </div>
                
                {data.class_session_id && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="student_id">Student</Label>
                            <select 
                                id="student_id" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={data.student_id}
                                onChange={e => setData('student_id', e.target.value)}
                            >
                                <option value="">Select a Student</option>
                                {students?.map((s: any) => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                                ))}
                            </select>
                            {errors.student_id && <div className="text-red-500 text-sm">{errors.student_id}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select 
                                id="status" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={data.status}
                                onChange={e => setData('status', e.target.value)}
                            >
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                                <option value="late">Late</option>
                                <option value="excused">Excused</option>
                            </select>
                            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="remarks">Remarks</Label>
                            <textarea 
                                id="remarks" 
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                value={data.remarks}
                                onChange={e => setData('remarks', e.target.value)} 
                            />
                            {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button disabled={processing || !data.student_id} type="submit">Mark Attendance</Button>
                            <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
