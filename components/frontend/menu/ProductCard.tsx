'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../types/product';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ShoppingCart, Star, Leaf } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { calculateFinalPrice, calculateDiscountPercentage } from '../../../utils/discountCalculator';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // Discount check using new structure
  const hasDiscount = 
    product.discountActive === true && 
    product.discountValue != null && 
    product.discountValue > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(
      {
        productId: product.id,
        quantity: 1,
      },
      product
    );
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="group bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col hover:border-red-300">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-200 flex-shrink-0">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-2 transition-all duration-500"
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span>Fără imagine</span>
            </div>
          )}
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {hasDiscount && (
              <Badge className="bg-red-600 animate-pulse shadow-lg">
                -{Math.round(calculateDiscountPercentage(product.price, {
                  discountType: product.discountType || 'percentage',
                  discountValue: product.discountValue || 0,
                  discountActive: product.discountActive || false
                }))}%
              </Badge>
            )}
            {product.isVegetarian && (
              <Badge className="bg-green-600 hover:scale-110 transition-transform">
                <Leaf size={14} className="mr-1" />
                Veg
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-3">
              <Star size={16} className="fill-yellow-400 text-yellow-400 group-hover:scale-125 transition-transform" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-gray-500">
                ({product.reviewsCount} recenzii)
              </span>
            </div>
          )}

          {/* Price & Add to Cart */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-auto gap-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              {hasDiscount ? (
                <>
                  <span className="text-xl font-bold text-gray-800">
                    {calculateFinalPrice(product.price, {
                      discountType: product.discountType || 'percentage',
                      discountValue: product.discountValue || 0,
                      discountActive: product.discountActive || false
                    }).toFixed(2)} LEI
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.price.toFixed(2)} LEI
                  </span>
                </>
              ) : (
                <span className="text-xl font-bold text-gray-800">
                  {product.price.toFixed(2)} LEI
                </span>
              )}
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-1 transform hover:scale-110 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <ShoppingCart size={16} className="group-hover:animate-bounce" />
              Adaugă
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;