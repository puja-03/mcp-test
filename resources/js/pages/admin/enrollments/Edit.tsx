import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ enrollment, batches, students }: any) {
    const { data, setData, put, processing, errors } = useForm({
        student_id: enrollment.student_id || '',
        batch_id: enrollment.batch_id || '',
        enrollment_date: enrollment.enrollment_date || '',
        status: enrollment.status || 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/enrollments/${enrollment.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Enrollment" />
            <h1 className="text-2xl font-bold mb-6">Edit Enrollment</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Student</Label>
                    <Input disabled value={students.find((s:any)=>s.id === data.student_id)?.name || ''} />
                    <div className="text-xs text-muted-foreground">Student cannot be changed after enrollment. Delete and recreate if needed.</div>
                </div>

                <div className="space-y-2">
                    <Label>Batch</Label>
                    <Input disabled value={batches.find((b:any)=>b.id === data.batch_id)?.name || ''} />
                    <div className="text-xs text-muted-foreground">Batch cannot be changed after enrollment.</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="enrollment_date">Enrollment Date</Label>
                        <Input id="enrollment_date" type="date" value={data.enrollment_date} onChange={e => setData('enrollment_date', e.target.value)} />
                        {errors.enrollment_date && <div className="text-red-500 text-sm">{errors.enrollment_date}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <select 
                            id="status" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="dropped">Dropped</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Enrollment</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
