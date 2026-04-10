import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Edit({ profile }: any) {
    const { data, setData, put, processing, errors } = useForm({
        specialization: profile.specialization || '',
        website: profile.website || '',
        twitter: profile.twitter || '',
        linkedin: profile.linkedin || '',
        youtube: profile.youtube || '',
        experience_years: profile.experience_years || '',
        education: profile.education || '',
        skills: (profile.skills || []).join(', '),
        bio: profile.bio || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/instructors/${profile.id}`);
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <Head title="Edit Instructor Profile" />
            <h1 className="text-2xl font-bold mb-6">Edit Instructor Profile</h1>
            <p className="text-muted-foreground mb-4">
                {profile.user?.name} ({profile.user?.email})
            </p>

            <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input id="specialization" value={data.specialization} onChange={e => setData('specialization', e.target.value)} />
                        {errors.specialization && <div className="text-red-500 text-sm">{errors.specialization}</div>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="experience_years">Experience (years)</Label>
                        <Input id="experience_years" type="number" value={data.experience_years} onChange={e => setData('experience_years', e.target.value)} />
                        {errors.experience_years && <div className="text-red-500 text-sm">{errors.experience_years}</div>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="education">Education</Label>
                    <Input id="education" value={data.education} onChange={e => setData('education', e.target.value)} />
                    {errors.education && <div className="text-red-500 text-sm">{errors.education}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="skills">Skills <span className="text-muted-foreground text-xs">(comma-separated)</span></Label>
                    <Input id="skills" value={data.skills} onChange={e => setData('skills', e.target.value)} placeholder="PHP, Laravel, React..." />
                    {errors.skills && <div className="text-red-500 text-sm">{errors.skills}</div>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                        id="bio"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                        value={data.bio}
                        onChange={e => setData('bio', e.target.value)}
                    />
                    {errors.bio && <div className="text-red-500 text-sm">{errors.bio}</div>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" value={data.website} onChange={e => setData('website', e.target.value)} placeholder="https://..." />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input id="linkedin" value={data.linkedin} onChange={e => setData('linkedin', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter</Label>
                        <Input id="twitter" value={data.twitter} onChange={e => setData('twitter', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="youtube">YouTube</Label>
                        <Input id="youtube" value={data.youtube} onChange={e => setData('youtube', e.target.value)} />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button disabled={processing} type="submit">Update Profile</Button>
                    <Button variant="outline" type="button" onClick={() => history.back()}>Cancel</Button>
                </div>
            </form>
        </div>
    );
}
