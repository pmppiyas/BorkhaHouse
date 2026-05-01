import { Skeleton } from '@/components/ui/skeleton';

const ProductDetailsPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex w-full flex-col gap-10 md:flex-row lg:gap-20">
        {/* Left gallery skeleton */}
        <div className="w-full md:flex-1 lg:max-w-[40%]">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full rounded-2xl bg-muted/30" />

            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-20 w-20 rounded-xl bg-muted/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right details skeleton */}
        <div className="w-full space-y-6 md:flex-1">
          {/* title */}
          <div className="space-y-3">
            <Skeleton className="h-8 w-3/4 bg-muted/30" />
            <Skeleton className="h-4 w-full bg-muted/30" />
            <Skeleton className="h-4 w-5/6 bg-muted/30" />
          </div>

          {/* price */}
          <Skeleton className="h-10 w-32 bg-muted/30" />

          {/* size */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-16 bg-muted/30" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-10 w-16 rounded-md bg-muted/30"
                />
              ))}
            </div>
          </div>

          {/* quantity */}
          <div className="space-y-3">
            <Skeleton className="h-4 w-20 bg-muted/30" />
            <Skeleton className="h-12 w-40 rounded-md bg-muted/30" />
          </div>

          {/* buttons */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-12 w-full rounded-md bg-muted/30" />
            <Skeleton className="h-12 w-full rounded-md bg-muted/30" />
          </div>

          {/* meta */}
          <div className="grid gap-4 rounded-2xl border p-6 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full bg-muted/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPageSkeleton;
