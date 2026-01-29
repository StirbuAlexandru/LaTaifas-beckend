'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { cart, openCart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleMenuToggle = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300); // Match animation duration
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur-md" style={{ backgroundColor: 'rgba(232, 234, 234, 0.95)', borderColor: '#bf3d3d', boxShadow: '0 4px 16px rgba(191, 61, 61, 0.25)' }}>
        <div className="container mx-auto px-4 relative">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-900 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 z-50 rounded-xl"
              onClick={handleMenuToggle}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>

            {/* Center Logo - Fixed position on red line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 translate-y-1/2 z-[60]">
              {/* Visual logo - non-clickable */}
              <div 
                className="inline-block"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(191, 61, 61, 0.4))' }}
              >
                <img 
                  src="/images/logo.png" 
                  alt="Restaurant Logo" 
                  className="h-96 w-96 md:h-80 md:w-80 object-contain pointer-events-none"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/comanda-online"
                prefetch={true}
                className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
              >
                Comandă Online
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/menu"
                prefetch={true}
                className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
              >
                Meniu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link
                href="/vinuri"
                prefetch={true}
                className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
              >
                Vinuri
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>

            {/* Right Navigation and Cart */}
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  prefetch={true}
                  className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
                >
                  Acasă
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/about"
                  prefetch={true}
                  className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
                >
                  Despre noi
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-sm font-semibold text-gray-900 transition-all duration-300 hover:text-red-600 hover:scale-110 hover:-translate-y-1 relative group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-orange-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>

              {/* Shopping Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-900 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-xl"
                onClick={openCart}
              >
                <ShoppingCart size={20} className="hover:animate-wiggle" />
                {cart.itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-heartbeat shadow-lg">
                    {cart.itemsCount}
                  </span>
                )}
              </Button>
            </div>

            {/* Mobile Cart Icon */}
            <div className="md:hidden flex items-center z-50">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-900 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 transform hover:scale-110 rounded-xl"
                onClick={openCart}
              >
                <ShoppingCart size={20} />
                {cart.itemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-600 to-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-heartbeat shadow-lg">
                    {cart.itemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {(isMenuOpen || isClosing) && (
        <div 
          className={`md:hidden fixed left-0 right-0 z-30 border-b-2 backdrop-blur-md transition-all duration-300 ${
            isClosing ? 'animate-slideUp' : 'animate-slideDown'
          }`}
          style={{ 
            backgroundColor: 'rgba(232, 234, 234, 0.98)', 
            borderColor: '#bf3d3d', 
            boxShadow: '0 4px 16px rgba(191, 61, 61, 0.25)', 
            top: '64px'
          }}
        >
          {/* Spacer for logo */}
          <div className="h-8"></div>
          
          {/* Menu items */}
          <div className="flex flex-col gap-1 py-3 px-4">
            <Link
              href="/"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Acasă
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Despre noi
            </Link>
            <Link
              href="/menu"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Meniu
            </Link>
            <Link
              href="/vinuri"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Vinuri
            </Link>
            <Link
              href="/comanda-online"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Comandă Online
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold py-2 px-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-600 hover:translate-x-2 hover:shadow-md border-2 border-transparent hover:border-red-200"
              onClick={handleMenuToggle}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;