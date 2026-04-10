import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, User, Play, Search, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export default function Index({ courses, filters }: any) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/student/courses', { search }, { preserveState: true });
    };

    return (
        <>
            <Head title="My Courses" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
                        <p className="text-muted-foreground">Access your learning materials and track your progress.</p>
                    </div>
                    <form onSubmit={handleSearch} className="flex gap-2 w-full max-w-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search courses..."
                                className="pl-9"
                            />
                        </div>
                        <Button type="submit" variant="secondary">Search</Button>
                    </form>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {courses.data.map((c: any) => (
                        <Card key={c.id} className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300">
                            <div className="aspect-video bg-muted relative flex items-center justify-center overflow-hidden">
                                <BookOpen className="w-12 h-12 text-muted-foreground/30 group-hover:scale-110 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                    <Button variant="secondary" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => router.visit(`/student/courses/${c.slug}`)}>
                                        <Play className="w-4 h-4 mr-2" /> Resume
                                    </Button>
                                </div>
                            </div>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg line-clamp-1">{c.name}</CardTitle>
                                    <GraduationCap className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <User className="w-3 h-3" />
                                    <span>Instructor: {c.instructor?.name || 'TBA'}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-muted-foreground">{c.chapters_count} Chapters</span>
                                    <Button variant="link" size="sm" className="px-0" onClick={() => router.visit(`/student/courses/${c.slug}`)}>
                                        Go to Curriculum →
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {courses.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <BookOpen className="w-16 h-16 text-muted-foreground/20 mb-4" />
                        <h3 className="text-xl font-semibold">No Courses Found</h3>
                        <p className="text-muted-foreground max-w-sm">
                            You are not enrolled in any courses that match your search.
                        </p>
                    </div>
                )}

                <div className="flex items-center justify-center space-x-2 mt-auto">
                    {courses.links.map((link: any, index: number) => (
                        <Button
                            key={index}
                            variant={link.active ? 'default' : 'outline'}
                            size="sm"
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
