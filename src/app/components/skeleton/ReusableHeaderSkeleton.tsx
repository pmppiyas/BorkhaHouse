import { Skeleton } from '@/components/ui/skeleton';

const ReusableHeaderSkeleton = () => {
  return (
    <header className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-10 w-36 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>
    </header>
  );
};

export default ReusableHeaderSkeleton;
