import { getAllCategories } from '@/services/category/getAllCategories';
import ProductFormPage from '@/app/components/dashbord/admin/products/ProductFormPage';

const page = async () => {
  const categories = await getAllCategories();

  return (
    <div className="space-y-6 p-4">
      <ProductFormPage categories={categories} mode="CREATE" />
    </div>
  );
};

export default page;
