'use server';
import { serverFetch } from '@/utils/serverFetch';

export const getMe = async () => {
  try {
    const res = await serverFetch.get('auth/me', {
      next: {
        revalidate: 0,
      },
    });

    if (!res.ok) {
      return {};
    }

    const result = await res.json();
    return result?.success ? result.data : {};
  } catch (err) {
    return err instanceof Error ? err.message : 'Internal Server Error';
  }
};
