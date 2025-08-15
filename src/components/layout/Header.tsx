'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCartIcon, MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { getTotalItems } = useCart();
  const { getTotalItems: getWishlistTotal } = useWishlist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navigation = [
    { name: 'PRODUCTS', href: '/products' },
    { name: 'ABOUT US', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
    { name: 'BLOG', href: '/blog' },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-gray-600 text-sm font-medium tracking-wide transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Center Brand Name */}
          <div className="flex-1 flex justify-center lg:flex-initial">
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-serif italic text-gray-800 tracking-wide">
                Larimarita • Milena Oda
              </span>
            </Link>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* User Account */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

                    {/* Wishlist */}
                    <Link 
                      href="/wishlist" 
                      className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {isMounted && getWishlistTotal() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {getWishlistTotal()}
                        </span>
                      )}
                    </Link>

            {/* Search Icon */}
            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
              <MagnifyingGlassIcon className="h-5 w-5 stroke-1.5" />
            </button>

                                {/* Cart */}
                    <Link href="/cart" className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
                      <ShoppingCartIcon className="h-5 w-5 stroke-1.5" />
                      {isMounted && getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100">
            <div className="px-6 pt-4 pb-6 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
