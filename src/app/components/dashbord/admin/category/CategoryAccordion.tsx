'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import CategoryUpdateModal, {
  ICategoryUpdate,
} from '@/app/components/dashbord/admin/category/CategoryUpdateModal';

import { CategoryItem } from '@/app/components/dashbord/admin/category/CategoryItem';
import { updateCategory } from '@/services/category/updateCategory';
import { ICategory } from '@/interface/product.interface';
import { deleteCategory } from '@/services/category/deleteCategory';
import DeleteConfirmationDialog from '@/app/components/shared/DeleteConformationDialog';

const CategoryAccordion = ({ categories }: { categories: ICategory[] }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );

  const router = useRouter();

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category);
    setEditOpen(true);
  };

  const editConfirm = async (payload: ICategoryUpdate) => {
    const result = await updateCategory(payload);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      setEditOpen(false);
      setSelectedCategory(null);
    } else {
      toast.error(result.message);
    }
  };

  const handleDelete = (category: ICategory) => {
    setSelectedCategory(category);
    setDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;

    const result = await deleteCategory(selectedCategory._id);

    if (result.success) {
      toast.success(result.message);
      router.refresh();
      setDeleteOpen(false);
      setSelectedCategory(null);
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

      {/* UPDATE MODAL */}
      <CategoryUpdateModal
        open={editOpen}
        onOpenChange={setEditOpen}
        category={selectedCategory}
        onSubmit={editConfirm}
      />

      {/* DELETE MODAL */}
      <DeleteConfirmationDialog
        title="Confirm Delete"
        description="Are you sure you want to delete this category? This action cannot be undone."
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default CategoryAccordion;
