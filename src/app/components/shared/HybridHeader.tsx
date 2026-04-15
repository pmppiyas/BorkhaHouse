'use client';

import banner from '@/app/assets/hero-1.jpg';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HybridHeaderProps {
  title: string;
  image?: StaticImageData | string;
}

const HybridHeader = ({ title, image = banner }: HybridHeaderProps) => {
  const pathname = usePathname();

  const pathNodes = pathname.split('/').filter((node) => node !== '');

  return (
    <div className="relative h-48 w-full overflow-hidden md:h-64 lg:h-72">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image src={image} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content Area */}
      <div className="relative z-10 flex h-full flex-col items-start justify-center pl-10 text-background md:pl-16 lg:pl-24">
        <h1 className="text-3xl font-bold tracking-tight capitalize md:text-5xl">
          {title}
        </h1>

        {/* Dynamic Breadcrumb */}
        <nav className="mt-4 flex items-center gap-2 text-sm font-medium text-background/90">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-primary"
          >
            <Home size={14} />
            Home
          </Link>

          {pathNodes.map((node, index) => {
            const isLast = index === pathNodes.length - 1;
            const href = `/${pathNodes.slice(0, index + 1).join('/')}`;

            return (
              <div key={index} className="flex items-center gap-2">
                <ChevronRight size={14} className="opacity-50" />
                {isLast ? (
                  <span className="font-bold text-primary capitalize">
                    {node.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="capitalize transition-colors hover:text-primary"
                  >
                    {node.replace(/-/g, ' ')}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 h-1 w-full bg-linear-to-r from-transparent via-primary to-transparent opacity-50" />
    </div>
  );
};

export default HybridHeader;
