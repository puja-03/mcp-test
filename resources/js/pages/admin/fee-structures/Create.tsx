import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        name: '',
        total_amount: '',
        installment_count: 1,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/fee-structures');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Create Fee Structure" />
            <h1 className="text-2xl font-bold mb-6">Create Fee Structure</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <select 
                        id="course_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.course_id}
                        onChange={e => setData('course_id', e.target.value)}
                    >
                        <option value="">Select a Course</option>
                        {courses.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="name">Plan Name</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="total_amount">Total Amount</Label>
                        <Input id="total_amount" type="number" step="0.01" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} />
                        {errors.total_amount && <div className="text-red-500 text-sm">{errors.total_amount}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="installment_count">Installment Count</Label>
                        <Input id="installment_count" type="number" min="1" value={data.installment_count} onChange={e => setData('installment_count', Number(e.target.value))} />
                        {errors.installment_count && <div className="text-red-500 text-sm">{errors.installment_count}</div>}
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Create Fee Structure</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
