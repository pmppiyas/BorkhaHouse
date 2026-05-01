import { IRole } from '@/interface/user.interface';

type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

const authRoutes = ['/auth'];

const adminProtectedRoutes: RouteConfig = {
  exact: ['/admin'],
  patterns: [/^\/admin\/.*/],
};

const userProtectedRoutes: RouteConfig = {
  exact: ['/dashboard'],
  patterns: [/^\/dashboard\/.*/],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.includes(pathname);
};

const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) return true;

  return routes.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): 'ADMIN' | 'BUYER' | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) return 'ADMIN';
  if (isRouteMatches(pathname, userProtectedRoutes)) return 'BUYER';

  return null;
};

export const getDefaultDbRoutes = (role: IRole): string => {
  switch (role) {
    case 'ADMIN':
      return '/admin/dashboard';
    case 'BUYER':
      return '/dashboard';
    default:
      return '/';
  }
};
