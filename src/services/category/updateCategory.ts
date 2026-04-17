import { ICategoryUpdate } from '@/app/components/dashbord/admin/category/CategoryUpdateModal';
import { serverFetch } from '@/utils/serverFetch';

export const updateCategory = async (payload: ICategoryUpdate) => {
  const res = await serverFetch.put('category/update', payload);

  const result = await res.json();

  return result;
};
