import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Create({ chapters, selected_chapter_id }: { chapters: any[]; selected_chapter_id: any }) {
    const { data, setData, post, processing, errors } = useForm({
        chapters_id: selected_chapter_id?.toString() || '',
        topic_title: '',
        content: '',
        video_url: '',
        order_index: '0',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/instructor/topics');
    };

    return (
        <>
            <Head title="Create Topic" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add New Topic</h1>
                        <p className="text-muted-foreground mt-1">Create an engaging learning module with videos and text.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="max-w-3xl bg-card rounded-xl shadow-sm border p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="chapters_id">Select Chapter</Label>
                            <Select defaultValue={data.chapters_id} onValueChange={(v) => setData('chapters_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a chapter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {chapters.map((c) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.chapter_title} ({c.course?.name})</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.chapters_id && <p className="text-sm text-destructive">{errors.chapters_id}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="topic_title">Topic Title</Label>
                            <Input 
                                id="topic_title" 
                                value={data.topic_title} 
                                onChange={(e) => setData('topic_title', e.target.value)} 
                                placeholder="e.g. Newton's First Law"
                            />
                            {errors.topic_title && <p className="text-sm text-destructive">{errors.topic_title}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="video_url">Video URL (Optional)</Label>
                            <Input 
                                id="video_url" 
                                value={data.video_url} 
                                onChange={(e) => setData('video_url', e.target.value)} 
                                placeholder="https://youtube.com/watch?v=..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">Supports YouTube, Vimeo, or direct video links.</p>
                            {errors.video_url && <p className="text-sm text-destructive">{errors.video_url}</p>}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="content">Text Content / Notes</Label>
                            <Textarea 
                                id="content" 
                                className="min-h-[200px]"
                                value={data.content} 
                                onChange={(e) => setData('content', e.target.value)} 
                                placeholder="Write your detailed explanation, study notes, or video transcript here..."
                            />
                            {errors.content && <p className="text-sm text-destructive">{errors.content}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order_index">Display Order</Label>
                            <Input 
                                id="order_index" 
                                type="number" 
                                value={data.order_index} 
                                onChange={(e) => setData('order_index', e.target.value)} 
                            />
                            <p className="text-xs text-muted-foreground mt-1">Order within the chapter.</p>
                            {errors.order_index && <p className="text-sm text-destructive">{errors.order_index}</p>}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button disabled={processing} type="submit" className="flex-1">
                            Publish Topic
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
