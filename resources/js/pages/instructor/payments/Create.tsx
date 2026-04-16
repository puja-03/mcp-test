import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Calendar as CalendarIcon, DollarSign, CreditCard, Hash, AlertCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type Enrollment = { 
    id: number; 
    student: { name: string }; 
    batch: { name: string };
};

export default function Create({ enrollments }: { enrollments: Enrollment[] }) {
    const { data, setData, post, processing, errors } = useForm({
        enrollment_id: '',
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'cash',
        transaction_id: '',
        status: 'completed',
        notes: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/instructor/payments');
    };

    return (
        <AppLayout>
            <Head title="Record Payment" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted transition-colors">
                        <Link href="/instructor/payments">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Record New Payment</h1>
                        <p className="text-muted-foreground font-medium">Log a payment received from a student enrollment.</p>
                    </div>
                </div>

                <div className="max-w-3xl bg-card rounded-2xl border shadow-xl p-8 ring-1 ring-border/50">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Transaction Details */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="enrollment_id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Student Enrollment</Label>
                                    <Select onValueChange={(v) => setData('enrollment_id', v)}>
                                        <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold">
                                            <SelectValue placeholder="Identify student/batch..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {enrollments.map((en) => (
                                                <SelectItem key={en.id} value={en.id.toString()} className="font-medium">
                                                    {en.student.name} — {en.batch.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.enrollment_id && <p className="text-xs text-destructive font-black mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.enrollment_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-xs font-black uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary cursor-default">Payment Amount</Label>
                                    <div className="relative group">
                                        <DollarSign className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input 
                                            id="amount" 
                                            type="number" 
                                            value={data.amount} 
                                            onChange={(e) => setData('amount', e.target.value)} 
                                            placeholder="0.00" 
                                            className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-black tabular-nums text-lg"
                                        />
                                    </div>
                                    {errors.amount && <p className="text-xs text-destructive font-black mt-1">{errors.amount}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="payment_date" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Date Received</Label>
                                    <div className="relative group">
                                        <CalendarIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input 
                                            id="payment_date" 
                                            type="date" 
                                            value={data.payment_date} 
                                            onChange={(e) => setData('payment_date', e.target.value)} 
                                            className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold"
                                        />
                                    </div>
                                    {errors.payment_date && <p className="text-xs text-destructive font-black mt-1">{errors.payment_date}</p>}
                                </div>
                            </div>

                            {/* Right Column: Payment Method & Reference */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="payment_method" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Payment Method</Label>
                                    <Select defaultValue="cash" onValueChange={(v) => setData('payment_method', v)}>
                                        <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold">
                                            <SelectValue placeholder="Select method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="cash" className="font-bold">Cash</SelectItem>
                                            <SelectItem value="bank_transfer" className="font-bold">Bank Transfer</SelectItem>
                                            <SelectItem value="check" className="font-bold">Check</SelectItem>
                                            <SelectItem value="online" className="font-bold">Online / UPI</SelectItem>
                                            <SelectItem value="other" className="font-bold">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.payment_method && <p className="text-xs text-destructive font-black mt-1">{errors.payment_method}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transaction_id" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Transaction / Reference ID</Label>
                                    <div className="relative group">
                                        <Hash className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input 
                                            id="transaction_id" 
                                            value={data.transaction_id} 
                                            onChange={(e) => setData('transaction_id', e.target.value)} 
                                            placeholder="e.g. TXN-123456" 
                                            className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-mono text-sm font-bold uppercase tracking-wider"
                                        />
                                    </div>
                                    {errors.transaction_id && <p className="text-xs text-destructive font-black mt-1">{errors.transaction_id}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Transaction Status</Label>
                                    <Select defaultValue="completed" onValueChange={(v) => setData('status', v)}>
                                        <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-black uppercase tracking-widest text-[11px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="completed" className="font-black text-green-600">Completed</SelectItem>
                                            <SelectItem value="pending" className="font-black text-yellow-600">Pending</SelectItem>
                                            <SelectItem value="failed" className="font-black text-red-600">Failed</SelectItem>
                                            <SelectItem value="refunded" className="font-black text-gray-600">Refunded</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-xs text-destructive font-black mt-1">{errors.status}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Full Width: Notes */}
                        <div className="space-y-2 pt-4 border-t border-dashed">
                            <Label htmlFor="notes" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Internal Notes / Receipt Details</Label>
                            <Textarea 
                                id="notes" 
                                value={data.notes} 
                                onChange={(e) => setData('notes', e.target.value)} 
                                placeholder="Any additional details about this payment..." 
                                className="min-h-[120px] bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-medium leading-relaxed resize-none shadow-inner"
                            />
                            {errors.notes && <p className="text-xs text-destructive font-black mt-1">{errors.notes}</p>}
                        </div>

                        <div className="flex gap-4 pt-8">
                            <Button type="submit" disabled={processing} className="h-14 px-12 gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-black uppercase tracking-widest text-xs flex-1 md:flex-none animate-in slide-in-from-bottom-2">
                                <Save className="h-5 w-5" /> Confirm & Post Payment
                            </Button>
                            <Button variant="ghost" asChild className="h-14 px-8 font-black uppercase tracking-widest text-xs text-muted-foreground hover:bg-muted transition-colors">
                                <Link href="/instructor/payments">Discard Record</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
