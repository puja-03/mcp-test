import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Index({ profiles, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/instructors', { search }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this instructor profile?')) {
            router.delete(`/admin/instructors/${id}`);
        }
    };

    return (
        <>
            <Head title="Instructor Profiles" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Instructor Profiles</h1>
                    <Button onClick={() => router.visit('/admin/instructors/create')}>New Profile</Button>
                </div>

                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <Input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="max-w-[300px]"
                    />
                    <Button type="submit" variant="secondary">Search</Button>
                </form>

                <div className="rounded-md border bg-card">
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b">
                                    <th className="h-12 px-4 text-left font-medium">Instructor</th>
                                    <th className="h-12 px-4 text-left font-medium">Specialization</th>
                                    <th className="h-12 px-4 text-left font-medium">Experience</th>
                                    <th className="h-12 px-4 text-left font-medium">Skills</th>
                                    <th className="h-12 px-4 text-right font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {profiles.data.map((profile: any) => (
                                    <tr key={profile.id} className="border-b">
                                        <td className="p-4 align-middle">
                                            <div className="font-medium">{profile.user?.name}</div>
                                            <div className="text-xs text-muted-foreground">{profile.user?.email}</div>
                                        </td>
                                        <td className="p-4 align-middle text-muted-foreground">{profile.specialization || '—'}</td>
                                        <td className="p-4 align-middle">{profile.experience_years ? `${profile.experience_years} yrs` : '—'}</td>
                                        <td className="p-4 align-middle">
                                            <div className="flex flex-wrap gap-1">
                                                {(profile.skills || []).slice(0, 3).map((skill: string, i: number) => (
                                                    <span key={i} className="text-xs bg-muted px-2 py-0.5 rounded">{skill}</span>
                                                ))}
                                                {(profile.skills || []).length > 3 && (
                                                    <span className="text-xs text-muted-foreground">+{profile.skills.length - 3}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle text-right flex gap-2 justify-end">
                                            <Button variant="outline" size="sm" onClick={() => router.visit(`/admin/instructors/${profile.id}/edit`)}>
                                                Edit
                                            </Button>
                                            <Button variant="destructive" size="sm" onClick={() => handleDelete(profile.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {profiles.data.length === 0 && (
                                    <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No instructor profiles found.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    {profiles.links.map((link: any, key: number) => (
                        <Button
                            key={key}
                            variant={link.active ? "default" : "outline"}
                            disabled={!link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={() => link.url && router.visit(link.url)}
                            size="sm"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
