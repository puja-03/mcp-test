import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, User, Mail, Lock, GraduationCap, Briefcase, FileText, Code } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        specialization: '',
        experience_years: '',
        education: '',
        bio: '',
        skills: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tenant/instructors');
    };

    return (
        <AppLayout>
            <Head title="Add Instructor" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted transition-colors">
                        <Link href="/tenant/instructors">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Add New Instructor</h1>
                        <p className="text-muted-foreground font-medium">Create a new instructor account and their professional profile.</p>
                    </div>
                </div>

                <div className="max-w-4xl bg-card rounded-2xl border shadow-xl p-8 ring-1 ring-border/50">
                    <form onSubmit={submit} className="space-y-10">
                        {/* Section: Account Information */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 pb-2 border-b border-dashed">
                                <User className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-bold uppercase tracking-widest text-foreground/80">Account Credentials</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="e.g. John Doe" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    {errors.name && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.name}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} placeholder="john@example.com" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    {errors.email && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.email}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Account Password</Label>
                                    <div className="relative group">
                                        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} placeholder="••••••••" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                    {errors.password && <p className="text-xs text-destructive font-black mt-1 uppercase tracking-tighter">{errors.password}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Section: Professional Profile */}
                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-2 pb-2 border-b border-dashed">
                                <GraduationCap className="h-5 w-5 text-primary" />
                                <h2 className="text-lg font-bold uppercase tracking-widest text-foreground/80">Professional Profile</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label htmlFor="specialization" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Specialization</Label>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="specialization" value={data.specialization} onChange={(e) => setData('specialization', e.target.value)} placeholder="e.g. Mathematics, AI, Web Dev" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experience_years" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Years of Experience</Label>
                                    <div className="relative group">
                                        <Briefcase className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="experience_years" type="number" value={data.experience_years} onChange={(e) => setData('experience_years', e.target.value)} placeholder="0" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="education" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Education Background</Label>
                                    <div className="relative group">
                                        <GraduationCap className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="education" value={data.education} onChange={(e) => setData('education', e.target.value)} placeholder="e.g. PhD in Computer Science" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="skills" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Skills (Comma Separated)</Label>
                                    <div className="relative group">
                                        <Code className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input id="skills" value={data.skills} onChange={(e) => setData('skills', e.target.value)} placeholder="React, Node.js, PHP, Python" className="h-12 pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-bold uppercase text-[11px] tracking-widest" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-muted-foreground">Short Biography</Label>
                                    <div className="relative group">
                                        <FileText className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Textarea id="bio" value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Tell us about the instructor..." className="min-h-[150px] pl-10 bg-muted/30 border-muted-foreground/20 focus:ring-primary/40 font-medium leading-relaxed resize-none shadow-inner pt-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-8 border-t">
                            <Button type="submit" disabled={processing} className="h-14 px-12 gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all font-black uppercase tracking-widest text-xs flex-1 md:flex-none animate-in slide-in-from-bottom-2">
                                <Save className="h-5 w-5" /> Save Instructor Profile
                            </Button>
                            <Button variant="ghost" asChild className="h-14 px-8 font-black uppercase tracking-widest text-xs text-muted-foreground hover:bg-muted transition-colors">
                                <Link href="/tenant/instructors">Cancel</Link>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
