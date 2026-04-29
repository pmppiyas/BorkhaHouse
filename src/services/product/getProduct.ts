import { serverFetch } from '@/utils/serverFetch';

export const getProduct = async (slug: string) => {
  const res = await serverFetch.get(`product/bySlugs?slugs=${slug}`);

  const result = await res.json();

  if (result.success) {
    return result.data;
  } else {
    return {};
  }
};
