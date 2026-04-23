import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';


type Course = { id: number; name: string };
type FeeStructure = { 
    id: number; 
    name: string; 
    course_id: number; 
    total_amount: number; 
    installment_count: number 
};

export default function Edit({ courses, feeStructure }: { courses: Course[], feeStructure: FeeStructure }) {
    const { data, setData, put, processing, errors } = useForm({
        course_id: feeStructure.course_id.toString(),
        name: feeStructure.name,
        total_amount: feeStructure.total_amount.toString(),
        installment_count: feeStructure.installment_count.toString(),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/instructor/fee-structures/${feeStructure.id}`);
    };

    return (
        <>
            <Head title="Edit Fee Structure" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/instructor/fee-structures">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Fee Structure</h1>
                        <p className="text-muted-foreground">Modify the fee structure details.</p>
                    </div>
                </div>

                <div className="max-w-2xl bg-card rounded-xl border shadow-sm p-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="course_id" className="text-sm font-semibold text-foreground">Assigned Course</Label>
                                <Select defaultValue={data.course_id} onValueChange={(v) => setData('course_id', v)}>
                                    <SelectTrigger className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30">
                                        <SelectValue placeholder="Select course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {courses.map((course) => (
                                            <SelectItem key={course.id} value={course.id.toString()}>
                                                {course.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.course_id && <p className="text-xs text-destructive font-medium mt-1">{errors.course_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-semibold text-foreground">Structure Name</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)} 
                                    className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="total_amount" className="text-sm font-semibold text-foreground">Total Amount</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-muted-foreground font-medium">$</div>
                                        <Input 
                                            id="total_amount" 
                                            type="number" 
                                            value={data.total_amount} 
                                            onChange={(e) => setData('total_amount', e.target.value)} 
                                            className="h-12 pl-7 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                        />
                                    </div>
                                    {errors.total_amount && <p className="text-xs text-destructive font-medium mt-1">{errors.total_amount}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="installment_count" className="text-sm font-semibold text-foreground">Installments</Label>
                                    <Input 
                                        id="installment_count" 
                                        type="number" 
                                        value={data.installment_count} 
                                        onChange={(e) => setData('installment_count', e.target.value)} 
                                        className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                    />
                                    {errors.installment_count && <p className="text-xs text-destructive font-medium mt-1">{errors.installment_count}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <Button type="submit" disabled={processing} className="h-12 px-8 gap-2 shadow-lg hover:shadow-primary/20 transition-all">
                                <Save className="h-4 w-4" /> Update Structure
                            </Button>
                            <Button variant="outline" asChild className="h-12 px-8">
                                <Link href="/instructor/fee-structures">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
