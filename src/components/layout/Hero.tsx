'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-stone-50 via-stone-100/50 to-primary-50 overflow-hidden grain-overlay">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-stone-200/30 to-primary-200/30 rounded-full blur-3xl opacity-70 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-primary-200/30 to-stone-200/30 rounded-full blur-3xl opacity-60 animate-float" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative container-luxury section-spacing">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-stone-900 leading-tight pb-3">
                Kouzlo 
                <span className="block text-gradient bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 bg-clip-text text-transparent">
                  krystalů
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-stone-600 max-w-2xl leading-relaxed">
                Přehlédněte náš jedinečný výběr prémiových krystalů, minerálů a léčivých kamenů 
                z celého světa. Každý kamen je pečlivě vybírán pro svou kvalitu a energii.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link href="/category/raw-crystals">
                <button className="button-luxury text-lg px-10 py-4 w-full sm:w-auto">
                  Prohlédnout krystaly
                </button>
              </Link>
              <Link href="/category/jewelry">
                <button className="bg-transparent border-2 border-stone-800 text-stone-800 font-medium px-10 py-4 rounded-lg hover:bg-stone-800 hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 text-lg w-full sm:w-auto">
                  Šperky z kamenů
                </button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-stone-200/50">
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-heading font-bold text-stone-900">500+</div>
                <div className="text-sm text-stone-600 mt-2 font-medium">Unikátních kamenů</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-heading font-bold text-stone-900">15+</div>
                <div className="text-sm text-stone-600 mt-2 font-medium">Let zkušeností</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl lg:text-4xl font-heading font-bold text-stone-900">10k+</div>
                <div className="text-sm text-stone-600 mt-2 font-medium">Spokojených zákazníků</div>
              </div>
            </div>
          </div>
          
          {/* Visual - High-quality Crystal Display */}
          <div className="relative animate-fade-in" style={{animationDelay: '0.3s'}}>
            {/* Main Display */}
            <div className="relative z-10 max-w-lg mx-auto">
              {/* Featured Crystal Card */}
              <div className="card-luxury p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-72 h-72 mx-auto bg-gradient-to-br from-stone-100 to-stone-200 rounded-xl flex items-center justify-center shadow-luxury overflow-hidden">
                    {/* Placeholder for crystal image */}
                    <div className="w-40 h-40 bg-gradient-to-br from-crystal-300 to-crystal-500 rounded-lg flex items-center justify-center shadow-xl transform rotate-12 hover:rotate-0 transition-transform duration-700">
                      <span className="text-6xl">💎</span>
                    </div>
                  </div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-crystal-400/20 to-stone-400/20 rounded-xl blur-xl -z-10"></div>
                </div>
                
                <h3 className="text-2xl font-heading font-semibold text-stone-900 mb-2">
                  Prémiové ametysty
                </h3>
                <p className="text-stone-600 mb-4">
                  Brazilské ametysty nejvyšší kvality
                </p>
                <div className="flex items-center justify-center space-x-2 text-stone-800">
                  <span className="text-sm font-medium">od</span>
                  <span className="text-xl font-heading font-bold">890 Kč</span>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-20 h-20 glass-effect rounded-full flex items-center justify-center shadow-soft animate-float">
              <span className="text-2xl">✨</span>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-16 h-16 glass-effect rounded-full flex items-center justify-center shadow-soft animate-float" style={{animationDelay: '1.5s'}}>
              <span className="text-xl">🔮</span>
            </div>
            
            <div className="absolute top-1/3 -right-12 w-12 h-12 glass-effect rounded-full flex items-center justify-center shadow-soft animate-float" style={{animationDelay: '3s'}}>
              <span className="text-lg">💫</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;