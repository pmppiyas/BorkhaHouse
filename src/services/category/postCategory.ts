import { serverFetch } from '@/utils/serverFetch';

export const postCategory = async (payload: any) => {
  const res = await serverFetch.post('category/create', payload);

  const result = await res.json();

  return result;
};
