'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductGallery = ({ images }: { images: string[] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-[500px] w-full animate-pulse rounded-2xl bg-muted" />
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col gap-5">
      {/* ── Main Image Container ── */}
      <div className="group relative h-137.5 w-full overflow-hidden rounded-3xl border bg-secondary/20 shadow-sm transition-all hover:shadow-md">
        {/* Badges */}
        <div className="absolute top-5 left-5 z-20 flex flex-col gap-2">
          <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-bold tracking-wider text-background uppercase shadow-sm">
            New Arrival
          </span>
          <span className="text-destructive-foreground rounded-full bg-destructive px-3 py-1 text-[11px] font-bold tracking-wider uppercase shadow-sm">
            -50% Off
          </span>
        </div>

        {/* Zoom Icon (Visual Guide) */}
        <div className="absolute top-5 right-5 z-20 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="rounded-full bg-background/80 p-2 shadow-md backdrop-blur-sm">
            <ZoomIn className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>

        {/* Navigation Arrows (Only visible on hover) */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-background/90 p-2 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-background/90 p-2 opacity-0 shadow-lg transition-all group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Main Image with Hover Zoom Effect */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt="Product Display"
            fill
            priority
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>

      {/* ── Professional Thumbnail Strip ── */}
      <div className="flex flex-wrap items-center justify-start gap-4 px-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              'relative h-24 w-20 overflow-hidden rounded-xl border-2 transition-all duration-300',
              currentImageIndex === index
                ? 'scale-105 border-primary ring-4 ring-primary/10'
                : 'border-transparent opacity-60 hover:border-muted-foreground hover:opacity-100'
            )}
          >
            <Image
              src={image}
              alt={`View ${index + 1}`}
              fill
              className="object-cover"
              sizes="100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
