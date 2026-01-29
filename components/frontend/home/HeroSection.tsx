'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, UtensilsCrossed, Wine } from 'lucide-react';
import Image from 'next/image';

const HeroSection = () => {
  const [imgSrc, setImgSrc] = useState('/images/local.jpg');
  const [hasError, setHasError] = useState(false);

  return (
    <section className="relative text-white min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imgSrc}
          alt="Delicious food"
          fill
          className="object-cover scale-110 transition-transform duration-1000"
          priority
          sizes="100vw"
          onError={() => {
            if (!hasError) {
              setImgSrc('https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop');
              setHasError(true);
            }
          }}
        />
        {/* Gradient Overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40"></div>
      </div>

      {/* Decorative Elements - Hidden from initial view */}
      <div className="absolute top-96 right-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10rem] left-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 py-2 md:py-3 relative z-10">
        <div className="max-w-4xl">
          {/* Animated Badge */}
          <div className="mb-4 md:mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-white/20 shadow-2xl mb-4">
              <div className="relative">
                <UtensilsCrossed className="h-8 w-8 md:h-10 md:w-10 animate-pulse" />
                <div className="absolute -inset-1 bg-red-500/30 rounded-full blur-md animate-pulse"></div>
              </div>
              <span className="text-xs md:text-sm font-semibold tracking-widest uppercase text-red-200">Restaurant & Terasă</span>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 leading-relaxed flex flex-col items-center md:items-start gap-2">
              <span className="inline-block animate-slideInLeft ml-6 md:ml-14" style={{ animationDelay: '0.4s' }}>
                    Mancare și Vinuri
              </span>
              <span className="inline-block bg-gradient-to-r from-red-400 via-red-300 to-red-200 text-transparent bg-clip-text animate-slideInRight ml-16 md:ml-24" style={{ animationDelay: '0.6s' }}>
                "de Poveste"
              </span>
              <span className="inline-block animate-slideInLeft text-center md:text-left" style={{ animationDelay: '0.7s' }}>
                ... Acasă, lângă voi...
              </span>
            </h1>
          </div>

          {/* Description */}
          <div className="animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
            <p className="text-base md:text-xl mb-6 text-gray-100 leading-relaxed max-w-3xl" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Burdujeniul merită un loc al lui. Un loc la răscruce de drumuri, unde sensul de mers este peste tot și aiurea, unde, dacă ai poftă poți să te pui la 
              <span className="font-semibold text-red-300 mx-1">taifas</span> 
              chiar și cu sfinții...
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                asChild 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group px-6 py-4 text-base"
              >
                <Link href="/comanda-online?category=REDUCERI">
                  <Sparkles className="h-4 w-4" />
                  Reduceri
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                className="gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 hover:bg-white hover:text-red-600 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-6 py-4 text-base"
              >
                <a href="#events">
                  Rezervări
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider - Enhanced */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;