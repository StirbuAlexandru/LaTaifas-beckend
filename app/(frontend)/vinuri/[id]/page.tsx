'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Wine as WineIcon, ArrowLeft, Calendar, Droplet, Grape, MapPin, Building2, ShoppingCart, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

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
  region?: string;
  alcoholContent?: number;
  volume?: number;
  year?: number;
  producer?: string;
  inStock: boolean;
}

const WineDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [wine, setWine] = useState<Wine | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!wine) return;
    
    // Convert Wine to Product format
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
        quantity: quantity,
        selectedOptions: [],
        specialInstructions: '',
      },
      productData
    );
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  useEffect(() => {
    const fetchWine = async () => {
      try {
        const response = await fetch(`/api/wines/${params.id}`);
        const result = await response.json();

        if (result.success) {
          setWine(result.data);
        } else {
          router.push('/vinuri');
        }
      } catch (error) {
        console.error('Error fetching wine:', error);
        router.push('/vinuri');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchWine();
    }
  }, [params.id, router]);

  const getWineTypeLabel = (type?: string) => {
    const labels: Record<string, string> = {
      red: 'Vin Roșu',
      white: 'Vin Alb',
      rose: 'Vin Rose',
      sparkling: 'Vin Spumant',
      dessert: 'Vin de Desert',
      fortified: 'Vin Fortificat',
    };
    return type ? labels[type] || type : '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (!wine) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/vinuri"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-all duration-300 hover:gap-3 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Înapoi la vinuri</span>
        </Link>
      </div>

      {/* Wine Details */}
      <div className="container mx-auto px-4 pb-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:shadow-2xl transition-all duration-500" style={{ border: '2px solid #bf3d3d' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[600px] bg-gradient-to-br from-gray-50 to-gray-100 group overflow-hidden">
              {wine.image ? (
                <Image
                  src={wine.image}
                  alt={wine.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  style={{ objectPosition: 'top' }}
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <WineIcon className="h-24 w-24 text-gray-300 animate-pulse" />
                </div>
              )}
              
              {/* Decorative Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </div>

            {/* Details Section */}
            <div className="p-6 lg:p-8 flex flex-col">
              {/* Wine Type Badge */}
              {wine.wineType && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-red-100 to-red-50 text-red-800 text-xs font-semibold rounded-full mb-3 w-fit animate-fadeIn">
                  {getWineTypeLabel(wine.wineType)}
                </span>
              )}

              {/* Wine Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-red-600 mb-3 animate-slideInLeft">
                {wine.name}
              </h1>

              {/* Producer */}
              {wine.producer && (
                <div className="flex items-center gap-2 text-gray-700 mb-2 group hover:text-red-600 transition-colors">
                  <Building2 className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{wine.producer}</span>
                </div>
              )}

              {/* Region */}
              {wine.region && (
                <div className="flex items-center gap-2 text-gray-600 mb-4 group hover:text-red-600 transition-colors">
                  <MapPin className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform" />
                  <span className="text-sm italic">{wine.region}</span>
                </div>
              )}

              {/* Wine Specifications */}
              <div className="grid grid-cols-3 gap-3 my-4 animate-fadeIn">
                {wine.year && (
                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-red-50 to-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                    <Calendar className="h-5 w-5 text-red-600 mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] text-gray-500 mb-0.5">An</p>
                    <p className="font-bold text-sm">{wine.year}</p>
                  </div>
                )}
                {wine.alcoholContent && (
                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-red-50 to-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                    <Droplet className="h-5 w-5 text-red-600 mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] text-gray-500 mb-0.5">Alcool</p>
                    <p className="font-bold text-sm">{wine.alcoholContent}%</p>
                  </div>
                )}
                {wine.volume && (
                  <div className="flex flex-col items-center p-3 bg-gradient-to-br from-red-50 to-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
                    <WineIcon className="h-5 w-5 text-red-600 mb-1 group-hover:scale-110 transition-transform" />
                    <p className="text-[10px] text-gray-500 mb-0.5">Volum</p>
                    <p className="font-bold text-sm">{wine.volume}ml</p>
                  </div>
                )}
              </div>

              {/* Description */}
              {wine.description && (
                <div className="mb-4 animate-fadeIn">
                  <h2 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Grape className="h-4 w-4 text-red-600" />
                    Descriere
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line line-clamp-4 hover:line-clamp-none transition-all">
                    {wine.description}
                  </p>
                </div>
              )}

              {/* Price & Stock */}
              <div className="border-t-2 border-red-100 pt-4 mt-auto">
                {/* Stock Status */}
                <div className="mb-3">
                  {wine.inStock ? (
                    <span className="inline-flex items-center gap-2 text-green-600 text-xs font-medium animate-pulse">
                      <span className="h-2 w-2 bg-green-600 rounded-full"></span>
                      În stoc
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-red-600 text-xs font-medium">
                      <span className="h-2 w-2 bg-red-600 rounded-full"></span>
                      Indisponibil
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-gray-600 text-sm">Preț:</span>
                  <span className="text-2xl lg:text-3xl font-bold text-red-600 animate-slideInRight">
                    {wine.price.toFixed(2)} <span className="text-lg">lei</span>
                  </span>
                </div>

                {/* Quantity Selector & Add to Cart */}
                {wine.inStock && (
                  <div className="space-y-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 font-medium text-sm">Cantitate:</span>
                      <div className="flex items-center border-2 border-red-600 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <Button
                          onClick={decrementQuantity}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-red-50 text-red-600 transition-all hover:scale-110"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-4 py-1 font-bold text-base text-gray-900 min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <Button
                          onClick={incrementQuantity}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none hover:bg-red-50 text-red-600 transition-all hover:scale-110"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 text-sm rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <ShoppingCart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      <span>Adaugă în coș - {(wine.price * quantity).toFixed(2)} lei</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out;
        }
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WineDetailPage;
