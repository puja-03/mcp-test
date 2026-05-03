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
            <Head title="Create Account — EliteCoach" />

            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-5"
            >
                {({ processing, errors }) => (
                    <>
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Full name
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
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.name} className="mt-1" />
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                name="email"
                                placeholder="you@example.com"
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                required
                                tabIndex={3}
                                autoComplete="new-password"
                                name="password"
                                placeholder="Create a strong password"
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm Password */}
                        <div className="flex flex-col gap-1.5">
                            <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                Confirm password
                            </Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                tabIndex={4}
                                autoComplete="new-password"
                                name="password_confirmation"
                                placeholder="Repeat your password"
                                className="h-11 rounded-lg border-gray-200 bg-slate-50 px-4 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            tabIndex={5}
                            data-test="register-user-button"
                            className="h-11 w-full rounded-lg text-sm font-semibold text-white transition-all mt-1"
                            style={{
                                background: 'linear-gradient(180deg, #4f46e5 0%, #4338ca 100%)',
                                boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
                            }}
                        >
                            {processing && <Spinner />}
                            {processing ? 'Creating account…' : 'Create Free Account'}
                        </Button>

                        {/* Terms note */}
                        <p className="text-center text-xs text-gray-400 leading-relaxed -mt-1">
                            By creating an account you agree to our{' '}
                            <span className="text-indigo-500">Terms of Service</span>{' '}
                            and{' '}
                            <span className="text-indigo-500">Privacy Policy</span>.
                        </p>

                        {/* Divider */}
                        <div className="relative my-0.5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100" />
                            </div>
                            <div className="relative flex justify-center">
                                <span className="px-3 bg-white text-xs text-gray-400 uppercase tracking-widest">or</span>
                            </div>
                        </div>

                        {/* Login link */}
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href={login()} tabIndex={6} className="font-semibold text-indigo-600 hover:text-indigo-700">
                                Sign in
                            </Link>
                        </p>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = (page: React.ReactNode) => (
    <AuthEliteCoachLayout
        title="Create Your Account"
        description="Join thousands of elite coaches on EliteCoach"
    >
        {page}
    </AuthEliteCoachLayout>
);
