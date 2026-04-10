import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ feeStructure, courses }: any) {
    const { data, setData, put, processing, errors } = useForm({ course_id: feeStructure.course_id||'', name: feeStructure.name||'', total_amount: feeStructure.total_amount||'', installment_count: feeStructure.installment_count||1 });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Fee Structure" /><h1 className="text-2xl font-bold mb-6">Edit Fee Structure</h1>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/fee-structures/${feeStructure.id}`); }} className="space-y-4">
            <div className="space-y-2"><Label>Course</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.course_id} onChange={e => setData('course_id', e.target.value)}><option value="">Select</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
            <div className="space-y-2"><Label>Plan Name</Label><Input value={data.name} onChange={e => setData('name', e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Total Amount (₹)</Label><Input type="number" step="0.01" value={data.total_amount} onChange={e => setData('total_amount', e.target.value)} /></div><div className="space-y-2"><Label>Max Installments</Label><Input type="number" min="1" value={data.installment_count} onChange={e => setData('installment_count', parseInt(e.target.value)||1)} /></div></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
