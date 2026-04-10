import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ course, instructors }: any) {
    const { data, setData, put, processing, errors } = useForm({ name: course.name||'', code: course.code||'', description: course.description||'', duration_months: course.duration_months||'', total_fees: course.total_fees||'', is_active: course.is_active??true, is_published: course.is_published??false, user_id: course.user_id||'' });
    const submit = (e: React.FormEvent) => { e.preventDefault(); put(`/tenant/courses/${course.id}`); };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Course" />
            <h1 className="text-2xl font-bold mb-6">Edit Course</h1>
            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2"><Label>Course Name</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} />{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}</div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Code</Label><Input value={data.code} onChange={e => setData('code', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Duration</Label><Input type="number" value={data.duration_months} onChange={e => setData('duration_months', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Total Fees (₹)</Label><Input type="number" step="0.01" value={data.total_fees} onChange={e => setData('total_fees', e.target.value)} /></div>
                    <div className="space-y-2"><Label>Instructor</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.user_id} onChange={e => setData('user_id', e.target.value)}><option value="">None</option>{(instructors||[]).map((u:any) => <option key={u.id} value={u.id}>{u.name}</option>)}</select></div>
                </div>
                <div className="space-y-2"><Label>Description</Label><textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.description} onChange={e => setData('description', e.target.value)} /></div>
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} /><span>Active</span></label>
                    <label className="flex items-center gap-2"><input type="checkbox" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} /><span>Published</span></label>
                </div>
                <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
            </form>
        </div>
    );
}
