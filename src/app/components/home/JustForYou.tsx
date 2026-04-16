'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/app/components/shared/Header';
import ProductCard from '@/app/components/shared/ProductCard';
import { products } from '@/app/assets/product.assets';
import { categories } from '@/app/assets/nav.assets';
import { LayoutGrid, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IProduct } from '@/interface/product.interface';

const JustForYou = ({ products }: { products: IProduct[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 p-4 md:p-6">
      <Header title="Just For you" />

      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            {/* Sidebar Header */}
            <div className="flex items-center gap-3 bg-[#6366f1] p-4 text-white">
              <LayoutGrid size={20} />
              <span className="text-sm font-semibold">Today best offer</span>
            </div>

            <nav className="flex flex-col">
              {categories.map((cat, i) => {
                const Icon = cat.icon;
                const hasChildren = cat.children && cat.children.length > 0;
                const isOpen = openIndex === i;

                return (
                  <div
                    key={i}
                    className="border-b border-border/50 last:border-0"
                  >
                    {/* Parent Row */}
                    <div
                      onClick={() => hasChildren && toggleAccordion(i)}
                      className={cn(
                        'flex cursor-pointer items-center justify-between p-3.5 text-sm transition-colors hover:bg-accent',
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
                            'transition-transform duration-300',
                            isOpen ? 'rotate-180' : 'opacity-50'
                          )}
                        />
                      ) : (
                        <ChevronRight size={14} className="opacity-30" />
                      )}
                    </div>

                    {/* Accordion Content (Children) */}
                    <div
                      className={cn(
                        'overflow-hidden bg-muted/20 transition-all duration-300 ease-in-out',
                        isOpen ? 'max-h-125 opacity-100' : 'max-h-0 opacity-0'
                      )}
                    >
                      {hasChildren && (
                        <div className="flex flex-col py-1">
                          {cat.children!.map((child: any, idx: number) => (
                            <Link
                              key={idx}
                              href={child.href}
                              className="flex items-center gap-2 py-2 pr-4 pl-12 text-xs text-muted-foreground transition-colors hover:text-primary"
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
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default JustForYou;
