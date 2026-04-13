import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

export default function TopicsCreate({ chapters, selected_chapter_id }: any) {
    const { data, setData, post, processing, errors } = useForm({
        chapters_id: selected_chapter_id?.toString() || '',
        topic_title: '',
        content: '',
        video_url: '',
        order_index: 1,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/topics');
    };

    return (
        <>
            <Head title="Create Topic" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight">
                        <span className="text-primary mr-2">📝</span>Create Topic
                    </h1>
                    <p className="text-muted-foreground mt-1">Add a new lesson topic to a chapter</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Chapter <span className="text-destructive">*</span></Label>
                            <Select defaultValue={data.chapters_id} onValueChange={(v) => setData('chapters_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a chapter" />
                                </SelectTrigger>
                                <SelectContent>
                                    {chapters.map((ch: any) => (
                                        <SelectItem key={ch.id} value={ch.id.toString()}>
                                            {ch.chapter_title} — {ch.course?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.chapters_id && <p className="text-xs text-destructive">{errors.chapters_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Topic Title <span className="text-destructive">*</span></Label>
                            <Input
                                value={data.topic_title}
                                onChange={(e) => setData('topic_title', e.target.value)}
                                placeholder="e.g. Differentiation Rules"
                            />
                            {errors.topic_title && <p className="text-xs text-destructive">{errors.topic_title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Video URL (Optional)</Label>
                            <Input
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                placeholder="https://youtube.com/..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Content / Notes (Optional)</Label>
                            <textarea
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring placeholder:text-muted-foreground"
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                placeholder="Lesson notes, text content..."
                            />
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
                                {processing ? 'Creating...' : 'Create Topic'}
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
