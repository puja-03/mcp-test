import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Create({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({ course_id: '', name: '', total_amount: '', installment_count: 1 });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Create Fee Structure" /><h1 className="text-2xl font-bold mb-6">Create Fee Structure</h1>
        <form onSubmit={e => { e.preventDefault(); post('/tenant/fee-structures'); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>{errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}</div>
            <div className="space-y-2"><Label>Plan Name (e.g. Regular, EMI)</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} />{errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}</div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Total Amount (₹)</Label><Input type="number" step="0.01" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} /></div><div className="space-y-2"><Label>Max Installments</Label><Input type="number" min="1" value={data.installment_count} onChange={e => setData('installment_count', parseInt(e.target.value)||1)} /></div></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Create</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
