'use client';

import { products } from '@/app/assets/product.assets';
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

  const selectedCategory = searchParams.get('category');
  const selectedSubcategory = searchParams.get('subcategory');

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const createCategoryLink = (category: string, subcategory?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('category', category);

    if (subcategory) {
      params.set('subcategory', subcategory);
    } else {
      params.delete('subcategory');
    }

    params.set('page', '1');

    return `/shop?${params.toString()}`;
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full shrink-0 space-y-6 md:w-72">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
            <LayoutGrid size={22} />
            <span className="text-base font-bold uppercase">
              Shop Categories
            </span>
          </div>

          <nav className="flex flex-col">
            {categories.map((cat, i) => {
              const hasChildren = !!cat.children?.length;
              const isOpen = openIndex === i;
              const isActiveCategory = selectedCategory === cat.slug;

              return (
                <div key={cat._id} className="border-b last:border-0">
                  <div
                    className={cn(
                      'flex items-center justify-between p-4 transition hover:bg-accent',
                      isActiveCategory
                        ? 'bg-primary/5 text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Link
                      href={createCategoryLink(cat.slug)}
                      scroll={false}
                      className="flex-1"
                    >
                      <span className="text-base font-semibold">
                        {cat.name}
                      </span>
                    </Link>

                    {hasChildren ? (
                      <button
                        type="button"
                        onClick={() => toggleAccordion(i)}
                        className="pl-3"
                      >
                        <ChevronDown
                          size={18}
                          className={cn(
                            'transition duration-300',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </div>

                  {hasChildren && (
                    <div
                      className={cn(
                        'overflow-hidden bg-muted/10 transition-all duration-300',
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="flex flex-col py-2">
                        {cat.children?.map((child) => {
                          const isActiveSub =
                            selectedSubcategory === child.slug;

                          return (
                            <Link
                              key={child._id}
                              href={createCategoryLink(cat.slug, child.slug)}
                              scroll={false}
                              className="group flex items-center gap-3 py-2.5 pr-4 pl-10 hover:text-primary"
                            >
                              <span
                                className={cn(
                                  'h-2 w-2 rounded-full bg-border',
                                  isActiveSub && 'bg-primary'
                                )}
                              />

                              <span
                                className={cn(
                                  'text-sm',
                                  isActiveSub && 'font-semibold text-primary'
                                )}
                              >
                                {child.name}
                              </span>
                            </Link>
                          );
                        })}
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

      {/* PRODUCTS */}
      <main className="flex-1 md:mt-8">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopContent;
