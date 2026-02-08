import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { SiTiktok } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="text-gray-700 border-t-2 backdrop-blur-sm" style={{ backgroundColor: 'rgba(232, 234, 234, 0.95)', borderTopColor: '#bf3d3d', boxShadow: '0 -4px 16px rgba(191, 61, 61, 0.25)' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Despre */}
          <div className="text-center">
            <h3 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-500 text-transparent bg-clip-text mb-4">La Taifas</h3>
            <p className="text-sm mb-4 text-gray-600 leading-relaxed">
              Mâncare delicioasă livrată la ușa ta. <br />
              Ingrediente proaspete, arome autentice și servicii excepționale.
            </p>
            <div className="flex gap-3 justify-center">
              <a href="https://www.facebook.com/lataifasburdujeni" target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-xl border-2 border-gray-200 hover:border-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/lataifas_burdujeni/" target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-gradient-to-r hover:from-orange-500 hover:to-red-600 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.tiktok.com/@lataifas.burdujeni" target="_blank" rel="noopener noreferrer" className="bg-white p-2.5 rounded-xl border-2 border-gray-200 hover:border-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-sm hover:shadow-md" aria-label="TikTok">
                <SiTiktok size={20} />
              </a>
            </div>
          </div>

          {/* Linkuri + Politici */}
          <div className="grid grid-cols-2 gap-4">
            {/* Linkuri Rapide */}
            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Linkuri Rapide</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/menu" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Meniul Nostru
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Despre Noi
                  </Link>
                </li>
                <li>
                  <Link href="/comanda-online" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Comandă Online
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Politici și Informații Legale */}
            <div>
              <h4 className="text-lg font-bold text-red-600 mb-4">Politici și Informații</h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Politica de Confidențialitate
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Termeni și Condiții
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Politica Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/reclamatii" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:translate-x-2 inline-flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                    Formula de Reclamații
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Informații Contact */}
          <div>
            <h4 className="text-lg font-bold text-red-600 mb-4">Contactează-ne</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-600 hover:text-red-600 transition-colors duration-300 group">
                <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={16} className="text-white" />
                </div>
                <span className="flex-1">Calea Unirii, Burdujeni, nr 80, Suceava, Romania</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors duration-300 group">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Phone size={16} className="text-white" />
                </div>
                <span>0753 077 063</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 hover:text-red-600 transition-colors duration-300 group">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                  <Mail size={16} className="text-white" />
                </div>
                <span>lataifas23@gmail.com</span>
              </li>
              <li className="mt-4 pt-4 border-t-2 border-red-200">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border-2 border-red-100">
                  <p className="font-bold text-red-600 mb-1">VINUM NOBILIS SRL</p>
                  <p className="text-gray-600 text-xs">CUI: RO45346331</p>
                  <p className="text-gray-600 text-xs">J33/2276/13.12.2021</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ANPC și SOL Logos */}
        <div className="mt-6 pt-4 border-t-2" style={{ borderTopColor: '#bf3d3d' }}>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <a href="https://anpc.ro/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-all duration-300 transform hover:scale-110">
              <Image 
                src="/images/anpc.png" 
                alt="ANPC" 
                width={150} 
                height={75}
                className="h-20 w-40 md:h-24 md:w-48 object-contain"
              />
            </a>
            <a href="https://consumer-redress.ec.europa.eu/site-relocation_en" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-all duration-300 transform hover:scale-110">
              <Image 
                src="/images/sol.png" 
                alt="SOL" 
                width={150} 
                height={75}
                className="h-20 w-40 md:h-24 md:w-48 object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;