export const navItems = [
  { name: 'Home', href: '/' },
  {
    name: 'Three Pes',
    href: '/three-pes',
    children: [
      { name: 'Item 1', href: '/three-pes/item1' },
      { name: 'Item 2', href: '/three-pes/item2' },
    ],
  },
  {
    name: 'Dubai Borka',
    href: '/dubai-borka',
    children: [
      { name: 'Classic', href: '/dubai-borka/classic' },
      { name: 'Premium', href: '/dubai-borka/premium' },
    ],
  },
  {
    name: 'Abaya',
    href: '/abaya',
    children: [
      { name: 'Black Abaya', href: '/abaya/black' },
      { name: 'Open Abaya', href: '/abaya/open' },
    ],
  },
  {
    name: 'Hijab',
    href: '/hijab',
    children: [
      { name: 'Cotton', href: '/hijab/cotton' },
      { name: 'Silk', href: '/hijab/silk' },
    ],
  },
  { name: 'Baby Borka', href: '/baby-borka' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const categories = navItems
  .filter((item) => item.children)
  .map((item) => ({
    name: item.name,
    href: item.href,
    children: item.children,
  }));
