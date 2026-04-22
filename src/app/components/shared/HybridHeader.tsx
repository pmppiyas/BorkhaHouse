'use client';

import banner from '@/app/assets/hero-1.jpg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';

interface HybridHeaderProps {
  title: string;
  image?: StaticImageData | string;
}

const formatLabel = (value: string) =>
  value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

const HybridHeader = ({ title, image = banner }: HybridHeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pathNodes = pathname.split('/').filter(Boolean);

  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');

  const breadcrumbs = [
    ...pathNodes.map((node, index) => ({
      label: formatLabel(node),
      href: `/${pathNodes.slice(0, index + 1).join('/')}`,
    })),
    ...(category
      ? [
          {
            label: formatLabel(category),
            href: `${pathname}?category=${category}`,
          },
        ]
      : []),
    ...(subcategory
      ? [
          {
            label: formatLabel(subcategory),
            href: `${pathname}?category=${category}&subcategory=${subcategory}`,
          },
        ]
      : []),
  ];

  return (
    <div className="relative h-48 w-full overflow-hidden md:h-64 lg:h-72">
      {/* Background */}
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center pl-10 text-white md:pl-16 lg:pl-24">
        <h1 className="text-3xl font-bold tracking-tight capitalize md:text-5xl">
          {title}
        </h1>

        {/* Breadcrumb */}
        <nav className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium text-white/90">
          <Link
            href="/"
            className="flex items-center gap-1 transition hover:text-primary"
          >
            <Home size={14} />
            Home
          </Link>

          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={14} className="opacity-60" />

                {isLast ? (
                  <span className="font-semibold text-primary">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition hover:text-primary"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent opacity-60" />
    </div>
  );
};

export default HybridHeader;
