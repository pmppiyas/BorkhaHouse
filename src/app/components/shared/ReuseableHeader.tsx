'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter, usePathname } from 'next/navigation';

interface IAction {
  label: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

interface ReusableHeaderProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actions?: IAction[];
  filterSlot?: React.ReactNode;
  totalCount?: number;
}

const ReusableHeader = ({
  icon,
  title,
  description,
  actions = [],
  filterSlot,
  totalCount,
}: ReusableHeaderProps) => {
  return (
    <header className="rounded-2xl border bg-card/80 px-4 py-4 shadow-sm backdrop-blur-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* ───────── LEFT SIDE ───────── */}
        <div className="flex items-start gap-4">
          {icon && (
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground shadow-sm">
              {icon}
            </div>
          )}

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>

              {typeof totalCount === 'number' && (
                <Badge variant="secondary" className="rounded-full">
                  {totalCount}
                </Badge>
              )}
            </div>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {filterSlot}

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
      </div>
    </header>
  );
};

export default ReusableHeader;
