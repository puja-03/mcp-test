import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ batches }: any) {
    const { data, setData, post, processing, errors } = useForm({ batch_id: '', title: '', description: '', exam_date: new Date().toISOString().split('T')[0], max_marks: '', passing_marks: '' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Exam" /><h1 className="text-2xl font-bold mb-6">Create Exam</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/exams'); }} className="space-y-4">
            <div className="space-y-2"><Label>Batch</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.batch_id} onChange={e => setData('batch_id', e.target.value)}><option value="">Select</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name}</option>)}</select>{errors.batch_id && <div className="text-red-500 text-sm">{errors.batch_id}</div>}</div>
            <div className="space-y-2"><Label>Title</Label><Input value={data.title} onChange={e => setData('title', e.target.value)} />{errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}</div>
            <div className="space-y-2"><Label>Description (Optional)</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.description} onChange={e => setData('description', e.target.value)} /></div>
            <div className="grid grid-cols-3 gap-4"><div className="space-y-2"><Label>Date</Label><Input type="date" value={data.exam_date} onChange={e => setData('exam_date', e.target.value)} /></div><div className="space-y-2"><Label>Max Marks</Label><Input type="number" step="0.01" value={data.max_marks} onChange={e => setData('max_marks', e.target.value)} /></div><div className="space-y-2"><Label>Passing Marks</Label><Input type="number" step="0.01" value={data.passing_marks} onChange={e => setData('passing_marks', e.target.value)} /></div></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
