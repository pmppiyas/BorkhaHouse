'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PriceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const min = 500;
  const max = 10000;

  const currentMin = Number(searchParams.get('minPrice')) || min;
  const currentMax = Number(searchParams.get('maxPrice')) || max;

  const [price, setPrice] = useState<[number, number]>([
    currentMin,
    currentMax,
  ]);

  const minPercent = ((price[0] - min) / (max - min)) * 100;
  const maxPercent = ((price[1] - min) / (max - min)) * 100;

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('minPrice', String(price[0]));
    params.set('maxPrice', String(price[1]));
    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
          Price Range
        </h3>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
          Filter
        </span>
      </div>

      <div className="relative h-6 w-full">
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-muted" />

        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={price[0]}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), price[1] - 100);
            setPrice([val, price[1]]);
          }}
          className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
        />

        <input
          type="range"
          min={min}
          max={max}
          step={100}
          value={price[1]}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), price[0] + 100);
            setPrice([price[0], val]);
          }}
          className="pointer-events-none absolute inset-0 w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white"
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex-1 rounded-lg border bg-muted/30 p-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase">Min</p>
          <span className="text-sm font-bold">৳{price[0]}</span>
        </div>

        <div className="h-px w-4 bg-border" />

        <div className="flex-1 rounded-lg border bg-muted/30 p-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase">Max</p>
          <span className="text-sm font-bold">৳{price[1]}</span>
        </div>
      </div>

      <button
        onClick={handleApplyFilter}
        className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground hover:opacity-90"
      >
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
