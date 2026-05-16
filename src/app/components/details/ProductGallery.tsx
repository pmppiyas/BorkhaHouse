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
    <div className="relative flex flex-1 flex-col gap-4">
      <div className="group relative h-100 w-full overflow-hidden lg:h-125 lg:w-125">
        <Image
          src={images[selectedImage]}
          alt={`Product ${selectedImage + 1}`}
          width={500}
          height={500}
          priority
          className="h-full object-fill transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Mobile Horizontal Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
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
  );
};

export default ProductGallery;
