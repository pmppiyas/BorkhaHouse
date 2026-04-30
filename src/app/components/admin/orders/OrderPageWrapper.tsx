import OrdersContent from '@/app/components/admin/orders/OrdersContent';
import ReusableHeader from '@/app/components/shared/ReuseableHeader';
import { getOrders } from '@/services/order/getOrders';
import { Package } from 'lucide-react';

interface props {
  searchParams: Promise<{
    status?: string;
  }>;
}

const OrderPageWrapper = async ({ searchParams }: props) => {
  const params = await searchParams;

  const status = params?.status || undefined;

  const orders = await getOrders({ status });

  return (
    <div className="min-h-screen space-y-4 p-4">
      <ReusableHeader
        icon={<Package className="h-5 w-5" />}
        title="Order Management"
        description="Manage customer orders and update delivery status"
        currentStatus={status || 'all'}
        totalCount={orders.length}
      />
      <OrdersContent orders={orders} />
    </div>
  );
};

export default OrderPageWrapper;
