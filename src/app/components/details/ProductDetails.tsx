'use client';

import { useState } from 'react';
import { ICart, IProduct } from '@/interface/product.interface';
import { discountPrice } from '@/utils/discountPrice';
import { ShoppingCart, CreditCard, Minus, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const ProductDetails = ({ product }: { product: IProduct }) => {
  const { name, description, price, discount, stock, brand, slug, images } =
    product;

  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');

  const finalPrice = discountPrice(price, discount);

  const increaseQty = () => {
    if (quantity < stock) setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (product.sizes?.length && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const existingCart: ICart[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const existingProduct = existingCart.find(
      (item) => item.slug === slug && item.size === selectedSize
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.slug === slug && item.size === selectedSize
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, stock),
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          slug,
          name,
          price: finalPrice,
          image: images?.[0],
          quantity,
          stock,
          size: selectedSize,
        },
      ];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    window.dispatchEvent(new Event('cartUpdated'));

    toast.success('Product added to cart');
  };

  const cartParams = [
    {
      slug,
      quantity,
      size: selectedSize,
    },
  ];

  const encodedCart = encodeURIComponent(JSON.stringify(cartParams));

  const handleBuyNow = () => {
    setTimeout(() => {
      router.push(`/order?items=${encodedCart}`);
    }, 250);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl leading-tight font-bold md:text-3xl">
            {name}
          </h1>
          {/*
          {discount > 0 && (
            <Badge variant="destructive" className="px-3 py-1 text-xs">
              {discount}% OFF
            </Badge>
          )} */}
        </div>

        <p className="max-w-2xl text-lg leading-7 text-muted-foreground md:text-base">
          {description || 'No description available for this product.'}
        </p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold md:text-4xl">
          ৳{finalPrice.toFixed(2)}
        </span>
      </div>

      {/* Size */}

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Size:</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes?.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              className={`rounded-md border px-5 py-2 text-lg transition ${
                selectedSize === size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-input'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity:</span>

        <div className="flex items-center gap-4 rounded-md border">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={decreaseQty}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          <span className="px-4 py-2 text-lg">{quantity}</span>

          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={increaseQty}
            disabled={quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Buttons */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Button
          size="lg"
          variant="outline"
          className="h-12"
          onClick={handleAddToCart}
          disabled={stock === 0}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>

        <Button
          size="lg"
          className="h-12"
          onClick={handleBuyNow}
          disabled={stock === 0}
        >
          <CreditCard className="mr-2 h-5 w-5" />
          Buy Now
        </Button>
      </div>

      {/* Meta */}
      <div className="grid gap-4 rounded-2xl border bg-card p-6 text-sm sm:grid-cols-2">
        <div>
          <span className="font-semibold">Brand:</span> {brand}
        </div>

        <div className="flex items-center gap-2">
          <span className="font-semibold">Tag:</span>
          <Badge variant="secondary">{slug}</Badge>
        </div>

        <div>
          <span className="font-semibold">Payment:</span> Cash on delivery
        </div>

        <div>
          <span className="font-semibold">Shipping:</span> Nationwide
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
