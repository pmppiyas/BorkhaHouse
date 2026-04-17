'use client';

import ReusableHeader from '@/app/components/shared/ReuseableHeader';
import { Package, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProductHeader = () => {
  const router = useRouter();

  return (
    <ReusableHeader
      icon={<Package className="h-5 w-5" />}
      title="Product Management"
      description="Manage all your products, pricing, stock and visibility"
      actions={[
        {
          label: 'Add Product',
          icon: <Plus className="h-4 w-4" />,
          onClick: () => router.push('/admin/dashboard/products/create'),
        },
      ]}
    />
  );
};

export default ProductHeader;
