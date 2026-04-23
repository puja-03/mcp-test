import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, User, Mail, Lock, GraduationCap, Briefcase, FileText, Code } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

type Instructor = {
    id: number;
    name: string;
    email: string;
    instructor_profile: {
        specialization: string | null;
        experience_years: number | null;
        education: string | null;
        bio: string | null;
        skills: string[] | null;
    } | null;
};

export default function Edit({ instructor }: { instructor: Instructor }) {
    const { data, setData, put, processing, errors } = useForm({
        name: instructor.name,
        email: instructor.email,
        password: '',
        specialization: instructor.instructor_profile?.specialization || '',
        experience_years: instructor.instructor_profile?.experience_years?.toString() || '',
        education: instructor.instructor_profile?.education || '',
        bio: instructor.instructor_profile?.bio || '',
        skills: instructor.instructor_profile?.skills?.join(', ') || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/tenant/instructors/${instructor.id}`);
    };

    return (
        <AppLayout>
            <Head title={`Edit Instructor: ${instructor.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted transition-colors">
                        <Link href="/tenant/instructors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Edit Instructor</h1>
                        <p className="text-muted-foreground font-medium">Update profile details for <span className="text-primary font-bold">{instructor.name}</span>.</p>
                    </div>
                </div>

                <div className="max-w-4xl bg-card rounded-2xl border shadow-xl p-8 ring-1 ring-border/50 animate-in fade-in zoom-in-95 duration-300">
                    <form onSubmit={submit} className="space-y-10">
                        {/* Section: Account Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-dashed">
                                <User className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-bold uppercase tracking-widest text-foreground/80">Update Account Credentials</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Full Name" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    {errors.name && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="Email" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    {errors.email && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" title="Leave blank to keep current password" className="text-xs font-black uppercase tracking-widest text-muted-foreground">New Password (Optional)</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="••••••••" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-tight">Leave blank to keep existing password.</p>
                                    {errors.password && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.password}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section: Professional Profile */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-dashed">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-bold uppercase tracking-widest text-foreground/80">Edit Professional Profile</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="specialization" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Specialization</Label>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="specialization" value={data.specialization} onChange={(e) => setData('specialization', e.target.value)} placeholder="Specialization" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience_years" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Years of Experience</Label>
                                    <div className="relative group">
                                        <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="experience_years" type="number" value={data.experience_years} onChange={(e) => setData('experience_years', e.target.value)} placeholder="Experience" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="education" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Education Background</Label>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="education" value={data.education} onChange={(e) => setData('education', e.target.value)} placeholder="Education" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="skills" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Skills (Comma Separated)</Label>
                                    <div className="relative group">
                                        <Code className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="skills" value={data.skills} onChange={(e) => setData('skills', e.target.value)} placeholder="Skills" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold uppercase text-[11px] tracking-widest" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Biography Update</Label>
                                    <div className="relative group">
                                        <FileText className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Bio" className="min-h-[150px] pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-medium leading-relaxed resize-none shadow-inner pt-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-8 border-t">
                            <Button type="submit" disabled={processing} className="h-14 px-12 gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-black uppercase tracking-widest text-xs flex-1 md:flex-none">
                                <Save className="h-5 w-5" /> Update Instructor Details
                            </Button>
                            <Button variant="ghost" asChild className="h-14 px-8 font-black uppercase tracking-widest text-xs text-muted-foreground hover:bg-muted transition-colors">
                                <Link href="/tenant/instructors">Cancel Changes</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
