import { products } from '@/app/assets/product.assets';
import Header from '@/app/components/shared/Header';
import ProductCard from '@/app/components/shared/ProductCard';

function BestArraivals() {
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Header title="Best Sellers" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((p, i) => (
          <ProductCard key={i} product={p} />
        ))}
      </div>
    </div>
  );
}

export default BestArraivals;
