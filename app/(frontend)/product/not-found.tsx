import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">Sorry, the product you're looking for doesn't exist or has been removed.</p>
        <Link href="/products">
          <Button className="bg-gray-400 text-white border-gray-400 hover:bg-red-600 hover:border-red-600">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  );
}