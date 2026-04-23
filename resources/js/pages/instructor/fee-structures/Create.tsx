import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';


type Course = { id: number; name: string };

export default function Create({ courses }: { courses: Course[] }) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        name: '',
        total_amount: '',
        installment_count: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/instructor/fee-structures');
    };

    return (
        <>
            <Head title="Create Fee Structure" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full">
                        <Link href="/instructor/fee-structures">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Create Fee Structure</h1>
                        <p className="text-muted-foreground">Add a new fee structure for your assigned courses.</p>
                    </div>
                </div>

                <div className="max-w-2xl bg-card rounded-xl border shadow-sm p-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="course_id" className="text-sm font-semibold">Select Course</Label>
                                <Select onValueChange={(v) => setData('course_id', v)}>
                                    <SelectTrigger className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30">
                                        <SelectValue placeholder="Select a course you teach" />
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
                                <Label htmlFor="name" className="text-sm font-semibold">Structure Name</Label>
                                <Input 
                                    id="name" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)} 
                                    placeholder="e.g. Annual General Fee 2024" 
                                    className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                />
                                {errors.name && <p className="text-xs text-destructive font-medium mt-1">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="total_amount" className="text-sm font-semibold">Total Amount</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-3.5 text-muted-foreground">$</div>
                                        <Input 
                                            id="total_amount" 
                                            type="number" 
                                            value={data.total_amount} 
                                            onChange={(e) => setData('total_amount', e.target.value)} 
                                            placeholder="0.00" 
                                            className="h-12 pl-7 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                        />
                                    </div>
                                    {errors.total_amount && <p className="text-xs text-destructive font-medium mt-1">{errors.total_amount}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="installment_count" className="text-sm font-semibold">Number of Installments</Label>
                                    <Input 
                                        id="installment_count" 
                                        type="number" 
                                        value={data.installment_count} 
                                        onChange={(e) => setData('installment_count', e.target.value)} 
                                        placeholder="e.g. 1" 
                                        className="h-12 bg-muted/20 border-muted-foreground/20 focus:ring-primary/30"
                                    />
                                    {errors.installment_count && <p className="text-xs text-destructive font-medium mt-1">{errors.installment_count}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4 border-t">
                            <Button type="submit" disabled={processing} className="h-12 px-8 gap-2 shadow-lg hover:shadow-primary/20 transition-all">
                                <Save className="h-4 w-4" /> Save Structure
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
