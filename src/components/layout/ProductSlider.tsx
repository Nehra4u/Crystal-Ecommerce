'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface ProductSliderProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

const ProductSlider = ({ products, title = "Featured Crystals", subtitle }: ProductSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4; // Show 4 items at once on desktop
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            disabled={currentIndex === 0}
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 shadow-sm"
            disabled={currentIndex >= maxIndex}
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-600" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
                >
                  <div className="group relative">
                    {/* Product Image */}
                    <div className="relative aspect-square bg-stone-50 rounded-lg overflow-hidden mb-4">
                      <Link href={`/product/${product.id}`}>
                        <div className="w-full h-full bg-gradient-to-br from-stone-50 via-amber-50 to-blue-50 flex items-center justify-center relative">
                          {/* Crystal placeholder */}
                          <div className="w-32 h-32 bg-gradient-to-br from-crystal-300 to-crystal-500 rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                            <span className="text-4xl">💎</span>
                          </div>
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                        </div>
                      </Link>

                      {/* Discount Badge */}
                      {product.discount && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-stone-800 text-white text-xs font-medium px-2 py-1 rounded">
                            -{product.discount}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium text-gray-900 hover:text-gray-700 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                        {product.discount && (
                          <span className="text-sm text-red-600 font-medium">
                            (-{product.discount}%)
                          </span>
                        )}
                      </div>

                      {/* Additional Info */}
                      {product.weight && (
                        <p className="text-sm text-gray-500">
                          {product.weight}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                currentIndex === index 
                  ? 'bg-amber-600' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* View Catalog Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products"
            className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
          >
            VIEW THE ENTIRE CATALOG
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
