'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import BreadcrumbComponent from '../../../../../components/others/Breadcrumb';
import { Button } from '../../../../../components/ui/button';
import { Input } from '../../../../../components/ui/input';
import { Label } from '../../../../../components/ui/label';
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Product, Category } from '../../../../../types/product'; // Import the correct types

const ProductEditPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState('');
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');
  const [discountValue, setDiscountValue] = useState('');
  const [discountActive, setDiscountActive] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [inStock, setInStock] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      
      // Check if response is OK and content type is JSON
      const contentType = response.headers.get('content-type');
      if (!response.ok || !contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 200) + (text.length > 200 ? '...' : ''));
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        const p = data.data;
        setProduct(p);
        setName(p.name);
        setDescription(p.description || '');
        setPrice(p.price.toString());
        // Set discount fields based on the new structure
        if (p.discount_active && p.discount_value) {
          setDiscountType(p.discount_type || 'percentage');
          setDiscountValue(p.discount_value.toString());
          setDiscountActive(true);
          // Calculate discounted price for display
          if (p.discount_type === 'percentage') {
            const discounted = p.price - (p.price * p.discount_value / 100);
            setDiscountedPrice(discounted.toFixed(2));
          } else if (p.discount_type === 'fixed') {
            const discounted = p.price - p.discount_value;
            setDiscountedPrice(discounted.toFixed(2));
          }
        } else {
          setDiscountActive(false);
          setDiscountedPrice('');
        }
        setCategoryId(p.category_id || null);
        setInStock(p.in_stock);
        setImagePreview(p.image);
      } else {
        setError('Product not found');
      }

    } catch (err: any) {
      console.error('Error fetching product:', err);
      setError(`Failed to load product: ${err.message}`);
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
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Vă rugăm să selectați un fișier imagine valid');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Imaginea trebuie să fie mai mică de 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      let imageData = '';
      let fileName = '';

      const priceValue = parseFloat(price);
      let finalDiscountType = discountType;
      let finalDiscountValue = discountValue && discountValue.trim() !== '' ? parseFloat(discountValue) : null;

      // If user entered a desired discounted price, calculate the discount values
      if (discountActive && discountedPrice && discountedPrice !== '') {
        const desiredDiscountedPrice = parseFloat(discountedPrice);
        if (!isNaN(desiredDiscountedPrice) && desiredDiscountedPrice > 0 && desiredDiscountedPrice < priceValue) {
          // Calculate discount based on desired price
          const discountAmount = priceValue - desiredDiscountedPrice;
          finalDiscountType = 'fixed';
          finalDiscountValue = discountAmount;
        }
      }

      if (selectedFile) {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
        
        imageData = await base64Promise;
        fileName = selectedFile.name;
      }

      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
          price: priceValue,
          discountType: finalDiscountType,
          discountValue: finalDiscountValue,
          discountActive,
          category_id: categoryId,
          in_stock: inStock,
          ...(imageData && { image: imageData }), // Send as 'image' not 'imageData'
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to update product');
      }

      setSuccess(true);
      // Save the current category to localStorage before redirecting
      const currentCategory = categoryId || '';
      localStorage.setItem('lastEditedProductCategory', currentCategory);
      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1500);

    } catch (err: any) {
      console.error('Error updating product:', err);
      setError(err.message || 'An error occurred while updating the product');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-screen-xl mx-auto p-8">
        <p className="text-gray-600 dark:text-gray-400">Loading product...</p>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="max-w-screen-xl mx-auto p-8">
        <p className="text-red-600">{error}</p>
        <Button onClick={() => router.push('/dashboard/products')} className="mt-4">
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard/products')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          
          <BreadcrumbComponent
            links={[
              { href: '/dashboard', label: 'Dashboard' },
              { href: '/dashboard/products', label: 'Products' }
            ]}
            pageText={`Edit: ${product?.name || 'Product'}`}
          />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Edit Product
        </h2>

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            ✅ Product updated successfully! Redirecting...
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
              Product Name *
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md"
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-white">
              Price (lei) *
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 p-2 block w-full rounded-md"
            />
          </div>

          {/* Discount Controls */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <input
                id="discountActive"
                type="checkbox"
                checked={discountActive}
                onChange={(e) => setDiscountActive(e.target.checked)}
                className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                aria-label="Activare Reducere"
              />
              <Label htmlFor="discountActive" className="text-sm font-medium text-gray-700 dark:text-white">
                Activare Reducere
              </Label>
            </div>
            
            {discountActive && (
              <div className="space-y-4">
                {/* Desired Discounted Price */}
                <div>
                  <Label htmlFor="discountedPrice" className="block text-sm font-medium text-gray-700 dark:text-white">
                    Preț după reducere (lei)
                  </Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    step="0.01"
                    value={discountedPrice}
                    onChange={(e) => setDiscountedPrice(e.target.value)}
                    placeholder="e.g., 35.00"
                    className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Introduceți prețul dorit după aplicarea reducerii
                  </p>
                </div>
                
                {/* Manual Discount Controls (Hidden by default, shown only if needed) */}
                <details className="border-t pt-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-white">
                    Setări avansate pentru reducere
                  </summary>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="discountType" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Tip Reducere
                      </Label>
                      <select
                        id="discountType"
                        value={discountType}
                        onChange={(e) => setDiscountType(e.target.value as 'percentage' | 'fixed')}
                        className="mt-1 p-2 block w-full dark:bg-slate-950 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
                      >
                        <option value="percentage">Procent (%)</option>
                        <option value="fixed">Sumă Fixă (lei)</option>
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="discountValue" className="block text-sm font-medium text-gray-700 dark:text-white">
                        Valoare Reducere
                      </Label>
                      <Input
                        id="discountValue"
                        type="number"
                        step="0.01"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        placeholder="e.g., 20 sau 5.00"
                        className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {discountType === 'percentage' ? 'Procent (ex: 20 pentru 20%)' : 'Sumă fixă în lei (ex: 5.00 pentru 5 lei)'}
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-white">
              Category
            </Label>
            <select
              id="category_id"
              value={categoryId || ''} // Fix: Handle null value correctly for select
              onChange={(e) => setCategoryId(e.target.value || null)} // Fix: Convert empty string back to null
              className="mt-1 p-2 block w-full dark:bg-slate-950 rounded-md border border-gray-300 dark:border-gray-600"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2 mt-6">
            <input
              id="in_stock"
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded"
            />
            <Label htmlFor="in_stock" className="text-sm font-medium text-gray-700 dark:text-white">
              In Stock
            </Label>
          </div>

          {/* Description */}
          <div className="lg:col-span-2">
            <Label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-white">
              Description *
            </Label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 p-2 block border bg-white dark:bg-slate-950 rounded-md w-full border-gray-300 dark:border-gray-600"
            />
          </div>

          {/* Image Upload */}
          <div className="lg:col-span-2">
            <Label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white">
              Product Image (optional - leave empty to keep current image)
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 p-2 block w-full rounded-md"
            />
            <p className="text-sm text-gray-500 mt-1">
              Upload a new image or leave empty to keep the current one (max 5MB)
            </p>
            
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 dark:text-white mb-2">
                  {selectedFile ? 'New Image Preview:' : 'Current Image:'}
                </p>
                <div className="relative h-48 w-48">
                  <Image 
                    src={imagePreview} 
                    alt="Product preview" 
                    fill
                    className="object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="lg:col-span-2 flex gap-4">
            <Button 
              type="submit" 
              disabled={saving}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
            >
              {saving ? 'Updating...' : 'Update Product'}
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
};

export default ProductEditPage;