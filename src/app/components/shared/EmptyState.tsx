import { PackageSearch } from 'lucide-react';

const EmptyState = ({
  title = 'No Products Found',
  description = 'Try adjusting your filters or search to find what you need.',
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <div className="flex min-h-80 w-full flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-8 text-center">
      <div className="mb-4 rounded-full bg-primary/10 p-4">
        <PackageSearch className="h-10 w-10 text-primary" />
      </div>

      <h3 className="text-xl font-semibold text-foreground">{title}</h3>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
