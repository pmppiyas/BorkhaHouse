import {
  Home,
  Layers,
  Gem,
  Sparkles,
  Sticker,
  Baby,
  Info,
  PhoneCall,
} from 'lucide-react';

export const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: Home,
  },

  {
    name: 'Three Pes',
    href: '/shop?category=three-pes',
    icon: Layers,
    children: [
      {
        name: 'Item 1',
        href: '/shop?category=three-pes&subcategory=item-1',
      },
      {
        name: 'Item 2',
        href: '/shop?category=three-pes&subcategory=item-2',
      },
    ],
  },

  {
    name: 'Dubai Borka',
    href: '/shop?category=dubai-borka',
    icon: Gem,
    children: [
      {
        name: 'Classic',
        href: '/shop?category=dubai-borka&subcategory=classic',
      },
      {
        name: 'Premium',
        href: '/shop?category=dubai-borka&subcategory=premium',
      },
    ],
  },

  {
    name: 'Abaya',
    href: '/shop?category=abaya',
    icon: Sparkles,
    children: [
      {
        name: 'Black Abaya',
        href: '/shop?category=abaya&subcategory=black-abaya',
      },
      {
        name: 'Open Abaya',
        href: '/shop?category=abaya&subcategory=open-abaya',
      },
    ],
  },

  {
    name: 'Hijab',
    href: '/shop?category=hijab',
    icon: Sticker,
    children: [
      {
        name: 'Cotton',
        href: '/shop?category=hijab&subcategory=cotton',
      },
      {
        name: 'Silk',
        href: '/shop?category=hijab&subcategory=silk',
      },
    ],
  },

  {
    name: 'Baby Borka',
    href: '/shop?category=baby-borka',
    icon: Baby,
  },

  {
    name: 'About Us',
    href: '/about',
    icon: Info,
  },

  {
    name: 'Contact',
    href: '/contact',
    icon: PhoneCall,
  },
];

export const categories = navItems
  .filter((item) => item.children)
  .map((item) => ({
    name: item.name,
    href: item.href,
    icon: item.icon,
    children: item.children,
  }));
