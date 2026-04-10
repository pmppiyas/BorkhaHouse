'use client';

import { useState } from 'react';
import {
  Menu,
  Search,
  Heart,
  ShoppingCart,
  User,
  Headset,
  ChevronDown,
} from 'lucide-react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Logo from '@/app/components/shared/Logo';
import { categories, navItems } from '@/app/assets/nav.assets';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <header className="w-full border-b bg-background">
      {/* 🔝 TOP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-10">
        {/* 📱 Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-40">
              <div className="mt-6 px-12">
                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {navItems.map((item, index) => (
                    <AccordionItem
                      key={item.name}
                      value={`item-${index}`}
                      className="border-none"
                    >
                      {!item.children ? (
                        <Link
                          href={item.href}
                          className="block py-2 text-base font-semibold text-primary"
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <>
                          {/* 🔹 Parent clickable */}
                          <AccordionTrigger className="py-2 text-base font-semibold hover:text-primary">
                            {item.name}
                          </AccordionTrigger>

                          <AccordionContent className="ml-4 space-y-2 pb-2">
                            {item.children.map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block text-sm text-muted-foreground transition hover:text-primary"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </AccordionContent>
                        </>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Logo />

        <div className="hidden max-w-2xl flex-1 overflow-hidden rounded-full border border-primary/40 md:flex">
          <Input
            placeholder="Search your style..."
            className="h-10 border-none focus-visible:ring-0"
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="m-1">
                All Categories
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56">
              {categories.map((cat) => (
                <div key={cat.name}>
                  <DropdownMenuItem asChild>
                    <Link href={cat.href} className="font-semibold">
                      {cat.name}
                    </Link>
                  </DropdownMenuItem>

                  {cat.children?.map((sub) => (
                    <DropdownMenuItem key={sub.name} asChild>
                      <Link
                        href={sub.href}
                        className="pl-4 text-muted-foreground"
                      >
                        {sub.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="h-10 rounded-full px-6">
            <Search size={18} />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex">
            <div className="rounded-full bg-primary/10 p-2 text-primary">
              <Headset size={18} />
            </div>
            <div className="text-xs">
              <p className="text-muted-foreground">Support</p>
              <p className="font-semibold">0123456789</p>
            </div>
          </div>

          <Heart className="cursor-pointer hover:text-primary" />
          <ShoppingCart className="cursor-pointer hover:text-primary" />
          <User className="cursor-pointer hover:text-primary" />
        </div>
      </div>

      {/* 🔽 NAVBAR */}
      <div className="hidden items-center border-t bg-muted/30 px-10 md:flex">
        <nav className="flex flex-1 justify-center gap-8 text-sm font-medium">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.name)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 py-4 transition-all hover:text-primary"
              >
                {item.name}
                {item.children && <ChevronDown size={14} />}
              </Link>

              {/* ✨ Dropdown */}
              {item.children && openMenu === item.name && (
                <div className="absolute top-full left-0 z-50 w-44 rounded-xl border bg-background p-3 shadow-lg">
                  {item.children.map((sub) => (
                    <Link
                      key={sub.name}
                      href={sub.href}
                      className="block rounded-md px-3 py-2 text-sm transition hover:bg-muted hover:text-primary"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}
