'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ICategory } from '@/interface/product.interface';
import Logo from '@/app/components/shared/Logo';

export default function Navbar({ categories }: { categories: ICategory[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'bg-background/95 shadow-md backdrop-blur-md'
          : 'border-b bg-background'
      )}
    >
      {/* ── 1. Announcement bar ── */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 px-4 py-2 text-center text-xs font-medium tracking-wide text-white">
        🎉 Free shipping on orders over $49 &nbsp;·&nbsp; Use code{' '}
        <span className="cursor-pointer font-bold underline underline-offset-2">
          WELCOME10
        </span>{' '}
        for 10% off your first order
      </div>

      {/* ── 2. Main Navbar (Logo, Search, Actions) ── */}
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="flex w-75 flex-col p-0">
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className="mb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Categories
                </p>
                <Accordion type="single" collapsible className="w-full">
                  {categories.map((cat) => (
                    <AccordionItem
                      key={cat._id}
                      value={cat._id!}
                      className="border-none"
                    >
                      {cat.children?.length ? (
                        <>
                          <AccordionTrigger className="py-2 text-lg font-medium hover:no-underline">
                            {cat.name}
                          </AccordionTrigger>
                          <AccordionContent className="ml-2 border-l-2 border-muted pb-2 pl-4">
                            {cat.children.map((sub) => (
                              <SheetClose asChild key={sub._id}>
                                <Link
                                  href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                                  className="block py-2 text-lg text-muted-foreground hover:text-primary"
                                >
                                  {sub.name}
                                </Link>
                              </SheetClose>
                            ))}
                          </AccordionContent>
                        </>
                      ) : (
                        <SheetClose asChild>
                          <Link
                            href={`/shop?category=${cat.slug}`}
                            className="block py-2 text-lg font-medium"
                          >
                            {cat.name}
                          </Link>
                        </SheetClose>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Logo />

        {/* Desktop Search */}
        <div className="hidden max-w-xl flex-1 lg:relative lg:flex">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="h-10 border-none bg-secondary/40 pl-10 ring-primary/20 focus-visible:ring-1"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="hidden hover:bg-accent sm:flex"
          >
            <Heart className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-accent"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              5
            </span>
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-accent">
            <User className="h-5 w-5" />
          </Button>

          <Link href="/auth" className="ml-2 hidden lg:block">
            <Button size="sm" className="px-6 font-semibold">
              Sign In
            </Button>
          </Link>
        </div>
      </div>

      {/*  Desktop Floating Navigation */}
      <nav className="hidden items-center justify-center border-t bg-background py-6 lg:flex">
        <div className="flex h-full text-lg">
          <Link
            href="/"
            className={cn(
              'flex h-full items-center border-b-2 border-transparent px-5 font-medium transition-colors',
              'text-muted-foreground hover:border-primary hover:text-primary'
            )}
          >
            Home
          </Link>
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="relative flex h-full items-center"
              onMouseEnter={() => setOpenMenu(cat._id!)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={`/shop?category=${cat.slug}`}
                className={cn(
                  'flex h-full items-center gap-1 border-b-2 border-transparent px-5 font-medium transition-colors',
                  openMenu === cat._id
                    ? 'border-primary text-primary'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                {cat.name}
                {cat.children && cat.children.length > 0 && (
                  <ChevronDown
                    className={cn(
                      'h-3 w-3 transition-transform duration-200',
                      openMenu === cat._id && 'rotate-180'
                    )}
                  />
                )}
              </Link>

              {/* Floating Dropdown */}
              {cat.children && cat.children.length > 0 && (
                <div
                  className={cn(
                    'absolute top-full left-0 z-60 w-56 rounded-md border bg-popover p-2 shadow-xl transition-all duration-200',
                    openMenu === cat._id
                      ? 'visible translate-y-0 opacity-100'
                      : 'pointer-events-none invisible translate-y-2 opacity-0'
                  )}
                >
                  <div className="mb-2 rounded-sm bg-muted/30 px-3 py-2">
                    <p className="font-bold text-primary">All {cat.name}</p>
                  </div>
                  {cat.children.map((sub) => (
                    <Link
                      key={sub._id}
                      href={`/shop?category=${cat.slug}&subcategory=${sub.slug}`}
                      className="group flex items-center gap-2 rounded-sm px-3 py-2.5 text-lg transition-all hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground transition-colors group-hover:bg-primary" />
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className={cn(
              'flex h-full items-center border-b-2 border-transparent px-5 text-lg font-medium transition-colors',
              'text-muted-foreground hover:border-primary hover:text-primary'
            )}
          >
            Contact Us
          </Link>
        </div>
      </nav>
    </header>
  );
}
