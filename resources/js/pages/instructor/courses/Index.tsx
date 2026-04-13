import { Head, router } from '@inertiajs/react'; import { Button } from '@/components/ui/button'; import { Input } from '@/components/ui/input'; import { Badge } from '@/components/ui/badge'; import { useState } from 'react';
export default function Index({ courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');
    return (<><Head title="My Courses" /><div className="flex h-full flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold">My Courses</h1></div>
        <form onSubmit={e => { e.preventDefault(); router.get('/instructor/courses', { search }, { preserveState: true }); }} className="flex items-center gap-2">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="max-w-xs" /><Button type="submit" variant="secondary">Search</Button>
        </form>
        <div className="rounded-md border bg-card"><table className="w-full text-sm"><thead><tr className="border-b"><th className="h-12 px-4 text-left font-medium">Name</th><th className="h-12 px-4 text-left font-medium">Code</th><th className="h-12 px-4 text-left font-medium">Chapters</th><th className="h-12 px-4 text-left font-medium">Published</th><th className="h-12 px-4 text-right font-medium">Actions</th></tr></thead>
            <tbody>{courses.data.map((c: any) => (<tr key={c.id} className="border-b"><td className="p-4 font-medium">{c.name}</td><td className="p-4 text-muted-foreground">{c.code || '—'}</td><td className="p-4">{c.chapters_count}</td><td className="p-4"><Badge variant={c.is_published ? 'default' : 'secondary'}>{c.is_published ? 'Yes' : 'No'}</Badge></td><td className="p-4 text-right flex gap-2 justify-end"><Button variant="outline" size="sm" onClick={() => router.visit(`/instructor/courses/${c.slug}`)}>Curriculum</Button><Button variant="outline" size="sm" onClick={() => router.visit(`/instructor/courses/${c.slug}/edit`)}>Edit Info</Button></td></tr>))}
                {courses.data.length === 0 && <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">You are not assigned to any courses.</td></tr>}</tbody></table></div>
        <div className="flex justify-end gap-2">{courses.links.map((l: any, k: number) => (<Button key={k} variant={l.active ? "default" : "outline"} disabled={!l.url} dangerouslySetInnerHTML={{ __html: l.label }} onClick={() => l.url && router.visit(l.url)} size="sm" />))}</div>
    </div></>);
}
