import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award } from 'lucide-react';

export default function ResultsEdit({ result }: any) {
    const { data, setData, put, processing, errors } = useForm({
        marks_obtained: result.marks_obtained?.toString() || '',
        remarks: result.remarks || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/results/${result.id}`);
    };

    return (
        <>
            <Head title="Edit Result" />
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
                        <Award className="h-7 w-7 text-primary" />
                        Edit Result
                    </h1>
                    <p className="text-muted-foreground mt-1">Update marks for this student</p>
                </div>

                {/* Result context card */}
                <div className="rounded-xl border bg-muted/30 p-5 space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Student</p>
                            <p className="font-semibold">{result.student?.name}</p>
                            <p className="text-xs text-muted-foreground">{result.student?.email}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-1">Exam</p>
                            <p className="font-semibold">{result.exam?.title}</p>
                            <p className="text-xs text-muted-foreground">{result.exam?.batch?.name}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary">Max: {result.exam?.max_marks} marks</Badge>
                        {result.exam?.passing_marks && (
                            <Badge variant="outline">Pass: {result.exam.passing_marks}</Badge>
                        )}
                    </div>
                </div>

                {/* Edit form */}
                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>
                                    Marks Obtained
                                    <span className="text-muted-foreground font-normal ml-1">(Max: {result.exam?.max_marks})</span>
                                </Label>
                                <Input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={data.marks_obtained}
                                    onChange={(e) => setData('marks_obtained', e.target.value)}
                                />
                                {errors.marks_obtained && <p className="text-xs text-destructive">{errors.marks_obtained}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Remarks (Optional)</Label>
                                <Input
                                    value={data.remarks}
                                    onChange={(e) => setData('remarks', e.target.value)}
                                    placeholder="Any notes..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
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
