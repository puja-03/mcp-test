import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function Create({ enrollments }: any) {
    const { data, setData, post, processing, errors } = useForm({
        enrollment_id: '',
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'cash',
        transaction_id: '',
        receipt_number: '',
        notes: '',
        status: 'completed',
        allocate_to_installments: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/payments');
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Record Payment" />
            <h1 className="text-2xl font-bold mb-6">Record Payment</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="enrollment_id">Enrollment (Student)</Label>
                    <select 
                        id="enrollment_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.enrollment_id}
                        onChange={e => setData('enrollment_id', e.target.value)}
                    >
                        <option value="">Select Enrollment</option>
                        {enrollments.map((en: any) => (
                            <option key={en.id} value={en.id}>{en.student?.name} - {en.batch?.name}</option>
                        ))}
                    </select>
                    {errors.enrollment_id && <div className="text-red-500 text-sm">{errors.enrollment_id}</div>}
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
                        </select>
                        {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="receipt_number">Receipt Number (Opt)</Label>
                        <Input id="receipt_number" value={data.receipt_number} onChange={e => setData('receipt_number', e.target.value)} />
                        {errors.receipt_number && <div className="text-red-500 text-sm">{errors.receipt_number}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="transaction_id">Transaction ID (Opt)</Label>
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

                <div className="flex items-center space-x-2 pt-2 pb-4">
                    <Checkbox id="allocate" checked={data.allocate_to_installments} onCheckedChange={(c:any) => setData('allocate_to_installments', !!c)} />
                    <Label htmlFor="allocate" className="font-normal cursor-pointer">Auto-allocate to pending installments</Label>
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Record Payment</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
