import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Search, User, Mail, Calendar, Eye } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type UserData = {
    id: number;
    name: string;
    email: string;
    created_at: string;
};

type Props = {
    users: {
        data: UserData[];
        links: any[];
        from: number;
        to: number;
        total: number;
    };
    filters: {
        search?: string;
    };
};

export default function Index({ users, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/instructor/users', { search }, { preserveState: true });
    };

    return (
        <AppLayout>
            <Head title="My Students" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">My Students</h1>
                        <p className="text-muted-foreground">View students enrolled in your courses.</p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleSearch} className="flex flex-1 gap-2 w-full max-w-lg">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search students by name or email..."
                                className="pl-9 h-10"
                            />
                        </div>
                        <Button type="submit" className="h-10">Search</Button>
                    </form>
                    <div className="text-sm text-muted-foreground">
                        Showing {users.from}-{users.to} of {users.total} students
                    </div>
                </div>

                {/* Students List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {users.data.map((student) => (
                        <div key={student.id} className="group relative rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">{student.name}</h3>
                                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                            <Mail className="h-3 w-3" />
                                            <span>{student.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>Joined {new Date(student.created_at).toLocaleDateString()}</span>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="gap-2"
                                    onClick={() => router.get(`/instructor/users/${student.id}`)}
                                >
                                    <Eye className="h-4 w-4" />
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>

                {users.data.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
                        <User className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-medium text-muted-foreground">No students found</h3>
                        <p className="text-muted-foreground mt-2">Try adjusting your search or check back later.</p>
                    </div>
                )}

                {/* Pagination */}
                {users.total > 15 && (
                    <div className="flex items-center justify-center space-x-2 pt-6">
                        {users.links.map((link, index) => (
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
                )}
            </div>
        </AppLayout>
    );
}
