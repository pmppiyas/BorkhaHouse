import FilterDropdown from '@/app/components/admin/orders/FilterDropdown';
import OrdersContent from '@/app/components/admin/orders/OrdersContent';
import ReusableHeader from '@/app/components/shared/ReuseableHeader';
import { getOrders } from '@/services/order/getOrders';
import { Package } from 'lucide-react';

interface Props {
  status?: string;
}

const OrderPageWrapper = async ({ status }: Props) => {
  const orders = await getOrders({ status });

  return (
    <div className="min-h-screen space-y-4 p-4">
      <ReusableHeader
        icon={<Package className="h-5 w-5" />}
        title="Order Management"
        description="Manage customer orders easily"
        totalCount={orders.length}
        filterSlot={<FilterDropdown />}
      />

      <OrdersContent orders={orders} />
    </div>
  );
};

export default OrderPageWrapper;
