'use server';

import { serverFetch } from '@/utils/serverFetch';

type ProductsParams = {
  category?: string;
  subcategory?: string;
  search?: string;
};

export const getAllProducts = async (params?: ProductsParams) => {
  const query = new URLSearchParams();

  if (params?.search) {
    query.set('searchTerm', params.search);
  }

  if (params?.category) {
    query.set('category', params.category);
    query.delete('searchTerm');
  }

  if (params?.subcategory) {
    query.set('subcategory', params.subcategory);
    query.delete('searchTerm');
  }

  const url = query.toString() ? `product?${query.toString()}` : 'product';

  const res = await serverFetch.get(url);
  const result = await res.json();

  if (result.success) {
    return result.data;
  }

  return [];
};
