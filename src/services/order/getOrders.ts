import { serverFetch } from '@/utils/serverFetch';

export const getOrders = async ({ status }: { status?: string }) => {
  const url = status ? `order/list?status=${status}` : 'order/list';
  const res = await serverFetch.get(url);

  const result = await res.json();
  if (result.success) {
    return result.data;
  } else {
    return [];
  }
};
