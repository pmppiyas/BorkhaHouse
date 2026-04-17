import { getAllCategories } from '@/services/category/getAllCategories';
import CategoryAccordion from './CategoryAccordion';

const CategoryWrapper = async () => {
  const allCategories = await getAllCategories();

  return <CategoryAccordion categories={allCategories} />;
};

export default CategoryWrapper;
