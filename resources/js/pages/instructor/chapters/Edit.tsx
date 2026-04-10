import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Edit({ chapter, courses }: { chapter: any; courses: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: chapter.course_id.toString(),
        chapter_title: chapter.chapter_title,
        order_index: chapter.order_index.toString(),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/instructor/chapters/${chapter.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Chapter" />
            <h1 className="text-3xl font-bold mb-6">Edit Chapter</h1>
            <form onSubmit={submit} className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <Select defaultValue={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                            {courses.map((c) => (
                                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.course_id && <p className="text-sm text-destructive">{errors.course_id}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="chapter_title">Chapter Title</Label>
                    <Input 
                        id="chapter_title" 
                        value={data.chapter_title} 
                        onChange={(e) => setData('chapter_title', e.target.value)} 
                    />
                    {errors.chapter_title && <p className="text-sm text-destructive">{errors.chapter_title}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="order_index">Order Index</Label>
                    <Input 
                        id="order_index" 
                        type="number" 
                        value={data.order_index} 
                        onChange={(e) => setData('order_index', e.target.value)} 
                    />
                    {errors.order_index && <p className="text-sm text-destructive">{errors.order_index}</p>}
                </div>

                <div className="flex gap-4 pt-4">
                    <Button disabled={processing} type="submit" className="flex-1">Update Chapter</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()} className="flex-1">Cancel</Button>
                </div>
            </form>
        </div>
    );
}
