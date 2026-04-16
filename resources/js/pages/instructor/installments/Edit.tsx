import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Calendar as CalendarIcon, DollarSign, AlertCircle } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type Enrollment = { 
    id: number; 
    student: { name: string }; 
    batch: { name: string };
};

type FeeStructure = { id: number; name: string };

type Installment = {
    id: number;
    enrollment_id: number;
    fee_structure_id: number | null;
    due_date: string;
    amount: number;
    status: string;
};

export default function Edit({ installment, enrollments, feeStructures }: { installment: Installment, enrollments: Enrollment[], feeStructures: FeeStructure[] }) {
    const { data, setData, put, processing, errors } = useForm({
        enrollment_id: installment.enrollment_id.toString(),
        fee_structure_id: installment.fee_structure_id?.toString() || '',
        due_date: installment.due_date,
        amount: installment.amount.toString(),
        status: installment.status,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/instructor/installments/${installment.id}`);
    };

    return (
        <AppLayout>
            <Head title="Edit Installment" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/instructor/installments">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">Edit Installment</h1>
                        <p className="text-muted-foreground font-medium">Update the specific payment schedule details.</p>
                    </div>
                </div>

                <div className="max-w-2xl bg-card rounded-xl border shadow-lg p-8 ring-1 ring-border/50">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="enrollment_id" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Student / Enrollment</Label>
                                <Select defaultValue={data.enrollment_id} onValueChange={(v) => setData('enrollment_id', v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 text-sm font-medium">
                                        <SelectValue placeholder="Select enrollment" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {enrollments.map((en) => (
                                            <SelectItem key={en.id} value={en.id.toString()}>
                                                {en.student.name} — {en.batch.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.enrollment_id && <p className="text-xs text-destructive font-bold mt-1.5 flex items-center gap-1"><AlertCircle className="h-3 w-3" /> {errors.enrollment_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fee_structure_id" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Fee Plan</Label>
                                <Select defaultValue={data.fee_structure_id} onValueChange={(v) => setData('fee_structure_id', v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 text-sm font-medium">
                                        <SelectValue placeholder="Link to a standard structure..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No Structure (Custom)</SelectItem>
                                        {feeStructures.map((fs) => (
                                            <SelectItem key={fs.id} value={fs.id.toString()}>{fs.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="due_date" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Payment Deadline</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground opacity-70" />
                                        <Input 
                                            id="due_date" 
                                            type="date" 
                                            value={data.due_date} 
                                            onChange={(e) => setData('due_date', e.target.value)} 
                                            className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-medium"
                                        />
                                    </div>
                                    {errors.due_date && <p className="text-xs text-destructive font-bold mt-1.5">{errors.due_date}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Amount Due</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground opacity-70" />
                                        <Input 
                                            id="amount" 
                                            type="number" 
                                            value={data.amount} 
                                            onChange={(e) => setData('amount', e.target.value)} 
                                            className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold tabular-nums"
                                        />
                                    </div>
                                    {errors.amount && <p className="text-xs text-destructive font-bold mt-1.5">{errors.amount}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tracking Status</Label>
                                <Select defaultValue={data.status} onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger className="h-12 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold uppercase tracking-wider text-[11px]">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="paid">Paid</SelectItem>
                                        <SelectItem value="partially_paid">Partially Paid</SelectItem>
                                        <SelectItem value="overdue">Overdue</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && <p className="text-xs text-destructive font-bold mt-1.5">{errors.status}</p>}
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6 border-t border-dashed">
                            <Button type="submit" disabled={processing} className="h-12 px-10 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all font-bold uppercase tracking-wider text-xs">
                                <Save className="h-4 w-4" /> Update Schedule
                            </Button>
                            <Button variant="ghost" asChild className="h-12 px-8 font-bold uppercase tracking-wider text-xs text-muted-foreground">
                                <Link href="/instructor/installments">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
