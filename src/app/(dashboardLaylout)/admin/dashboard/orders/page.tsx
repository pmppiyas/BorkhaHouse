import OrderPageWrapper from '@/app/components/admin/orders/OrderPageWrapper';
import OrdersSkeleton from '@/app/components/skeleton/admin/OrderSkeleton';
import ReusableHeaderSkeleton from '@/app/components/skeleton/ReusableHeaderSkeleton';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;

  return (
    <Suspense
      key={resolvedParams.status || 'all'}
      fallback={
        <div className="space-y-4 p-4">
          <ReusableHeaderSkeleton />
          <OrdersSkeleton />
        </div>
      }
    >
      <OrderPageWrapper status={resolvedParams.status} />
    </Suspense>
  );
};

export default Page;
