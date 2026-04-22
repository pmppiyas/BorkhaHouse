import ProductCard from '@/app/components/shared/ProductCard';
import { IProduct } from '@/interface/product.interface';
import { getAllProducts } from '@/services/product/getAllProducts';
import React from 'react';

const ProductsContent = async () => {
  const allProducts = await getAllProducts();

  const { products }: { products: IProduct[] } = allProducts;
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={i} product={p} />
      ))}
    </div>
  );
};

export default ProductsContent;
