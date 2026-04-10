import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ course }: any) {
    const { data, setData, put, processing, errors } = useForm({ name: course.name||'', code: course.code||'', description: course.description||'', duration_months: course.duration_months||'', total_fees: course.total_fees||'', is_published: course.is_published??false });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Course Info" /><h1 className="text-2xl font-bold mb-6">Edit Course Info</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/instructor/courses/${course.slug}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Course Name</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Code</Label><Input value={data.code} onChange={e => setData('code', e.target.value)} /></div><div className="space-y-2"><Label>Duration (Months)</Label><Input type="number" value={data.duration_months} onChange={e => setData('duration_months', e.target.value)} /></div></div>
            <div className="space-y-2"><Label>Total Fees</Label><Input type="number" step="0.01" value={data.total_fees} onChange={e => setData('total_fees', e.target.value)} /></div>
            <div className="space-y-2"><Label>Description</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.description} onChange={e => setData('description', e.target.value)} /></div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} /><span>Published (Visible to students)</span></label>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
