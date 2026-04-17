'use client';

import CategoryCreateModal from '@/app/components/dashbord/admin/category/CategoryCreateModal';
import ReusableHeader from '@/app/components/shared/ReuseableHeader';
import { postCategory } from '@/services/category/postCategory';
import { LayoutGrid, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const CategoryHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  const handleCreateCategory = async (payload: {
    name: string;
    children?: { name: string }[];
  }) => {
    const post = await postCategory(payload);

    if (post.success) {
      setIsDialogOpen(false);
      router.refresh();
      toast.success(post.message);
    } else toast.error(post.message);
  };

  return (
    <>
      <ReusableHeader
        icon={<LayoutGrid className="h-5 w-5" />}
        title="Category Management"
        description="Manage your product categories and subcategories from here."
        actions={[
          {
            label: 'Add Category',
            icon: <Plus className="h-4 w-4" />,
            onClick: () => setIsDialogOpen(true),
          },
        ]}
      />

      <CategoryCreateModal
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateCategory}
      />
    </>
  );
};

export default CategoryHeader;
