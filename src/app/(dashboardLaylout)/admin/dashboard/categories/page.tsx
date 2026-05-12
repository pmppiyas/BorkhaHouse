import CategoryHeader from '@/app/components/dashbord/admin/category/CategoryHeader';
import CategorySkeleton from '@/app/components/dashbord/admin/category/CategorySkeleton';
import CategoryWrapper from '@/app/components/dashbord/admin/category/CategoryWrapper';
import { Suspense } from 'react';

const Page = () => {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <div className="space-y-6 p-4">
        <CategoryHeader />
        <CategoryWrapper />
      </div>
    </Suspense>
  );
};

export default Page;
