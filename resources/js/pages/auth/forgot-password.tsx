import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Recover Your Account" />

            {status && (
                <div className="mb-6 px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {status}
                </div>
            )}

            <Form {...email.form()} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Registered Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="off"
                                autoFocus
                                placeholder="name@elitecoach.com"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.email} className="ml-1" />
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                                className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #3525cd 100%)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {processing ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="w-5 h-5 border-white/20 border-t-white" />
                                        <span className="tracking-tight">Sending Link...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight">Email Recovery Link</span>
                                )}
                            </Button>
                        </div>

                        {/* Back to Login link */}
                        <div className="text-center pt-2">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Remembered your key?{' '}
                                <Link href={login()} className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors">
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

ForgotPassword.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Account Recovery"
        description="Enter your email address and we'll send you a secure link to reset your workspace access."
    >
        {page}
    </AuthEliteCoachLayout>
);
