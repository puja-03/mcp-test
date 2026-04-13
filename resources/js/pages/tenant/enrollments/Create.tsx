import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, GraduationCap } from 'lucide-react';

export default function EnrollmentsCreate({ students, batches }: any) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        batch_id: '',
        enrollment_date: new Date().toISOString().split('T')[0],
        status: 'active',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/enrollments');
    };

    return (
        <>
            <Head title="Create Enrollment" />
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
                        <GraduationCap className="h-7 w-7 text-primary" />
                        New Enrollment
                    </h1>
                    <p className="text-muted-foreground mt-1">Enroll a student into a batch</p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Student <span className="text-destructive">*</span></Label>
                            <Select onValueChange={(v) => setData('student_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a student" />
                                </SelectTrigger>
                                <SelectContent>
                                    {students.map((s: any) => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.name} — {s.email}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.student_id && <p className="text-xs text-destructive">{errors.student_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Batch <span className="text-destructive">*</span></Label>
                            <Select onValueChange={(v) => setData('batch_id', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a batch" />
                                </SelectTrigger>
                                <SelectContent>
                                    {batches.map((b: any) => (
                                        <SelectItem key={b.id} value={b.id.toString()}>
                                            {b.name} — {b.course?.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.batch_id && <p className="text-xs text-destructive">{errors.batch_id}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Enrollment Date</Label>
                                <Input
                                    type="date"
                                    value={data.enrollment_date}
                                    onChange={(e) => setData('enrollment_date', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select defaultValue="active" onValueChange={(v) => setData('status', v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Enrolling...' : 'Enroll Student'}
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
