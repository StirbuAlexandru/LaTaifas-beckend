'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Wine as WineIcon, Filter, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculateFinalPrice } from '@/utils/discountCalculator';
import { useCart } from '@/context/CartContext';
import { getApiUrl } from '@/lib/api';

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
  customWineCategoryId?: string;
  sweetness?: string;
  region?: string;
  alcoholContent?: number;
  volume?: number;
  year?: number;
  producer?: string;
  inStock: boolean;
}

interface CustomWineCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

const VinuriPage = () => {
  const [wines, setWines] = useState<Wine[]>([]);
  const [customCategories, setCustomCategories] = useState<CustomWineCategory[]>([]);
  const [filteredWines, setFilteredWines] = useState<Wine[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedSweetness, setSelectedSweetness] = useState('all');
  const [selectedEffervescence, setSelectedEffervescence] = useState('all');
  const { addToCart } = useCart();

  const handleAddToCart = (wine: Wine, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();
    
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
        quantity: 1,
        selectedOptions: [],
        specialInstructions: '',
      },
      productData
    );
  };

  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await fetch('/api/wines?inStock=true&limit=100');
        const result = await response.json();

        if (result.success) {
          setWines(result.data.wines);
          setFilteredWines(result.data.wines);
        }
      } catch (error) {
        console.error('Error fetching wines:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCustomCategories = async () => {
      try {
        const response = await fetch('/api/custom-wine-categories');
        const result = await response.json();
        
        if (result.success) {
          setCustomCategories(result.data);
        }
      } catch (error) {
        console.error('Error fetching custom categories:', error);
      }
    };

    fetchWines();
    fetchCustomCategories();
  }, []);

  useEffect(() => {
    let filtered = wines;

    // Filter by color (wine type)
    if (selectedColor !== 'all') {
      filtered = filtered.filter(wine => wine.wineType === selectedColor);
    }

    // Filter by sweetness
    if (selectedSweetness !== 'all') {
      filtered = filtered.filter(wine => wine.sweetness === selectedSweetness);
    }

    // Filter by effervescence
    if (selectedEffervescence !== 'all') {
      filtered = filtered.filter(wine => wine.customWineCategoryId === selectedEffervescence);
    }

    setFilteredWines(filtered);
  }, [selectedColor, selectedSweetness, selectedEffervescence, wines]);

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
    <div className="min-h-screen bg-gray-50">
      {/* Ultra Modern Hero Section */}
      <div className="relative text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/C8.jpg"
            alt="Wine Background"
            fill
            className="object-cover scale-105 transition-transform duration-1000"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay - Multiple layers for depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Animated Title */}
            <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/20 shadow-2xl mb-6">
                <div className="relative">
                  <WineIcon className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
                  <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md animate-pulse"></div>
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-red-200">Colecție Premium</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
                <span className="inline-block animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
                  Colecția Noastră
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-red-400 via-red-300 to-red-200 text-transparent bg-clip-text animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                  de Vinuri
                </span>
              </h1>
            </div>

            {/* Animated Description */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                Descoperă vinuri de 
                <span className="font-semibold text-red-300 mx-1">calitate superioară</span>, 
                selectate cu grijă pentru a complementa perfect masa ta
              </p>
              
              {/* Decorative Elements */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Selecție Premium</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <span className="text-sm font-medium">Garanție Calitate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </div>

      {/* Ultra Modern Filter Bar - Static (Does NOT scroll) */}
      <div 
        className="relative z-20 backdrop-blur-md border-b" 
        style={{ 
          background: 'linear-gradient(135deg, #bf3d3d 0%, #8b2c2c 100%)',
          boxShadow: '0 8px 32px rgba(191, 61, 61, 0.35), inset 0 1px 0 rgba(255,255,255,0.1)',
          borderColor: 'rgba(255,255,255,0.1)'
        }}
      >
        <div className="container mx-auto px-4 py-2.5">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            
            {/* Left: Filters - Compact on Mobile, Inline on Desktop */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
              
              {/* Filter Icon + Label - Only Desktop */}
              <div className="hidden md:flex items-center gap-2 text-white/95 mr-3 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <Filter className="h-4 w-4" />
                <span className="text-sm font-semibold tracking-wide">FILTRE</span>
              </div>

              {/* Mobile Label Only */}
              <div className="md:hidden flex items-center justify-between text-white/95 mb-1">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <span className="text-xs font-semibold tracking-wide">FILTREAZĂ VINURILE</span>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  {filteredWines.length} {filteredWines.length === 1 ? 'vin' : 'vinuri'}
                </span>
              </div>
              
              {/* Filters Row */}
              <div className="flex flex-col md:flex-row gap-2 flex-1">
                {/* Color Filter */}
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-semibold text-white/80 mb-1 block uppercase tracking-wider">Culoare</label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger className="w-full bg-white/95 hover:bg-white h-8 text-xs md:text-sm border-0 shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Culoare" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      <SelectItem value="all" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">✨ Toate</SelectItem>
                      <SelectItem value="white" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🥂 Alb</SelectItem>
                      <SelectItem value="rose" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🌸 Roze</SelectItem>
                      <SelectItem value="red" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🍷 Roșu</SelectItem>
                      <SelectItem value="orange" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🍊 Orange</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sweetness Filter */}
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-semibold text-white/80 mb-1 block uppercase tracking-wider">Conținut de zahăr</label>
                  <Select value={selectedSweetness} onValueChange={setSelectedSweetness}>
                    <SelectTrigger className="w-full bg-white/95 hover:bg-white h-8 text-xs md:text-sm border-0 shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Conținut de zahăr" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      <SelectItem value="all" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">✨ Toate</SelectItem>
                      <SelectItem value="sec" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🌱 Sec</SelectItem>
                      <SelectItem value="demisec" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🍃 Demisec</SelectItem>
                      <SelectItem value="demidulce" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🌿 Demidulce</SelectItem>
                      <SelectItem value="dulce" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🍯 Dulce</SelectItem>
                      <SelectItem value="licoros" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🥃 Licoros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Effervescence Filter */}
                <div className="flex-1 min-w-0">
                  <label className="text-[10px] font-semibold text-white/80 mb-1 block uppercase tracking-wider">Efervescență</label>
                  <Select value={selectedEffervescence} onValueChange={setSelectedEffervescence}>
                    <SelectTrigger className="w-full bg-white/95 hover:bg-white h-8 text-xs md:text-sm border-0 shadow-sm hover:shadow-md transition-all">
                      <SelectValue placeholder="Efervescență" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-white">
                      <SelectItem value="all" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">✨ Toate</SelectItem>
                      <SelectItem value="linistite" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🍷 Liniștite</SelectItem>
                      <SelectItem value="spumoase" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">🥂 Spumoase</SelectItem>
                      <SelectItem value="perlante" className="bg-white dark:bg-white hover:bg-red-400 dark:hover:bg-red-400 focus:bg-red-400 dark:focus:bg-red-400 text-gray-900 dark:text-gray-900 data-[highlighted]:bg-red-400">✨ Perlante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Right: Results Counter - Desktop Only */}
            <div className="hidden md:flex items-center gap-2 text-white/95 px-4 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <WineIcon className="h-4 w-4" />
              <span className="text-sm font-bold">{filteredWines.length}</span>
              <span className="text-xs font-medium opacity-90">{filteredWines.length === 1 ? 'vin' : 'vinuri'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Wines Grid */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Se încarcă vinurile...</p>
          </div>
        ) : filteredWines.length === 0 ? (
          <div className="text-center py-20">
            <WineIcon className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-600">Nu am găsit vinuri în această categorie</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
            {filteredWines.map((wine) => {
              const finalPrice = calculateFinalPrice(
                wine.price,
                {
                  discountType: wine.discountType || 'percentage',
                  discountValue: wine.discountValue || 0,
                  discountActive: wine.discountActive || false
                }
              );
              const hasDiscount = wine.discountActive && finalPrice < wine.price;

              return (
                <div
                  key={wine.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden group relative transition-all duration-500 hover:scale-105 flex flex-col"
                  style={{ 
                    border: '2px solid #bf3d3d',
                    transition: 'all 0.5s ease-in-out',
                    height: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(191, 61, 61, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="block flex-1 flex flex-col cursor-pointer">
                    {/* Discount Badge */}
                    {hasDiscount && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                          -{wine.discountType === 'percentage' ? `${wine.discountValue}%` : `${wine.discountValue} lei`}
                        </div>
                      </div>
                    )}

                    {/* Image */}
                    <div className="relative w-full aspect-[4/5] bg-white overflow-hidden flex-shrink-0 flex items-center justify-center p-4">
                      {wine.image ? (
                        <Image
                          src={wine.image}
                          alt={wine.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <WineIcon className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Info Badges */}
                    <div className="px-2 py-1 bg-gradient-to-r from-red-50 to-red-100/50 flex flex-wrap gap-1 justify-center">
                      {wine.wineType && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-red-700 border border-red-200">
                          {getWineTypeLabel(wine.wineType)}
                        </span>
                      )}
                      {wine.sweetness && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-gray-700 border border-gray-200">
                          {wine.sweetness}
                        </span>
                      )}
                      {wine.year && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-gray-700 border border-gray-200">
                          {wine.year}
                        </span>
                      )}
                      {wine.volume && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-gray-700 border border-gray-200">
                          {wine.volume}ml
                        </span>
                      )}
                      {wine.alcoholContent && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-white text-gray-700 border border-gray-200">
                          {wine.alcoholContent}%
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-2 flex-1 flex flex-col">
                      <h3 className="text-sm font-bold text-red-600 mb-1 text-center line-clamp-2 group-hover:text-red-700 transition-colors duration-300">
                        {wine.name}
                      </h3>

                      {/* Producer */}
                      {wine.producer && (
                        <p className="text-[10px] text-gray-600 text-center mb-1">
                          {wine.producer}
                        </p>
                      )}

                      {/* Region */}
                      {wine.region && (
                        <p className="text-[10px] text-gray-500 text-center mb-1.5 italic">
                          {wine.region}
                        </p>
                      )}

                      {/* Price */}
                      <div className="border-t border-gray-200 pt-1.5 mt-auto">
                        <div className="flex items-center justify-center gap-1.5">
                          {hasDiscount ? (
                            <>
                              <span className="text-xs text-gray-400 line-through">
                                {wine.price.toFixed(2)} lei
                              </span>
                              <span className="text-base font-bold text-red-600">
                                {finalPrice.toFixed(2)} lei
                              </span>
                            </>
                          ) : (
                            <span className="text-base font-bold text-gray-900">
                              {wine.price.toFixed(2)} lei
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <div className="px-2 pb-2">
                    <Button
                      onClick={(e) => handleAddToCart(wine, e)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-1.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-xl text-xs"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      Adaugă în coș
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default VinuriPage;
