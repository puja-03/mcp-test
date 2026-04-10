import { Head, useForm } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Label } from '@/components/ui/label';
export default function Edit({ result }: any) {
    const { data, setData, put, processing, errors } = useForm({ marks_obtained: result.marks_obtained||'', remarks: result.remarks||'' });
    return (<div className="p-6 max-w-2xl mx-auto"><Head title="Edit Result" /><h1 className="text-2xl font-bold mb-6">Edit Result</h1>
        <div className="mb-6 p-4 bg-muted rounded-md space-y-2">
            <div><strong>Student:</strong> {result.student?.name}</div>
            <div><strong>Exam:</strong> {result.exam?.title} ({result.exam?.batch?.name})</div>
            <div><strong>Max Marks:</strong> {result.exam?.max_marks}</div>
        </div>
        <form onSubmit={e => { e.preventDefault(); put(`/tenant/results/${result.id}`); }} className="space-y-4">
            <div className="grid grid-cols-2 gap-4"><div className="space-y-2"><Label>Marks Obtained</Label><Input type="number" step="0.01" value={data.marks_obtained} onChange={e => setData('marks_obtained', e.target.value)} /></div><div className="space-y-2"><Label>Remarks</Label><Input value={data.remarks} onChange={e => setData('remarks', e.target.value)} /></div></div>
            <div className="flex gap-2"><Button disabled={processing} type="submit">Update</Button><Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button></div>
        </form></div>);
}
