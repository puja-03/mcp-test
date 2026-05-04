import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

export default function Register() {
    return (
        <>
            <Head title="Join EliteCoach" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Full Name */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Full Name
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="name"
                                name="name"
                                placeholder="Dr. Jane Smith"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.name} className="ml-1" />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Email Workspace
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="name@elitecoach.com"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.email} className="ml-1" />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Private Key
                            </Label>
                            <PasswordInput
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Create a strong key"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.password} className="ml-1" />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password_confirmation" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Confirm Key
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Repeat your key"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.password_confirmation} className="ml-1" />
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                tabIndex={5}
                                data-test="register-user-button"
                                className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #3525cd 100%)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {processing ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="w-5 h-5 border-white/20 border-t-white" />
                                        <span className="tracking-tight">Initializing...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight">Create Professional Account</span>
                                )}
                            </Button>
                        </div>

                        {/* Terms note */}
                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                            By initializing you agree to our{' '}
                            <span className="text-indigo-500 underline underline-offset-4">Terms</span>{' '}
                            and{' '}
                            <span className="text-indigo-500 underline underline-offset-4">Privacy</span>.
                        </p>

                        {/* Login link */}
                        <div className="text-center pt-2">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Already registered?{' '}
                                <Link href={login()} tabIndex={6} className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Initialize Your Workspace"
        description="Join an elite network of high-performance coaches and scale your expertise today."
    >
        {page}
    </AuthEliteCoachLayout>
);
