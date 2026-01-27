'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChefHat, Award, Users, Heart, Truck, Calendar, Briefcase, Wine, Gift, Sparkles, Building2, ChevronDown, ChevronUp } from 'lucide-react';
import { getApiUrl } from '@/lib/api';

export default function AboutPage() {
  const [locationImages, setLocationImages] = useState<any[]>([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch location gallery images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/location-gallery');
        const data = await response.json();
        setLocationImages(data);
      } catch (error) {
        console.error('Error fetching location images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const services = [
    {
      icon: Truck,
      title: 'Livrare la domiciliu/sediu',
      description: 'Orice produs din meniu (www.lataifas-suceava.ro)',
    },
    {
      icon: Calendar,
      title: 'Evenimente particulare',
      description: 'Petreceri, aniversari (și un spațiu de joacă rezervat copiilor)',
    },
    {
      icon: Briefcase,
      title: 'Prânz la birou',
      description: 'Comandă și ora livrări prestabilite',
    },
    {
      icon: ChefHat,
      title: 'Prânz de afaceri',
      description: 'La restaurantul La Taifas',
    },
    {
      icon: Users,
      title: 'Platouri finger food',
      description: 'Special pentru ședințe din timpul zilei și evenimente',
    },
    {
      icon: Award,
      title: 'Comenzi speciale',
      description: 'La cererea clientului pe bază de precomandă',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Clean & Elegant with Subtle Background */}
      <section className="relative py-20 md:py-24 pt-28 md:pt-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/20"></div>
        
        {/* Decorative subtle elements */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-red-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-orange-100/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-red-200 shadow-sm mb-6 animate-fadeInUp">
            <Building2 className="h-4 w-4 text-red-600" />
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wide">Povestea Noastră</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            Despre <span className="text-red-600">La Taifas</span>
          </h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-8 rounded-full"></div>
          
          <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Locația noastră de suflet, creată cu gândul de a fi oferită celor care tânjeau în zona Burdujeniului după un loc în care să-i spună <span className="font-bold text-red-600">ACASĂ</span>.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-0 md:py-4">
        {/* Despre Firmă Section - Modern */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-0 animate-fadeInUp">
          <div className="bg-white p-4 rounded-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border-2 border-red-100 mb-2">
              <Heart className="h-4 w-4 text-red-600" />
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Despre Firmă</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-1 text-gray-900 text-center">
              Povestea <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">Noastră</span>
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-red-600 to-orange-500 mb-3 rounded-full mx-auto"></div>
            
            <div className="space-y-2 text-gray-700 leading-relaxed text-base">
              <p>
                <span className="font-bold text-red-600">La Taifas</span>, a fost locația noastră de suflet, creată cu gândul de a fi oferită celor care tânjeau în zona Burdujeniului după un loc în care să-i spună <span className="font-semibold text-red-600">ACASĂ</span>. Ulterior și la gândul bun al celor ce l-au privit cu drag, a luat acel ceva al locului și a căpătat caracteristici de restaurant fast-food cu terasă permanentă.
              </p>
              <p>
                Loc de relaxare cu mâncare, degustări de vinuri și bere - loco și delivery, magazin de vinuri vrac și en-détail. Și pentru a se bucura toată lumea în momente deosebite oferim și spațiu pentru evenimente mici și de familie.
              </p>
              <p>
                Noi vrem să-i mulțumim pe cei care vor să ne spună ACASĂ. Și ceva, numai al nostru, aici și în jur pe aiurea, un magazin modest de vinuri pentru clienții zonei. Și, buni și pricepuți amfitrioni, ghizi ai locației noastre, personal atent e gajul calității noastre.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group" style={{
            border: '3px solid #fee2e2',
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
              src="/images/desprenoi1.jpg"
              alt="Restaurant La Taifas"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Despre Restaurant Section - Modern */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20 md:mb-24 mt-16 md:mt-20 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          <div className="order-2 lg:order-1 relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group" style={{
            border: '3px solid #fee2e2',
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
              src="/images/desprenoi5.jpg"
              alt="Preparate La Taifas"
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border-2 border-orange-100 mb-4">
              <ChefHat className="h-4 w-4 text-orange-600" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Despre Restaurant</span>
            </div>
            
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Bucătăria <span className="bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">Noastră</span>
              </h2>
              <div className="w-32 h-2 bg-gradient-to-r from-orange-600 to-red-600 mb-6 rounded-full mx-auto"></div>
            </div>
            
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                La restaurantul fast food din răscruce Burdujeniului preparate de bază sunt: <span className="font-semibold text-red-600">ciorbe, salate aperitive, preparate tradiționale, deserturi inspirate, paste și pizza</span>, ceva mai bune decât în orașele italiene, platouri de moment dar și pentru evenimente, grătare românești și produse de post.
              </p>
              <p>
                Și cum, bucătarul e sufletul unui loc în care se oferă mâncare, ne mândrim, fără modestie, cu bucătarii noștri.
              </p>
            </div>
            
            {/* Stats Cards - Modern */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl text-center border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-3 inline-flex mb-3">
                  <ChefHat className="h-8 w-8 text-white" />
                </div>
                <p className="font-bold text-gray-900">Bucătari Profesioniști</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl text-center border-2 border-orange-100 hover:border-orange-300 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-3 inline-flex mb-3">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <p className="font-bold text-gray-900">Ingrediente Proaspete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Locația Noastră Section - Modern */}
        <div className="mb-20 md:mb-24 animate-fadeInUp" style={{ animationDelay: '0.3s' }} id="universul-la-taifas">
          {/* Badge - Left Aligned */}
          <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border-2 border-red-100 mb-4">
            <Sparkles className="h-4 w-4 text-red-600" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Locația Noastră</span>
          </div>
          
          {/* Title - Centered */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Universul <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">La Taifas</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full mb-12"></div>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-gray-600">Se încarcă imaginile...</div>
            </div>
          ) : (
            <>
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${showAllImages ? 'animate-slideDown' : ''}`}>
                {locationImages.slice(0, showAllImages ? locationImages.length : 4).map((image, index) => (
                  <div key={image.id} className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500" style={{
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
                  }}>
                    <Image 
                      src={image.image_url} 
                      alt={image.alt_text || `Locație ${image.id}`} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority={index === 0}
                      loading={index === 0 ? undefined : 'lazy'}
                    />
                  </div>
                ))}
              </div>
              
              {locationImages.length > 4 && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={() => {
                      if (showAllImages) {
                        const element = document.getElementById('universul-la-taifas');
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }
                      setShowAllImages(!showAllImages);
                    }}
                    size="lg"
                    className="gap-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base font-semibold rounded-xl"
                  >
                    {showAllImages ? (
                      <>
                        <ChevronUp className="h-5 w-5" />
                        Mai Puține Imagini
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-5 w-5" />
                        Mai Multe Imagini
                      </>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Alte Servicii Section - Modern */}
        <div className="mb-20 md:mb-24 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          {/* Badge - Left Aligned */}
          <div className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1.5 rounded-full border-2 border-orange-100 mb-4">
            <Gift className="h-4 w-4 text-orange-600" />
            <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide">Alte Servicii</span>
          </div>
          
          {/* Title and Description - Centered */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Serviciile <span className="bg-gradient-to-r from-orange-600 to-red-600 text-transparent bg-clip-text">oferite de noi</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-orange-600 to-red-600 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Oferim o gamă largă de servicii pentru a satisface toate nevoile tale culinare
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="border-2 border-red-100 hover:border-red-300 bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl overflow-hidden group">
                  <CardContent className="p-5 md:p-6 text-center">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base md:text-lg">{service.title}</h3>
                    <p className="text-gray-600 text-sm md:text-base">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Gallery Section - Modern */}
        <div className="mb-16 md:mb-20 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          {/* Badge - Left Aligned */}
          <div className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 rounded-full border-2 border-red-100 mb-4">
            <Wine className="h-4 w-4 text-red-600" />
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wide">Galeria Noastră</span>
          </div>
          
          {/* Title - Centered */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Galerie <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">LaTaifas</span>
            </h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['galerie1', 'galerie2', 'galerie3', 'galerie4', 'galerie5', 'galerie6', 'galerie7', 'galerie8', 'desprenoi2', 'desprenoi3', 'desprenoi4', 'desprenoi6'].map((img, index) => (
              <div key={index} className="relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500" style={{
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
              }}>
                <Image 
                  src={`/images/${img}.jpg`} 
                  alt={`Galerie ${index + 1}`} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}