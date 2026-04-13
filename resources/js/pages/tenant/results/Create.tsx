import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Award } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ResultsCreate({ exams, students, selected_exam_id }: any) {
    const [examId, setExamId] = useState<string>(selected_exam_id?.toString() || '');
    const { data, setData, post, processing, reset } = useForm({
        exam_id: examId,
        student_id: '',
        marks_obtained: '',
        remarks: '',
    });

    useEffect(() => {
        if (examId && examId !== selected_exam_id?.toString()) {
            router.get('/tenant/results/create', { exam_id: examId }, { preserveState: true, preserveScroll: true });
        }
    }, [examId]);

    const handleExamChange = (val: string) => {
        setExamId(val);
        setData('exam_id', val);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/results', {
            onSuccess: () => reset('student_id', 'marks_obtained', 'remarks'),
        });
    };

    const selectedExam = exams.find((ex: any) => ex.id.toString() === examId);

    return (
        <>
            <Head title="Enter Results" />
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
                        Enter Results
                    </h1>
                    <p className="text-muted-foreground mt-1">Record exam results for individual students</p>
                </div>

                {/* Step 1: Select Exam */}
                <div className="rounded-xl border bg-card shadow-sm p-6 space-y-4">
                    <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Step 1 — Select Exam</h2>
                    <div className="space-y-2">
                        <Label>Exam</Label>
                        <Select value={examId} onValueChange={handleExamChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Choose an exam..." />
                            </SelectTrigger>
                            <SelectContent>
                                {exams.map((ex: any) => (
                                    <SelectItem key={ex.id} value={ex.id.toString()}>
                                        {ex.title} — {ex.batch?.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {selectedExam && (
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="outline">{selectedExam.batch?.name}</Badge>
                            <Badge variant="secondary">Max: {selectedExam.max_marks} marks</Badge>
                            {selectedExam.passing_marks && (
                                <Badge variant="outline">Pass: {selectedExam.passing_marks}</Badge>
                            )}
                            {selectedExam.exam_date && (
                                <Badge variant="outline">{new Date(selectedExam.exam_date).toLocaleDateString()}</Badge>
                            )}
                        </div>
                    )}
                </div>

                {/* Step 2: Enter result */}
                {examId && students.length > 0 && (
                    <div className="rounded-xl border bg-card shadow-sm p-6">
                        <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-4">Step 2 — Enter Result</h2>
                        <form onSubmit={submit} className="space-y-5">
                            <div className="space-y-2">
                                <Label>Student <span className="text-destructive">*</span></Label>
                                <Select value={data.student_id} onValueChange={(v) => setData('student_id', v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select student..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map((s: any) => (
                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                {s.name} — {s.email}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>
                                        Marks Obtained
                                        {selectedExam && (
                                            <span className="text-muted-foreground font-normal ml-1">(Max: {selectedExam.max_marks})</span>
                                        )}
                                    </Label>
                                    <Input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.marks_obtained}
                                        onChange={(e) => setData('marks_obtained', e.target.value)}
                                        placeholder="0"
                                    />
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

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Result'}
                            </Button>
                        </form>
                    </div>
                )}

                {examId && students.length === 0 && (
                    <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center text-muted-foreground">
                        No students enrolled in this exam's batch.
                    </div>
                )}
            </div>
        </>
    );
}
