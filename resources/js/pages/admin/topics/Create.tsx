import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create({ chapters, selected_chapter_id }: any) {
    const { data, setData, post, processing, errors } = useForm({
        chapters_id: selected_chapter_id || '',
        topic_title: '',
        content: '',
        video_url: '',
        order_index: 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/topics');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Create Topic" />
            <h1 className="text-2xl font-bold mb-6">Create Topic</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="chapters_id">Chapter</Label>
                    <select
                        id="chapters_id"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={data.chapters_id}
                        onChange={e => setData('chapters_id', e.target.value)}
                    >
                        <option value="">Select a Chapter</option>
                        {chapters.map((ch: any) => (
                            <option key={ch.id} value={ch.id}>{ch.chapter_title} ({ch.course?.name})</option>
                        ))}
                    </select>
                    {errors.chapters_id && <div className="text-red-500 text-sm">{errors.chapters_id}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="topic_title">Topic Title</Label>
                    <Input id="topic_title" value={data.topic_title} onChange={e => setData('topic_title', e.target.value)} />
                    {errors.topic_title && <div className="text-red-500 text-sm">{errors.topic_title}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="video_url">Video URL (optional)</Label>
                    <Input id="video_url" value={data.video_url} onChange={e => setData('video_url', e.target.value)} placeholder="https://youtube.com/..." />
                    {errors.video_url && <div className="text-red-500 text-sm">{errors.video_url}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="content">Content (optional)</Label>
                    <textarea
                        id="content"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={data.content}
                        onChange={e => setData('content', e.target.value)}
                    />
                    {errors.content && <div className="text-red-500 text-sm">{errors.content}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="order_index">Order Index</Label>
                    <Input id="order_index" type="number" value={data.order_index} onChange={e => setData('order_index', parseInt(e.target.value) || 0)} />
                    {errors.order_index && <div className="text-red-500 text-sm">{errors.order_index}</div>}
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Create Topic</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
