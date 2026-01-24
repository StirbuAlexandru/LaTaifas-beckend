'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';

interface ProductApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price?: number;
  discount?: number;
  discount_type?: 'percentage' | 'fixed' | null;
  discount_value?: number | null;
  discount_active?: boolean | null;
  image: string | null;
  category_id: string | null;
  in_stock: boolean;
  created_at: string;
  updated_at: string;
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        const data = await response.json();
        
        if (response.status === 404) {
          setError('Product not found');
          return;
        }
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch product');
        }
        
        if (data.success && data.data) {
          // Transform the API response to match the Product type
          const apiProduct: ProductApiResponse = data.data;
          
          const transformedProduct: Product = {
            id: apiProduct.id,
            name: apiProduct.name,
            description: apiProduct.description,
            price: apiProduct.price,
            originalPrice: apiProduct.original_price,
            discount: apiProduct.discount,
            // New discount fields
            discountType: apiProduct.discount_type || undefined,
            discountValue: apiProduct.discount_value || undefined,
            discountActive: apiProduct.discount_active || false,
            image: apiProduct.image || undefined,
            images: apiProduct.image ? [apiProduct.image] : [],
            thumbnail: apiProduct.image || '',
            categoryId: apiProduct.category_id || '',
            inStock: apiProduct.in_stock,
            stock: apiProduct.in_stock ? 10 : 0, // Default stock value
            featured: false, // Default value
            createdAt: new Date(apiProduct.created_at),
            updatedAt: new Date(apiProduct.updated_at),
            slug: apiProduct.name.toLowerCase().replace(/\s+/g, '-'),
            rating: 0,
            reviewsCount: 0
          };
          
          setProduct(transformedProduct);
        } else {
          setError('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params.id]);
  
  // Handle error cases
  if (error === 'Product not found') {
    notFound();
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error Loading Product</h2>
          <p className="text-gray-600">{error}</p>
          <Button 
            onClick={() => router.back()} 
            className="mt-4 bg-gray-400 text-white border-gray-400 hover:bg-red-600 hover:border-red-600"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }
  
  if (!product) {
    notFound();
  }

  // Convert to format expected by ProductGallery and ProductDetails
  const productForDisplay = {
    ...product,
    images: product.image ? [product.image] : [],
    thumbnail: product.image || '',
    inStock: product.inStock,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <ProductGallery images={productForDisplay.images} isInModal={false} />
            
            {/* Buton Înapoi - Modern cu gradient - Sub imagine */}
            <div className="mt-6">
              <Button
                variant="outline"
                onClick={() => router.back()}
                className="group bg-white border-2 border-gray-200 hover:border-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 rounded-xl shadow-sm hover:shadow-md font-semibold w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                Înapoi la produse
              </Button>
            </div>
          </div>
          
          <ProductDetails product={productForDisplay} />
        </div>
      </div>
    </div>
  );
}