'use client'

import React from 'react';
import { Facebook } from 'lucide-react';
import Link from 'next/link';

const DeliveryPartners = () => {
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-white via-red-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Comandă Ușor și Rapid
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-red-600 to-orange-500 mb-6 rounded-full mx-auto"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Urmărește-ne pe Facebook și comandă prin platformele tale preferate de livrare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Facebook Section */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-red-100 hover:border-red-500 group relative overflow-hidden flex flex-col">
              {/* Red accent corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-bl-full"></div>
              <div className="flex flex-col items-center text-center relative z-10 flex-grow justify-center">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Facebook className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Urmărește-ne pe Facebook</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                  Fii la curent cu toate noutățile, promoțiile și evenimentele speciale de la La Taifas!
                </p>
                <Link 
                  href="https://www.facebook.com/lataifasburdujeni" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                >
                  <Facebook className="h-4 w-4" />
                  Vizitează Pagina
                </Link>
              </div>
            </div>

            {/* Delivery Partners Section */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border-2 border-red-100 hover:border-red-500 relative overflow-hidden flex flex-col">
              {/* Red accent decorations */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-red-500/10 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-tl-full"></div>
              
              <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold mb-3">
                  <span className="bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text">Livrare Rapidă</span>
                </h3>
                <p className="text-gray-600">
                  Partenerii noștri de încredere
                </p>
              </div>

              {/* Delivery Logos */}
              <div className="grid grid-cols-3 gap-6 items-center justify-items-center relative z-10 flex-grow">
                {/* Glovo */}
                <div className="group cursor-pointer transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-yellow-400 rounded-2xl p-6 shadow-md group-hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl font-black text-gray-900">glovo</span>
                  </div>
                </div>

                {/* Bolt Food */}
                <div className="group cursor-pointer transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-green-500 rounded-2xl p-6 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">bolt</span>
                  </div>
                </div>

                {/* Wolt */}
                <div className="group cursor-pointer transform hover:scale-110 transition-transform duration-300">
                  <div className="bg-blue-500 rounded-2xl p-6 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                    <span className="text-2xl font-black text-white">wolt</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center relative z-10">
                <p className="text-sm text-gray-500 leading-relaxed">
                  Alege platforma preferată și savurează preparatele noastre delicioase direct la tine acasă!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryPartners;
