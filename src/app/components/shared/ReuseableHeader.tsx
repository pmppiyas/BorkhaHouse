import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderAction {
  label: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

interface ReusableHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: HeaderAction[];
  className?: string;
}

const ReusableHeader = ({
  icon,
  title,
  description,
  actions = [],
  className,
}: ReusableHeaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm md:flex-row md:items-center md:justify-between',
        className
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {icon}
          </div>
        )}

        <div className="space-y-1">
          <h1 className="text-xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant || 'default'}
              onClick={action.onClick}
              className="gap-2 rounded-xl"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReusableHeader;
