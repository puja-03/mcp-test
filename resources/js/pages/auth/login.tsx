import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({ status, canResetPassword, canRegister }: Props) {
    return (
        <>
            <Head title="Access Your Dashboard" />

            {status && (
                <div className="mb-6 px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Email Identity
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="name@elitecoach.com"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.email} className="ml-1" />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label htmlFor="password" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                                    Secure Key
                                </Label>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        tabIndex={5}
                                        className="text-[10px] text-indigo-500 hover:text-indigo-600 font-extrabold uppercase tracking-wider transition-colors"
                                    >
                                        Recover Access
                                    </Link>
                                )}
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="••••••••••••"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.password} className="ml-1" />
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-3 ml-1">
                            <Checkbox 
                                id="remember" 
                                name="remember" 
                                tabIndex={3} 
                                className="w-5 h-5 rounded-lg border-slate-200 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 transition-all" 
                            />
                            <Label htmlFor="remember" className="text-xs font-bold text-slate-500 cursor-pointer select-none">
                                Keep session active
                            </Label>
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                                className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #3525cd 100%)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {processing ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="w-5 h-5 border-white/20 border-t-white" />
                                        <span className="tracking-tight">Verifying Identity...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight">Sign In to Workspace</span>
                                )}
                            </Button>
                        </div>

                        {/* Register link */}
                        {canRegister && (
                            <div className="text-center pt-2">
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                    New to the platform?{' '}
                                    <Link
                                        href={register()}
                                        tabIndex={6}
                                        className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors"
                                    >
                                        Initialize Account
                                    </Link>
                                </p>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </>
    );
}

Login.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Welcome Back"
        description="Authenticate to access your high-performance dashboard and coaching tools."
    >
        {page}
    </AuthEliteCoachLayout>
);
