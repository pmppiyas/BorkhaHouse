import AuthContent from '@/app/components/auth/AuthContent';
import { Suspense } from 'react';

interface Props {
  searchParams: Promise<{
    mode?: string;
  }>;
}

const AuthPage = ({ searchParams }: Props) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <Suspense
        fallback={
          <div className="h-100 w-full max-w-md animate-pulse rounded-2xl bg-muted" />
        }
      >
        <AuthContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default AuthPage;
