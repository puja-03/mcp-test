import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        code: '',
        description: '',
        duration_months: '',
        total_fees: '',
        is_published: false
    });

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Create Course" />
            <h1 className="text-2xl font-bold mb-6">Create Course</h1>
            <form onSubmit={e => { e.preventDefault(); post(`/instructor/courses`); }} className="space-y-4">
                <div className="space-y-2">
                    <Label>Course Name</Label>
                    <Input value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Code</Label>
                        <Input value={data.code} onChange={e => setData('code', e.target.value)} />
                        {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Duration (Months)</Label>
                        <Input type="number" value={data.duration_months} onChange={e => setData('duration_months', e.target.value)} />
                        {errors.duration_months && <p className="text-sm text-red-500">{errors.duration_months}</p>}
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Total Fees</Label>
                    <Input type="number" step="0.01" value={data.total_fees} onChange={e => setData('total_fees', e.target.value)} />
                    {errors.total_fees && <p className="text-sm text-red-500">{errors.total_fees}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Description</Label>
                    <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm" value={data.description} onChange={e => setData('description', e.target.value)} />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>
                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} />
                    <span>Published (Visible to students)</span>
                </label>
                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Create</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
