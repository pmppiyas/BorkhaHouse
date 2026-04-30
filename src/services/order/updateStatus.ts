import { OrderStatus } from '@/interface/order.interface';
import { serverFetch } from '@/utils/serverFetch';

export const orderStatusUpdate = async (
  orderId: string,
  status: OrderStatus
) => {
  const res = await serverFetch.patch('order/update-status/' + orderId, {
    status,
  });

  const result = await res.json();
  return result;
};
