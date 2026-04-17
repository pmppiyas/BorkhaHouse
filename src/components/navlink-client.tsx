/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as Icons from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  title: string;
  iconName: string;
}

const NavLinkClient = ({ href, title, iconName }: NavLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullCurrentPath = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;

  const hasQueryInHref = href.includes('?');

  const isActive = hasQueryInHref
    ? fullCurrentPath === href
    : pathname === href && !searchParams.toString();

  const Icon = (Icons as any)[iconName] as LucideIcon;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
      }`}
    >
      <div
        className={`${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'}`}
      >
        {Icon ? (
          <Icon size={18} />
        ) : (
          <Icons.Circle size={18} className="opacity-20" />
        )}
      </div>

      <span className="text-sm font-medium tracking-wide">{title}</span>
    </Link>
  );
};

export default NavLinkClient;
