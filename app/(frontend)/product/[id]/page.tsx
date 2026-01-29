'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductDetails from '@/components/product/ProductDetails';
import { Product } from '@/types/product';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        if (data.success && data.data) {
          setProduct(data.data);
        } else {
          setError('Produsul nu a fost găsit');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Eroare la încărcarea produsului');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă produsul...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Produsul nu a fost găsit</h2>
            <p className="text-gray-700">{error || 'Acest produs nu există sau a fost șters.'}</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
            <Link href="/comanda-online" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Înapoi la meniu
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const productImages = product.image ? [product.image] : ['/images/placeholder.jpg'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center gap-2 border-2 border-red-200 hover:border-red-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
        </div>

        {/* Product content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-3xl shadow-xl border-2 border-red-100 p-6 lg:p-8">
          {/* Left: Image Gallery */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ProductGallery images={productImages} />
          </div>

          {/* Right: Product Details */}
          <div>
            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
