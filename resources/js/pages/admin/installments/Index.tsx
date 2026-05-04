import AppEliteCoachLayout from '@/layouts/app-elitecoach-layout';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { 
    CreditCard, 
    Plus, 
    Search, 
    Calendar, 
    User, 
    Layers,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    ArrowRight,
    DollarSign,
    Receipt
} from 'lucide-react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function Index({ installments, filters }: any) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';
    const [status, setStatus] = useState(filters.status || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/installments', { status }, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this installment? This might lead to fiscal inconsistencies.')) {
            router.delete(`/admin/installments/${id}`);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'paid': return <CheckCircle2 size={12} />;
            case 'pending': return <Clock size={12} />;
            case 'overdue': return <AlertCircle size={12} />;
            case 'waived': return <XCircle size={12} />;
            default: return <Clock size={12} />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'pending': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'overdue': return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'waived': return 'bg-slate-50 text-slate-700 border-slate-100';
            default: return 'bg-gray-50 text-gray-700 border-gray-100';
        }
    };

    return (
        <AppEliteCoachLayout title="Fiscal Installments">
            <Head title="Manage Installments" />
            
            <div className="w-full px-6 lg:px-12 py-10 flex-1 flex flex-col">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Receivables Ledger
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Audit and track student installment cycles and aging reports</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link 
                            href="/admin/installments/create"
                            className="h-11 px-6 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg"
                            style={{ 
                                background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor}dd 100%)`,
                                boxShadow: `0 8px 20px ${primaryColor}4d`
                            }}
                        >
                            <Plus size={18} />
                            Generate Installment
                        </Link>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="bg-white p-2 rounded-2xl border border-gray-100 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-2">
                    <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 w-full">
                        <div className="h-11 px-4 bg-gray-50/50 rounded-xl border-transparent flex flex-1 items-center gap-3 group">
                            <Receipt size={16} className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <select 
                                value={status} 
                                onChange={e => setStatus(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 text-sm font-bold text-slate-700 outline-none w-full appearance-none cursor-pointer"
                            >
                                <option value="">ALL PAYMENT STATUSES</option>
                                <option value="pending">PENDING APPROVAL</option>
                                <option value="paid">FULLY SETTLED</option>
                                <option value="overdue">OVERDUE ARREARS</option>
                                <option value="waived">ADMIN WAIVED</option>
                            </select>
                        </div>
                        <Button type="submit" className="h-11 px-6 rounded-xl font-bold text-white shadow-md transition-all active:scale-95" style={{ background: primaryColor }}>
                            Apply Filter
                        </Button>
                    </form>
                </div>

                {/* Main Table Container */}
                <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-50 bg-gray-50/30">
                                    <th className="px-8 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Student Payer</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Pricing Plan</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Amount Due</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Maturity Date</th>
                                    <th className="px-6 py-5 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider text-center">Status</th>
                                    <th className="px-8 py-5 text-right text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {installments.data.map((ins: any) => (
                                    <tr key={ins.id} className="group hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div 
                                                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-md group-hover:scale-110 transition-transform"
                                                    style={{ background: primaryColor }}
                                                >
                                                    {ins.enrollment?.student?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                                        {ins.enrollment?.student?.name}
                                                    </div>
                                                    <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mt-0.5 flex items-center gap-1">
                                                        <Layers size={10} /> {ins.enrollment?.batch?.name}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="text-sm font-bold text-slate-600 truncate max-w-[150px]">
                                                {ins.fee_structure?.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <div className="flex items-center gap-1 text-slate-900 font-bold">
                                                    <DollarSign size={14} className="text-emerald-500" />
                                                    {ins.amount.toLocaleString()}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="flex items-center gap-1.5 text-slate-600 font-bold text-xs">
                                                    <Calendar size={12} className="text-gray-400" />
                                                    {ins.due_date}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex justify-center">
                                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-extrabold uppercase tracking-widest ${getStatusColor(ins.status)}`}>
                                                    {getStatusIcon(ins.status)}
                                                    {ins.status}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link 
                                                    href={`/admin/installments/${ins.id}/edit`}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(ins.id)}
                                                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {installments.data.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center text-gray-300">
                                                    <Receipt size={32} />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">No Installment Records</h3>
                                                    <p className="text-sm text-gray-500 mt-1">Institutional receivables ledger is currently empty.</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Footer */}
                    <div className="px-8 py-6 border-t border-gray-50 bg-gray-50/30 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Showing {installments.from}-{installments.to} of {installments.total} Entries
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                            {installments.links.map((link: any, index: number) => {
                                const isNext = link.label.includes('Next');
                                const isPrev = link.label.includes('Previous');
                                
                                return (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url)}
                                        className={`
                                            h-9 min-w-[36px] px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2
                                            ${link.active 
                                                ? 'bg-indigo-600 text-white shadow-md' 
                                                : 'bg-white border border-gray-100 text-slate-600 hover:bg-gray-50'
                                            }
                                            ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}
                                        `}
                                    >
                                        {isPrev && <ChevronLeft size={14} />}
                                        {!isPrev && !isNext && <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                        {isNext && <ChevronRight size={14} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AppEliteCoachLayout>
    );
}
