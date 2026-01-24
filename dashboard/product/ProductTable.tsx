'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calculateFinalPrice } from '@/utils/discountCalculator';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  // Discount fields from database
  discount_type?: 'percentage' | 'fixed' | null;
  discount_value?: number | null;
  discount_active?: boolean | null;
  image: string | null;
  category_id: string | null;
  in_stock: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

interface ProductTableProps {
  products: Product[];
  categories: Category[];
  onDelete: (id: string) => void;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

const ProductTable = ({
  products,
  categories,
  onDelete,
  loading,
  error,
  onRetry
}: ProductTableProps) => {
  // Create a map for quick category lookup
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {} as Record<string, string>);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <Button onClick={onRetry} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-4">No products found</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Add your first product to get started
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Image
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Discount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => {
            // Calculate discount price dynamically
            const hasDiscount = product.discount_active && 
                              product.discount_value != null && 
                              product.discount_value > 0;
            
            const discountPrice = hasDiscount ? 
              calculateFinalPrice(product.price, {
                discountType: product.discount_type || 'percentage',
                discountValue: product.discount_value || 0,
                discountActive: product.discount_active || false
              }) : null;

            return (
              <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <span className="text-xs text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {product.category_id ? categoryMap[product.category_id] || 'Unknown Category' : 'No Category'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 max-w-xs">
                    {product.description}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">
                    {hasDiscount ? (
                      <>
                        <span>{discountPrice?.toFixed(2)} lei</span>
                        <br />
                        <span className="text-xs text-gray-500 line-through">
                          {product.price.toFixed(2)} lei
                        </span>
                      </>
                    ) : (
                      <>{product.price.toFixed(2)} lei</>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    {hasDiscount ? (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                        {Math.round(((product.price - (discountPrice || 0)) / product.price) * 100)}% OFF
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">-</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.in_stock
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {product.in_stock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/products/${product.id}`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900"
                      onClick={() => onDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;