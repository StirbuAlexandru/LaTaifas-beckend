import React from 'react';
import { productsData } from '@/data/products/productsData';
import ProductCard from '@/components/frontend/menu/ProductCard';

export default function SaladsCategoryPage() {
  // Filter products by category - for now showing all products
  const categoryProducts = productsData.filter(product => 
    product.category?.slug === 'salads' || product.categoryId === '3'
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Salate</h1>
        <p className="text-gray-600">Salate proaspete și sănătoase</p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
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