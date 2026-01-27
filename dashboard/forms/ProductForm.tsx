"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import type { Resolver, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { getApiUrl } from '@/lib/api';

// Define the schema for form validation (aligned with Supabase schema)
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required").refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number",
  }),
  category_id: z.string().optional(),
  image: z.string().optional(),
  in_stock: z.boolean().optional().default(true),
});

type ProductFormData = z.infer<typeof productSchema>;

const ProductForm = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormData>,
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category_id: "",
      image: "",
      in_stock: true,
    },
  });

  // Fetch categories from Supabase
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (data && !error) {
        setCategories(data);
      }
    };
    
    fetchCategories();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitError('Vă rugăm să selectați un fișier imagine valid');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('Imaginea trebuie să fie mai mică de 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSubmitError(null);
    }
  };

  const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      let imageUrl = '';
      
      // If a file is selected, convert it to base64 and send to API
      if (selectedFile) {
        setUploading(true);
        
        // Convert file to base64
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(selectedFile);
        });
        
        try {
          imageUrl = await base64Promise;
        } catch (err) {
          throw new Error('Failed to read image file');
        }
        
        setUploading(false);
      }

      // Submit to API route with image data
      const response = await fetch(getApiUrl('api/products'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          imageData: imageUrl, // Send base64 image
          fileName: selectedFile?.name || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create product');
      }

      // Success!
      setSubmitSuccess(true);
      reset();
      setSelectedFile(null);
      setImagePreview(null);
      
      // Redirect to products list after 1.5 seconds
      setTimeout(() => {
        router.push('/dashboard/products');
      }, 1500);

    } catch (error: any) {
      console.error('Error creating product:', error);
      setSubmitError(error.message || 'An error occurred while creating the product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-4">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Add New Product
      </h2>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          ✅ Product created successfully! Redirecting...
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          ❌ {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Name */}
        <div>
          <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">
            Product Name *
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="e.g., Pizza Margherita"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
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
            placeholder="e.g., 43.00"
            className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
            {...register("price")}
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-white">
            Category
          </Label>
          <select
            id="category_id"
            className="mt-1 p-2 block w-full dark:bg-slate-950 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
            {...register("category_id")}
          >
            <option value="">Select a category</option>
            <option value="toate">Toate</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <span className="text-red-500 text-sm">{errors.category_id.message}</span>
          )}
        </div>

        {/* In Stock */}
        <div className="flex items-center space-x-2 mt-6">
          <input
            id="in_stock"
            type="checkbox"
            className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            {...register("in_stock")}
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
            placeholder="Describe your product..."
            className="mt-1 p-2 block border bg-white dark:bg-slate-950 rounded-md w-full border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">{errors.description.message}</span>
          )}
        </div>

        {/* Image Upload */}
        <div className="lg:col-span-2">
          <Label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-white">
            Product Image (optional)
          </Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 focus:ring-red-500 focus:border-red-500"
          />
          <p className="text-sm text-gray-500 mt-1">
            Upload an image from your device (max 5MB, formats: JPG, PNG, WebP)
          </p>
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 dark:text-white mb-2">Preview:</p>
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
              />
            </div>
          )}
          
          {errors.image && (
            <span className="text-red-500 text-sm">{errors.image.message}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="lg:col-span-2">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2"
          >
            {isLoading ? 'Creating...' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};


export default ProductForm;