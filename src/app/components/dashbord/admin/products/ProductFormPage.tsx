'use client';

import { useMemo, useState } from 'react';
import { ICategory, IProduct } from '@/interface/product.interface';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { postProduct } from '@/services/product/addProduct';
import { toast } from 'sonner';

interface Props {
  categories: ICategory[];
  product?: IProduct;
  mode?: 'CREATE' | 'EDIT';
}

const ProductFormPage = ({ categories, product, mode = 'CREATE' }: Props) => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    summary: product?.summary || '',
    price: product?.price || 0,
    discount: product?.discount || 0,
    costPrice: product?.costPrice || 0,
    stock: product?.stock || 0,
    categoryId: product?.categoryId || '',
    subCategoryId: product?.subCategoryId || '',
    brand: product?.brand || '',
    sku: product?.sku || '',
    material: product?.material || '',
    colors: product?.colors?.join(', ') || '',
    sizes: product?.sizes?.join(', ') || '',
    status: product?.status || 'IN_STOCK',
    isFeatured: product?.isFeatured || false,
    isTodayDeal: product?.isTodayDeal || false,
  });

  const selectedCategory = useMemo(() => {
    return categories.find((cat) => cat._id === formData.categoryId);
  }, [categories, formData.categoryId]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const body = new FormData();

    body.append('name', formData.name);
    body.append('description', formData.description);
    body.append('summary', formData.summary);
    body.append('price', String(formData.price));
    body.append('discount', String(formData.discount));
    body.append('costPrice', String(formData.costPrice));
    body.append('stock', String(formData.stock));
    body.append('brand', formData.brand);
    body.append('sku', formData.sku);
    body.append('material', formData.material);
    body.append('status', formData.status);
    body.append('isFeatured', String(formData.isFeatured));
    body.append('isTodayDeal', String(formData.isTodayDeal));

    if (formData.categoryId) {
      body.append('categoryId', formData.categoryId);
    }

    if (formData.subCategoryId) {
      body.append('subCategoryId', formData.subCategoryId);
    }

    const colorsArray = formData.colors
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const sizesArray = formData.sizes
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    body.append('colors', JSON.stringify(colorsArray));
    body.append('sizes', JSON.stringify(sizesArray));

    imageFiles.forEach((file) => {
      body.append('images', file);
    });

    const result = await postProduct(body);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-bold">
          {mode === 'CREATE' ? 'Create Product' : 'Update Product'}
        </h2>
        <p className="text-sm text-muted-foreground">
          Fill all required product information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* LEFT */}
        <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          <Field title="Product Name">
            <Input
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Field>

          <Field title="Description">
            <Textarea
              rows={5}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </Field>

          <Field title="Summary">
            <Input
              value={formData.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
            />
          </Field>

          <Field title="Brand">
            <Input
              value={formData.brand}
              onChange={(e) => handleChange('brand', e.target.value)}
            />
          </Field>

          <Field title="SKU">
            <Input
              value={formData.sku}
              onChange={(e) => handleChange('sku', e.target.value)}
            />
          </Field>

          <Field title="Material">
            <Input
              value={formData.material}
              onChange={(e) => handleChange('material', e.target.value)}
            />
          </Field>
        </div>

        {/* RIGHT */}
        <div className="space-y-5 rounded-2xl border bg-card p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <Field title="Price">
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => handleChange('price', Number(e.target.value))}
              />
            </Field>

            <Field title="Discount">
              <Input
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  handleChange('discount', Number(e.target.value))
                }
              />
            </Field>

            <Field title="Cost Price">
              <Input
                type="number"
                value={formData.costPrice}
                onChange={(e) =>
                  handleChange('costPrice', Number(e.target.value))
                }
              />
            </Field>

            <Field title="Stock">
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) => handleChange('stock', Number(e.target.value))}
              />
            </Field>
          </div>

          <Field title="Category">
            <Select
              value={formData.categoryId}
              onValueChange={(v) => handleChange('categoryId', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id!}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          {selectedCategory?.children?.length ? (
            <Field title="Sub Category">
              <Select
                value={formData.subCategoryId}
                onValueChange={(v) => handleChange('subCategoryId', v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sub category" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCategory.children.map((sub) => (
                    <SelectItem key={sub._id} value={sub._id!}>
                      {sub.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          ) : null}

          <Field title="Colors (comma separated)">
            <Input
              value={formData.colors}
              onChange={(e) => handleChange('colors', e.target.value)}
            />
          </Field>

          <Field title="Sizes (comma separated)">
            <Input
              value={formData.sizes}
              onChange={(e) => handleChange('sizes', e.target.value)}
            />
          </Field>

          <Field title="Product Images">
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
            />
          </Field>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <Checkbox
                checked={formData.isFeatured}
                onCheckedChange={(v) => handleChange('isFeatured', !!v)}
              />
              <span className="text-sm">Featured</span>
            </label>

            <label className="flex items-center gap-2">
              <Checkbox
                checked={formData.isTodayDeal}
                onCheckedChange={(v) => handleChange('isTodayDeal', !!v)}
              />
              <span className="text-sm">Today Deal</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg">
          {mode === 'CREATE' ? 'Create Product' : 'Update Product'}
        </Button>
      </div>
    </div>
  );
};

const Field = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <label className="text-sm font-medium">{title}</label>
    {children}
  </div>
);

export default ProductFormPage;
