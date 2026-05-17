import { serverFetch } from '@/utils/serverFetch';

export const postProduct = async (payload: FormData) => {
  const res = await serverFetch.post('product/create', payload);

  const result = await res.json();

  return result;
};
