import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { useState } from 'react';
export default function Index({ batches, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    return (<><Head title="Batches" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Batches</h1><Button onClick={() => router.visit('/tenant/batches/create')}>Create Batch</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/batches', { search }, { preserveState: true }); }} className="flex items-center gap-2"><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="max-w-xs" /><Button type="submit" variant="secondary">Search</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Name</th><th className="h-12 px-4 text-left font-medium">Course</th><th className="h-12 px-4 text-left font-medium">Start</th><th className="h-12 px-4 text-left font-medium">End</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{batches.data.map((b: any) => (<tr key={b.id} className="border-b"><td className="p-4 font-medium">{b.name}</td><td className="p-4 text-muted-foreground">{b.course?.name}</td><td className="p-4">{b.start_date}</td><td className="p-4">{b.end_date||'—'}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/batches/${b.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/batches/${b.id}`); }}>Delete</Button></td></tr>))}
        {batches.data.length===0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No batches.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{batches.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
