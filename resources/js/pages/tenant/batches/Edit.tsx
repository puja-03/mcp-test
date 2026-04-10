import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ batch, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({ course_id: batch.course_id||'', name: batch.name||'', start_date: batch.start_date||'', end_date: batch.end_date||'', max_students: batch.max_students||'', status: batch.status||'active' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Batch" /><h1 className="text-2xl font-bold mb-6">Edit Batch</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/batches/${batch.id}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="space-y-2"><Label>Name</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Start Date</Label><Input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} /></div><div className="space-y-2"><Label>End Date</Label><Input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} /></div></div>
            <div className="space-y-2"><Label>Max Students</Label><Input type="number" value={data.max_students} onChange={e => setData('max_students', e.target.value)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
