'use client';

import Link from 'next/link';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderSuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-4 rounded-2xl border bg-card p-8 text-center shadow-sm">
        {/* Success Icon */}
        <div className="mb-2 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold">Order Placed Successfully</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for your order. We will contact you soon for confirmation.
        </p>

        {/* Info Box */}
        <div className="mt-6 rounded-xl bg-muted p-4 text-left text-sm">
          <p className="mb-1">✔ Cash on Delivery selected</p>
          <p>✔ You will receive a call shortly</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <Link href="/">
            <Button className="h-11 w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>

          <Link href="/dashboard/my-orders">
            <Button variant="outline" className="h-11 w-full">
              View My Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
