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
      {/* Sidebar Section */}
      <aside className="w-full shrink-0 space-y-6 md:w-72">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
            <LayoutGrid size={22} />
            <span className="text-base font-bold tracking-wider uppercase">
              Shop Categories
            </span>
          </div>

          <nav className="flex flex-col">
            {categories.map((cat, i) => {
              const hasChildren = (cat.children?.length ?? 0) > 0;
              const isOpen = openIndex === i;

              return (
                <div key={cat._id} className="border-b last:border-0">
                  <div
                    className={cn(
                      'flex cursor-pointer items-center justify-between p-4 transition hover:bg-accent',
                      isOpen
                        ? 'bg-primary/5 text-primary'
                        : 'text-muted-foreground'
                    )}
                  >
                    <Link
                      href={createCategoryLink(cat.slug)}
                      scroll={false}
                      onClick={(e) => {
                        if (hasChildren) {
                          toggleAccordion(i);
                        }
                      }}
                      className="flex-1"
                    >
                      <span
                        className={cn(
                          'text-lg font-semibold tracking-tight',
                          isOpen && 'text-primary'
                        )}
                      >
                        {cat.name}
                      </span>
                    </Link>

                    {hasChildren && (
                      <div onClick={() => toggleAccordion(i)} className="pl-4">
                        <ChevronDown
                          size={20}
                          className={cn(
                            'transition duration-300',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </div>
                    )}
                    {!hasChildren && <ChevronRight size={18} />}
                  </div>

                  {hasChildren && (
                    <div
                      className={cn(
                        'overflow-hidden bg-muted/10 transition-all duration-300',
                        isOpen ? 'max-h-250 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      <div className="flex flex-col py-2">
                        {cat.children?.map((child) => (
                          <Link
                            key={child._id}
                            href={createCategoryLink(cat.slug, child.slug)}
                            scroll={false}
                            className="group flex items-center gap-3 py-2.5 pr-4 pl-10 text-muted-foreground transition-colors hover:text-primary"
                          >
                            <span
                              className={cn(
                                'h-2 w-2 rounded-full bg-border transition-colors group-hover:bg-primary',
                                searchParams.get('subcategory') ===
                                  child.slug && 'bg-primary'
                              )}
                            />
                            <span
                              className={cn(
                                'text-[16px] font-medium',
                                searchParams.get('subcategory') ===
                                  child.slug && 'font-bold text-primary'
                              )}
                            >
                              {child.name}
                            </span>
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

      {/* Product Main Section */}
      <main className="flex-1">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p._id || i} product={p} />
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
