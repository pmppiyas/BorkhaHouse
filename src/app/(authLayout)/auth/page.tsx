'use client';

import SignIn from '@/app/components/auth/SignIn';
import SignUp from '@/app/components/auth/SignUp';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const AuthPage = () => {
  const searchParams = useSearchParams();

  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
        {/* Tabs */}
        <div className="mb-6 flex rounded-lg bg-muted p-1">
          <Link
            href="/auth?mode=signin"
            className={`w-1/2 rounded-md py-2 text-center text-sm font-medium ${
              mode === 'signin'
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            Sign In
          </Link>

          <Link
            href="/auth?mode=signup"
            className={`w-1/2 rounded-md py-2 text-center text-sm font-medium ${
              mode === 'signup'
                ? 'bg-background text-foreground shadow'
                : 'text-muted-foreground'
            }`}
          >
            Sign Up
          </Link>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {mode === 'signin' ? <SignIn /> : <SignUp />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
