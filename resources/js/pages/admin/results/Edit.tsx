import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ result }: any) {
    const { data, setData, put, processing, errors } = useForm({
        marks_obtained: result.marks_obtained || '',
        remarks: result.remarks || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/results/${result.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Result" />
            <h1 className="text-2xl font-bold mb-6">Edit Result</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label>Exam</Label>
                    <Input disabled value={`${result.exam?.title} (${result.exam?.batch?.name})`} />
                </div>
                
                <div className="space-y-2">
                    <Label>Student</Label>
                    <Input disabled value={`${result.student?.name} (${result.student?.email})`} />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="marks_obtained">Marks Obtained <span className="text-muted-foreground font-normal text-xs ml-2">(Max: {result.exam?.max_marks})</span></Label>
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
                    <Button disabled={processing} type="submit">Update Result</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
