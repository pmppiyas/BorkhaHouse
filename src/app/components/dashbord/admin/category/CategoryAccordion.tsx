'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import CategoryUpdateModal, {
  ICategoryUpdate,
} from '@/app/components/dashbord/admin/category/CategoryUpdateModal';
import { CategoryItem } from '@/app/components/dashbord/admin/category/CategoryItem';
import { updateCategory } from '@/services/category/updateCategory';
import { ICategory } from '@/interface/product.interface';
import { useRouter } from 'next/navigation';

const CategoryAccordion = ({ categories }: { categories: ICategory[] }) => {
  const [editOpen, setEditOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const router = useRouter();

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const handleDelete = (category: ICategory) => {
    console.log('Delete:', category);
  };

  const editConfirm = async (payload: ICategoryUpdate) => {
    const result = await updateCategory(payload);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      setEditOpen(false);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {categories.map((category) => (
          <CategoryItem
            key={category._id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <CategoryUpdateModal
        open={editOpen}
        onOpenChange={setEditOpen}
        category={selectedCategory}
        onSubmit={editConfirm}
      />
    </>
  );
};

export default CategoryAccordion;
