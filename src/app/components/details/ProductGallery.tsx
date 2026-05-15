'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const ProductGallery = ({ images = [] }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images.length) {
    return (
      <div className="aspect-square w-full animate-pulse rounded-2xl bg-muted" />
    );
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {/* Main Image */}
      <div className="relative flex-1">
        <div className="group relative overflow-hidden">
          <Image
            src={images[selectedImage]}
            alt={`Product ${selectedImage + 1}`}
            width={400}
            height={300}
            priority
            className="h-[400px] w-[400px] object-fill transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Mobile Horizontal Thumbnails */}
        <div className="mt-4 flex gap-3 overflow-x-auto md:hidden">
          {images.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={cn(
                'relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all',
                selectedImage === index
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-muted'
              )}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
