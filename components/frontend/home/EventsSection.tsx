'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { Phone, ChevronDown, ChevronUp, Users, Calendar } from 'lucide-react';
import { Button } from '../../ui/button';

const EventsSection = () => {
  const [showMoreImages, setShowMoreImages] = useState(false);
  
  const eventImages = [
    { src: '/images/evenimente1.jpg', alt: 'Eveniment 1' },
    { src: '/images/evenimente2.jpg', alt: 'Eveniment 2' },
    { src: '/images/evenimente3.jpg', alt: 'Eveniment 3' },
    { src: '/images/evenimente4.jpg', alt: 'Eveniment 4' },
  ];

  const moreEventImages = [
    { src: '/images/5.jpg', alt: 'Eveniment 5' },
    { src: '/images/6.jpg', alt: 'Eveniment 6' },
    { src: '/images/7.jpg', alt: 'Eveniment 7' },
    { src: '/images/8.jpg', alt: 'Eveniment 8' },
  ];

  const contactNumber = '+40 753 077 063';

  return (
    <section id="events" className="py-20 bg-gradient-to-b from-white to-gray-50" style={{ scrollMarginTop: '200px' }}>
      <div className="container mx-auto px-4">
        {/* Modern Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border-2 border-red-100 mb-4">
            <Calendar className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Evenimente Speciale</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Rezervări <span className="bg-gradient-to-r from-red-600 to-red-500 text-transparent bg-clip-text">Evenimente</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-red-500 mx-auto mb-6 rounded-full"></div>
          
          {/* Info Bar - Glassmorphism cu reflexii roșii */}
          <div className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-2xl mb-8 border-2 border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
              {/* Capacitate */}
              <div className="relative bg-gradient-to-br from-red-50 to-orange-50 backdrop-blur-xl rounded-xl p-4 md:p-5 border-2 border-red-200/50 hover:border-red-400 hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 overflow-hidden group">
                {/* Reflexie sticlă */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 p-2.5 md:p-3 rounded-lg shadow-lg shadow-red-500/30">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <p className="text-red-700 text-xs md:text-sm font-bold uppercase tracking-wide">Capacitate</p>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-transparent bg-clip-text mb-1">40 locuri</p>
                  <p className="text-red-600/70 text-xs md:text-sm font-medium">Aranjament flexibil</p>
                </div>
              </div>
              
              {/* Program */}
              <div className="relative bg-gradient-to-br from-orange-50 to-red-50 backdrop-blur-xl rounded-xl p-4 md:p-5 border-2 border-orange-200/50 hover:border-orange-400 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300 overflow-hidden group">
                {/* Reflexie sticlă */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 md:p-3 rounded-lg shadow-lg shadow-orange-500/30">
                      <Calendar className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <p className="text-orange-700 text-xs md:text-sm font-bold uppercase tracking-wide">Program</p>
                  </div>
                  <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text mb-1">9:00 - 22:00</p>
                  <p className="text-orange-600/70 text-xs md:text-sm font-medium">Luni - Duminică</p>
                </div>
              </div>
              
              {/* Rezervări */}
              <div className="relative bg-gradient-to-br from-red-50 to-pink-50 backdrop-blur-xl rounded-xl p-4 md:p-5 border-2 border-red-200/50 hover:border-red-400 hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300 overflow-hidden group">
                {/* Reflexie sticlă */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2.5 md:p-3 rounded-lg shadow-lg shadow-red-500/30">
                      <Phone className="h-5 w-5 md:h-6 md:w-6 text-white" />
                    </div>
                    <p className="text-red-700 text-xs md:text-sm font-bold uppercase tracking-wide">Rezervări</p>
                  </div>
                  <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 text-transparent bg-clip-text mb-1">0753 077 063</p>
                  <p className="text-red-600/70 text-xs md:text-sm font-medium">Apel sau WhatsApp</p>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            Echipa noastră de profesioniști vă stă la dispoziție cu servicii impecabile, meniuri personalizate și un cadru elegant pentru a transforma visul dumneavoastră în realitate!
          </p>
          
          {/* CTA Button */}
          <a href="tel:+40753077063">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-6 rounded-xl font-semibold inline-flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg">
              <Phone className="w-5 h-5 animate-pulse" />
              Sună pentru Rezervare
            </Button>
          </a>
        </div>
        {/* Image Grid - Modern Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          {eventImages.map((image, index) => (
            <div 
              key={index} 
              className="relative h-[200px] md:h-[250px] rounded-2xl overflow-hidden transition-all duration-500 bg-white shadow-lg cursor-pointer group hover:shadow-2xl hover:-translate-y-2"
              style={{ 
                border: '2px solid #fee2e2',
                transition: 'all 0.5s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(191, 61, 61, 0.3)';
                e.currentTarget.style.borderColor = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.borderColor = '#fee2e2';
              }}
            >
              <Image 
                src={image.src} 
                alt={image.alt} 
                fill 
                className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105" 
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* More images - collapsible with smooth animation */}
        <div className={`overflow-hidden transition-all duration-700 ease-in-out ${
          showMoreImages ? 'max-h-[800px] opacity-100 mt-6' : 'max-h-0 opacity-0'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {moreEventImages.map((image, index) => (
              <div 
                key={index} 
                className="relative h-[200px] md:h-[250px] rounded-2xl overflow-hidden transition-all duration-500 bg-white shadow-lg cursor-pointer group hover:shadow-2xl hover:-translate-y-2"
                style={{ 
                  border: '2px solid #fee2e2',
                  transition: 'all 0.5s ease-in-out',
                  transitionDelay: showMoreImages ? `${index * 0.1}s` : '0s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(191, 61, 61, 0.3)';
                  e.currentTarget.style.borderColor = '#ef4444';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                  e.currentTarget.style.borderColor = '#fee2e2';
                }}
              >
                <Image 
                  src={image.src} 
                  alt={image.alt} 
                  fill 
                  className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Button to show more images - Modern */}
        <div className="mt-10 text-center">
          <Button 
            onClick={() => setShowMoreImages(!showMoreImages)}
            className="bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 hover:border-red-700 px-8 py-4 rounded-xl font-semibold inline-flex items-center gap-3 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {showMoreImages ? (
              <>
                Mai puține imagini <ChevronUp className="w-5 h-5" />
              </>
            ) : (
              <>
                Mai multe imagini <ChevronDown className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
