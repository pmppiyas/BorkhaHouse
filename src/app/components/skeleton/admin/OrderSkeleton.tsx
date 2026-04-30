'use client';

import { Skeleton } from '@/components/ui/skeleton';

const OrdersSkeleton = () => {
  return (
    <div className="flex flex-col gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card p-4 shadow-sm">
          <div className="flex justify-between gap-6">
            {/* LEFT SIDE */}
            <div className="w-full max-w-md space-y-4">
              {/* name */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* phone */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-28" />
              </div>

              {/* address */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-48" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </div>

              {/* date */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="w-full max-w-sm space-y-4 lg:text-right">
              {/* products */}
              <div className="space-y-2">
                <Skeleton className="ml-auto h-4 w-20" />

                <div className="space-y-2">
                  <Skeleton className="ml-auto h-3 w-full" />
                  <Skeleton className="ml-auto h-3 w-3/4" />
                  <Skeleton className="ml-auto h-3 w-2/3" />
                </div>
              </div>

              {/* total */}
              <div className="space-y-2">
                <Skeleton className="ml-auto h-4 w-12" />
                <Skeleton className="ml-auto h-6 w-24" />
              </div>

              {/* badge */}
              <Skeleton className="ml-auto h-6 w-20 rounded-full" />

              {/* select */}
              <div className="space-y-2">
                <Skeleton className="ml-auto h-4 w-32" />
                <Skeleton className="ml-auto h-10 w-40 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersSkeleton;
