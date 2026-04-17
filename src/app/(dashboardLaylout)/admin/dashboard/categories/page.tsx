import CategoryHeader from '@/app/components/dashbord/admin/category/CategoryHeader';
import CategorySkeleton from '@/app/components/dashbord/admin/category/CategorySkeleton';
import CategoryWrapper from '@/app/components/dashbord/admin/category/CategoryWrapper';
import { Suspense } from 'react';

const page = async () => {
  return (
    <div className="space-y-6 p-4">
      <CategoryHeader />
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryWrapper />
      </Suspense>
    </div>
  );
};

export default page;
