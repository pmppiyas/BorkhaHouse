import HybridHeader from '@/app/components/shared/HybridHeader';
import ShopContent from '@/app/components/shop/ShopContent';

const page = () => {
  return (
    <div className="mx-auto max-w-7xl space-y-4 p-4 md:p-6">
      <HybridHeader title="Shop" />
      <ShopContent />
    </div>
  );
};

export default page;
