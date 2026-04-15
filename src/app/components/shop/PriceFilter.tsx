'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const PriceFilter = () => {
  const [price, setPrice] = useState([20, 450]);
  const min = 0;
  const max = 500;

  const minPercent = (price[0] / max) * 100;
  const maxPercent = (price[1] / max) * 100;

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

      <div className="relative h-6 w-full touch-none select-none">
        {/* Track Background */}
        <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-muted" />

        {/* Active Range Highlight */}
        <div
          className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-primary"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        />

        {/* Real Sliders */}
        <input
          type="range"
          min={min}
          max={max}
          value={price[0]}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), price[1] - 10);
            setPrice([val, price[1]]);
          }}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-125"
        />

        <input
          type="range"
          min={min}
          max={max}
          value={price[1]}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), price[0] + 10);
            setPrice([price[0], val]);
          }}
          className="pointer-events-none absolute inset-0 z-20 h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-125"
        />
      </div>

      {/* Values Display Box */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <div className="flex-1 rounded-lg border border-border bg-muted/30 p-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase">Min</p>
          <span className="text-sm font-bold">${price[0]}</span>
        </div>

        <div className="h-px w-4 bg-border" />

        <div className="flex-1 rounded-lg border border-border bg-muted/30 p-2 text-center">
          <p className="text-[10px] text-muted-foreground uppercase">Max</p>
          <span className="text-sm font-bold">${price[1]}</span>
        </div>
      </div>

      <button className="mt-4 w-full rounded-lg bg-primary py-2 text-xs font-bold text-primary-foreground transition-opacity hover:opacity-90">
        Apply Filter
      </button>
    </div>
  );
};

export default PriceFilter;
