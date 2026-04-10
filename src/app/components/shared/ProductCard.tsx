'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils'; // Tailwind ক্লাস ম্যানেজ করার জন্য Shadcn এর ইউটিলিতি

type Product = {
  title: string;
  brand: string;
  price: string;
  oldPrice?: string;
  reviews: number;
  images?: string[];
  isNew?: boolean;
  discount?: string;
  isBig?: boolean;
};

export default function ProductCard({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const images = product.images || [];

  return (
    <div
      className={cn(
        'group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card p-3 transition-all duration-300 hover:border-primary/50 hover:shadow-md',
        product.isBig ? 'min-h-[400px]' : 'min-h-[320px]'
      )}
    >
      {/* IMAGE CONTAINER */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl bg-muted',
          product.isBig ? 'flex-1' : 'h-52 md:h-60'
        )}
      >
        {/* IMAGE SLIDER */}
        {images.length > 0 ? (
          <Image
            src={images[index]}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <p className="text-xs text-muted-foreground">No Image</p>
          </div>
        )}

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1 text-[10px] font-bold">
          {product?.discount && (
            <span className="text-destructive-foreground rounded-md bg-destructive px-2 py-0.5 shadow-sm">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-primary-foreground shadow-sm">
              New
            </span>
          )}
        </div>

        {/* ADD TO CART (HOVER) */}
        <div className="absolute inset-0 flex translate-y-4 items-center justify-center opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button size="sm" className="shadow-xl">
            Add to Cart
          </Button>
        </div>

        {/* THUMB SLIDER (Dots) */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                onMouseEnter={() => setIndex(i)}
                className={cn(
                  'h-1.5 w-1.5 cursor-pointer rounded-full transition-all',
                  index === i ? 'w-4 bg-primary' : 'bg-white/60'
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div
        className={cn(
          'mt-4 flex flex-col items-center text-center',
          product.isBig ? 'space-y-2 py-2' : 'space-y-1'
        )}
      >
        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
          {product.brand}
        </p>

        {/* TITLE */}
        <h3
          className={cn(
            'line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary',
            product.isBig ? 'text-lg' : 'text-sm'
          )}
        >
          {product.title}
        </h3>

        {/* ⭐ Rating */}
        <div className="flex items-center gap-1 text-xs text-yellow-500">
          <span>★★★★★</span>
          <span className="text-[10px] font-medium text-muted-foreground">
            ({product.reviews})
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-bold text-primary">
            {product.price}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through opacity-70">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
