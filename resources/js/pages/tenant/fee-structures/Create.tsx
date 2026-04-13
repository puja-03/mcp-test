import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, FileText } from 'lucide-react';

export default function FeeStructuresCreate({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        name: '',
        total_amount: '',
        installment_count: 1,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/fee-structures');
    };

    return (
        <>
            <Head title="Create Fee Structure" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <FileText className="h-7 w-7 text-primary" />
                        Create Fee Structure
                    </h1>
                    <p className="text-muted-foreground mt-1">Define a payment plan for a course</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Course <span className="text-destructive">*</span></Label>
                            <Select onValueChange={(v) => setData('course_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.course_id && <p className="text-xs text-destructive">{errors.course_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Plan Name <span className="text-destructive">*</span></Label>
                            <Input
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Regular, EMI Plan, Early Bird"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Total Amount (₹) <span className="text-destructive">*</span></Label>
                                <Input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.total_amount}
                                    onChange={(e) => setData('total_amount', e.target.value)}
                                    placeholder="25000"
                                />
                                {errors.total_amount && <p className="text-xs text-destructive">{errors.total_amount}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Max Installments</Label>
                                <Input
                                    type="number"
                                    min="1"
                                    value={data.installment_count}
                                    onChange={(e) => setData('installment_count', parseInt(e.target.value) || 1)}
                                />
                                <p className="text-xs text-muted-foreground">Set 1 for lump sum payment</p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Fee Structure'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
