import { Head, useForm, router, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Box, ArrowLeft } from 'lucide-react';

export default function Create({ sessions, students, selected_session_id }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';

    const { data, setData, post, processing, errors } = useForm({
        class_session_id: selected_session_id || '',
        student_id: '',
        status: 'present',
        remarks: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/attendances', {
            onSuccess: () => {
                setData('student_id', '');
            }
        });
    };

    const handleSessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setData('class_session_id', val);
        router.get('/admin/attendances/create', { class_session_id: val }, { preserveState: true });
    };

    return (
        <div className="w-full flex-1 flex flex-col p-6">
            <Head title="Mark Attendance" />
            
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/attendances"
                        className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-gray-900 hover:shadow-md transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Mark Attendance
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Record student presence</p>
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
                                <h3 className="font-extrabold text-slate-900">Attendance Details</h3>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="class_session_id" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Class Session</Label>
                                <select 
                                    id="class_session_id" 
                                    className="h-12 px-4 w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900"
                                    value={data.class_session_id}
                                    onChange={handleSessionChange}
                                >
                                    <option value="" className="text-slate-900">Select a Session</option>
                                    {sessions.map((s: any) => (
                                        <option key={s.id} value={s.id} className="text-slate-900">{s.session_date} — {s.batch?.name} ({s.topic || 'No topic'})</option>
                                    ))}
                                </select>
                                {errors.class_session_id && <div className="text-red-500 text-sm">{errors.class_session_id}</div>}
                            </div>
                            
                            {data.class_session_id && (
                                <>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="student_id" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Student</Label>
                                            <select 
                                                id="student_id" 
                                                className="h-12 px-4 w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900"
                                                value={data.student_id}
                                                onChange={e => setData('student_id', e.target.value)}
                                            >
                                                <option value="" className="text-slate-900">Select a Student</option>
                                                {students?.map((s: any) => (
                                                    <option key={s.id} value={s.id} className="text-slate-900">{s.name} ({s.email})</option>
                                                ))}
                                            </select>
                                            {errors.student_id && <div className="text-red-500 text-sm">{errors.student_id}</div>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="status" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Status</Label>
                                            <select 
                                                id="status" 
                                                className="h-12 px-4 w-full rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-slate-900"
                                                value={data.status}
                                                onChange={e => setData('status', e.target.value)}
                                            >
                                                <option value="present" className="text-slate-900">Present</option>
                                                <option value="absent" className="text-slate-900">Absent</option>
                                                <option value="late" className="text-slate-900">Late</option>
                                                <option value="excused" className="text-slate-900">Excused</option>
                                            </select>
                                            {errors.status && <div className="text-red-500 text-sm">{errors.status}</div>}
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <Label htmlFor="remarks" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Remarks</Label>
                                        <textarea 
                                            id="remarks" 
                                            className="w-full min-h-[100px] p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-sm font-medium text-slate-900"
                                            value={data.remarks}
                                            onChange={e => setData('remarks', e.target.value)} 
                                        />
                                        {errors.remarks && <div className="text-red-500 text-sm">{errors.remarks}</div>}
                                    </div>
                                </>
                            )}
                        </div>

                        {data.class_session_id && (
                            <div className="flex items-center justify-end gap-4 pt-4">
                                <Link
                                    href="/admin/attendances"
                                    className="text-sm font-bold text-gray-500 hover:text-gray-900 px-6 py-3 transition-colors"
                                >
                                    Cancel
                                </Link>
                                <Button 
                                    type="submit"
                                    disabled={processing || !data.student_id} 
                                    className="h-14 px-10 rounded-2xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95"
                                    style={{
                                        background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                        boxShadow: `0 10px 25px ${primaryColor}4d`
                                    }}
                                >
                                    {processing ? 'Marking...' : 'Mark Attendance'}
                                </Button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
