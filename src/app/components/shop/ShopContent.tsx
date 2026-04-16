'use client';

import EmptyState from '@/app/components/shared/EmptyState';
import ProductCard from '@/app/components/shared/ProductCard';
import ColorFilter from '@/app/components/shop/ColorFilter';
import PriceFilter from '@/app/components/shop/PriceFilter';
import { ICategory, IProduct } from '@/interface/product.interface';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

const ShopContent = ({
  categories,
  products,
}: {
  categories: ICategory[];
  products: IProduct[];
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const searchParams = useSearchParams();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const createCategoryLink = (category: string, subcategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('category', category);
    params.set('subcategory', subcategory);
    params.set('page', '1');

    return `/shop?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <aside className="w-full shrink-0 space-y-6 md:w-64">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
            <LayoutGrid size={20} />
            <span className="text-sm font-semibold">Shop Categories</span>
          </div>

          <nav className="flex flex-col">
            {categories.map((cat, i) => {
              const hasChildren = (cat.children?.length ?? 0) > 0;
              const isOpen = openIndex === i;

              return (
                <div key={cat._id} className="border-b last:border-0">
                  <div
                    onClick={() => hasChildren && toggleAccordion(i)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between p-3.5 text-sm transition hover:bg-accent',
                      isOpen ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <span className={cn('font-medium', isOpen && 'font-bold')}>
                      {cat.name}
                    </span>

                    {hasChildren ? (
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition duration-300',
                          isOpen && 'rotate-180'
                        )}
                      />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={cn(
                        'overflow-hidden bg-muted/20 transition-all duration-300',
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="flex flex-col py-1">
                        {cat.children?.map((child) => (
                          <Link
                            key={child._id}
                            href={createCategoryLink(cat.slug, child.slug)}
                            className="flex items-center gap-2 py-2 pr-4 pl-10 text-xs text-muted-foreground hover:text-primary"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-border" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <PriceFilter />
        <ColorFilter />
      </aside>

      <main className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={i} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
    </div>
  );
};

export default ShopContent;
