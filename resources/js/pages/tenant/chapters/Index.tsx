import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { useState } from 'react';
export default function Index({ chapters, courses, filters }: any) {
    const [courseId, setCourseId] = useState(filters.course_id || '');
    return (<><Head title="Chapters" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Chapters</h1><Button onClick={() => router.visit('/tenant/chapters/create')}>New Chapter</Button></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/tenant/chapters', { course_id: courseId }, { preserveState: true }); }} className="flex items-center gap-2">
            <select value={courseId} onChange={e => setCourseId(e.target.value)} className="flex h-10 w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm"><option value="">All Courses</option>{courses.map((c:any)=><option key={c.id} value={c.id}>{c.name}</option>)}</select>
            <Button type="submit" variant="secondary">Filter</Button></form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Order</th><th className="h-12 px-4 text-left font-medium">Title</th><th className="h-12 px-4 text-left font-medium">Course</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
        <tbody>{chapters.data.map((ch:any) => (<tr key={ch.id} className="border-b"><td className="p-4 font-mono text-muted-foreground">{ch.order_index}</td><td className="p-4 font-medium">{ch.chapter_title}</td><td className="p-4 text-muted-foreground">{ch.course?.name}</td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/topics?chapter_id=${ch.id}`)}>Topics</Button><Button variant="outline" size="sm" onClick={() => router.visit(`/tenant/chapters/${ch.id}/edit`)}>Edit</Button><Button variant="destructive" size="sm" onClick={() => { if(confirm('Delete?')) router.delete(`/tenant/chapters/${ch.id}`); }}>Delete</Button></td></tr>))}
        {chapters.data.length===0 && <tr><td colSpan={4} className="p-4 text-center text-muted-foreground">No chapters.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{chapters.links.map((l:any,k:number) => <Button key={k} variant={l.active?"default":"outline"} disabled={!l.url} dangerouslySetInnerHTML={{__html:l.label}} onClick={() => l.url && router.visit(l.url)} size="sm" />)}</div>
    </div></>);
}
