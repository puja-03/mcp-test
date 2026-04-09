import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ session, batches }: any) {
    const { data, setData, put, processing, errors } = useForm({
        batch_id: session.batch_id || '',
        session_date: session.session_date || '',
        topic: session.topic || '',
        start_time: session.start_time || '',
        end_time: session.end_time || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/class-sessions/${session.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Class Session" />
            <h1 className="text-2xl font-bold mb-6">Edit Class Session</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="batch_id">Batch</Label>
                    <Input disabled value={batches.find((b:any)=>b.id === data.batch_id)?.name || ''} />
                    <div className="text-xs text-muted-foreground">Batch cannot be changed.</div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="session_date">Session Date</Label>
                    <Input id="session_date" type="date" value={data.session_date} onChange={e => setData('session_date', e.target.value)} />
                    {errors.session_date && <div className="text-red-500 text-sm">{errors.session_date}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input id="topic" value={data.topic} onChange={e => setData('topic', e.target.value)} />
                    {errors.topic && <div className="text-red-500 text-sm">{errors.topic}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start_time">Start Time</Label>
                        <Input id="start_time" type="time" step="1" value={data.start_time} onChange={e => setData('start_time', e.target.value)} />
                        {errors.start_time && <div className="text-red-500 text-sm">{errors.start_time}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end_time">End Time</Label>
                        <Input id="end_time" type="time" step="1" value={data.end_time} onChange={e => setData('end_time', e.target.value)} />
                        {errors.end_time && <div className="text-red-500 text-sm">{errors.end_time}</div>}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Session</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
