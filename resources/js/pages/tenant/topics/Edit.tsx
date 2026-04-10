import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ topic, chapters }: any) {
    const { data, setData, put, processing, errors } = useForm({ chapters_id: topic.chapters_id||'', topic_title: topic.topic_title||'', content: topic.content||'', video_url: topic.video_url||'', order_index: topic.order_index||0 });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Topic" /><h1 className="text-2xl font-bold mb-6">Edit Topic</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/topics/${topic.id}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Chapter</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.chapters_id} onChange={e => setData('chapters_id', e.target.value)}><option value="">Select</option>{chapters.map((ch:any)=><option key={ch.id} value={ch.id}>{ch.chapter_title} ({ch.course?.name})</option>)}</select></div>
            <div className="space-y-2"><Label>Topic Title</Label><Input value={data.topic_title} onChange={e => setData('topic_title', e.target.value)} /></div>
            <div className="space-y-2"><Label>Video URL</Label><Input value={data.video_url} onChange={e => setData('video_url', e.target.value)} /></div>
            <div className="space-y-2"><Label>Content</Label><textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.content} onChange={e => setData('content', e.target.value)} /></div>
            <div className="space-y-2"><Label>Order</Label><Input type="number" value={data.order_index} onChange={e => setData('order_index', parseInt(e.target.value)||0)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
