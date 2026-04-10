import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Edit({ topic, chapters }: { topic: any; chapters: any[] }) {
    const { data, setData, put, processing, errors } = useForm({
        chapters_id: topic.chapters_id.toString(),
        topic_title: topic.topic_title,
        content: topic.content || '',
        video_url: topic.video_url || '',
        order_index: topic.order_index.toString(),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/instructor/topics/${topic.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Topic" />
            <h1 className="text-3xl font-bold mb-6">Edit Topic</h1>
            <form onSubmit={submit} className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-2">
                    <Label htmlFor="chapters_id">Chapter</Label>
                    <Select defaultValue={data.chapters_id} onValueChange={(v) => setData('chapters_id', v)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select chapter" />
                        </SelectTrigger>
                        <SelectContent>
                            {chapters.map((c) => (
                                <SelectItem key={c.id} value={c.id.toString()}>{c.chapter_title} ({c.course?.name})</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.chapters_id && <p className="text-sm text-destructive">{errors.chapters_id}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="topic_title">Topic Title</Label>
                    <Input 
                        id="topic_title" 
                        value={data.topic_title} 
                        onChange={(e) => setData('topic_title', e.target.value)} 
                    />
                    {errors.topic_title && <p className="text-sm text-destructive">{errors.topic_title}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL (YouTube/Vimeo)</Label>
                    <Input 
                        id="video_url" 
                        value={data.video_url} 
                        onChange={(e) => setData('video_url', e.target.value)} 
                    />
                    {errors.video_url && <p className="text-sm text-destructive">{errors.video_url}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Text Content / Description</Label>
                    <Textarea 
                        id="content" 
                        value={data.content} 
                        onChange={(e) => setData('content', e.target.value)} 
                        rows={6}
                    />
                    {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
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
                    <Button disabled={processing} type="submit" className="flex-1">Update Topic</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()} className="flex-1">Cancel</Button>
                </div>
            </form>
        </div>
    );
}
