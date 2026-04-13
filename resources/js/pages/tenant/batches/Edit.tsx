import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users } from 'lucide-react';

export default function BatchesEdit({ batch, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: batch.course_id?.toString() || '',
        name: batch.name || '',
        start_date: batch.start_date || '',
        end_date: batch.end_date || '',
        max_students: batch.max_students?.toString() || '',
        is_active: batch.is_active ?? true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/batches/${batch.id}`);
    };

    return (
        <>
            <Head title="Edit Batch" />
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
                        <Users className="h-7 w-7 text-primary" />
                        Edit Batch
                    </h1>
                    <p className="text-muted-foreground mt-1">Update batch details</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Course <span className="text-destructive">*</span></Label>
                            <Select defaultValue={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.course_id && <p className="text-xs text-destructive">{errors.course_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Batch Name <span className="text-destructive">*</span></Label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Date</Label>
                                <Input type="date" value={data.start_date} onChange={(e) => setData('start_date', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>End Date</Label>
                                <Input type="date" value={data.end_date} onChange={(e) => setData('end_date', e.target.value)} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Max Students (Optional)</Label>
                            <Input
                                type="number"
                                min="1"
                                value={data.max_students}
                                onChange={(e) => setData('max_students', e.target.value)}
                                placeholder="Leave blank for unlimited"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">Mark as Active</Label>
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
