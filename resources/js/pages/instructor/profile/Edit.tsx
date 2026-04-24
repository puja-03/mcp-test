import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Twitter, Linkedin, Youtube, GraduationCap, Briefcase } from 'lucide-react';

export default function Edit({ profile }: { profile: any }) {
    const { data, setData, put, processing, errors } = useForm({
        specialization: profile.specialization || '',
        website: profile.website || '',
        twitter: profile.twitter || '',
        linkedin: profile.linkedin || '',
        youtube: profile.youtube || '',
        experience_years: profile.experience_years?.toString() || '',
        education: profile.education || '',
        skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
        bio: profile.bio || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put('/instructor/profile');
    };

    return (
        <>
            <Head title="Instructor Profile" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <GraduationCap className="h-7 w-7 text-primary" />
                            Public Profile
                        </h1>
                        <p className="text-muted-foreground mt-1">This information will be visible to students and prospective enrollees.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* Professional Info */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-primary" /> Professional Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Specialization</Label>
                                            <Input value={data.specialization} onChange={(e) => setData('specialization', e.target.value)} placeholder="e.g. Theoretical Physics, Web Development" />
                                            {errors.specialization && <p className="text-xs text-destructive">{errors.specialization}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Years of Experience</Label>
                                            <Input type="number" value={data.experience_years} onChange={(e) => setData('experience_years', e.target.value)} placeholder="e.g. 5" />
                                            {errors.experience_years && <p className="text-xs text-destructive">{errors.experience_years}</p>}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Education</Label>
                                        <Input value={data.education} onChange={(e) => setData('education', e.target.value)} placeholder="e.g. PhD in Computer Science" />
                                        {errors.education && <p className="text-xs text-destructive">{errors.education}</p>}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Bio & Skills */}
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <GraduationCap className="w-5 h-5 text-primary" /> Bio & Expertise
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Skills (Comma separated)</Label>
                                        <Input value={data.skills} onChange={(e) => setData('skills', e.target.value)} placeholder="React, Node.js, TypeScript..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Biography</Label>
                                        <Textarea className="resize-y min-h-[150px]" value={data.bio} onChange={(e) => setData('bio', e.target.value)} placeholder="Tell your students about your journey, teaching philosophy, and what they can expect to learn from you..." />
                                        {errors.bio && <p className="text-xs text-destructive">{errors.bio}</p>}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar: Social Links */}
                        <div className="space-y-6">
                            <Card className="shadow-sm sticky top-6">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-lg flex items-center gap-2">
                                        <Globe className="w-5 h-5 text-primary" /> Social Presence
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 font-medium"><Globe className="w-4 h-4 text-muted-foreground" /> Website</Label>
                                        <Input value={data.website} onChange={(e) => setData('website', e.target.value)} placeholder="https://..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 font-medium"><Twitter className="w-4 h-4 text-muted-foreground" /> Twitter (X)</Label>
                                        <Input value={data.twitter} onChange={(e) => setData('twitter', e.target.value)} placeholder="@handle" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 font-medium"><Linkedin className="w-4 h-4 text-muted-foreground" /> LinkedIn</Label>
                                        <Input value={data.linkedin} onChange={(e) => setData('linkedin', e.target.value)} placeholder="linkedin.com/in/..." />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="flex items-center gap-2 font-medium"><Youtube className="w-4 h-4 text-muted-foreground" /> YouTube</Label>
                                        <Input value={data.youtube} onChange={(e) => setData('youtube', e.target.value)} placeholder="Channel URL" />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-4 border-t pt-6">
                        <Button variant="ghost" type="button" onClick={() => history.back()}>Discard Changes</Button>
                        <Button disabled={processing} type="submit" className="min-w-[150px]">Save Profile</Button>
                    </div>
                </form>
            </div>
        </>
    );
}
