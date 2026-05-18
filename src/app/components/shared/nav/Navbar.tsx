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
  X,
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

import { ICart, ICategory } from '@/interface/product.interface';

import Logo from '@/app/components/shared/Logo';
import CartItem from '@/app/components/shared/nav/CartItem';

import { useRouter, useSearchParams } from 'next/navigation';

export default function Navbar({
  categories,
}: {
  categories: ICategory[];
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get('search') || ''
  );

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cart, setCart] = useState<ICart[]>([]);

  useEffect(() => {
    const loadCart = () => {
      const storedCart = JSON.parse(
        localStorage.getItem('cart') || '[]'
      );

      setCart(storedCart);
      setCartCount(storedCart.length);
    };

    loadCart();

    window.addEventListener('cartUpdated', loadCart);

    return () => {
      window.removeEventListener('cartUpdated', loadCart);
    };
  }, []);

  const handleSearchSubmit = () => {
    if (!search.trim()) return;

    router.push(
      `/shop?search=${encodeURIComponent(search)}`
    );
  };

  return (
<header
  className={cn(
    'sticky top-0 z-9999 w-full border-b bg-background transition-all duration-300',
    scrolled && 'bg-background/95 shadow-md backdrop-blur-md'
  )}
>
  {/* Main Navbar */}
  <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
    {/* LEFT */}
    <div className="flex items-center gap-2">
      {/* Mobile Menu */}
      {!showMobileSearch && (
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-7 w-7" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="z-[100000] flex w-75 flex-col p-0"
            >
              <div className="flex-1 overflow-y-auto px-4 py-6">
                <p className="mb-4 text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                  Categories
                </p>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                >
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
                              <SheetClose
                                asChild
                                key={sub._id}
                              >
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
      )}

      {/* Logo */}
      {!showMobileSearch && <Logo />}
    </div>

    {/* MOBILE SEARCH */}
    {showMobileSearch && (
      <div className="flex flex-1 items-center gap-2 lg:hidden">
        <Input
          autoFocus
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          placeholder="Search products..."
          className="h-10"
        />

        {/* Search Button */}
        <Button
          size="icon"
          onClick={handleSearchSubmit}
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Close Button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={() =>
            setShowMobileSearch(false)
          }
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    )}

    {/* DESKTOP SEARCH */}
    {!showMobileSearch && (
      <div className="hidden max-w-xl flex-1 items-center gap-2 lg:flex">
        <Input
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearchSubmit();
            }
          }}
          placeholder="Search products..."
          className="h-10 bg-secondary/40"
        />

        <Button
          type="button"
          onClick={handleSearchSubmit}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    )}

    {/* RIGHT ACTIONS */}
    {!showMobileSearch && (
      <div className="flex items-center gap-1 sm:gap-3">
        {/* MOBILE SEARCH ICON */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() =>
            setShowMobileSearch(true)
          }
        >
          <Search className="h-6 w-6" />
        </Button>

        {/* Wishlist */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden hover:bg-accent sm:flex"
        >
          <Heart className="h-7 w-7" />
        </Button>

        {/* Cart */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent"
            >
              <ShoppingCart className="h-7 w-7" />

              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {cartCount}
              </span>
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="z-[100000] flex w-95 flex-col p-0"
          >
            <CartItem
              carts={cart}
              setOpen={setOpen}
            />
          </SheetContent>
        </Sheet>

        {/* User */}
        <Link href="/auth">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent"
          >
            <User className="h-7 w-7" />
          </Button>
        </Link>
      </div>
    )}
  </div>

  {/* Desktop Navigation */}
  <nav className="hidden items-center justify-center border-t bg-background py-6 lg:flex">
    <div className="flex h-full text-lg">
      <Link
        href="/"
        className="flex h-full items-center border-b-2 border-transparent px-5 font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Home
      </Link>

      {categories.map((cat) => (
        <div
          key={cat._id}
          className="relative flex h-full items-center"
          onMouseEnter={() =>
            setOpenMenu(cat._id!)
          }
          onMouseLeave={() =>
            setOpenMenu(null)
          }
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

            {cat.children &&
              cat.children.length > 0 && (
                <ChevronDown
                  className={cn(
                    'h-3 w-3 transition-transform duration-200',
                    openMenu === cat._id &&
                      'rotate-180'
                  )}
                />
              )}
          </Link>

          {/* DROPDOWN */}
          {cat.children &&
            cat.children.length > 0 && (
              <div
                className={cn(
                  'absolute top-full left-0 z-9999 mt-2 w-56 rounded-md border bg-popover p-2 shadow-2xl transition-all duration-200',
                  openMenu === cat._id
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible translate-y-2 opacity-0'
                )}
              >
                <div className="mb-2 rounded-sm bg-muted/30 px-3 py-2">
                  <p className="font-bold text-primary">
                    All {cat.name}
                  </p>
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
        className="flex h-full items-center border-b-2 border-transparent px-5 text-lg font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary"
      >
        Contact Us
      </Link>
    </div>
  </nav>
</header>
  );
}
