'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { User, Phone, MapPin, Loader2, CreditCard } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ICart, IProduct } from '@/interface/product.interface';
import { createOrder } from '@/services/order/createOrder';
import { toast } from 'sonner';
import { removeMultipleFromCart } from '@/utils/cart';
import { useRouter } from 'next/navigation';

interface BillingFormValues {
  name: string;
  phone: string;
  address: string;
}

const BillingForm = ({
  products,
  carts,
}: {
  products: IProduct[];
  carts: ICart[];
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BillingFormValues>();

  const router = useRouter();

  const mergedItems = products.map((product) => {
    const cartItem = carts.find((item) => item.slug === product.slug);

    const quantity = cartItem?.quantity || 1;

    return {
      ...product,
      quantity,
      totalPrice: product.price * quantity,
    };
  });

  const subtotal = mergedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  const shippingFee = subtotal >= 1000 ? 0 : 60;

  const grandTotal = subtotal + shippingFee;

  const onSubmit = async (data: BillingFormValues) => {
    setLoading(true);

    const orderPayload = {
      customer: data,
      paymentMethod: 'cash_on_delivery',
      items: mergedItems.map((item) => ({
        slug: item.slug,
        quantity: item.quantity,
      })),
      subtotal,
      shippingFee,
      grandTotal,
    };

    try {
      const order = await createOrder(orderPayload);

      if (order.success) {
        toast.success(order.message);

        const orderedSlugs = orderPayload.items.map((i) => i.slug);
        removeMultipleFromCart(orderedSlugs);

        router.push('/order-success');
      } else {
        toast.error(order.message);
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:px-8">
      {/* LEFT */}
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-semibold">Billing & Shipping</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute top-3.5 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="h-12 pl-10"
                placeholder="Your full name"
                {...register('name', {
                  required: 'Name is required',
                })}
              />
            </div>

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute top-3.5 left-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="h-12 pl-10"
                placeholder="01XXXXXXXXX"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: 'Enter valid phone number',
                  },
                })}
              />
            </div>

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Delivery Address
            </label>

            <div className="relative">
              <MapPin className="absolute top-3.5 left-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                rows={5}
                className="pl-10"
                placeholder="Enter your full delivery address"
                {...register('address', {
                  required: 'Address is required',
                })}
              />
            </div>

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="h-12 w-full text-base"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Order...
              </>
            ) : (
              'Place Order'
            )}
          </Button>
        </form>
      </div>

      {/* RIGHT */}
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <h2 className="mb-8 text-2xl font-semibold">Your Order</h2>

        <div className="space-y-5">
          {mergedItems.map((item) => (
            <div
              key={item.slug}
              className="flex items-center justify-between border-b pb-4"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  ৳{item.price} × {item.quantity}
                </p>
              </div>

              <p className="font-semibold">৳{item.totalPrice}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t pt-6">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>৳{subtotal}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shippingFee === 0 ? 'Free' : `৳${shippingFee}`}</span>
          </div>

          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>৳{grandTotal}</span>
          </div>
        </div>

        <div className="mt-4 rounded-xl border p-4">
          <div className="flex gap-3">
            <CreditCard className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="font-medium">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">
                Pay after receiving your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingForm;
