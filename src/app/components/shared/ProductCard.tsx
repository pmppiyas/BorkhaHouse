'use client';

type Product = {
  title: string;
  brand: string;
  price: string;
  oldPrice?: string;
  reviews: number;
  image?: string;
  isNew?: boolean;
  discount?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="w-full max-w-65">
      <div className="relative h-55 w-full overflow-hidden rounded-xl bg-muted">
        <div className="absolute top-2 left-2 flex flex-col space-y-1 text-[10px] *:w-max">
          {product.discount && (
            <span className="text-destructive-foreground rounded-md bg-destructive px-2 py-0.5">
              {product.discount}
            </span>
          )}
          {product.isNew && (
            <span className="rounded-md bg-primary px-2 py-0.5 text-primary-foreground">
              New
            </span>
          )}
        </div>

        {/* COUNTDOWN */}
        <div className="absolute bottom-2 left-2 flex gap-1 text-[10px]">
          {['30 Days', '12 Hrs', '45 Min', '50 Sec'].map((t) => (
            <span
              key={t}
              className="rounded-md bg-background px-2 py-1 text-foreground shadow-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="mt-3 text-center">
        <p className="text-xs text-muted-foreground">{product.brand}</p>

        {/* ⭐ Rating */}
        <div className="flex items-center justify-center gap-1 text-sm text-yellow-500">
          ★★★★★
          <span className="text-[10px] text-muted-foreground">
            {product.reviews} reviews
          </span>
        </div>

        {/* TITLE */}
        <h3 className="mt-1 cursor-pointer text-sm font-medium text-foreground transition hover:text-primary">
          {product.title}
        </h3>

        {/* PRICE */}
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          <span className="font-semibold text-primary">{product.price}</span>
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
