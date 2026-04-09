import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ attendance }: any) {
    const { data, setData, put, processing, errors } = useForm({
        status: attendance.status || 'present',
        remarks: attendance.remarks || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/attendances/${attendance.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Attendance" />
            <h1 className="text-2xl font-bold mb-6">Edit Attendance</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Class Session</Label>
                    <Input disabled value={`${attendance.class_session?.session_date} — ${attendance.class_session?.batch?.name}`} />
                </div>
                
                <div className="space-y-2">
                    <Label>Student</Label>
                    <Input disabled value={`${attendance.student?.name} (${attendance.student?.email})`} />
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
                    <Button disabled={processing} type="submit">Update Attendance</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
