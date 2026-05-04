import { Form, Head, usePage } from '@inertiajs/react';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useMemo, useState, useEffect } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth';
import { store } from '@/routes/two-factor/login';
import { Spinner } from '@/components/ui/spinner';
import AuthEliteCoachLayout from '@/layouts/auth/auth-elitecoach-layout';

export default function TwoFactorChallenge() {
    const [showRecoveryInput, setShowRecoveryInput] = useState<boolean>(false);
    const [code, setCode] = useState<string>('');

    const authConfigContent = useMemo<{
        title: string;
        description: string;
        toggleText: string;
    }>(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'Use an authentication code instead',
            };
        }

        return {
            title: 'Authentication code',
            description:
                'Enter the secure authentication code provided by your authenticator application.',
            toggleText: 'Use a recovery code instead',
        };
    }, [showRecoveryInput]);

    const toggleRecoveryMode = (clearErrors: () => void): void => {
        setShowRecoveryInput(!showRecoveryInput);
        clearErrors();
        setCode('');
    };

    return (
        <AuthEliteCoachLayout
            title={authConfigContent.title}
            description={authConfigContent.description}
        >
            <Head title="Two-factor authentication" />

            <div className="space-y-6">
                <Form
                    {...store.form()}
                    className="space-y-6"
                    resetOnError
                    resetOnSuccess={!showRecoveryInput}
                >
                    {({ errors, processing, clearErrors }) => (
                        <>
                            {showRecoveryInput ? (
                                <div className="space-y-2">
                                    <Input
                                        name="recovery_code"
                                        type="text"
                                        placeholder="XXXXX-XXXXX"
                                        autoFocus={showRecoveryInput}
                                        required
                                        className="h-12 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 font-mono text-center tracking-widest"
                                    />
                                    <InputError message={errors.recovery_code} />
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                    <div className="flex w-full items-center justify-center">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            value={code}
                                            onChange={(value) => setCode(value)}
                                            disabled={processing}
                                            pattern={REGEXP_ONLY_DIGITS}
                                        >
                                            <InputOTPGroup className="gap-2">
                                                {Array.from(
                                                    { length: OTP_MAX_LENGTH },
                                                    (_, index) => (
                                                        <InputOTPSlot
                                                            key={index}
                                                            index={index}
                                                            className="w-12 h-14 text-lg font-bold rounded-xl border-slate-200 bg-slate-50 focus:ring-2 focus:ring-indigo-500/20"
                                                        />
                                                    ),
                                                )}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                    <InputError message={errors.code} />
                                </div>
                            )}

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="h-14 w-full rounded-2xl text-sm font-extrabold text-white transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group shadow-[0_10px_20px_-5px_rgba(79,70,229,0.3)] hover:shadow-[0_20px_30px_-10px_rgba(79,70,229,0.4)]"
                                    disabled={processing}
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
                                        <span className="tracking-tight tracking-wider">Confirm Verification</span>
                                    )}
                                </Button>
                            </div>

                            <div className="text-center pt-2">
                                <button
                                    type="button"
                                    className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors"
                                    onClick={() => toggleRecoveryMode(clearErrors)}
                                >
                                    {authConfigContent.toggleText}
                                </button>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthEliteCoachLayout>
    );
}
