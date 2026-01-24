import React from 'react';
import Link from 'next/link';
import { Pizza, Sandwich, Coffee, IceCream, Salad, ChefHat } from 'lucide-react';

const CategoryGrid = () => {
  const categories = [
    { name: 'Pizza', icon: Pizza, slug: 'pizza', color: 'bg-red-100 text-red-600' },
    { name: 'Burgers', icon: Sandwich, slug: 'burgers', color: 'bg-orange-100 text-orange-600' },
    { name: 'Băuturi', icon: Coffee, slug: 'beverages', color: 'bg-blue-100 text-blue-600' },
    { name: 'Deserturi', icon: IceCream, slug: 'desserts', color: 'bg-pink-100 text-pink-600' },
    { name: 'Salate', icon: Salad, slug: 'salads', color: 'bg-green-100 text-green-600' },
    { name: 'Special', icon: ChefHat, slug: 'special', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Răsfoiește după Categorie</h2>
          <p className="text-black">Și dacă vo fi și foame ... n-o să rabdați: pizza, paste, meniuri, burgeri, gustari, platouri, gratare , deserturi și alte minunății la care nici nu vă așteptați . </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.slug}
                href={`/menu/${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="font-semibold text-black">{category.name}</h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;