import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm, usePage } from '@inertiajs/react';
import {
    Building2,
    Globe,
    Palette,
    ShieldCheck,
    Image as ImageIcon,
    ArrowLeft,
    CheckCircle2
} from 'lucide-react';
import { Link } from '@inertiajs/react';

type Tenant = {
    id: number;
    name: string;
    domain: string;
    logo_url: string | null;
    primary_color: string;
    secondary_color: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    description: string | null;
};

export default function EditTenant({ tenant }: { tenant: Tenant }) {
    const { branding } = usePage().props as any;
    const primaryColor = branding?.primary_color || '#4f46e5';

    const { data, setData, put, processing, errors } = useForm({
        name: tenant.name,
        domain: tenant.domain,
        logo_url: tenant.logo_url || '',
        primary_color: tenant.primary_color || '#4f46e5',
        secondary_color: tenant.secondary_color || '#4338ca',
        email: tenant.email || '',
        phone: tenant.phone || '',
        address: tenant.address || '',
        description: tenant.description || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/tenants/${tenant.id}`);
    };

    return (


        <div className="w-full flex-1 flex flex-col p-6">
            {/* Navigation Header */}
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/tenants"
                        className="p-2.5 rounded-xl bg-white border border-gray-100 text-gray-500 hover:text-gray-900 hover:shadow-md transition-all"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
                            Configure Workspace
                        </h1>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Refine institutional identity and branding</p>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-10 flex-1">
                {/* Main Configuration Form */}
                <div className="lg:col-span-8">
                    <form onSubmit={submit} className="space-y-8">
                        {/* Section: Core Identity */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                                    <Building2 size={20} />
                                </div>
                                <h3 className="font-extrabold text-slate-900">Core Identity</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Tenant Name</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                        placeholder="e.g. Elite Performance Academy"
                                    />
                                    {errors.name && <p className="text-xs font-bold text-rose-500 mt-1">{errors.name}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="domain" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Subdomain</Label>
                                    <div className="relative">
                                        <Input
                                            id="domain"
                                            value={data.domain}
                                            onChange={(e) => setData('domain', e.target.value)}
                                            className="h-12 pl-4 pr-32 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                            placeholder="academy"
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">.elitecoach.pro</div>
                                    </div>
                                    {errors.domain && <p className="text-xs font-bold text-rose-500 mt-1">{errors.domain}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section: Institutional Information */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                                    <ShieldCheck size={20} />
                                </div>
                                <h3 className="font-extrabold text-slate-900">Institutional Information</h3>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Contact Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                        placeholder="contact@academy.com"
                                    />
                                    {errors.email && <p className="text-xs font-bold text-rose-500 mt-1">{errors.email}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Contact Phone</Label>
                                    <Input
                                        id="phone"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                    {errors.phone && <p className="text-xs font-bold text-rose-500 mt-1">{errors.phone}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Physical Address</Label>
                                    <textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="w-full min-h-[100px] p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-sm font-medium"
                                        placeholder="Enter the institution's full address..."
                                    />
                                    {errors.address && <p className="text-xs font-bold text-rose-500 mt-1">{errors.address}</p>}
                                </div>

                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="description" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Institution Description</Label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="w-full min-h-[100px] p-4 rounded-xl border border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none text-sm font-medium"
                                        placeholder="Brief overview of the coaching center..."
                                    />
                                    {errors.description && <p className="text-xs font-bold text-rose-500 mt-1">{errors.description}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section: Visual Branding */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b border-gray-50">
                                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                                    <Palette size={20} />
                                </div>
                                <h3 className="font-extrabold text-slate-900">Visual Branding</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="logo_url" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Logo URL (Icon)</Label>
                                    <div className="relative group">
                                        <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                                        <Input
                                            id="logo_url"
                                            value={data.logo_url}
                                            onChange={(e) => setData('logo_url', e.target.value)}
                                            className="h-12 pl-12 pr-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/30 transition-all outline-none"
                                            placeholder="https://example.com/logo.png"
                                        />
                                    </div>
                                    {errors.logo_url && <p className="text-xs font-bold text-rose-500 mt-1">{errors.logo_url}</p>}
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="primary_color" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Primary Theme Color</Label>
                                        <div className="flex gap-3">
                                            <div
                                                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm shrink-0"
                                                style={{ backgroundColor: data.primary_color }}
                                            />
                                            <Input
                                                id="primary_color"
                                                value={data.primary_color}
                                                onChange={(e) => setData('primary_color', e.target.value)}
                                                className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                                placeholder="#4f46e5"
                                            />
                                        </div>
                                        {errors.primary_color && <p className="text-xs font-bold text-rose-500 mt-1">{errors.primary_color}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="secondary_color" className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">Secondary Accent Color</Label>
                                        <div className="flex gap-3">
                                            <div
                                                className="w-12 h-12 rounded-xl border-2 border-white shadow-sm shrink-0"
                                                style={{ backgroundColor: data.secondary_color }}
                                            />
                                            <Input
                                                id="secondary_color"
                                                value={data.secondary_color}
                                                onChange={(e) => setData('secondary_color', e.target.value)}
                                                className="h-12 px-4 rounded-xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/30 transition-all outline-none"
                                                placeholder="#4338ca"
                                            />
                                        </div>
                                        {errors.secondary_color && <p className="text-xs font-bold text-rose-500 mt-1">{errors.secondary_color}</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-4 pt-4">
                            <Link
                                href="/admin/tenants"
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
                                {processing ? 'Saving Changes...' : 'Update Workspace'}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Sidebar / Info Panel */}
                <div className="lg:col-span-4 space-y-6">
                    <div
                        className="rounded-3xl p-8 text-white relative overflow-hidden"
                        style={{ background: `linear-gradient(135deg, #1e1b4b 0%, ${primaryColor} 100%)` }}
                    >
                        <div className="relative z-10">
                            <h4 className="text-xl font-extrabold mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>Live Status</h4>
                            <ul className="space-y-4">
                                {[
                                    'Configuration is active and live.',
                                    'Primary color updates UI elements instantly.',
                                    'Subdomain changes will affect user access.',
                                    'Institutional metadata is used in reports.'
                                ].map((note, i) => (
                                    <li key={i} className="flex gap-3 text-sm font-medium opacity-90 leading-relaxed">
                                        <CheckCircle2 size={18} className="shrink-0 opacity-60" />
                                        {note}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl pointer-events-none" />
                    </div>

                    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-slate-800 text-indigo-400">
                                <Globe size={20} />
                            </div>
                            <h4 className="font-extrabold text-white">Live Preview</h4>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                                    style={{ backgroundColor: data.primary_color, color: 'white' }}
                                >
                                    {data.name ? data.name.charAt(0).toUpperCase() : 'E'}
                                </div>
                                <span className="font-bold text-white truncate">{data.name || 'Elite Preview'}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">Subdomain Structure</p>
                            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-500">
                                https://{data.domain || 'your-subdomain'}.elitecoach.pro
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
