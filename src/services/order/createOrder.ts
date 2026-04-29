import { IOrder } from '@/interface/order.interface';
import { serverFetch } from '@/utils/serverFetch';

export const createOrder = async (payload: Partial<IOrder>) => {
  const res = await serverFetch.post('order/create', payload);

  const response = await res.json();

  if (!res.ok) {
    throw new Error(response.message || 'Failed to create order');
  }
  return response;
};
