import React from 'react';
import { Metadata } from 'next';
import HeroSection from '@/components/frontend/home/HeroSection';
import EventsSection from '@/components/frontend/home/EventsSection';
import FeaturedProducts from '@/components/frontend/home/FeaturedProducts';
import PopularItems from '@/components/frontend/home/PopularItems';

export const metadata: Metadata = {
  title: 'Acasă',
  description: 'La Taifas - Restaurantul tău preferat în Suceava. Descoperă mâncăruri tradiționale românești, pizza autentică, paste proaspete și vinuri selectate. Rezervă o masă sau comandă online cu livrare rapidă la domiciliu.',
  openGraph: {
    title: 'La Taifas - Restaurant și Terasă în Suceava',
    description: 'Restaurantul tău preferat în Suceava. Mâncăruri tradiționale, pizza, paste și vinuri selectate.',
    images: ['/images/C8.jpg'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <EventsSection />
      <FeaturedProducts />
      <PopularItems />
    </div>
  );
}
