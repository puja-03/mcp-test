import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password/confirm';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Secure Confirmation" />

            <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-2">
                            <Label htmlFor="password" title="Password">Confirm Access</Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Enter your secure password"
                                autoComplete="current-password"
                                autoFocus
                                className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20"
                            />
                            <InputError message={errors.password} />
                        </div>

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
                                        <span className="tracking-tight">Verifying...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight tracking-wider">Confirm Identity</span>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Identity Verification"
        description="This is a restricted administrative area. Please confirm your credentials to verify your identity before proceeding."
    >
        {page}
    </AuthEliteCoachLayout>
);
