import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ session, batches }: any) {
    const { data, setData, put, processing, errors } = useForm({ batch_id: session.batch_id||'', session_date: session.session_date||'', start_time: session.start_time||'', end_time: session.end_time||'', topic: session.topic||'' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Class Session" /><h1 className="text-2xl font-bold mb-6">Edit Class Session</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/class-sessions/${session.id}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Batch</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.batch_id} onChange={e => setData('batch_id', e.target.value)}><option value="">Select</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
            <div className="space-y-2"><Label>Date</Label><Input type="date" value={data.session_date} onChange={e => setData('session_date', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Start Time</Label><Input type="time" value={data.start_time} onChange={e => setData('start_time', e.target.value)} /></div><div className="space-y-2"><Label>End Time</Label><Input type="time" value={data.end_time} onChange={e => setData('end_time', e.target.value)} /></div></div>
            <div className="space-y-2"><Label>Topic Discussed (Optional)</Label><Input value={data.topic} onChange={e => setData('topic', e.target.value)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
