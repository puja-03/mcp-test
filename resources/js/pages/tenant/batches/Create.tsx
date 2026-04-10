import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({ course_id: '', name: '', start_date: '', end_date: '', max_students: '', status: 'active' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Batch" /><h1 className="text-2xl font-bold mb-6">Create Batch</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/batches'); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>{errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}</div>
            <div className="space-y-2"><Label>Name</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} />{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}</div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Start Date</Label><Input type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} /></div><div className="space-y-2"><Label>End Date</Label><Input type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} /></div></div>
            <div className="space-y-2"><Label>Max Students</Label><Input type="number" value={data.max_students} onChange={e => setData('max_students', e.target.value)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
