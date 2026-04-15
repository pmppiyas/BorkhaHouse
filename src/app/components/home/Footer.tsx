'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';
import Logo from '@/app/components/shared/Logo';
import { socialIcon, socialLinks } from '@/app/assets/social.assets';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <footer className="bg-muted/40 text-sm text-muted-foreground">
      {/* 🔵 TOP NEWSLETTER */}
      <div className="flex flex-col items-center justify-between gap-4 bg-primary px-4 py-4 text-primary-foreground md:flex-row md:px-10">
        <div className="flex items-center gap-2">
          <Mail size={18} />
          <p className="font-medium">Sign Up For Newsletter</p>
        </div>

        <p className="hidden text-sm md:block">
          Shopping First For Coupon $25 Receive And...
        </p>

        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            placeholder="Your email address"
            className="bg-background text-foreground"
          />
          <Button variant="secondary">Subscribe</Button>
        </div>
      </div>

      {/* 🧩 MAIN FOOTER */}
      <div className="grid grid-cols-1 gap-8 px-4 py-10 md:grid-cols-4 md:px-10">
        {/* LOGO + DESC */}
        <div className="space-y-3">
          <Logo />
          <p className="max-w-70 text-sm leading-relaxed text-muted-foreground">
            Premium modest wear trusted by 10,000+ customers. Quality and
            elegance delivered to your doorstep.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-3 pt-2">
            {socialLinks.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card transition-all hover:scale-110 hover:border-primary/50 hover:shadow-sm"
              >
                <div className="relative h-7 w-7">
                  <Image
                    src={item.icon}
                    alt="social icon"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Products</h3>
          <ul className="space-y-2">
            <li>Prices Drop</li>
            <li>New Products</li>
            <li>Best Sellers</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">Our Company</h3>
          <ul className="flex flex-col space-y-2">
            <li>Delivery</li>
            <Link href={'/faq'}>About Us</Link>
            <Link href={'/contact'}>Contact Us</Link>
            <Link href={'/contact'}>Sitemap</Link>
          </ul>
        </div>

        {/* DOWNLOAD */}
        {/* <div>
          <h3 className="mb-3 font-semibold text-foreground">Download App</h3>
          <p className="mb-3 text-xs">Save $3 With App & New User Only</p>

          <div className="space-y-2">
            <div className="rounded-md border bg-background px-3 py-2">
              Google Play
            </div>
            <div className="rounded-md border bg-background px-3 py-2">
              App Store
            </div>
          </div>
        </div> */}

        {/* CONTACT */}
        <div>
          <h3 className="mb-3 font-semibold text-foreground">
            Store Information
          </h3>

          <ul className="space-y-2">
            <li>Star Style</li>
            <li>570 - Union Trade Center</li>
            <li>+001 476 814</li>
            <li>storestyle@email.com</li>
          </ul>
        </div>
      </div>

      {/* 🔽 BOTTOM BAR */}
      <div className="border-t px-4 py-4 text-center text-xs md:px-10">
        © Store Style 2026 Store. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
