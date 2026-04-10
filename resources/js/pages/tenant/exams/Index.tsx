import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { useState } from 'react';
export default function Index({ exams, batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    const [batchId, setBatchId] = useState(filters.batch_id || '');
    return (<><Head title="Exams" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Exams</h1><Button onClick={() => router.visit('/tenant/exams/create')}>Create Exam</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/exams', { search, batch_id: batchId }, { preserveState: true }); }} className="flex items-center gap-2">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="max-w-xs" />
            <select value={batchId} onChange={e => setBatchId(e.target.value)} className="flex h-10 w-[200px] rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">All Batches</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name}</option>)}</select>
            <Button type="submit" variant="secondary">Filter</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Title</th><th className="h-12 px-4 text-left font-medium">Batch</th><th className="h-12 px-4 text-left font-medium">Date</th><th className="h-12 px-4 text-left font-medium">Marks (Max / Pass)</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{exams.data.map((e:any) => (<tr key={e.id} className="border-b"><td className="p-4 font-medium">{e.title}</td><td className="p-4 text-muted-foreground">{e.batch?.name}</td><td className="p-4">{e.exam_date}</td><td className="p-4">{e.max_marks} / {e.passing_marks||'—'}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/results/create?exam_id=${e.id}`)}>Enter Results</Button><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/exams/${e.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/exams/${e.id}`); }}>Delete</Button></td></tr>))}
        {exams.data.length===0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No exams found.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{exams.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
