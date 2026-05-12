import CategoryAccordion from '@/app/components/dashbord/admin/category/CategoryAccordion';
import { getAllCategories } from '@/services/category/getAllCategories';

const CategoryWrapper = async () => {
  const allCategories = await getAllCategories();

  return <CategoryAccordion categories={allCategories} />;
};

export default CategoryWrapper;
