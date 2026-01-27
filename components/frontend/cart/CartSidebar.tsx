'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';

export default function CartSidebar() {
  const { cart, removeFromCart, updateCartItem, isCartOpen, closeCart } = useCart();

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartItem({ cartItemId: itemId, quantity });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-red-600" />
            Coșul Tău ({cart.itemsCount})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-600 mb-4">Coșul tău este gol</p>
              <Button onClick={closeCart} asChild>
                <Link href="/comanda-online">Comandă Online</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    {item.product.image || item.product.thumbnail ? (
                      <Image
                        src={item.product.image || item.product.thumbnail}
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="object-cover rounded-md"
                        unoptimized
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-400">
                        Fără imagine
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-semibold text-black text-sm truncate">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex-shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>

                    {item.selectedOptions && item.selectedOptions.length > 0 && (
                      <p className="text-xs text-gray-600 mt-1">
                        {item.selectedOptions.map((opt) => opt.choiceName).join(', ')}
                      </p>
                    )}

                    {/* Discount badge */}
                    {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                      <div className="inline-block bg-red-100 text-red-800 text-xs font-medium px-1.5 py-0.5 rounded mt-1">
                        Reducere {Math.round(((item.product.price - item.price) / item.product.price) * 100)}%
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3 text-gray-600" />
                        </button>
                        <span className="text-sm font-medium text-black min-w-[20px] text-center">
                          {item.quantity > 0 ? item.quantity : ''}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-bold text-red-600 text-sm">
                          {(item.price * item.quantity).toFixed(2)} lei
                        </span>
                        {item.product.discountActive && item.product.discountValue && item.product.discountValue > 0 && (
                          <div className="text-xs text-gray-500 line-through">
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
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-4">
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between font-bold text-lg text-black">
                <span>Total</span>
                <span className="text-red-600">{cart.total.toFixed(2)} lei</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Button 
                className="w-full bg-red-600 hover:bg-red-700 text-white" 
                asChild
                onClick={closeCart}
              >
                <Link href="/checkout">Finalizare Comandă</Link>
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                asChild
                onClick={closeCart}
              >
                <Link href="/cart">Vezi Coșul Complet</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
