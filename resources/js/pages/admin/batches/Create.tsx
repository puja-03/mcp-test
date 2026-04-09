import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create({ courses, teachers }: any) {
    const { data, setData, post, processing, errors } = useForm({
        course_id: '',
        name: '',
        batch_code: '',
        start_date: '',
        end_date: '',
        capacity: '',
        status: 'upcoming',
        teacher_ids: [] as number[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/batches');
    };

    const handleTeacherToggle = (id: number) => {
        if (data.teacher_ids.includes(id)) {
            setData('teacher_ids', data.teacher_ids.filter(tid => tid !== id));
        } else {
            setData('teacher_ids', [...data.teacher_ids, id]);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Create Batch" />
            <h1 className="text-2xl font-bold mb-6">Create Batch</h1>

            <form onSubmit={submit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="course_id">Course</Label>
                    <select 
                        id="course_id" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.course_id}
                        onChange={e => setData('course_id', e.target.value)}
                    >
                        <option value="">Select a Course</option>
                        {courses.map((c: any) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.course_id && <div className="text-red-500 text-sm">{errors.course_id}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="name">Batch Name</Label>
                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="batch_code">Batch Code</Label>
                        <Input id="batch_code" value={data.batch_code} onChange={e => setData('batch_code', e.target.value)} />
                        {errors.batch_code && <div className="text-red-500 text-sm">{errors.batch_code}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" value={data.capacity} onChange={e => setData('capacity', e.target.value)} />
                        {errors.capacity && <div className="text-red-500 text-sm">{errors.capacity}</div>}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input id="start_date" type="date" value={data.start_date} onChange={e => setData('start_date', e.target.value)} />
                        {errors.start_date && <div className="text-red-500 text-sm">{errors.start_date}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input id="end_date" type="date" value={data.end_date} onChange={e => setData('end_date', e.target.value)} />
                        {errors.end_date && <div className="text-red-500 text-sm">{errors.end_date}</div>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select 
                        id="status" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                        value={data.status}
                        onChange={e => setData('status', e.target.value)}
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                </div>

                <div className="space-y-2">
                    <Label>Teachers</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {teachers.map((t: any) => (
                            <label key={t.id} className="flex items-center gap-2">
                                <input 
                                    type="checkbox" 
                                    checked={data.teacher_ids.includes(t.id)} 
                                    onChange={() => handleTeacherToggle(t.id)} 
                                />
                                <span>{t.name}</span>
                            </label>
                        ))}
                    </div>
                    {errors.teacher_ids && <div className="text-red-500 text-sm">{errors.teacher_ids}</div>}
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Create Batch</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
