'use client'

import React, { useEffect, useState } from 'react';
import ProductCard from '../menu/ProductCard';
import { Product } from '../../../types/product';
import { Button } from '../../ui/button';
import { ChevronDown, ChevronUp, Sparkles, TrendingUp } from 'lucide-react';

const FeaturedProducts = () => {
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const displayCount = 4;

  useEffect(() => {
    const fetchProductsFromMultipleCategories = async () => {
      try {
        setLoading(true);
        
        // First, fetch all categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        
        if (!categoriesData.success || !categoriesData.data) {
          setLoading(false);
          return;
        }
        
        const categories = categoriesData.data;
        const productsToDisplay: Product[] = [];
        
        // Fetch products from categories with price > 35 lei and image - in parallel
        const productPromises = categories.slice(0, 10).map((category: any) => 
          fetch(`/api/products?categoryId=${category.id}&limit=4&minPrice=35`).then(res => res.json())
        );
        
        const allProductsData = await Promise.all(productPromises);
        
        for (const data of allProductsData) {
          
          if (data.success && data.data.products && data.data.products.length > 0) {
            for (const product of data.data.products) {
              // Only add if product has an image
              if (product.image && product.image.trim() !== '') {
                const transformedProduct = {
                  ...product,
                  originalPrice: product.original_price,
                  categoryId: product.category_id,
                  inStock: product.in_stock,
                  createdAt: new Date(product.created_at),
                  updatedAt: new Date(product.updated_at),
                  discountType: product.discount_type || undefined,
                  discountValue: product.discount_value || undefined,
                  discountActive: product.discount_active || false,
                  original_price: undefined,
                  category_id: undefined,
                  in_stock: undefined,
                  created_at: undefined,
                  updated_at: undefined,
                };
                productsToDisplay.push(transformedProduct);
                
                // Stop when we have 8 products
                if (productsToDisplay.length >= 8) {
                  break;
                }
              }
            }
            
            if (productsToDisplay.length >= 8) {
              break;
            }
          }
        }
        
        setNewestProducts(productsToDisplay.slice(0, 8));
        console.log('Loaded products count:', productsToDisplay.length);
      } catch (error) {
        console.error('Error fetching products from categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromMultipleCategories();
  }, []);



  return (
    <section id="products" className="py-20 bg-white" style={{ scrollMarginTop: '200px' }}>
      <div className="container mx-auto px-4">
        {/* Modern Header */}
        <div className="mb-16 animate-fadeInUp" id="cele-mai-noi-preparate">
          {/* Badge - Left Aligned */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-full border-2 border-red-100 mb-4">
            <Sparkles className="h-4 w-4 text-red-600 animate-pulse" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Preparate Noi</span>
          </div>
          
          {/* Title, Line, Description - Centered */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Cele mai noi <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">preparate</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Descoperă cele mai recente adăugări la meniul nostru - preparate proaspete și delicioase</p>
          </div>
        </div>
        
        {loading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mb-4"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <p className="text-gray-600 font-medium">Se încarcă preparatele...</p>
          </div>
        ) : newestProducts.length > 0 ? (
          <>
            <div className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${showAll ? 'animate-slideDown' : ''}`} style={{ animationDelay: '0.2s' }}>
              {newestProducts.slice(0, showAll ? 8 : 4).map((product, index) => (
                <div 
                  key={product.id}
                  className="flex flex-col h-full animate-fade-in"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animationDuration: '0.4s',
                  }}
                >
                  <div className="h-full flex flex-col">
                    <ProductCard product={product} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Show More/Less Button */}
            {newestProducts.length > 4 && (
              <div className="flex justify-center mt-12 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <Button
                  onClick={() => {
                    if (showAll) {
                      // Scroll to title when closing
                      const element = document.getElementById('cele-mai-noi-preparate');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }
                    setShowAll(!showAll);
                  }}
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-semibold rounded-xl"
                >
                  {showAll ? (
                    <>
                      <ChevronUp className="h-5 w-5" />
                      Mai Puține Preparate
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-5 w-5" />
                      Mai Multe Preparate
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-50 rounded-2xl p-12 max-w-md mx-auto">
              <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-red-600" />
              </div>
              <p className="text-gray-600 text-lg">Nu există produse disponibile momentan.</p>
              <p className="text-gray-500 text-sm mt-2">Revino curând pentru preparate noi!</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;