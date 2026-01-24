'use client';

import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="group bg-white rounded-lg overflow-hidden animate-pulse" style={{ boxShadow: '0 4px 6px -1px rgba(191, 61, 61, 0.2), 0 2px 4px -2px rgba(191, 61, 61, 0.2)' }}>
      {/* Image skeleton */}
      <div className="relative h-48 bg-gray-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 bg-white">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
        
        {/* Description */}
        <div className="space-y-2 mb-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        {/* Price and button */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded w-20"></div>
          <div className="h-9 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
