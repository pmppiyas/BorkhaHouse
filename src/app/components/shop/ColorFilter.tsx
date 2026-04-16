'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const defaultColors = ['white', 'black', 'red', 'olive', 'gray'];

const ColorFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialColor = searchParams.get('color') || null;
  const [selectedColor, setSelectedColor] = useState<string | null>(
    initialColor
  );

  const [customColor, setCustomColor] = useState('');

  const handleSelect = (color: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (color) {
      params.set('color', color);
    } else {
      params.delete('color');
    }

    params.set('page', '1');

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    setSelectedColor(color);
  };

  const handleAddCustomColor = () => {
    if (!customColor) return;
    handleSelect(customColor);
    setCustomColor('');
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold tracking-wider text-foreground uppercase">
          Color
        </h3>

        {selectedColor && (
          <button
            onClick={() => handleSelect(null)}
            className="text-[10px] text-muted-foreground underline hover:text-primary"
          >
            Reset
          </button>
        )}
      </div>

      {/* DEFAULT COLORS */}
      <div className="flex flex-wrap gap-3">
        {defaultColors.map((c) => {
          const isSelected = selectedColor === c;
          const isWhite = c.toLowerCase() === '#ffffff';

          return (
            <button
              key={c}
              onClick={() => handleSelect(isSelected ? null : c)}
              className={cn(
                'relative flex h-7 w-7 items-center justify-center rounded-full border transition active:scale-90',
                isSelected
                  ? 'scale-110 ring-2 ring-primary ring-offset-2'
                  : 'hover:scale-110'
              )}
              style={{ backgroundColor: c }}
            >
              {isSelected && (
                <Check
                  size={14}
                  className={isWhite ? 'text-black' : 'text-white'}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* CUSTOM COLOR INPUT */}
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder="e.g. #ff0000 or red"
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          className="w-full rounded-md border bg-background px-2 py-1 text-sm"
        />

        <button
          onClick={handleAddCustomColor}
          className="rounded-md bg-primary px-3 text-xs font-bold text-primary-foreground"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default ColorFilter;
