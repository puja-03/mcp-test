import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { update } from '@/routes/password';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <>
            <Head title="Establish New Access" />

            <Form
                {...update.form()}
                transform={(data) => ({ ...data, token, email })}
                resetOnSuccess={['password', 'password_confirmation']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email - Read Only */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Verified Identity
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                autoComplete="email"
                                value={email}
                                className="h-12 rounded-2xl border-none bg-slate-100/50 px-5 text-sm font-bold text-slate-400 cursor-not-allowed"
                                readOnly
                            />
                            <InputError message={errors.email} className="ml-1" />
                        </div>

                        {/* New Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                New Secure Key
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                autoComplete="new-password"
                                autoFocus
                                placeholder="••••••••••••"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.password} className="ml-1" />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password_confirmation" className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">
                                Confirm New Key
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                name="password_confirmation"
                                autoComplete="new-password"
                                placeholder="••••••••••••"
                                className="h-12 rounded-2xl border-none bg-slate-50 px-5 text-sm font-medium text-slate-900 placeholder:text-slate-300 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                            />
                            <InputError message={errors.password_confirmation} className="ml-1" />
                        </div>

                        {/* Submit */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={processing}
                                data-test="reset-password-button"
                                className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                style={{
                                    background: 'linear-gradient(180deg, #4f46e5 0%, #3525cd 100%)',
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                {processing ? (
                                    <div className="flex items-center gap-3">
                                        <Spinner className="w-5 h-5 border-white/20 border-t-white" />
                                        <span className="tracking-tight">Updating Access...</span>
                                    </div>
                                ) : (
                                    <span className="tracking-tight">Set New Access Key</span>
                                )}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

ResetPassword.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Establish Access"
        description="Your recovery link has been verified. Please define a new secure key to regain entry to your dashboard."
    >
        {page}
    </AuthEliteCoachLayout>
);
