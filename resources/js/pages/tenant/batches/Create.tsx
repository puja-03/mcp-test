import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users } from 'lucide-react';

export default function BatchesCreate({ courses }: any) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        name: '',
        start_date: '',
        end_date: '',
        max_students: '',
        is_active: true,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/batches');
    };

    return (
        <>
            <Head title="Create Batch" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6 max-w-2xl">
                {/* Header */}
                <div>
                    <button
                        type="button"
                        onClick={() => history.back()}
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-7 w-7 text-primary" />
                        Create Batch
                    </h1>
                    <p className="text-muted-foreground mt-1">Add a new batch to a course</p>
                </div>

                {/* Form */}
                <div className="rounded-xl border bg-card shadow-sm p-6">
                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="course_id">Course <span className="text-destructive">*</span></Label>
                            <Select onValueChange={(v) => setData('course_id', v)}>
                                <SelectTrigger id="course_id" className="w-full">
                                    <SelectValue placeholder="Select a course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((c: any) => (
                                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.course_id && <p className="text-xs text-destructive">{errors.course_id}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Batch Name <span className="text-destructive">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="e.g. Batch A — Morning"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start_date">Start Date</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end_date">End Date</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="max_students">Max Students (Optional)</Label>
                            <Input
                                id="max_students"
                                type="number"
                                min="1"
                                value={data.max_students}
                                onChange={(e) => setData('max_students', e.target.value)}
                                placeholder="Leave blank for unlimited"
                            />
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                            <input
                                id="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300"
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">Mark as Active</Label>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Batch'}
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
