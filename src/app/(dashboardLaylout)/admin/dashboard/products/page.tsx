import ProductFilters from '@/app/components/dashbord/admin/products/ProductFilters';
import ProductHeader from '@/app/components/dashbord/admin/products/ProductHeader';
import ProductsContent from '@/app/components/dashbord/admin/products/ProductsContent';

const page = () => {
  return (
    <div className="space-y-6 p-4">
      <ProductHeader />
      <ProductFilters />
      <ProductsContent />
    </div>
  );
};

export default page;
