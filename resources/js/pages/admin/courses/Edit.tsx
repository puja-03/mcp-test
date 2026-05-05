import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Box, ArrowLeft } from 'lucide-react';

export default function Edit({ course, instructors }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    
    const { data, setData, put, processing, errors } = useForm({
        name: course.name || '',
        code: course.code || '',
        description: course.description || '',
        duration_months: course.duration_months || '',
        total_fees: course.total_fees || '',
        is_active: course.is_active ?? true,
        is_published: course.is_published ?? false,
        user_id: course.user_id || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/courses/${course.slug}`);
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            <Head title="Edit Course" />
            
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/courses"
                        className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-gray-900 hover:shadow-md transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Edit Course
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Update existing course details</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 flex-1">
                <div className="lg:col-span-8">
                    <form onSubmit={submit} className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                                    <Box size={20} />
                                </div>
                                <h3 className="font-extrabold text-slate-900">Course Details</h3>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Course Name</Label>
                                <Input id="name" className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900" value={data.name} onChange={e => setData('name', e.target.value)} />
                                {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="code" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Course Code</Label>
                                    <Input id="code" className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900" value={data.code} onChange={e => setData('code', e.target.value)} />
                                    {errors.code && <div className="text-red-500 text-sm">{errors.code}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration_months" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Duration (Months)</Label>
                                    <Input id="duration_months" type="number" className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900" value={data.duration_months} onChange={e => setData('duration_months', e.target.value)} />
                                    {errors.duration_months && <div className="text-red-500 text-sm">{errors.duration_months}</div>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="total_fees" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Total Fees (₹)</Label>
                                    <Input id="total_fees" type="number" step="0.01" className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900" value={data.total_fees} onChange={e => setData('total_fees', e.target.value)} />
                                    {errors.total_fees && <div className="text-red-500 text-sm">{errors.total_fees}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="user_id" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Instructor</Label>
                                    <select
                                        id="user_id"
                                        className="h-12 px-4 w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900"
                                        value={data.user_id}
                                        onChange={e => setData('user_id', e.target.value)}
                                    >
                                        <option value="">No Instructor</option>
                                        {(instructors || []).map((u: any) => (
                                            <option key={u.id} value={u.id} className="text-slate-900">{u.name} ({u.email})</option>
                                        ))}
                                    </select>
                                    {errors.user_id && <div className="text-red-500 text-sm">{errors.user_id}</div>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Description</Label>
                                <textarea 
                                    id="description" 
                                    className="w-full min-h-[100px] p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-sm font-medium text-slate-900"
                                    value={data.description} 
                                    onChange={e => setData('description', e.target.value)} 
                                />
                                {errors.description && <div className="text-red-500 text-sm">{errors.description}</div>}
                            </div>

                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={data.is_active} onChange={e => setData('is_active', e.target.checked)} />
                                    <span className="font-bold text-sm text-slate-700">Active</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked={data.is_published} onChange={e => setData('is_published', e.target.checked)} />
                                    <span className="font-bold text-sm text-slate-700">Published</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link
                                href="/admin/courses"
                                className="text-sm font-bold text-gray-500 hover:text-gray-900 px-6 py-3 transition-colors"
                            >
                                Cancel
                            </Link>
                            <Button 
                                type="submit"
                                disabled={processing} 
                                className="h-14 px-10 rounded-2xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                                style={{
                                    background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                    boxShadow: `0 10px 25px ${primaryColor}4d`
                                }}
                            >
                                {processing ? 'Updating...' : 'Update Course'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
