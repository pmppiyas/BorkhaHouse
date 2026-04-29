'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation'; // নেভিগেশন এর জন্য
import { ShoppingCart } from 'lucide-react'; // আইকন এর জন্য
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { IProduct } from '@/interface/product.interface';

export default function ProductCard({ product }: { product: IProduct }) {
  const router = useRouter();
  const thumbnail = product?.thumbnail?.trim() || null;

  const handleNavigate = () => {
    router.push(`/details/${product.slug}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Added to cart:', product._id);
  };

  return (
    <div
      onClick={handleNavigate}
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
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={product?.name || 'Product Image'}
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
            <span className="rounded-md bg-destructive px-2 py-0.5 text-white shadow-sm">
              Save{' '}
              {Math.round(
                ((product.price - product.discount) / product.price) * 100
              )}
              %
            </span>
          )}
        </div>

        {/* ADD TO CART (ICON ONLY) */}
        <div className="absolute top-2 right-2 flex translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Button
            onClick={handleAddToCart}
            size="icon"
            className="h-8 w-8 rounded-full shadow-xl"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
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

        <h3
          className={cn(
            'line-clamp-1 font-semibold text-foreground transition-colors group-hover:text-primary',
            product.isBig ? 'text-lg' : 'text-sm'
          )}
        >
          {product.name}
        </h3>

        {/* PRICE */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-bold text-primary">
            ৳{product.discount || product.price}
          </span>
          {product.discount && (
            <span className="text-xs text-muted-foreground line-through opacity-70">
              ৳{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
