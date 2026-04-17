export type NavItem = {
  title: string;
  href: string;
  iconName?: string;
};

export type RouteSection = {
  title: string;
  nav: NavItem[];
};

export const adminRoutes: RouteSection[] = [
  {
    title: 'Dashboard Overview',
    nav: [
      {
        title: 'Admin Home',
        href: '/admin/dashboard',
        iconName: 'LayoutDashboard',
      },
      {
        title: 'Statistics',
        href: '/admin/dashboard/stats',
        iconName: 'BarChart3',
      },
    ],
  },
  {
    title: 'Product Management',
    nav: [
      {
        title: 'Add Category',
        href: '/admin/dashboard/categories',
        iconName: 'Tags',
      },
      {
        title: 'Add Product',
        href: '/admin/dashboard/products/add',
        iconName: 'PlusSquare',
      },
      {
        title: 'Manage Products',
        href: '/admin/dashboard/products',
        iconName: 'Package',
      },
    ],
  },
  {
    title: 'Orders & Users',
    nav: [
      {
        title: 'All Orders',
        href: '/admin/dashboard/orders',
        iconName: 'ShoppingCart',
      },
      {
        title: 'Customers',
        href: '/admin/dashboard/customers',
        iconName: 'Users',
      },
    ],
  },
];

export const buyerRoutes: RouteSection[] = [
  {
    title: 'Shopping Experience',
    nav: [
      {
        title: 'My Profile',
        href: '/user/profile',
        iconName: 'User',
      },
      {
        title: 'Order History',
        href: '/user/orders',
        iconName: 'ShoppingBag',
      },
      {
        title: 'Wishlist',
        href: '/user/wishlist',
        iconName: 'Heart',
      },
    ],
  },
  {
    title: 'Support & Settings',
    nav: [
      {
        title: 'My Reviews',
        href: '/user/reviews',
        iconName: 'Star',
      },
      {
        title: 'Track Order',
        href: '/user/track-order',
        iconName: 'Truck',
      },
      {
        title: 'Settings',
        href: '/user/settings',
        iconName: 'Settings',
      },
    ],
  },
];

export const getRoutesByRole = (role: string): RouteSection[] => {
  switch (role) {
    case 'ADMIN':
      return adminRoutes;
    case 'BUYER':
      return buyerRoutes;
    default:
      return [];
  }
};
