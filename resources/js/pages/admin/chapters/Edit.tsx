import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ chapter, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: chapter.course_id || '',
        chapter_title: chapter.chapter_title || '',
        order_index: chapter.order_index || 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/chapters/${chapter.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Chapter" />
            <h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <select
                        id="course_id"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={data.course_id}
                        onChange={e => setData('course_id', e.target.value)}
                    >
                        <option value="">Select a Course</option>
                        {courses.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="chapter_title">Chapter Title</Label>
                    <Input id="chapter_title" value={data.chapter_title} onChange={e => setData('chapter_title', e.target.value)} />
                    {errors.chapter_title && <div className="text-red-500 text-sm">{errors.chapter_title}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="order_index">Order Index</Label>
                    <Input id="order_index" type="number" value={data.order_index} onChange={e => setData('order_index', parseInt(e.target.value) || 0)} />
                    {errors.order_index && <div className="text-red-500 text-sm">{errors.order_index}</div>}
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Chapter</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
