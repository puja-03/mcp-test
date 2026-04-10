import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ students, batches }: any) {
    const { data, setData, post, processing, errors } = useForm({ student_id: '', batch_id: '', enrollment_date: new Date().toISOString().split('T')[0], status: 'active' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Enrollment" /><h1 className="text-2xl font-bold mb-6">Create Enrollment</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/enrollments'); }} className="space-y-4">
            <div className="space-y-2"><Label>Student</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.student_id} onChange={e => setData('student_id', e.target.value)}><option value="">Select</option>{students.map((s:any)=><option key={s.id} value={s.id}>{s.name} ({s.email})</option>)}</select>{errors.student_id && <div className="text-red-500 text-sm">{errors.student_id}</div>}</div>
            <div className="space-y-2"><Label>Batch</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.batch_id} onChange={e => setData('batch_id', e.target.value)}><option value="">Select</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name} ({b.course?.name})</option>)}</select>{errors.batch_id && <div className="text-red-500 text-sm">{errors.batch_id}</div>}</div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Enrollment Date</Label><Input type="date" value={data.enrollment_date} onChange={e => setData('enrollment_date', e.target.value)} /></div>
                <div className="space-y-2"><Label>Status</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.status} onChange={e => setData('status', e.target.value)}><option value="active">Active</option><option value="completed">Completed</option><option value="dropped">Dropped</option><option value="suspended">Suspended</option></select></div>
            </div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
