import ProductGallery from '@/app/components/details/ProductGallery';
import ProductDetails from '@/app/components/details/ProductDetails';
import { getProduct } from '@/services/product/getProduct';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { slug } = await params;

  const product = await getProduct(slug).then((data) => data[0] || {});

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex w-full flex-col items-start justify-center gap-10 space-y-6 md:flex-row lg:gap-20">
        <div className="w-full md:flex-1 lg:max-w-[40%]">
          <ProductGallery images={product.images} />
        </div>

        <div className="w-full md:flex-1">
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default page;
