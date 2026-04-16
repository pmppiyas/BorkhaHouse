import { IProductType } from '@/interface/product.interface';
import { serverFetch } from '@/utils/serverFetch';

export const featuresProducts = async (query: {
  type: IProductType;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
}) => {
  const params = new URLSearchParams();

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, String(value));
    }
  });

  const res = await serverFetch.get(`product/features?${params.toString()}`, {
    next: {
      revalidate: 60,
    },
  });

  const data = await res.json();
  if (data.success) {
    return data.data;
  } else {
    return [];
  }
};
