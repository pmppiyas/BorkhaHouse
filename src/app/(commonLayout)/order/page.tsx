import OrderPageContent from '@/app/components/order/OrderPageContent';
import { getProduct } from '@/services/product/getProduct';

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const OrderPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const itemsRaw = params.items as string;

  const cartItems = itemsRaw ? JSON.parse(decodeURIComponent(itemsRaw)) : [];

  const cartsSlugs = cartItems
    .map((item: { slug: string }) => item.slug)
    .join(',');

  const productsFromDB = await getProduct(cartsSlugs);

  return (
    <div className="container mx-auto w-full max-w-7xl py-10">
      <OrderPageContent products={productsFromDB} carts={cartItems} />
    </div>
  );
};

export default OrderPage;
