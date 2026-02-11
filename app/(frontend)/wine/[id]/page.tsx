'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, ShoppingCart, Wine as WineIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { calculateFinalPrice } from '@/utils/discountCalculator';

interface Wine {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountType?: 'percentage' | 'fixed';
  discountValue?: number;
  discountActive?: boolean;
  image?: string;
  wineType?: string;
  sweetness?: string;
  region?: string;
  alcoholContent?: number;
  volume?: number;
  year?: number;
  producer?: string;
  inStock: boolean;
}

export default function WinePage() {
  const params = useParams();
  const router = useRouter();
  const wineId = params.id as string;
  const { addToCart } = useCart();

  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWine = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/wines/${wineId}`);
        const data = await response.json();

        if (data.success && data.data) {
          setWine(data.data);
        } else {
          setError('Vinul nu a fost găsit');
        }
      } catch (err) {
        console.error('Error fetching wine:', err);
        setError('Eroare la încărcarea vinului');
      } finally {
        setLoading(false);
      }
    };

    if (wineId) {
      fetchWine();
    }
  }, [wineId]);

  const handleAddToCart = () => {
    if (!wine) return;

    const productData = {
      id: wine.id,
      name: wine.name,
      slug: wine.name.toLowerCase().replace(/\s+/g, '-'),
      description: wine.description || '',
      price: wine.price,
      discountType: wine.discountType,
      discountValue: wine.discountValue,
      discountActive: wine.discountActive,
      image: wine.image || '',
      images: wine.image ? [wine.image] : [],
      thumbnail: wine.image || '',
      categoryId: 'wines',
      stock: wine.inStock ? 100 : 0,
      inStock: wine.inStock,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addToCart(
      {
        productId: wine.id,
        quantity: 1,
        selectedOptions: [],
        specialInstructions: '',
      },
      productData
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Se încarcă vinul...</p>
        </div>
      </div>
    );
  }

  if (error || !wine) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Vinul nu a fost găsit</h2>
            <p className="text-gray-700">{error || 'Acest vin nu există sau a fost șters.'}</p>
          </div>
          <Button 
            onClick={() => router.push('/vinuri')}
            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi la vinuri
          </Button>
        </div>
      </div>
    );
  }

  const finalPrice = calculateFinalPrice(
    wine.price,
    {
      discountType: wine.discountType || 'percentage',
      discountValue: wine.discountValue || 0,
      discountActive: wine.discountActive || false
    }
  );
  const hasDiscount = wine.discountActive && finalPrice < wine.price;

  const getWineTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      red: 'Roșu',
      white: 'Alb',
      rose: 'Rose',
      sparkling: 'Spumant',
      dessert: 'Desert',
      fortified: 'Fortificat',
    };
    return type ? labels[type] || type : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-gray-50 py-4 pt-20">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <div className="mb-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center gap-2 border-2 border-red-200 hover:border-red-600 hover:bg-red-50 hover:text-red-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="h-4 w-4" />
            Înapoi
          </Button>
        </div>

        {/* Wine content */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 bg-white rounded-3xl shadow-xl border-2 border-red-100 p-4 lg:p-6">
          {/* Left: Image */}
          <div className="lg:sticky lg:top-8 lg:self-start flex items-start justify-center">
            <div className="relative aspect-[3/4] max-h-[520px] w-full max-w-md bg-white rounded-2xl overflow-hidden border-2 border-red-100 shadow-lg">
              {wine.image ? (
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  className="object-contain p-8"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <WineIcon className="h-32 w-32 text-gray-300" />
                </div>
              )}
              {hasDiscount && (
                <div className="absolute top-4 right-4">
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-lg font-bold shadow-lg">
                    -{wine.discountType === 'percentage' ? `${wine.discountValue}%` : `${wine.discountValue} lei`}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{wine.name}</h1>
              {wine.producer && (
                <p className="text-lg text-gray-600 mb-1">{wine.producer}</p>
              )}
              {wine.region && (
                <p className="text-sm text-gray-500 italic">{wine.region}</p>
              )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {wine.wineType && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200">
                  {getWineTypeLabel(wine.wineType)}
                </span>
              )}
              {wine.sweetness && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {wine.sweetness}
                </span>
              )}
              {wine.year && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {wine.year}
                </span>
              )}
              {wine.volume && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {wine.volume}ml
                </span>
              )}
              {wine.alcoholContent && (
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
                  {wine.alcoholContent}%
                </span>
              )}
            </div>

            {/* Description */}
            {wine.description && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{wine.description}</p>
              </div>
            )}

            {/* Price and Add to Cart */}
            <div className="border-t-2 border-gray-200 pt-6 space-y-4">
              <div>
                {hasDiscount ? (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl text-gray-400 line-through">
                      {wine.price.toFixed(2)} lei
                    </span>
                    <span className="text-4xl font-bold text-red-600">
                      {finalPrice.toFixed(2)} lei
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    {wine.price.toFixed(2)} lei
                  </span>
                )}
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!wine.inStock}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <ShoppingCart className="h-6 w-6" />
                {wine.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
