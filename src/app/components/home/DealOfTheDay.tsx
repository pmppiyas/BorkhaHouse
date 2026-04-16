'use client';

import Header from '@/app/components/shared/Header';
import ProductCard from '@/app/components/shared/ProductCard';
import { IProduct } from '@/interface/product.interface';

const DealOfTheDay = ({ products }: { products: IProduct[] }) => {
  if (!products.length) return;
  return (
    <div className="space-y-4 p-4 md:p-6">
      <Header title="Deal Of The Day" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
        {/* 1 (left top) */}
        <div className="flex items-center justify-center rounded-xl bg-card shadow-sm md:col-start-1 md:row-start-1">
          <ProductCard product={products[0]} />
        </div>

        {/* 2 (left bottom) */}
        <div className="flex items-center justify-center rounded-xl bg-card shadow-sm md:col-start-1 md:row-start-2">
          <ProductCard product={products[1]} />
        </div>

        {/* 3 (middle BIG) */}
        <div className="col-span-2 row-span-2 flex items-center justify-center rounded-xl border-primary bg-card shadow-md md:col-start-2 md:row-start-1">
          <ProductCard product={{ ...products[2], isBig: true }} />
        </div>

        {/* 4 (right top) */}
        <div className="flex items-center justify-center rounded-xl bg-card shadow-sm md:col-start-4 md:row-start-1">
          <ProductCard product={products[3]} />
        </div>

        {/* 5 (right bottom) */}
        <div className="rounded-xlbg-card flex items-center justify-center shadow-sm md:col-start-4 md:row-start-2">
          <ProductCard product={products[4]} />
        </div>
      </div>
    </div>
  );
};

export default DealOfTheDay;
