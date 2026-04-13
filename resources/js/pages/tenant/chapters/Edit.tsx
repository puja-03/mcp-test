import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function ChaptersEdit({ chapter, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: chapter.course_id?.toString() || '',
        chapter_title: chapter.chapter_title || '',
        order_index: chapter.order_index || 1,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/chapters/${chapter.id}`);
    };

    return (
        <>
            <Head title="Edit Chapter" />
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
                        <BookOpen className="h-7 w-7 text-primary" />
                        Edit Chapter
                    </h1>
                    <p className="text-muted-foreground mt-1">Update chapter details</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Course</Label>
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
                        </div>

                        <div className="space-y-2">
                            <Label>Chapter Title <span className="text-destructive">*</span></Label>
                            <Input
                                value={data.chapter_title}
                                onChange={(e) => setData('chapter_title', e.target.value)}
                            />
                            {errors.chapter_title && <p className="text-xs text-destructive">{errors.chapter_title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Order</Label>
                            <Input
                                type="number"
                                min="1"
                                value={data.order_index}
                                onChange={(e) => setData('order_index', parseInt(e.target.value) || 1)}
                                className="w-32"
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
