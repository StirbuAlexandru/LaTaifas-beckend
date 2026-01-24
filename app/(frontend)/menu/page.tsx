'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';
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
      <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
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
                  Meniul
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-yellow-200 via-yellow-100 to-white text-transparent bg-clip-text animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                  Restaurantului
                </span>
              </h1>
            </div>

            {/* Animated Description */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-lg md:text-2xl text-gray-100 leading-relaxed mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                Descoperă 
                <span className="font-semibold text-yellow-200 mx-1">selecția noastră delicioasă</span> 
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
      <div className="container mx-auto px-4 py-12">
        
        <div className="flex flex-col md:flex-row gap-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {/* Sidebar cu Categorii - Modern & Mobile Optimized */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 sticky top-20 md:top-24 border-2 border-red-100 z-30">
              <div className="hidden md:flex items-center gap-3 mb-6 pb-4 border-b-2 border-red-100">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Categorii</h3>
              </div>
              
              {/* Desktop: Vertical list | Mobile: Horizontal scroll */}
              <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 gap-2 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategoryId(category.id);
                      // On mobile, scroll to top of products when category changes
                      if (window.innerWidth < 768) {
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }
                    }}
                    className={`flex-shrink-0 md:w-full justify-start text-left group relative overflow-hidden transition-all duration-300 px-4 md:px-6 py-2 md:py-3 h-auto ${
                      selectedCategoryId === category.id
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 border-2 border-gray-100 md:border-gray-200 hover:border-red-600 hover:text-red-600 hover:scale-105 shadow-sm'
                    }`}
                  >
                    <span className="relative z-10 font-bold md:font-semibold whitespace-nowrap text-sm md:text-base">{category.name}</span>
                    {selectedCategoryId !== category.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Conținut Produse - Modern & Mobile Optimized */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-red-100">
              <div className="mb-6 pb-6 border-b-2 border-red-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
                    <ChefHat className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{currentCategory?.name}</h2>
                </div>
                {currentCategory?.note && (
                  <p className="text-sm italic text-gray-600 ml-0 md:ml-11 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg mt-3 md:mt-0">
                    {currentCategory.note}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 md:gap-6">
                {items.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Utensils className="h-10 w-10 text-red-600" />
                    </div>
                    <p className="text-gray-600 font-medium text-lg">Nu există produse în această categorie</p>
                    <p className="text-sm text-gray-500 mt-2">Selectează o altă categorie sau revino mai târziu</p>
                  </div>
                ) : (
                  items.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="group border-b-2 border-gray-50 md:border-gray-100 pb-4 md:pb-6 last:border-0 hover:bg-red-50/50 -mx-2 md:-mx-4 px-2 md:px-4 py-3 md:py-4 rounded-lg transition-all duration-300"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-gradient-to-br from-red-100 to-red-200 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Utensils className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                            <span className="font-bold text-gray-900 text-base md:text-lg group-hover:text-red-600 transition-colors">
                              {item.name}
                            </span>
                            {item.details && (
                              <span className="text-red-600 md:text-gray-600 font-bold md:font-normal text-sm md:text-base md:ml-2">{item.details}</span>
                            )}
                          </div>
                          {item.ingredients && (
                            <p className="text-xs md:text-sm text-gray-500 leading-relaxed flex items-start gap-1.5 md:gap-2 mt-1">
                              <Leaf className="h-3.5 w-3.5 md:h-4 md:w-4 text-green-600 mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-3 md:line-clamp-none italic md:not-italic">{item.ingredients}</span>
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
        <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <Link 
            href="/" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Înapoi la Pagina Principală
          </Link>
        </div>
      </div>
    </div>
  );
}
