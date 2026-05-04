import { Form, Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Verify Your Identity" />

            {status === 'verification-link-sent' && (
                <div className="mb-6 px-4 py-3 rounded-2xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    A fresh link has been dispatched to your workspace email.
                </div>
            )}

            <Form {...send.form()} className="flex flex-col gap-6">
                {({ processing }) => (
                    <>
                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #3525cd 100%)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {processing ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="w-5 h-5 border-white/20 border-t-white" />
                                        <span className="tracking-tight">Dispatching...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight">Resend Verification Email</span>
                                )}
                            </Button>
                        </div>

                        <div className="text-center pt-2">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                Need to exit?{' '}
                                <Link href={logout()} className="text-indigo-600 hover:text-indigo-700 ml-1 transition-colors">
                                    Terminate Session
                                </Link>
                            </p>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Verify Email"
        description="We've sent a secure verification link to your registered email address. Please follow the instructions to activate your workspace."
    >
        {page}
    </AuthEliteCoachLayout>
);
