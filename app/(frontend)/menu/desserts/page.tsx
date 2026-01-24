'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../../../../components/frontend/menu/ProductCard';
import { Product } from '../../../../types/product';

export default function DessertsCategoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Fetch desserts products from API
        const response = await fetch('/api/products?categoryId=3'); // Assuming category ID 3 is desserts
        const data = await response.json();
        
        if (data.success && data.data.products) {
          // Transform API response to match Product type
          const transformedProducts = data.data.products.map((product: any) => ({
            ...product,
            // Transform field names to match Product type
            originalPrice: product.original_price,
            categoryId: product.category_id,
            inStock: product.in_stock,
            createdAt: new Date(product.created_at),
            updatedAt: new Date(product.updated_at),
            // Remove the old field names
            original_price: undefined,
            category_id: undefined,
            in_stock: undefined,
            created_at: undefined,
            updated_at: undefined,
          }));
          setProducts(transformedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Deserturi</h1>
        <p className="text-gray-600">Delicioase deserturi pentru a încheia masa perfect</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Nu există produse în această categorie momentan.</p>
        </div>
      )}
    </div>
  );
}