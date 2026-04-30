'use client';

import { IOrder, OrderStatus } from '@/interface/order.interface';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, Phone, User, MapPin } from 'lucide-react';
import { getStatusVariant } from '@/utils/getStatusVarient';
import { orderStatusUpdate } from '@/services/order/updateStatus';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const OrdersContent = ({ orders }: { orders: IOrder[] }) => {
  const router = useRouter();

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    const update = await orderStatusUpdate(orderId, status);

    if (update.success) {
      router.refresh();
      toast.success(update.message);
    } else {
      toast.error(update.message || 'Failed to update order status');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="rounded-2xl border bg-card p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex justify-between gap-6">
            {/* Left */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{order.customer.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{order.customer.phone}</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="max-w-xl text-sm text-muted-foreground">
                  {order.customer.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : 'Unknown'}
                </span>
              </div>
            </div>

            {/* Right */}
            <div className="space-y-2 lg:text-right">
              <div>
                <p className="text-sm text-muted-foreground">Products</p>

                <div className="space-y-1">
                  {order.items.map((item) => (
                    <p key={item.slug} className="text-sm font-medium">
                      {item.slug} × {item.quantity}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Total
                  <span className="pl-1 text-xl font-bold">
                    ৳{order.grandTotal}
                  </span>
                </p>
              </div>

              <Badge variant={getStatusVariant(order.status)}>
                {order.status}
              </Badge>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Update Status
                </p>

                <Select
                  defaultValue={order.status}
                  onValueChange={(value) =>
                    handleStatusChange(order._id, value as OrderStatus)
                  }
                >
                  <SelectTrigger className="w-50">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="SHIPPED">Shipped</SelectItem>
                    <SelectItem value="DELIVERED">Delivered</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersContent;
