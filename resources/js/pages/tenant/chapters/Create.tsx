import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({ course_id: '', chapter_title: '', order_index: 0 });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Chapter" /><h1 className="text-2xl font-bold mb-6">Create Chapter</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/chapters'); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>{errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}</div>
            <div className="space-y-2"><Label>Chapter Title</Label><Input value={data.chapter_title} onChange={e => setData('chapter_title', e.target.value)} />{errors.chapter_title && <div className="text-red-500 text-sm">{errors.chapter_title}</div>}</div>
            <div className="space-y-2"><Label>Order</Label><Input type="number" value={data.order_index} onChange={e => setData('order_index', parseInt(e.target.value)||0)} /></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
