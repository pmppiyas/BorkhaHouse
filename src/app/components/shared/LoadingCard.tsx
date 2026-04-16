'use client';

const PageSkeleton = () => {
  return (
    <div className="animate-pulse space-y-10 px-4 py-6">
      <div className="h-56 w-full overflow-hidden rounded-2xl bg-muted md:h-72 lg:h-80">
        <div className="shimmer h-full w-full" />
      </div>

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-muted"
          >
            <div className="shimmer" />
          </div>
        ))}
      </div>

      <div className="relative h-6 w-48 overflow-hidden rounded bg-muted">
        <div className="shimmer" />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="space-y-3 overflow-hidden rounded-xl border bg-card p-3"
          >
            {/* IMAGE */}
            <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted">
              <div className="shimmer" />
            </div>

            {/* TITLE */}
            <div className="relative h-4 w-3/4 overflow-hidden rounded bg-muted">
              <div className="shimmer" />
            </div>

            {/* PRICE */}
            <div className="relative h-4 w-1/2 overflow-hidden rounded bg-muted">
              <div className="shimmer" />
            </div>

            {/* BUTTON */}
            <div className="relative h-9 w-full overflow-hidden rounded-lg bg-muted">
              <div className="shimmer" />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .shimmer {
          position: absolute;
          inset: 0;
          transform: translateX(-100%);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default PageSkeleton;
