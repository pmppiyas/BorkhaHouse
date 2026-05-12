'use server';

import { cookies } from 'next/headers';

interface CookieParams {
  accessToken?: string;
  refreshToken?: string;
}

const setCookie = async ({ accessToken, refreshToken }: CookieParams) => {
  const cookieStore = await cookies();

  if (accessToken) {
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }

  if (refreshToken) {
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
  }
};

const getCookie = async (name: string) => {
  const cookieStore = cookies();

  return (await cookieStore).get(name)?.value;
};

export { setCookie, getCookie };
