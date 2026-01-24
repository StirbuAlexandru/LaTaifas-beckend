'use client'

import React, { useState } from 'react'
import Image from 'next/image'

interface ProductGalleryProps {
  images: string[]
  isInModal?: boolean
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, isInModal = false }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className={`${isInModal ? 'max-w-2xl' : 'w-full'}`}>
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white border-2 border-gray-100 shadow-md hover:shadow-lg transition-all duration-300">
        <Image
          src={images[selectedImage] || images[0]}
          alt="Product image"
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          quality={100}
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-xl bg-white border-2 transition-all duration-300 ${
                selectedImage === index 
                  ? 'border-red-600 shadow-md scale-105' 
                  : 'border-gray-200 hover:border-red-300 hover:shadow-sm'
              }`}
            >
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 200px"
                quality={90}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductGallery