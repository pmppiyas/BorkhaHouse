'use server';

import { serverFetch } from '@/utils/serverFetch';

type ProductsParams = {
  category?: string;
  subcategory?: string;
};

export const getAllProducts = async (params?: ProductsParams) => {
  const query = new URLSearchParams();

  if (params?.category) {
    query.set('category', params.category);
  }

  if (params?.subcategory) {
    query.set('subcategory', params.subcategory);
  }

  const url = query.toString() ? `product?${query.toString()}` : 'product';

  const res = await serverFetch.get(url);
  const result = await res.json();

  if (result.success) {
    return result.data;
  }

  return [];
};
