'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const colors = [
  '#000000',
  '#FFFFFF',
  '#8B4513',
  '#4B5320',
  '#2F4F4F',
  '#800000',
];

const ColorFilter = ({ selectedColor, setSelectedColor }: any) => {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-sm font-bold tracking-wider text-foreground uppercase">
          Color
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {selectedColor ? 1 : 0}
          </span>
        </h3>
        {selectedColor && (
          <button
            onClick={() => setSelectedColor(null)}
            className="text-[10px] text-muted-foreground underline transition-colors hover:text-primary"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((c, i) => {
          const isSelected = selectedColor === c;
          const isWhite =
            c.toLowerCase() === '#ffffff' || c.toLowerCase() === 'white';

          return (
            <button
              key={i}
              onClick={() => setSelectedColor(isSelected ? null : c)}
              className={cn(
                'group relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border transition-all duration-300 active:scale-90',
                isSelected
                  ? 'scale-110 shadow-sm ring-2 ring-primary ring-offset-2'
                  : 'border-border hover:scale-110'
              )}
              style={{ backgroundColor: c }}
              title={c}
            >
              {/* সিলেক্ট হলে চেক আইকন দেখাবে */}
              {isSelected && (
                <Check
                  size={14}
                  className={cn(
                    'animate-in duration-300 zoom-in',
                    isWhite ? 'text-black' : 'text-white'
                  )}
                />
              )}

              {/* হোভার ইফেক্ট */}
              <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-primary transition-all group-hover:w-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
