import { env } from '@/config/env.config';
import { getDefaultDbRoutes, getRouteOwner, isAuthRoute } from '@/utils/proxy';
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { IRole } from '@/interface/user.interface';

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get('access-token')?.value;

  if (!accessToken) {
    const routeOwner = getRouteOwner(pathname);

    if (routeOwner) {
      const loginUrl = new URL('/auth', req.url);
      loginUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  try {
    const secret = new TextEncoder().encode(env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);

    const userRole = payload.role as IRole | 'BUYER';

    if (isAuthRoute(pathname)) {
      return NextResponse.redirect(
        new URL(getDefaultDbRoutes(userRole), req.url)
      );
    }

    const routeOwner = getRouteOwner(pathname);

    if (routeOwner && routeOwner !== userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDbRoutes(userRole), req.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    const res = NextResponse.redirect(new URL('/auth', req.url));
    res.cookies.delete('access-token');
    return res;
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/auth'],
};
