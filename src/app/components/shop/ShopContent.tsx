'use client';

import { categories } from '@/app/assets/nav.assets';
import { products } from '@/app/assets/product.assets';
import ProductCard from '@/app/components/shared/ProductCard';
import ColorFilter from '@/app/components/shop/ColorFilter';
import PriceFilter from '@/app/components/shop/PriceFilter';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const ShopContent = () => {
  const [openIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      {/* 🔹 SIDEBAR */}
      <aside className="w-full shrink-0 space-y-6 md:w-64">
        {/* CATEGORY */}
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3 bg-primary p-4 text-primary-foreground">
            <LayoutGrid size={20} />
            <span className="text-sm font-semibold">Today best offer</span>
          </div>

          <nav className="flex flex-col">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              const hasChildren = (cat.children?.length ?? 0) > 0;
              const isOpen = openIndex === i;

              return (
                <div key={i} className="border-b last:border-0">
                  {/* Parent */}
                  <div
                    onClick={() => hasChildren && toggleAccordion(i)}
                    className={cn(
                      'flex cursor-pointer items-center justify-between p-3.5 text-sm transition hover:bg-accent',
                      isOpen ? 'text-primary' : 'text-muted-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          size={18}
                          className={cn(
                            isOpen ? 'text-primary' : 'text-muted-foreground'
                          )}
                        />
                      )}
                      <span
                        className={cn('font-medium', isOpen && 'font-bold')}
                      >
                        {cat.name}
                      </span>
                    </div>

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

                  {/* Children */}
                  <div
                    className={cn(
                      'overflow-hidden bg-muted/20 transition-all duration-300',
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    )}
                  >
                    {hasChildren && (
                      <div className="flex flex-col py-1">
                        {cat.children!.map((child: any, idx: number) => (
                          <Link
                            key={idx}
                            href={child.href}
                            className="flex items-center gap-2 py-2 pr-4 pl-12 text-xs text-muted-foreground hover:text-primary"
                          >
                            <span className="h-1 w-1 rounded-full bg-border" />
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        <PriceFilter />

        <ColorFilter />
      </aside>

      {/* 🔹 PRODUCTS */}
      <main className="flex-1">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ShopContent;
