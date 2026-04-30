import OrderPageWrapper from '@/app/components/admin/orders/OrderPageWrapper';
import OrdersSkeleton from '@/app/components/skeleton/admin/OrderSkeleton';
import ReusableHeaderSkeleton from '@/app/components/skeleton/ReusableHeaderSkeleton';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    status?: string;
  }>;
}

const page = ({ searchParams }: PageProps) => {
  return (
    <div>
      <Suspense
        fallback={
          <div className="space-y-4 p-4">
            <ReusableHeaderSkeleton />
            <OrdersSkeleton />
          </div>
        }
      >
        <OrderPageWrapper searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default page;
