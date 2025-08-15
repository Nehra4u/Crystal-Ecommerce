'use client';

import Link from 'next/link';
import { categories } from '@/data/products';

const CategorySection = () => {
  return (
    <section className="section-spacing bg-white grain-overlay">
      <div className="container-luxury">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-stone-900 mb-6">
            Prozkoumejte naši kolekci
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Objevte různorodý výběr krystalů, kamenů a duchovních doplňků 
            uspořádaných podle kategorií pro snadnou orientaci.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group card-luxury p-8 text-center animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-stone-800 to-stone-600 rounded-xl flex items-center justify-center mx-auto shadow-luxury group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                  <span className="text-3xl text-white">
                    {category.id === 'raw-crystals' && '💎'}
                    {category.id === 'polished-stones' && '🔮'}
                    {category.id === 'jewelry' && '💍'}
                    {category.id === 'home-decor' && '🏠'}
                  </span>
                </div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-stone-400/20 to-stone-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
              
              <h3 className="text-xl font-heading font-semibold text-stone-900 mb-3 group-hover:text-stone-700 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-stone-600 text-sm mb-4 font-medium">
                {category.subcategories?.length} podkategorií
              </p>
              
              <div className="flex flex-wrap gap-1.5 justify-center">
                {category.subcategories?.slice(0, 3).map((sub) => (
                  <span
                    key={sub.id}
                    className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded-full font-medium"
                  >
                    {sub.name}
                  </span>
                ))}
              </div>

              {/* Hover indicator */}
              <div className="mt-6 text-stone-500 group-hover:text-stone-700 transition-colors">
                <span className="text-sm font-medium">Zobrazit vše →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 animate-fade-in">
          <Link 
            href="/category/raw-crystals"
            className="button-luxury text-lg px-10 py-4"
          >
            Prohlédnout všechny kategorie
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;