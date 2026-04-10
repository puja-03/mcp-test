import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { useState } from 'react';
export default function Index({ sessions, batches, filters }: any) {
    const [batchId, setBatchId] = useState(filters.batch_id || '');
    return (<><Head title="Class Sessions" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Class Sessions</h1><Button onClick={() => router.visit('/tenant/class-sessions/create')}>New Session</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/class-sessions', { batch_id: batchId }, { preserveState: true }); }} className="flex items-center gap-2">
            <select value={batchId} onChange={e => setBatchId(e.target.value)} className="flex h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">All Batches</option>{batches.map((b:any)=><option key={b.id} value={b.id}>{b.name}</option>)}</select>
            <Button type="submit" variant="secondary">Filter</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Date</th><th className="h-12 px-4 text-left font-medium">Batch</th><th className="h-12 px-4 text-left font-medium">Topic</th><th className="h-12 px-4 text-left font-medium">Time (Start - End)</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{sessions.data.map((s:any) => (<tr key={s.id} className="border-b"><td className="p-4 font-medium">{s.session_date}</td><td className="p-4 text-muted-foreground">{s.batch?.name}</td><td className="p-4">{s.topic||'—'}</td><td className="p-4">{s.start_time||'—'} - {s.end_time||'—'}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/attendances/create?session_id=${s.id}`)}>Attendance</Button><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/class-sessions/${s.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/class-sessions/${s.id}`); }}>Delete</Button></td></tr>))}
        {sessions.data.length===0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No class sessions.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{sessions.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
