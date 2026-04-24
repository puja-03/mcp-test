import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Create({ courses }: { courses: any[] }) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        chapter_title: '',
        order_index: '0',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/instructor/chapters');
    };

    return (
        <>
            <Head title="Create Chapter" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add New Chapter</h1>
                        <p className="text-muted-foreground mt-1">Organize your course content into logical chapters.</p>
                    </div>
                </div>
                
                <form onSubmit={submit} className="max-w-2xl bg-card rounded-xl shadow-sm border p-6 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="course_id">Select Course</Label>
                        <Select onValueChange={(v) => setData('course_id', v)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose a course to add this chapter to" />
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
                            placeholder="e.g. Introduction to Core Concepts"
                        />
                        {errors.chapter_title && <p className="text-sm text-destructive">{errors.chapter_title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="order_index">Display Order</Label>
                        <Input 
                            id="order_index" 
                            type="number" 
                            className="w-full md:w-1/3"
                            value={data.order_index} 
                            onChange={(e) => setData('order_index', e.target.value)} 
                        />
                        <p className="text-xs text-muted-foreground mt-1">Lower numbers will be displayed first.</p>
                        {errors.order_index && <p className="text-sm text-destructive">{errors.order_index}</p>}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button disabled={processing} type="submit" className="flex-1">
                            Create Chapter
                        </Button>
                        <Button variant="outline" type="button" onClick={() => history.back()} className="flex-1">
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
