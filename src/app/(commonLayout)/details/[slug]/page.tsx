// app/(commonLayout)/product/[slug]/page.tsx

import ProductGallery from '@/app/components/details/ProductGallery';
import ProductDetails from '@/app/components/details/ProductDetails';
import { getProduct } from '@/services/product/getProduct';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProduct(slug).then((data) => data?.[0] || null);

  if (!product) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold">Product Not Found</h2>

          <p className="text-muted-foreground">
            The product you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 lg:px-6">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Gallery */}
        <div className="w-full">
          <ProductGallery images={product.images || []} />
        </div>

        {/* Details */}
        <div className="w-full">
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default Page;
