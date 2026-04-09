import { Head, useForm, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create({ exams, students, selected_exam_id }: any) {
    const { data, setData, post, processing, errors } = useForm({
        exam_id: selected_exam_id || '',
        student_id: '',
        marks_obtained: '',
        remarks: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/results', {
            onSuccess: () => {
                setData('student_id', '');
                setData('marks_obtained', '');
                setData('remarks', '');
            }
        });
    };

    const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setData('exam_id', val);
        router.get('/admin/results/create', { exam_id: val }, { preserveState: true });
    };

    const selectedExamInfo = exams.find((x:any) => x.id == data.exam_id);

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Record Result" />
            <h1 className="text-2xl font-bold mb-6">Record Result</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="exam_id">Exam</Label>
                    <select 
                        id="exam_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.exam_id}
                        onChange={handleExamChange}
                    >
                        <option value="">Select an Exam</option>
                        {exams.map((ex: any) => (
                            <option key={ex.id} value={ex.id}>{ex.exam_date} — {ex.title} ({ex.batch?.name})</option>
                        ))}
                    </select>
                    {errors.exam_id && <div className="text-red-500 text-sm">{errors.exam_id}</div>}
                </div>
                
                {data.exam_id && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="student_id">Student</Label>
                            <select 
                                id="student_id" 
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                                value={data.student_id}
                                onChange={e => setData('student_id', e.target.value)}
                            >
                                <option value="">Select a Student</option>
                                {students?.map((s: any) => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                                ))}
                            </select>
                            {errors.student_id && <div className="text-red-500 text-sm">{errors.student_id}</div>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="marks_obtained">Marks Obtained <span className="text-muted-foreground font-normal text-xs ml-2">(Max: {selectedExamInfo?.max_marks})</span></Label>
                            <Input 
                                id="marks_obtained" 
                                type="number" 
                                step="0.01" 
                                value={data.marks_obtained} 
                                onChange={e => setData('marks_obtained', e.target.value)}
                            />
                            {errors.marks_obtained && <div className="text-red-500 text-sm">{errors.marks_obtained}</div>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="remarks">Remarks (Opt)</Label>
                            <textarea 
                                id="remarks" 
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                                value={data.remarks}
                                onChange={e => setData('remarks', e.target.value)} 
                            />
                            {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
                        </div>

                        <div className="flex gap-2 pt-4">
                            <Button disabled={processing || !data.student_id} type="submit">Record Result</Button>
                            <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
}
