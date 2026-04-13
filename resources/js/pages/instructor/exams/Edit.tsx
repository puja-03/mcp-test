import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileEdit } from 'lucide-react';

export default function ExamsEdit({ exam, batches }: any) {
    const { data, setData, put, processing, errors } = useForm({
        batch_id: exam.batch_id?.toString() || '',
        title: exam.title || '',
        description: exam.description || '',
        exam_date: exam.exam_date || '',
        max_marks: exam.max_marks?.toString() || '',
        passing_marks: exam.passing_marks?.toString() || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/instructor/exams/${exam.id}`);
    };

    return (
        <>
            <Head title="Edit Exam" />
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
                        <FileEdit className="h-7 w-7 text-primary" />
                        Edit Exam
                    </h1>
                    <p className="text-muted-foreground mt-1">Update exam details</p>
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
                            <Label>Exam Title <span className="text-destructive">*</span></Label>
                            <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                            />
                            {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <textarea
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Exam Date</Label>
                                <Input type="date" value={data.exam_date} onChange={(e) => setData('exam_date', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Max Marks <span className="text-destructive">*</span></Label>
                                <Input type="number" step="0.01" value={data.max_marks} onChange={(e) => setData('max_marks', e.target.value)} />
                                {errors.max_marks && <p className="text-xs text-destructive">{errors.max_marks}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Passing Marks</Label>
                                <Input type="number" step="0.01" value={data.passing_marks} onChange={(e) => setData('passing_marks', e.target.value)} />
                            </div>
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
