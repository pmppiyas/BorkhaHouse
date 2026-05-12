import { getAllCategories } from '@/services/category/getAllCategories';
import CategoryAccordion from './CategoryAccordion';
import { Suspense } from 'react';
const CategoryWrapper = async () => {
  const allCategories = await getAllCategories();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CategoryAccordion categories={allCategories} />
    </Suspense>
  );
};

export default CategoryWrapper;
