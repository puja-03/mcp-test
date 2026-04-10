import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ chapter, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({ course_id: chapter.course_id||'', chapter_title: chapter.chapter_title||'', order_index: chapter.order_index||0 });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Chapter" /><h1 className="text-2xl font-bold mb-6">Edit Chapter</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/chapters/${chapter.id}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="space-y-2"><Label>Chapter Title</Label><Input value={data.chapter_title} onChange={e => setData('chapter_title', e.target.value)} /></div>
            <div className="space-y-2"><Label>Order</Label><Input type="number" value={data.order_index} onChange={e => setData('order_index', parseInt(e.target.value)||0)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
