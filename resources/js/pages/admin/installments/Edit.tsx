import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ installment, enrollments, feeStructures }: any) {
    const { data, setData, put, processing, errors } = useForm({
        enrollment_id: installment.enrollment_id || '',
        fee_structure_id: installment.fee_structure_id || '',
        due_date: installment.due_date || '',
        amount: installment.amount || '',
        status: installment.status || 'pending',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/installments/${installment.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Installment" />
            <h1 className="text-2xl font-bold mb-6">Edit Installment</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Enrollment</Label>
                    <Input disabled value={enrollments.find((e:any)=>e.id === data.enrollment_id)?.student?.name || ''} />
                    <div className="text-xs text-muted-foreground">Enrollment cannot be changed.</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input id="due_date" type="date" value={data.due_date} onChange={e => setData('due_date', e.target.value)} />
                        {errors.due_date && <div className="text-red-500 text-sm">{errors.due_date}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" step="0.01" value={data.amount} onChange={e => setData('amount', e.target.value)} />
                        {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select 
                        id="status" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="waived">Waived</option>
                    </select>
                    {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Installment</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
