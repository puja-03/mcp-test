import { Head, useForm, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label'; import { useEffect, useState } from 'react';
export default function Create({ exams, students, selected_exam_id }: any) {
    const [examId, setExamId] = useState(selected_exam_id || '');
    const { data, setData, post, processing, reset } = useForm({ exam_id: examId, student_id: '', marks_obtained: '', remarks: '' });
    
    useEffect(() => { if (examId !== selected_exam_id) router.get('/tenant/results/create', { exam_id: examId }, { preserveState: true }); }, [examId]);

    const maxMarks = exams.find((e:any) => e.id == examId)?.max_marks;

    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Enter Results" /><h1 className="text-2xl font-bold mb-6">Enter Results</h1>
        <div className="space-y-4 mb-6">
            <div className="space-y-2"><Label>Select Exam</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={examId} onChange={e => {setExamId(e.target.value); setData('exam_id', e.target.value);}}><option value="">Select Exam</option>{exams.map((ex:any)=><option key={ex.id} value={ex.id}>{ex.title} ({ex.batch?.name})</option>)}</select></div>
        </div>
        {examId && students.length > 0 && (
            <form onSubmit={e => { e.preventDefault(); post('/tenant/results', { onSuccess: () => reset('student_id', 'marks_obtained', 'remarks') }); }} className="space-y-4 border top-2 p-4 rounded bg-card">
                <div className="space-y-2"><Label>Student</Label><select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={data.student_id} onChange={e => setData('student_id', e.target.value)} required><option value="">Select Student</option>{students.map((s:any)=><option key={s.id} value={s.id}>{s.name} ({s.email})</option>)}</select></div>
                <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Marks Obtained {maxMarks&&`(Max: ${maxMarks})`}</Label><Input type="number" step="0.01" value={data.marks_obtained} onChange={e => setData('marks_obtained', e.target.value)} /></div><div className="space-y-2"><Label>Remarks</Label><Input value={data.remarks} onChange={e => setData('remarks', e.target.value)} /></div></div>
                <Button disabled={processing} type="submit">Save Result</Button>
            </form>
        )}
        {examId && students.length === 0 && <p className="text-muted-foreground">No students enrolled in this exam's batch.</p>}
    </div>);
}
