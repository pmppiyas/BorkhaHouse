'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check } from 'lucide-react';

const FilterDropdown = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentStatus = searchParams.get('status') || 'all';

  const handleFilter = (status: string) => {
    if (status === 'all') {
      router.push('/admin/dashboard/orders');
    } else {
      router.push(`/admin/dashboard/orders?status=${status}`);
    }
  };

  const statuses = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-xl border-violet-200 capitalize transition-all hover:bg-violet-50"
        >
          Filter: {currentStatus}
          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 rounded-xl border-violet-100 shadow-lg"
      >
        {statuses.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => handleFilter(item.value)}
            className={`flex cursor-pointer items-center justify-between ${
              currentStatus === item.value
                ? 'bg-violet-50 font-medium text-violet-700'
                : ''
            }`}
          >
            {item.label}
            {/* যদি এটি একটিভ হয় তবে পাশে একটি টিক মার্ক দেখাবে */}
            {currentStatus === item.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
