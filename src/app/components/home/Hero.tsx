'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { IProduct } from '@/interface/product.interface';

const Hero = ({ products = [] }: { products: IProduct[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const banners = products
    .filter((item) => item?.thumbnail || item?.images?.[0])
    .slice(0, 4);

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

  if (!banners.length) return null;

  return (
    <div className="flex w-full flex-col gap-6 p-4 md:grid md:grid-cols-4 md:p-6">
      <div
        ref={emblaRef}
        className="group relative w-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:col-span-3"
      >
        <div className="flex h-100 w-full md:h-[calc(100vh-180px)] md:max-h-200">
          {banners.map((item, index) => {
            const imageSrc =
              item.thumbnail || item.images?.[0] || '/placeholder.jpg';

            return (
              <div
                key={item._id || index}
                className="relative h-full min-w-full flex-[0_0_100%]"
              >
                <Image
                  src={imageSrc}
                  alt={item.name}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 75vw"
                />

                <div className="absolute inset-0 flex items-end bg-linear-to-t from-background/80 via-transparent to-transparent p-6 md:p-12">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                      {item.name}
                    </h2>
                    <button className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* indicators */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
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

      {/* side list */}
      <div className="hidden flex-col gap-4 overflow-y-auto pr-2 md:flex md:max-h-[calc(100vh-180px)]">
        <h3 className="mb-1 text-lg font-semibold tracking-tight">
          Top Categories
        </h3>

        <div className="space-y-3">
          {banners.map((item, index) => {
            const thumb =
              item.thumbnail || item.images?.[0] || '/placeholder.jpg';

            return (
              <div
                key={item._id || index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  'flex cursor-pointer items-center gap-4 rounded-xl border-2 p-3 transition-all',
                  selectedIndex === index
                    ? 'scale-[1.02] border-primary bg-accent shadow-sm'
                    : 'border-transparent bg-muted/50 hover:bg-muted'
                )}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image
                    src={thumb}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p
                    className={cn(
                      'text-sm font-bold',
                      selectedIndex === index
                        ? 'text-primary'
                        : 'text-foreground'
                    )}
                  >
                    {item.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Latest Design
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
