'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ICategory } from '@/interface/product.interface';

export interface ICategoryUpdate {
  name: string;
  categoryId: string;
  MODE: 'EDIT';
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: ICategory | null;
  onSubmit: (payload: ICategoryUpdate) => void;
}

const CategoryUpdateModal = ({
  open,
  onOpenChange,
  category,
  onSubmit,
}: Props) => {
  const [name, setName] = useState('');

  const handleOpenChange = (value: boolean) => {
    if (value) {
      setName(category?.name ?? '');
    } else {
      setName('');
    }

    onOpenChange(value);
  };

  const handleSubmit = () => {
    if (!category) return;

    onSubmit({
      name,
      categoryId: category._id,
      MODE: 'EDIT',
    });

    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={!name.trim()}>
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryUpdateModal;
