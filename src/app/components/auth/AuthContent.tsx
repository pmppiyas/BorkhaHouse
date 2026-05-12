import SignIn from '@/app/components/auth/SignIn';
import SignUp from '@/app/components/auth/SignUp';
import Link from 'next/link';

interface Props {
  searchParams: Promise<{
    mode?: string;
  }>;
}

const AuthContent = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const mode = params?.mode === 'signup' ? 'signup' : 'signin';

  return (
    <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-xl">
      {/* Tabs */}
      <div className="mb-6 flex rounded-lg bg-muted p-1">
        <Link
          href="/auth?mode=signin"
          className={`w-1/2 rounded-md py-2 text-center text-sm font-medium transition-all ${
            mode === 'signin'
              ? 'bg-background text-foreground shadow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign In
        </Link>

        <Link
          href="/auth?mode=signup"
          className={`w-1/2 rounded-md py-2 text-center text-sm font-medium transition-all ${
            mode === 'signup'
              ? 'bg-background text-foreground shadow'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Sign Up
        </Link>
      </div>

      {/* Content */}
      <div className="space-y-4 transition-all duration-300">
        {mode === 'signin' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default AuthContent;
