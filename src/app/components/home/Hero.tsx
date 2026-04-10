'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { heroBanner } from '@/app/assets/public.assets';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:grid md:grid-cols-4 md:p-6">
      <div
        className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:col-span-3"
        ref={emblaRef}
      >
        <div className="flex h-100 w-full md:h-[calc(100vh-180px)] md:max-h-200">
          {heroBanner.map((item, index) => (
            <div
              key={index}
              className="relative h-full min-w-full flex-[0_0_100%]"
            >
              <Image
                src={item.image}
                alt={`hero-${index}`}
                fill
                className="object-cover object-center"
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 75vw"
              />

              <div className="absolute inset-0 flex items-end bg-linear-to-t from-background/80 via-transparent to-transparent p-6 md:p-12">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                    Exclusive <br /> Collection
                  </h2>
                  <button className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none md:text-base">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator*/}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {heroBanner.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                selectedIndex === index
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-primary/30 hover:bg-primary/50'
              )}
            />
          ))}
        </div>
      </div>

      {/* 📋 SIDE THUMBNAILS */}
      <div className="hidden flex-col gap-4 overflow-y-auto pr-2 md:flex md:max-h-[calc(100vh-180px)]">
        <h3 className="mb-1 text-lg font-semibold tracking-tight text-foreground">
          Top Categories
        </h3>
        <div className="space-y-3">
          {heroBanner.map((item, index) => (
            <div
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={cn(
                'flex cursor-pointer items-center gap-4 overflow-hidden rounded-xl border-2 p-3 transition-all duration-200',
                selectedIndex === index
                  ? 'scale-[1.02] border-primary bg-accent shadow-sm'
                  : 'border-transparent bg-muted/50 opacity-80 hover:bg-muted hover:opacity-100'
              )}
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border">
                <Image
                  src={item.image}
                  alt={item.thumb}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p
                  className={cn(
                    'text-sm font-bold',
                    selectedIndex === index ? 'text-primary' : 'text-foreground'
                  )}
                >
                  {item.thumb}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Latest Design
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
