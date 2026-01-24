import React from 'react';
import Header from '@/components/frontend/layout/Header';
import Footer from '@/components/frontend/layout/Footer';
import CartSidebar from '@/components/frontend/cart/CartSidebar';
import ScrollToTop from '@/components/shared/ScrollToTop';
import StructuredData from '@/components/frontend/seo/StructuredData';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <StructuredData />
        <div className="flex min-h-screen flex-col bg-gray-50">
          <Header />
          <main className="flex-1 bg-gray-50">{children}</main>
          <Footer />
          <CartSidebar />
          <ScrollToTop />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}