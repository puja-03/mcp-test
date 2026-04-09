import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ payment, enrollments }: any) {
    const { data, setData, put, processing, errors } = useForm({
        amount: payment.amount || '',
        payment_date: payment.payment_date || '',
        payment_method: payment.payment_method || 'cash',
        transaction_id: payment.transaction_id || '',
        receipt_number: payment.receipt_number || '',
        notes: payment.notes || '',
        status: payment.status || 'completed',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/payments/${payment.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Payment" />
            <h1 className="text-2xl font-bold mb-6">Edit Payment</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Enrollment (Student)</Label>
                    <Input disabled value={enrollments.find((e:any)=>e.id === payment.enrollment_id)?.student?.name || ''} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" step="0.01" value={data.amount} onChange={e => setData('amount', e.target.value)} />
                        {errors.amount && <div className="text-red-500 text-sm">{errors.amount}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="payment_date">Payment Date</Label>
                        <Input id="payment_date" type="date" value={data.payment_date} onChange={e => setData('payment_date', e.target.value)} />
                        {errors.payment_date && <div className="text-red-500 text-sm">{errors.payment_date}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <select 
                            id="payment_method" 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                            value={data.payment_method}
                            onChange={e => setData('payment_method', e.target.value)}
                        >
                            <option value="cash">Cash</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="upi">UPI/Other</option>
                        </select>
                        {errors.payment_method && <div className="text-red-500 text-sm">{errors.payment_method}</div>}
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
                            <option value="completed">Completed</option>
                            <option value="failed">Failed</option>
                            <option value="refunded">Refunded</option>
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="receipt_number">Receipt Number</Label>
                        <Input id="receipt_number" value={data.receipt_number} onChange={e => setData('receipt_number', e.target.value)} />
                        {errors.receipt_number && <div className="text-red-500 text-sm">{errors.receipt_number}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="transaction_id">Transaction ID</Label>
                        <Input id="transaction_id" value={data.transaction_id} onChange={e => setData('transaction_id', e.target.value)} />
                        {errors.transaction_id && <div className="text-red-500 text-sm">{errors.transaction_id}</div>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <textarea 
                        id="notes" 
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={data.notes}
                        onChange={e => setData('notes', e.target.value)} 
                    />
                    {errors.notes && <div className="text-red-500 text-sm">{errors.notes}</div>}
                </div>

                <div className="flex gap-2 pt-4">
                    <Button disabled={processing} type="submit">Update Payment</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
            
            {payment.installments?.length > 0 && (
                <div className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-bold mb-4">Allocated Installments</h2>
                    <ul className="space-y-2">
                        {payment.installments.map((inst: any) => (
                            <li key={inst.id} className="text-sm bg-muted p-2 rounded flex justify-between">
                                <span>Due: {inst.due_date} (Status: {inst.status})</span>
                                <span className="font-medium">Allocated: ${inst.pivot?.allocated_amount}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
