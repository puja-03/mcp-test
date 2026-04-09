import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create({ batches, students }: any) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        batch_id: '',
        enrollment_date: new Date().toISOString().split('T')[0],
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/enrollments');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Create Enrollment" />
            <h1 className="text-2xl font-bold mb-6">Create Enrollment</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="student_id">Student</Label>
                    <select 
                        id="student_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.student_id}
                        onChange={e => setData('student_id', e.target.value)}
                    >
                        <option value="">Select a Student</option>
                        {students.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                        ))}
                    </select>
                    {errors.student_id && <div className="text-red-500 text-sm">{errors.student_id}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="batch_id">Batch</Label>
                    <select 
                        id="batch_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.batch_id}
                        onChange={e => setData('batch_id', e.target.value)}
                    >
                        <option value="">Select a Batch</option>
                        {batches.map((b: any) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    {errors.batch_id && <div className="text-red-500 text-sm">{errors.batch_id}</div>}
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
                    <Button disabled={processing} type="submit">Enroll Student</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
