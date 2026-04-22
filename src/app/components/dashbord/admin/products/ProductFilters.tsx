/* eslint-disable @typescript-eslint/no-unused-expressions */
'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ProductFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('searchTerm') || ''
  );
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    searchTerm
      ? params.set('searchTerm', searchTerm)
      : params.delete('searchTerm');

    minPrice ? params.set('minPrice', minPrice) : params.delete('minPrice');

    maxPrice ? params.set('maxPrice', maxPrice) : params.delete('maxPrice');

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <Input
          placeholder="Search product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Input
          placeholder="Min Price"
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />

        <Input
          placeholder="Max Price"
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <Button onClick={handleFilter}>Apply Filters</Button>
      </div>
    </div>
  );
}
