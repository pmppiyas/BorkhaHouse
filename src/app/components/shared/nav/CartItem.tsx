'use client';

import { ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ICart } from '@/interface/product.interface';
import { useRouter } from 'next/navigation';

const CartItem = ({
  carts,
  setOpen,
}: {
  carts: ICart[];
  setOpen: (open: boolean) => void;
}) => {
  const router = useRouter();

  const handleRemoveItem = (slug: string) => {
    const storedCart: ICart[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const updatedCart = storedCart.filter((item) => item.slug !== slug);

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    window.dispatchEvent(new Event('cartUpdated'));
  };

  const cartParams = carts.map((item) => ({
    slug: item.slug,
    quantity: item.quantity,
  }));

  const encodedCart = encodeURIComponent(JSON.stringify(cartParams));


  const handleCheckout = () => {
    setOpen(false);

    setTimeout(() => {
      router.push(`/order?items=${encodedCart}`);
    }, 250);
  };

  return (
    <div className="flex h-full max-h-screen w-95 flex-col">
      {/* HEADER */}
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Shopping Cart</h2>
        <p className="text-sm text-muted-foreground">Your selected products</p>
      </div>

      {/* CART LIST */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {carts.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Cart is empty
          </p>
        ) : (
          carts.map((item) => (
            <div
              key={item.slug}
              className="group relative flex gap-4 rounded-xl border bg-card p-3 transition"
            >
              <Image
                width={60}
                height={60}
                src={item.image || '/placeholder.png'}
                alt={item.name}
                className="h-16 w-16 rounded-lg object-cover"
              />

              {/* DETAILS */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h3 className="line-clamp-1 font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">৳{item.price}</p>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Qty: {item.quantity}
                  </span>

                  <span className="font-medium">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              </div>

              {/* DELETE BUTTON */}
              <button
                onClick={() => handleRemoveItem(item.slug)}
                className="absolute top-3 right-3 opacity-0 transition group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* FOOTER */}
      <div className="border-t p-4">
        <Button
          size="lg"
          className="h-12 w-full"
          onClick={handleCheckout}
          disabled={carts.length === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
