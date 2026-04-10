import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { useState } from 'react';
export default function Index({ feeStructures, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    return (<><Head title="Fee Structures" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Fee Structures</h1><Button onClick={() => router.visit('/tenant/fee-structures/create')}>Create Structure</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/fee-structures', { search }, { preserveState: true }); }} className="flex items-center gap-2">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="max-w-xs" />
            <Button type="submit" variant="secondary">Search</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Name</th><th className="h-12 px-4 text-left font-medium">Course</th><th className="h-12 px-4 text-left font-medium">Total Amount</th><th className="h-12 px-4 text-left font-medium">Installments</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{feeStructures.data.map((fs:any) => (<tr key={fs.id} className="border-b"><td className="p-4 font-medium">{fs.name}</td><td className="p-4 text-muted-foreground">{fs.course?.name}</td><td className="p-4">₹{fs.total_amount}</td><td className="p-4">{fs.installment_count}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/fee-structures/${fs.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/fee-structures/${fs.id}`); }}>Delete</Button></td></tr>))}
        {feeStructures.data.length===0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No structures.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{feeStructures.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
