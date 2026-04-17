const CategorySkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border bg-card p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-4 w-4 rounded bg-muted" />
              <div className="h-4 w-40 rounded bg-muted" />
            </div>

            <div className="h-4 w-4 rounded bg-muted" />
          </div>

          {/* fake children */}
          {index % 2 === 0 && (
            <div className="mt-4 space-y-3 pl-8">
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
