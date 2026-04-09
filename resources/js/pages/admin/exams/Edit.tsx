import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ exam, batches }: any) {
    const { data, setData, put, processing, errors } = useForm({
        batch_id: exam.batch_id || '',
        title: exam.title || '',
        description: exam.description || '',
        exam_date: exam.exam_date || '',
        max_marks: exam.max_marks || '',
        passing_marks: exam.passing_marks || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/exams/${exam.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Exam" />
            <h1 className="text-2xl font-bold mb-6">Edit Exam</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="batch_id">Batch</Label>
                    <select 
                        id="batch_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.batch_id}
                        onChange={e => setData('batch_id', e.target.value)}
                    >
                        <option value="">Select a Batch</option>
                        {batches.map((b: any) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    {errors.batch_id && <div className="text-red-500 text-sm">{errors.batch_id}</div>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="title">Exam Title</Label>
                    <Input id="title" value={data.title} onChange={e => setData('title', e.target.value)} />
                    {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="exam_date">Exam Date</Label>
                    <Input id="exam_date" type="date" value={data.exam_date} onChange={e => setData('exam_date', e.target.value)} />
                    {errors.exam_date && <div className="text-red-500 text-sm">{errors.exam_date}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="max_marks">Maximum Marks</Label>
                        <Input id="max_marks" type="number" step="0.01" value={data.max_marks} onChange={e => setData('max_marks', e.target.value as any)} />
                        {errors.max_marks && <div className="text-red-500 text-sm">{errors.max_marks}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="passing_marks">Passing Marks (Opt)</Label>
                        <Input id="passing_marks" type="number" step="0.01" value={data.passing_marks} onChange={e => setData('passing_marks', e.target.value as any)} />
                        {errors.passing_marks && <div className="text-red-500 text-sm">{errors.passing_marks}</div>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description (Opt)</Label>
                    <textarea 
                        id="description" 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)} 
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Exam</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
