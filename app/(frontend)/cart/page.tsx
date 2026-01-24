'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartItem } = useCart();

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItem({ cartItemId: itemId, quantity });
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Coșul tău este gol</h2>
        <p className="text-gray-600 mb-8">Se pare că nu ai adăugat nimic în coșul tău încă</p>
        <Button asChild>
          <Link href="/menu">Răsfoiește Meniul</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Coșul Tău</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {cart.items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                  <img 
                    src={item.product.thumbnail} 
                    alt={item.product.name} 
                    className="w-24 h-24 object-cover rounded-md"
                  />
                </div>
                
                <div className="flex-grow">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                    {item.selectedOptions?.map((option) => option.choiceName).join(', ')}
                  </p>
                  
                  {/* Discount badge */}
                  {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                    <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded mt-2">
                      Reducere {Math.round(((item.product.price - item.price) / item.product.price) * 100)}%
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-3">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-semibold">
                        {(item.price * item.quantity).toFixed(2)} lei
                      </div>
                      {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                        <div className="text-sm text-gray-500 line-through">
                          {(
                            (item.product.price) * 
                            item.quantity
                          ).toFixed(2)} lei
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Rezumat Comandă</h2>
          
          <div className="space-y-2 mb-6">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{cart.total.toFixed(2)} lei</span>
            </div>
          </div>
          
          <Button className="w-full mb-4" asChild>
            <Link href="/checkout">Mergi la Finalizare Comandă</Link>
          </Button>
          
          <Button variant="outline" className="w-full hover:bg-red-600 hover:text-white hover:border-red-600" asChild>
            <Link href="/menu" className="flex items-center justify-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continuă Cumpărăturile
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
