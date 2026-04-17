import { serverFetch } from '@/utils/serverFetch';

export const deleteCategory = async (categoryId: string) => {
  const res = await serverFetch.delete(`category/${categoryId}`);

  const result = await res.json();

  return result;
};
