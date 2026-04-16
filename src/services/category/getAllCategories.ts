import { serverFetch } from '@/utils/serverFetch';

export const getAllCategories = async () => {
  const res = await serverFetch.get('category/all');

  const result = await res.json();

  if (result.success) {
    return result.data;
  } else {
    return [];
  }
};
