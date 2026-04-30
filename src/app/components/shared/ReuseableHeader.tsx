'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';
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
  currentStatus?: string;
  totalCount?: number;
}

const statusOptions = [
  { label: 'All Orders', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Confirmed', value: 'confirmed' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Cancelled', value: 'cancelled' },
];

const ReusableHeader = ({
  icon,
  title,
  description,
  actions = [],
  currentStatus = 'all',
  totalCount,
}: ReusableHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (status: string) => {
    if (status === 'all') {
      router.push(pathname);
    } else {
      router.push(`${pathname}?status=${status}`);
    }
  };

  const activeStatus =
    statusOptions.find((item) => item.value === currentStatus)?.label ||
    'All Orders';

  return (
    <header className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-start gap-4">
          {icon && (
            <div className="rounded-2xl bg-primary p-3 text-primary-foreground">
              {icon}
            </div>
          )}

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">{title}</h1>

              {typeof totalCount === 'number' && (
                <Badge variant="secondary">{totalCount}</Badge>
              )}
            </div>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 rounded-xl">
                <Filter className="h-4 w-4" />
                {activeStatus}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {statusOptions.map((status) => (
                <DropdownMenuItem
                  key={status.value}
                  onClick={() => handleFilter(status.value)}
                >
                  {status.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
