'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChefHat, Utensils, Leaf } from 'lucide-react';

interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  note: string | null;
  display_order: number;
}

interface MenuItem {
  id: string;
  category_id: string;
  name: string;
  details: string | null;
  ingredients: string | null;
  display_order: number;
}

export default function MenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Fetch categories from database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/menu-categories');
        const data = await response.json();
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
          setSelectedCategoryId(data.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch items when category changes
  useEffect(() => {
    if (selectedCategoryId) {
      const fetchItems = async () => {
        try {
          const response = await fetch(`/api/menu-items?category_id=${selectedCategoryId}`);
          const data = await response.json();
          if (data.success) {
            setItems(data.data || []);
          }
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
      fetchItems();
    }
  }, [selectedCategoryId]);

  const currentCategory = categories.find(cat => cat.id === selectedCategoryId);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-4"></div>
          <p className="text-xl text-gray-700 font-medium">Se încarcă meniul...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Ultra Modern */}
      <div className="relative text-white py-28 md:py-40 overflow-hidden min-h-[60vh] md:min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/meniu1.jpg"
            alt="Menu background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl z-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Animated Badge */}
            <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/20 shadow-2xl mb-6">
                <div className="relative">
                  <ChefHat className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
                  <div className="absolute -inset-1 bg-white/30 rounded-full blur-md animate-pulse"></div>
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-red-100">Meniu Restaurant</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                <span className="inline-block animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
                  Mancare și Vinuri
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-red-400 via-red-300 to-red-200 text-transparent bg-clip-text animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                  Povestea Poveștilor
                </span>
              </h1>
            </div>

            {/* Animated Description */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-lg md:text-2xl text-gray-100 leading-relaxed mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                Descoperă 
                <span className="font-semibold text-red-300 mx-1">selecția noastră delicioasă</span> 
                de preparate
              </p>
              
              {/* Features */}
              <div className="flex items-center justify-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <Utensils className="h-5 w-5" />
                  <span className="text-sm font-medium">Preparate Proaspete</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <ChefHat className="h-5 w-5" />
                  <span className="text-sm font-medium">Rețete Tradiționale</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(249, 250, 251)" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Sidebar cu Categorii - Modern */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 md:sticky md:top-24 border-2 border-red-100">
              <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 pb-3 md:pb-4 border-b-2 border-red-100">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-1.5 md:p-2 rounded-lg">
                  <Utensils className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Categorii</h3>
              </div>
              {/* Mobile: 2 columns grid, Desktop: vertical */}
              <div className="grid grid-cols-2 md:flex md:flex-col gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => setSelectedCategoryId(category.id)}
                    className={`md:w-full justify-center md:justify-start text-center md:text-left group relative overflow-hidden transition-all duration-300 text-[11px] md:text-base h-auto py-1 md:h-10 px-1.5 md:px-4 min-h-[32px] md:min-h-0 leading-tight ${
                      selectedCategoryId === category.id
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="relative z-10 font-semibold break-words leading-tight">{category.name}</span>
                    {selectedCategoryId !== category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Conținut Produse - Modern */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8 border-2 border-red-100">
              <div className="mb-4 md:mb-6 pb-4 md:pb-6 border-b-2 border-red-100">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-1.5 md:p-2 rounded-lg">
                    <ChefHat className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-gray-900">{currentCategory?.name}</h2>
                </div>
                {currentCategory?.note && (
                  <p className="text-xs md:text-sm italic text-gray-600 ml-8 md:ml-11 bg-yellow-50 border-l-4 border-yellow-400 p-2 md:p-3 rounded-r-lg">
                    {currentCategory.note}
                  </p>
                )}
              </div>
              
              <div className="space-y-3 md:space-y-6">
                {items.length === 0 ? (
                  <div className="text-center py-12 md:py-16">
                    <div className="bg-red-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="h-8 w-8 md:h-10 md:w-10 text-red-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-base md:text-lg">Nu există produse în această categorie</p>
                    <p className="text-xs md:text-sm text-gray-500 mt-2">Selectează o altă categorie sau revino mai târziu</p>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group border-b-2 border-gray-100 pb-3 md:pb-6 last:border-0 hover:bg-red-50/50 -mx-2 md:-mx-4 px-2 md:px-4 py-2 md:py-4 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start gap-2 md:gap-3">
                        <div className="bg-gradient-to-br from-red-100 to-red-200 p-1.5 md:p-2 rounded-lg mt-0.5 md:mt-1 group-hover:scale-110 transition-transform duration-300">
                          <Utensils className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="mb-1 md:mb-2">
                            <span className="font-bold text-gray-900 text-base md:text-lg group-hover:text-red-600 transition-colors">
                              {item.name}
                            </span>
                            {item.details && (
                              <span className="text-gray-600 ml-1 md:ml-2 text-sm md:text-base">{item.details}</span>
                            )}
                          </div>
                          {item.ingredients && (
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed flex items-start gap-1.5 md:gap-2">
                              <Leaf className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span>{item.ingredients}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Back Button - Modern */}
        <div className="mt-8 md:mt-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group text-sm md:text-base"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform" />
            Înapoi la Pagina Principală
          </Link>
        </div>
      </div>
    </div>
  );
}
