'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import BreadcrumbComponent from '@/components/others/Breadcrumb';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.string().min(1, 'Price is required'),
  category_id: z.string().optional(),
  in_stock: z.boolean().optional(),
  discountType: z.enum(['percentage', 'fixed']).optional(),
  discountValue: z.string().optional(),
  discountActive: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface Category {
  id: string;
  name: string;
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const discountActive = watch('discountActive');

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${productId}`);
      const data = await response.json();

      if (!data.success) {
        setError(data.error || 'Product not found');
        return;
      }

      const product = data.data;
      reset({
        name: product.name,
        description: product.description || '',
        price: String(product.price),
        category_id: product.category_id || '',
        in_stock: product.in_stock ?? true,
        discountType: product.discount_type || 'percentage',
        discountValue: product.discount_value ? String(product.discount_value) : '',
        discountActive: product.discount_active || false,
      });

      if (product.image) {
        setImagePreview(product.image);
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setSaving(true);
      setError(null);

      const payload: any = {
        name: data.name,
        description: data.description || null,
        price: parseFloat(data.price),
        category_id: data.category_id || null,
        in_stock: data.in_stock ?? true,
        discountType: data.discountType || 'percentage',
        discountValue: data.discountValue ? parseFloat(data.discountValue) : null,
        discountActive: data.discountActive || false,
      };

      // If new image selected, include base64 data
      if (selectedFile && imagePreview) {
        payload.imageData = imagePreview;
        payload.fileName = selectedFile.name;
      }

      const response = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update product');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1500);
    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(err.message || 'Failed to update product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-2 w-full">
      <BreadcrumbComponent
        links={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/products', label: 'Products' },
        ]}
        pageText="Edit Product"
      />

      <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Edit Product
        </h2>

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Product updated successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., Pizza Margherita"
              className="mt-1"
              {...register('name')}
            />
            {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price (lei) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              placeholder="e.g., 43.00"
              className="mt-1"
              {...register('price')}
            />
            {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              rows={3}
              placeholder="Product description..."
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600"
              {...register('description')}
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category_id">Category</Label>
            <select
              id="category_id"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 dark:border-gray-600"
              {...register('category_id')}
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock */}
          <div className="flex items-center gap-2 pt-6">
            <Checkbox id="in_stock" {...register('in_stock')} defaultChecked />
            <Label htmlFor="in_stock">In Stock</Label>
          </div>

          {/* Discount Section */}
          <div className="lg:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-medium mb-3">Discount Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="discountActive"
                  checked={discountActive}
                  onCheckedChange={(checked) => setValue('discountActive', !!checked)}
                />
                <Label htmlFor="discountActive">Enable Discount</Label>
              </div>

              <div>
                <Label htmlFor="discountType">Discount Type</Label>
                <select
                  id="discountType"
                  className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                  {...register('discountType')}
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Amount (lei)</option>
                </select>
              </div>

              <div>
                <Label htmlFor="discountValue">Discount Value</Label>
                <Input
                  id="discountValue"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 10"
                  className="mt-1"
                  {...register('discountValue')}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="lg:col-span-2">
            <Label htmlFor="image">Product Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              className="mt-1"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex gap-4">
            <Button type="submit" disabled={saving} className="bg-red-600 hover:bg-red-700">
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/dashboard/products')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
