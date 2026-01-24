'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { ShoppingCart, Search, Filter, X, Star, Clock, MapPin, ChevronDown, Leaf, Plus, Minus } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { calculateFinalPrice, calculateDiscountPercentage } from '../../../utils/discountCalculator';
import { Product } from '../../../types/product';
import { ProductGridSkeleton } from '../../../components/frontend/skeleton/ProductSkeleton';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface DeliveryZone {
  id: string;
  zone_name: string;
  min_order_value: number;
}

// API Response type from Supabase
interface ProductApiResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  category_id: string | null;
  in_stock: boolean;
  created_at: string;
  average_rating?: number;
  review_count?: number;
  featured?: boolean; // Adăugăm câmpul featured
}

const ComandaOnlinePage = () => {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Will be set to first category
  const DISCOUNTS_CATEGORY_ID = 'REDUCERI'; // Special virtual category for discounted products
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 20;
  const [isDeliveryInfoOpen, setIsDeliveryInfoOpen] = useState(false);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);

  // Handle adding to cart with quantity
  const handleAddToCartWithQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) return;
    
    addToCart({
      productId: product.id,
      quantity: quantity,
      selectedOptions: [],
      specialInstructions: ''
    }, product);
  };

  // Categoriile care trebuie ascunse
  const hiddenCategories = [
    'CAFEA',
    'BAUTURI SPIRTOASE',
    'DIVERSE',
    'COCKTAILURI',
    'LIMONADE SI FRESH-URI'
  ];

  useEffect(() => {
    fetchCategories();
    fetchDeliveryZones();
    
    // Check URL for category parameter
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    if (categoryParam === 'REDUCERI') {
      // Set REDUCERI category immediately
      setSelectedCategory(DISCOUNTS_CATEGORY_ID);
      // Clear any saved category to ensure REDUCERI is selected
      localStorage.removeItem('selectedCategory');
      // Fetch products for REDUCERI
      fetchProducts(DISCOUNTS_CATEGORY_ID, 1);
      // Scroll to products after a short delay
      setTimeout(() => {
        const productsSection = document.getElementById('products-section');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
    }
  }, []);

  // Auto-select first category when categories are loaded
  useEffect(() => {
    // Check URL for category parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    
    // If REDUCERI is in URL, don't auto-select from localStorage or first category
    if (categoryParam === 'REDUCERI') {
      return;
    }
    
    // Check if there's a saved category in localStorage
    const savedCategory = localStorage.getItem('selectedCategory');
    
    if (savedCategory) {
      // If there's a saved category, use it
      setSelectedCategory(savedCategory);
      fetchProducts(savedCategory, 1);
    } else if (categories.length > 0 && selectedCategory === null) {
      // Filter categories here to avoid dependency issues
      const filtered = categories.filter(category => 
        !hiddenCategories.includes(category.name.toUpperCase())
      );
      const firstCategoryId = filtered.length > 0 ? filtered[0].id : null;
      if (firstCategoryId) {
        setSelectedCategory(firstCategoryId);
        fetchProducts(firstCategoryId, 1);
      }
    }
  }, [categories, selectedCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      if (data.success) {
        setCategories(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchDeliveryZones = async () => {
    try {
      const response = await fetch('/api/delivery-zones');
      const data = await response.json();
      if (data.success) {
        setDeliveryZones(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching delivery zones:', error);
    }
  };

  const fetchProducts = async (categoryId?: string, page: number = 1) => {
    try {
      setLoading(true);
      
      // Only fetch products if a category is selected
      if (!categoryId) {
        setProducts([]);
        setTotalPages(1);
        return;
      }
      
      // Build URL - special handling for REDUCERI category
      let url;
      if (categoryId === DISCOUNTS_CATEGORY_ID) {
        // Fetch ALL products without limit for REDUCERI to ensure we catch all discounted items
        url = `/api/products?page=1&limit=1000`;
      } else {
        // Build URL with category filter
        url = `/api/products?categoryId=${categoryId}&page=${page}&limit=${productsPerPage}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        // Transform API response to match Product interface
        let productsToTransform = data.data.products || [];
        
        // Filter for REDUCERI category - products with any discount value > 0
        if (categoryId === DISCOUNTS_CATEGORY_ID) {
          // Filter products with valid discounts
          productsToTransform = productsToTransform.filter((p: any) => {
            const hasDiscountValue = p.discount_value && Number(p.discount_value) > 0;
            const hasDiscountType = p.discount_type === 'percentage' || p.discount_type === 'fixed';
            return hasDiscountValue && hasDiscountType;
          });
        }
        
        const transformedProducts: Product[] = productsToTransform.map((p: any) => ({
          id: p.id,
          name: p.name,
          slug: p.name.toLowerCase().replace(/\s+/g, '-'),
          description: p.description,
          price: p.price,
          // Add discount fields mapping
          discountType: p.discount_type || undefined,
          discountValue: p.discount_value || undefined,
          discountActive: p.discount_active || false,
          // Keep existing fields for backward compatibility
          originalPrice: p.original_price,
          discount: p.discount,
          image: p.image || undefined,
          images: p.image ? [p.image] : [],
          thumbnail: p.image || '/images/placeholder.jpg',
          categoryId: p.category_id || '',
          stock: p.in_stock ? 100 : 0,
          inStock: p.in_stock,
          featured: p.featured || false,
          average_rating: p.average_rating,
          review_count: p.review_count,
          createdAt: new Date(p.created_at),
          updatedAt: new Date(p.created_at),
        }));
        setProducts(transformedProducts);
        setTotalPages(data.data.totalPages || 1);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    
    // Save the selected category to localStorage
    if (categoryId) {
      localStorage.setItem('selectedCategory', categoryId);
    } else {
      localStorage.removeItem('selectedCategory');
    }
    
    fetchProducts(categoryId || undefined, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(selectedCategory || undefined, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      quantity: 1,
    }, product);
  };

  // Define custom category order
  const categoryOrder = [
    'APERITIVE',
    'CIORBE SI SUPE',
    'PLATOURI',
    'PLATOURI EVENIMENTE',
    'MIC DEJUN',
    'PIZZA',
    'BURGERI',
    'PASTE',
    'SALATE DE INSOTIRE',
    'UNA',
    'ALTA',
    'GARNITURI',
    'GRILL',
    'SOSURI',
    'PAINE',
    'DESSERT',
    'BAUTURI'
  ];

  // Sort categories according to custom order
  const sortedFilteredCategories = categories
    .filter(category => !hiddenCategories.includes(category.name.toUpperCase()))
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.name.toUpperCase());
      const indexB = categoryOrder.indexOf(b.name.toUpperCase());
      
      // If both categories are in our order list, sort by their position
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      
      // If only A is in our order list, it comes first
      if (indexA !== -1) return -1;
      
      // If only B is in our order list, it comes first
      if (indexB !== -1) return 1;
      
      // If neither is in our order list, sort alphabetically
      return a.name.localeCompare(b.name);
    });

  // Funcție pentru generarea paginării cu numere limitate
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="hover:bg-red-600 hover:text-white hover:border-red-600"
        >
          Anterior
        </Button>
        
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              onClick={() => handlePageChange(1)}
              className="hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}
        
        {pages.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? "bg-red-600 text-white" : "hover:bg-red-600 hover:text-white hover:border-red-600"}
          >
            {page}
          </Button>
        ))}
        
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant="outline"
              onClick={() => handlePageChange(totalPages)}
              className="hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              {totalPages}
            </Button>
          </>
        )}
        
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="hover:bg-red-600 hover:text-white hover:border-red-600"
        >
          Următor
        </Button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Ultra Modern Hero Section */}
      <section className="relative py-24 md:py-32 text-white overflow-hidden">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/comanda online.jpg"
            alt="Background"
            fill
            className="object-cover scale-105 transition-transform duration-1000"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Animated Badge */}
            <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-white/20 shadow-2xl mb-6">
                <div className="relative">
                  <ShoppingCart className="h-10 w-10 md:h-12 md:w-12 animate-pulse" />
                  <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md animate-pulse"></div>
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-red-200">Comandă Online</span>
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 leading-tight">
                <span className="inline-block animate-slideInLeft" style={{ animationDelay: '0.4s' }}>
                  Comandă
                </span>
                <br />
                <span className="inline-block bg-gradient-to-r from-red-400 via-red-300 to-red-200 text-transparent bg-clip-text animate-slideInRight" style={{ animationDelay: '0.6s' }}>
                  Online
                </span>
              </h1>
            </div>

            {/* Animated Description */}
            <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <p className="text-lg md:text-2xl text-gray-200 leading-relaxed max-w-3xl mb-8" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                Alege și vei fi 
                <span className="font-semibold text-red-300 mx-1">mulțumit</span>!
              </p>
              
              {/* Decorative Features */}
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Livrare Rapidă</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <span className="text-sm font-medium">Produse Proaspete</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <span className="text-sm font-medium">Prețuri Accesibile</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Delivery Info Section - Modern Card */}
        <div className="mb-12 animate-fadeInUp">
          <Card className="border-0 bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-500" style={{ border: '2px solid #bf3d3d' }}>
            <CardContent className="p-0">
              {/* Header - Always Visible */}
              <button
                onClick={() => setIsDeliveryInfoOpen(!isDeliveryInfoOpen)}
                className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-red-50 to-white hover:from-red-100 hover:to-red-50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-gray-900">Informații Livrare</h3>
                    <p className="text-sm text-gray-600">Program și zone de livrare</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden md:block text-sm text-red-600 font-medium">
                    {isDeliveryInfoOpen ? 'Ascunde' : 'Vezi detalii'}
                  </span>
                  <ChevronDown 
                    className={`h-6 w-6 text-red-600 transition-transform duration-300 ${
                      isDeliveryInfoOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Expandable Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  isDeliveryInfoOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-white to-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Program Livrări */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <Clock className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Program Livrări</h4>
                      </div>
                      <div className="bg-white p-6 rounded-xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-baseline justify-between mb-3">
                          <p className="text-gray-700 font-semibold">Luni - Duminică</p>
                          <p className="text-2xl font-bold text-red-600">9:30 - 21:30</p>
                        </div>
                        <p className="text-sm text-gray-600 mt-3">Suntem la un click distanță de tine. comanda acum!</p>
                        <div className="mt-4 flex items-center gap-2 bg-red-50 p-3 rounded-lg">
                          <span className="text-sm font-semibold text-gray-700">Contact:</span>
                          <a href="tel:0753077063" className="text-sm font-bold text-red-600 hover:text-red-700">0753 077 063</a>
                        </div>
                      </div>
                      
                      {/* Pizza Image */}
                      <div className="mt-4 relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg group">
                        <Image
                          src="/images/pizza2.jpg"
                          alt="Pizza"
                          fill
                          className="object-cover object-[center_50%] group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    {/* Zone de Livrare */}
                    <div className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-red-100 p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-red-600" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">Zone de Livrare</h4>
                      </div>
                      <div className="bg-white p-6 rounded-xl border-2 border-red-100 shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-sm font-semibold text-gray-700 mb-4">Valori minime de comandă:</p>
                        <div className="space-y-2 text-sm text-gray-700">
                          {deliveryZones.length > 0 ? (
                            deliveryZones.map((zone, index) => (
                              <div 
                                key={zone.id}
                                className={`flex justify-between items-center py-3 px-4 rounded-lg hover:bg-red-50 transition-colors ${
                                  index < deliveryZones.length - 1 ? 'border-b border-gray-200' : ''
                                }`}
                              >
                                <span className="font-medium">{zone.zone_name}</span>
                                <span className="font-bold text-red-600 text-base">{zone.min_order_value} lei</span>
                              </div>
                            ))
                          ) : (
                            <p className="text-gray-500 text-center py-4">Se încarcă zonele de livrare...</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section - Modern Design */}
        <div className="mb-12 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Categorii</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-red-600 mx-auto rounded-full"></div>
          </div>
          {sortedFilteredCategories.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-3">
              {/* Special REDUCERI Category */}
              <Button
                onClick={() => handleCategoryClick(DISCOUNTS_CATEGORY_ID)}
                className={`group relative overflow-hidden transition-all duration-300 ${
                  selectedCategory === DISCOUNTS_CATEGORY_ID 
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-600 shadow-lg scale-105" 
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:scale-105 shadow-md"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2 font-semibold">
                  🔥 REDUCERI
                </span>
                {selectedCategory !== DISCOUNTS_CATEGORY_ID && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                )}
              </Button>
              
              {sortedFilteredCategories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`group relative overflow-hidden transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-2 border-red-600 shadow-lg scale-105" 
                      : "bg-white text-gray-700 border-2 border-gray-200 hover:border-red-600 hover:text-red-600 hover:scale-105 shadow-md"
                  }`}
                >
                  <span className="relative z-10 font-semibold">{category.name}</span>
                  {selectedCategory !== category.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  )}
                </Button>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-gray-600 font-medium">Nu sunt categorii disponibile momentan.</p>
              <p className="text-sm text-gray-500 mt-2">
                Adaugă categorii din dashboard pentru a le vedea aici.
              </p>
            </div>
          )}
        </div>

        {/* Products Section */}
        <div id="products-section" style={{ scrollMarginTop: '200px' }}>
          <h2 className="text-2xl font-bold mb-6 text-black">
            {selectedCategory === DISCOUNTS_CATEGORY_ID
              ? '🔥 REDUCERI'
              : selectedCategory 
              ? categories.find(c => c.id === selectedCategory)?.name || 'Produse'
              : 'Selectează o categorie'}
          </h2>

          {loading ? (
            <ProductGridSkeleton count={productsPerPage} />
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Nu sunt produse disponibile momentan.</p>
              <p className="text-sm text-gray-500 mt-2">
                Adaugă produse din dashboard pentru a le vedea aici.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 flex flex-col border-2 border-gray-100 hover:border-red-300" style={{ boxShadow: '0 2px 8px -1px rgba(191, 61, 61, 0.1)' }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 24px -4px rgba(191, 61, 61, 0.25)'; e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = '#f87171'; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 8px -1px rgba(191, 61, 61, 0.1)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = '#f3f4f6'; }}>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="eager"
                          priority
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={90}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-gray-400 font-medium">Fără imagine</span>
                        </div>
                      )}
                      
                      {/* Discount Badge */}
                      {(() => {
                        // Only show discount badge if product has an active discount with a positive value
                        if (!product.discountActive || !product.discountValue || product.discountValue <= 0) {
                          return null;
                        }
                        
                        const discountAmount = product.price - calculateFinalPrice(product.price, {
                          discountType: product.discountType || 'percentage',
                          discountValue: product.discountValue || 0,
                          discountActive: product.discountActive || false
                        });
                        // Prevent division by zero
                        const discountPercentage = product.price > 0 ? Math.round((discountAmount / product.price) * 100) : 0;
                        
                        // Ensure we don't display 0% discounts - only show if there's actual savings
                        if (discountAmount <= 0 || discountPercentage <= 0) {
                          return null;
                        }
                        
                        // Only show discount badge if percentage is greater than 0
                        return discountPercentage > 0 ? (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <span className="text-lg">🔥</span>
                            <span>-{discountPercentage}%</span>
                          </div>
                        ) : null;
                      })()}
                      
                      {/* Featured Badge */}
                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <span>⭐</span>
                          <span>Recomandat</span>
                        </div>
                      )}
                      
                      {/* Vegetarian Badge */}
                      {product.isVegetarian && (
                        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          <span>Veg</span>
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Stoc epuizat</span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-50/50">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-base mb-3 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug min-h-[3rem] flex items-center">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Price and Add Button - Pushed to bottom */}
                    <div className="border-t-2 border-gray-200 pt-4 mt-auto bg-white rounded-lg -mx-2 px-2 -mb-2 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        {/* Product Price */}
                        <div className="flex-shrink-0">
                          {product.discountActive && product.discountValue && product.discountValue > 0 && calculateFinalPrice(product.price, {
                            discountType: product.discountType || 'percentage',
                            discountValue: product.discountValue || 0,
                            discountActive: product.discountActive || false
                          }) < product.price ? (
                            <div className="flex flex-col">
                              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">
                                {calculateFinalPrice(product.price, {
                                  discountType: product.discountType || 'percentage',
                                  discountValue: product.discountValue || 0,
                                  discountActive: product.discountActive || false
                                }).toFixed(2)} lei
                              </span>
                              <span className="text-sm text-gray-400 line-through">
                                {product.price.toFixed(2)} lei
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-gray-900">
                              {product.price.toFixed(2)} lei
                            </span>
                          )}
                        </div>
                        
                        {/* Add to Cart Button */}
                        <Button
                          size="sm"
                          onClick={() => handleAddToCartWithQuantity(product, 1)}
                          disabled={!product.inStock}
                          className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl px-4 py-2.5 shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 hover:scale-105 w-full sm:w-auto"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span className="text-xs">Adaugă</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default ComandaOnlinePage;