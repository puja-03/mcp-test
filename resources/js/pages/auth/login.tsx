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
            {/* <Head title="Log in — EliteCoach" /> */}

            {status && (
                <div className="mb-4 px-4 py-3 rounded-lg bg-green-50 text-green-700 text-sm font-medium border border-green-100">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                placeholder="you@example.com"
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        tabIndex={5}
                                        className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
                                    >
                                        Forgot password?
                                    </Link>
                                )}
                            </div>
                            <PasswordInput
                                id="password"
                                name="password"
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                placeholder="Enter your password"
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center gap-2.5">
                            <Checkbox id="remember" name="remember" tabIndex={3} />
                            <Label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                                Keep me signed in
                            </Label>
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                            className="h-11 w-full rounded-lg text-sm font-semibold text-white transition-all"
                            style={{
                                background: processing
                                    ? '#6366f1'
                                    : 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                            }}
                        >
                            {processing && <Spinner />}
                            {processing ? 'Signing in…' : 'Sign In'}
                        </Button>

                        {/* Divider */}
                        <div className="relative my-1">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-white text-xs text-gray-400 uppercase tracking-widest">or</span>
                            </div>
                        </div>

                        {/* Register link */}
                        {canRegister && (
                            <p className="text-center text-sm text-gray-500">
                                New to EliteCoach?{' '}
                                <Link
                                    href={register()}
                                    tabIndex={6}
                                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    Create a free account
                                </Link>
                            </p>
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
        description="Access your elite coaching dashboard"
    >
        {page}
    </AuthEliteCoachLayout>
);
