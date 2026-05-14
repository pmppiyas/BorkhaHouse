import ProductFilters from '@/app/components/dashbord/admin/products/ProductFilters';
import ProductHeader from '@/app/components/dashbord/admin/products/ProductHeader';
import ProductsContent from '@/app/components/dashbord/admin/products/ProductsContent';
import { Suspense } from 'react';

const page = () => {
  return (
    <div className="space-y-6 p-4">
      <Suspense fallback={<p>Loading</p>}>
        <ProductHeader />
        <ProductFilters />
        <ProductsContent />
      </Suspense>
    </div>
  );
};

export default page;
