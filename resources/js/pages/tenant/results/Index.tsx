import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { useState } from 'react';
export default function Index({ results, exams, filters }: any) {
    const [examId, setExamId] = useState(filters.exam_id || '');
    return (<><Head title="Results" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Results</h1><Button onClick={() => router.visit('/tenant/results/create')}>Enter Result</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/results', { exam_id: examId }, { preserveState: true }); }} className="flex items-center gap-2">
            <select value={examId} onChange={e => setExamId(e.target.value)} className="flex h-10 w-[350px] rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">All Exams</option>{exams.map((ex:any)=><option key={ex.id} value={ex.id}>{ex.title} ({ex.batch?.name})</option>)}</select>
            <Button type="submit" variant="secondary">Filter</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Exam</th><th className="h-12 px-4 text-left font-medium">Student</th><th className="h-12 px-4 text-left font-medium">Marks</th><th className="h-12 px-4 text-left font-medium">Remarks</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{results.data.map((r:any) => (<tr key={r.id} className="border-b"><td className="p-4"><div className="font-medium">{r.exam?.title}</div><div className="text-xs text-muted-foreground">{r.exam?.batch?.name}</div></td><td className="p-4"><div className="font-medium">{r.student?.name}</div></td><td className="p-4">{r.marks_obtained} / {r.exam?.max_marks}</td><td className="p-4 text-muted-foreground">{r.remarks||'—'}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/results/${r.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/results/${r.id}`); }}>Delete</Button></td></tr>))}
        {results.data.length===0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No records.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{results.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
