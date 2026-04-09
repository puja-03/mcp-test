import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ course }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: course.name || '',
        code: course.code || '',
        description: course.description || '',
        duration_months: course.duration_months || '',
        total_fees: course.total_fees || '',
        is_active: course.is_active ?? true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/courses/${course.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Course" />
            <h1 className="text-2xl font-bold mb-6">Edit Course</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="code">Course Code</Label>
                        <Input id="code" value={data.code} onChange={e => setData('code', e.target.value)} />
                        {errors.code && <div className="text-red-500 text-sm">{errors.code}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="duration_months">Duration (Months)</Label>
                        <Input id="duration_months" type="number" value={data.duration_months} onChange={e => setData('duration_months', e.target.value)} />
                        {errors.duration_months && <div className="text-red-500 text-sm">{errors.duration_months}</div>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="total_fees">Total Fees</Label>
                    <Input id="total_fees" type="number" step="0.01" value={data.total_fees} onChange={e => setData('total_fees', e.target.value)} />
                    {errors.total_fees && <div className="text-red-500 text-sm">{errors.total_fees}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                        id="description" 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={data.description} 
                        onChange={e => setData('description', e.target.value)} 
                    />
                    {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                </div>

                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                    <span>Is Active</span>
                </label>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Course</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
