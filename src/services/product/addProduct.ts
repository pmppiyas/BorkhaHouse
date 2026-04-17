import { serverFetch } from '@/utils/serverFetch';

export const postProduct = async (payload: FormData) => {
  console.log(payload);
  const res = await serverFetch.post('product/create', payload);

  const result = await res.json();

  console.log(result);

  return result;
};
