import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ batches }: any) {
    const { data, setData, post, processing, errors } = useForm({ batch_id: '', session_date: new Date().toISOString().split('T')[0], start_time: '', end_time: '', topic: '' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Class Session" /><h1 className="text-2xl font-bold mb-6">Create Class Session</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/class-sessions'); }} className="space-y-4">
            <div className="space-y-2"><Label>Batch</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.batch_id} onChange={e => setData('batch_id', e.target.value)}><option value="">Select</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name}</option>)}</select>{errors.batch_id && <div className="text-red-500 text-sm">{errors.batch_id}</div>}</div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" value={data.session_date} onChange={e => setData('session_date', e.target.value)} />{errors.session_date && <div className="text-red-500 text-sm">{errors.session_date}</div>}</div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Start Time</Label><Input type="time" value={data.start_time} onChange={e => setData('start_time', e.target.value)} /></div><div className="space-y-2"><Label>End Time</Label><Input type="time" value={data.end_time} onChange={e => setData('end_time', e.target.value)} /></div></div>
            <div className="space-y-2"><Label>Topic Discussed (Optional)</Label><Input value={data.topic} onChange={e => setData('topic', e.target.value)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
