'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../ui/button';
import { TrendingUp, Clock, Star, ArrowRight, Award } from 'lucide-react';

const PopularItems = () => {
  const stats = [
    { icon: TrendingUp, value: '5000+', label: 'Clienți Mulțumiți' },
    { icon: Clock, value: '15-20', label: 'Timp de Preparare' },
    { icon: Star, value: '100%', label: 'Ingrediente Proaspete' },
  ];

  const images = [
    { src: '/images/mancare.jpg', alt: 'Mancare' },
    { src: '/images/bruschete.jpg', alt: 'Bruschete' },
    { src: '/images/desert.jpg', alt: 'Desert' },
    { src: '/images/micdejun.jpg', alt: 'Mic Dejun' },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="animate-fadeInUp">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 rounded-full border-2 border-red-100 mb-4 md:mb-6">
              <Award className="h-4 w-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Despre Noi</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-gray-900 leading-tight">
              De ce să alegi <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">La Taifas</span>?
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mb-4 md:mb-6 rounded-full"></div>
            
            <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-10 leading-relaxed">
              Născut din visul frumos al unui prieten vechi de al vostru, Cramele Bucium, La Taifas vă așteaptă într-o locație nouă și atrăgătoare, unde puteți degusta vinuri și băuturi românești de calitate, beri și sucuri tradiționale, chiar și cafele prăjite așezat românește, toate de poveste.
            </p>
            
            {/* Stats Grid - Modern Design */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-10">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg mb-2 md:mb-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-red-200">
                      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-2 md:p-3 inline-flex mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <div className="font-bold text-xl md:text-2xl bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">{stat.value}</div>
                    </div>
                    <div className="text-gray-600 text-xs md:text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            
            {/* CTA Button */}
            <Button asChild size="lg" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-6 md:px-8 py-5 md:py-6 text-base md:text-lg rounded-xl group w-full sm:w-auto">
              <Link href="/menu" className="inline-flex items-center justify-center gap-3">
                Explorează Meniul
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
          
          {/* Right Images Grid - Modern Masonry */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            {images.map((image, index) => (
              <div key={index} className={index % 2 === 1 ? 'mt-4 md:mt-8' : ''}>
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl group transition-all duration-500 hover:scale-105 cursor-pointer shadow-lg hover:shadow-2xl" style={{
                  border: '2px solid #fee2e2',
                  transition: 'all 0.5s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(191, 61, 61, 0.4)';
                  e.currentTarget.style.borderColor = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '#fee2e2';
                }}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="rounded-xl md:rounded-2xl w-full h-40 md:h-56 object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl md:rounded-2xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularItems;