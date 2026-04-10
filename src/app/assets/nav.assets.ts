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
  { name: 'Home', href: '/', icon: Home },
  {
    name: 'Three Pes',
    href: '/three-pes',
    icon: Layers,
    children: [
      { name: 'Item 1', href: '/three-pes/item1' },
      { name: 'Item 2', href: '/three-pes/item2' },
    ],
  },
  {
    name: 'Dubai Borka',
    href: '/dubai-borka',
    icon: Gem,
    children: [
      { name: 'Classic', href: '/dubai-borka/classic' },
      { name: 'Premium', href: '/dubai-borka/premium' },
    ],
  },
  {
    name: 'Abaya',
    href: '/abaya',
    icon: Sparkles,
    children: [
      { name: 'Black Abaya', href: '/abaya/black' },
      { name: 'Open Abaya', href: '/abaya/open' },
    ],
  },
  {
    name: 'Hijab',
    href: '/hijab',
    icon: Sticker,
    children: [
      { name: 'Cotton', href: '/hijab/cotton' },
      { name: 'Silk', href: '/hijab/silk' },
    ],
  },
  { name: 'Baby Borka', href: '/baby-borka', icon: Baby },
  { name: 'About Us', href: '/about', icon: Info },
  { name: 'Contact', href: '/contact', icon: PhoneCall },
];

export const categories = navItems
  .filter((item) => item.children)
  .map((item) => ({
    name: item.name,
    href: item.href,
    icon: item.icon,
    children: item.children,
  }));
