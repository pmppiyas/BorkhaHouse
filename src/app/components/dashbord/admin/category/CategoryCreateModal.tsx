'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: { name: string; children?: { name: string }[] }) => void;
}

const CategoryCreateModal = ({ open, onOpenChange, onSubmit }: Props) => {
  const [name, setName] = useState('');
  const [children, setChildren] = useState([{ name: '' }]);

  const handleChildChange = (index: number, value: string) => {
    const updated = [...children];
    updated[index].name = value;
    setChildren(updated);
  };

  const handleAddChild = () => {
    setChildren([...children, { name: '' }]);
  };

  const handleRemoveChild = (index: number) => {
    setChildren(children.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const payload = {
      name,
      children: children.filter((item) => item.name.trim() !== ''),
    };

    onSubmit(payload);

    setName('');
    setChildren([{ name: '' }]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Add New Category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Main category */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Category Name</label>
            <Input
              placeholder="Enter category name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Child categories */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Sub Categories (Optional)
              </label>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddChild}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </div>

            {children.map((child, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder={`Child category ${index + 1}`}
                  value={child.name}
                  onChange={(e) => handleChildChange(index, e.target.value)}
                />

                {children.length > 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleRemoveChild(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button onClick={handleSubmit} disabled={!name.trim()}>
              Create Category
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryCreateModal;
