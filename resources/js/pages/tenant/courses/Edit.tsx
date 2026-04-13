import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CoursesEdit({ course, instructors }: any) {
    const { data, setData, put, processing, errors } = useForm({
        name: course.name || '',
        code: course.code || '',
        description: course.description || '',
        duration_months: course.duration_months?.toString() || '',
        total_fees: course.total_fees?.toString() || '',
        is_active: course.is_active ?? true,
        is_published: course.is_published ?? false,
        user_id: course.user_id?.toString() || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/courses/${course.id}`);
    };

    return (
        <>
            <Head title="Edit Course" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <BookOpen className="h-7 w-7 text-primary" />
                        Edit Course
                    </h1>
                    <p className="text-muted-foreground mt-1">Update details for <span className="font-semibold text-foreground">{course.name}</span></p>
                </div>

                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label>Course Name <span className="text-destructive">*</span></Label>
                            <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Course Code</Label>
                                <Input value={data.code} onChange={(e) => setData('code', e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Duration (Months)</Label>
                                <Input type="number" min="1" value={data.duration_months} onChange={(e) => setData('duration_months', e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Total Fees (₹)</Label>
                                <Input type="number" step="0.01" min="0" value={data.total_fees} onChange={(e) => setData('total_fees', e.target.value)} />
                                {errors.total_fees && <p className="text-xs text-destructive">{errors.total_fees}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Instructor</Label>
                                <Select defaultValue={data.user_id || ''} onValueChange={(v) => setData('user_id', v)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="None" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">None</SelectItem>
                                        {(instructors || []).map((u: any) => (
                                            <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-6 pt-1">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.is_active} onChange={(e) => setData('is_active', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <span className="text-sm">Active</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
                                <span className="text-sm">Published</span>
                            </label>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button type="button" variant="outline" onClick={() => history.back()}>
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
