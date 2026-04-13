import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function ClassSessionsEdit({ session, batches }: any) {
    const { data, setData, put, processing, errors } = useForm({
        batch_id: session.batch_id?.toString() || '',
        session_date: session.session_date || '',
        start_time: session.start_time || '',
        end_time: session.end_time || '',
        topic: session.topic || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/class-sessions/${session.id}`);
    };

    return (
        <>
            <Head title="Edit Class Session" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Calendar className="h-7 w-7 text-primary" />
                        Edit Class Session
                    </h1>
                    <p className="text-muted-foreground mt-1">Update session details</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Batch <span className="text-destructive">*</span></Label>
                            <Select defaultValue={data.batch_id} onValueChange={(v) => setData('batch_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a batch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {batches.map((b: any) => (
                                        <SelectItem key={b.id} value={b.id.toString()}>
                                            {b.name} — {b.course?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.batch_id && <p className="text-xs text-destructive">{errors.batch_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Session Date <span className="text-destructive">*</span></Label>
                            <Input
                                type="date"
                                value={data.session_date}
                                onChange={(e) => setData('session_date', e.target.value)}
                            />
                            {errors.session_date && <p className="text-xs text-destructive">{errors.session_date}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Time</Label>
                                <Input type="time" value={data.start_time} onChange={(e) => setData('start_time', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>End Time</Label>
                                <Input type="time" value={data.end_time} onChange={(e) => setData('end_time', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Topic Discussed (Optional)</Label>
                            <Input
                                value={data.topic}
                                onChange={(e) => setData('topic', e.target.value)}
                                placeholder="What was covered in this session?"
                            />
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
