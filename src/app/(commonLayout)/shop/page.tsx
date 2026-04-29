import HybridHeader from '@/app/components/shared/HybridHeader';
import ShopContent from '@/app/components/shop/ShopContent';
import { getAllCategories } from '@/services/category/getAllCategories';
import { getAllProducts } from '@/services/product/getAllProducts';

interface Props {
  searchParams: Promise<{
    category?: string;
    subcategory?: string;
  }>;
}
const page = async ({ searchParams }: Props) => {
  const { category, subcategory } = await searchParams;

  const categories = await getAllCategories();

  const { products } = await getAllProducts({ category, subcategory });

  return (
    <div className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
      <HybridHeader title="Shop" />
      <ShopContent categories={categories} products={products} />
    </div>
  );
};

export default page;
