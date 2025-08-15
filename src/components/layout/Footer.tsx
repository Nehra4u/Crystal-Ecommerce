'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-stone-100 grain-overlay">
      <div className="container-luxury">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-stone-300 to-stone-100 rounded-lg flex items-center justify-center shadow-luxury">
                  <span className="text-stone-900 font-bold text-xl">G</span>
                </div>
                <span className="text-2xl font-heading font-semibold">Gaia Crystal</span>
              </div>
              <p className="text-stone-300 leading-relaxed mb-6">
                Překládáme spirituální historii krystalů do moderního 
                a lifestylového pojetí. Každý kámen má svůj příběh.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-stone-700 transition-colors">
                  <span className="text-lg">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-stone-700 transition-colors">
                  <span className="text-lg">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-stone-700 transition-colors">
                  <span className="text-lg">🐦</span>
                </a>
              </div>
            </div>

            {/* Product Categories */}
            <div>
              <h3 className="text-lg font-heading font-semibold mb-6">Produkty</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/category/raw-crystals" className="text-stone-300 hover:text-white transition-colors">
                    Drahé kameny
                  </Link>
                </li>
                <li>
                  <Link href="/category/polished-stones" className="text-stone-300 hover:text-white transition-colors">
                    Kameny podle názvu
                  </Link>
                </li>
                <li>
                  <Link href="/category/jewelry" className="text-stone-300 hover:text-white transition-colors">
                    Šperky z kamenů
                  </Link>
                </li>
                <li>
                  <Link href="/category/home-decor" className="text-stone-300 hover:text-white transition-colors">
                    Novinky
                  </Link>
                </li>
                <li>
                  <Link href="/category/outlet" className="text-stone-300 hover:text-white transition-colors">
                    Outlet minerálů
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h3 className="text-lg font-heading font-semibold mb-6">Zákaznický servis</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/contact" className="text-stone-300 hover:text-white transition-colors">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-stone-300 hover:text-white transition-colors">
                    Doprava a platba
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-stone-300 hover:text-white transition-colors">
                    Reklamace a vrácení
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-stone-300 hover:text-white transition-colors">
                    Obchodní podmínky
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-stone-300 hover:text-white transition-colors">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-heading font-semibold mb-6">VIP krystal klub</h3>
              <p className="text-stone-300 mb-4 leading-relaxed">
                Přihlaš se a získej přístup ke všem novinkám a slevám.
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Váš e-mail"
                  className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
                />
                <button className="w-full bg-gradient-to-r from-stone-100 to-stone-200 text-stone-900 font-medium py-3 rounded-lg hover:from-stone-200 hover:to-stone-300 transition-all duration-300">
                  Odebírat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-stone-400 text-sm">
              © 2024 Gaia Crystal s.r.o. Všechna práva vyhrazena.
            </div>
            <div className="flex items-center space-x-6 text-sm text-stone-400">
              <span>Vytvořil Shoptet</span>
              <div className="flex items-center space-x-2">
                <span>Ceny v:</span>
                <span className="text-white font-medium">CZK</span>
                <span>|</span>
                <span>EUR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;