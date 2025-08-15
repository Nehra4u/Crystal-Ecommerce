'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon, ChevronUpIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import ProductSlider from '@/components/layout/ProductSlider';

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [addGiftBag, setAddGiftBag] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    transport: false,
    returns: false
  });

  // Find the product by ID
  const product = products.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <Link href="/" className="text-amber-600 hover:text-amber-700">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, selectedQuantity);
    // Show success message or redirect
    alert(`Added ${selectedQuantity} ${product.name} to cart!`);
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const suggestedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gradient-to-br from-stone-50 via-amber-50 to-blue-50 rounded-lg overflow-hidden relative">
              {/* Discount Badge */}
              {product.discount && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-600 text-white text-sm font-medium px-3 py-1 rounded">
                    -{product.discount}%
                  </span>
                </div>
              )}
              
              {/* Main Product Image */}
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="w-64 h-64 bg-gradient-to-br from-crystal-300 to-crystal-500 rounded-xl shadow-2xl flex items-center justify-center">
                  <span className="text-8xl">💎</span>
                </div>
                
                {/* Brazil Flag - for Brazil origin products */}
                {product.origin?.toLowerCase().includes('brazil') && (
                  <div className="absolute bottom-4 right-4">
                    <div className="w-12 h-8 bg-green-500 rounded flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-yellow-400 to-blue-500"></div>
                      <span className="relative text-xs font-bold text-white">BR</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name.toUpperCase()}
              </h1>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.discount && (
                      <span className="text-lg text-gray-500 line-through">
                        {formatPrice(product.originalPrice || 0)}
                      </span>
                    )}
                  </div>
                  {product.discount && (
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Code: {product.id}</p>
                </div>
              </div>
            </div>

            {/* Availability and Delivery */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-900">In stock</span>
                </div>
              </div>
              <div className="text-center">
                <Link href="#" className="text-sm text-gray-600 hover:text-gray-900 underline">
                  Delivery options
                </Link>
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Delivery around 19.8.2025
                </span>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-amber-200 hover:bg-amber-300 text-gray-900 font-medium py-4 px-6 rounded-lg transition-colors duration-200"
              >
                ADD TO CART
              </button>

              {/* Gift Options */}
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={addGiftBag}
                    onChange={(e) => setAddGiftBag(e.target.checked)}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">🎁</span>
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        I also want a Larimarita gift bag for 59 CZK
                      </span>
                    </div>
                  </div>
                </label>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-xl">📇</span>
                  <span className="text-sm text-gray-700">
                    Free card with the properties of this material
                  </span>
                </div>

                <div className="flex items-center space-x-3 p-3 border rounded-lg">
                  <span className="text-xl">🎁</span>
                  <span className="text-sm text-gray-700">
                    Gift with every order
                  </span>
                </div>
              </div>
            </div>

            {/* Collapsible Sections */}
            <div className="space-y-2">
              {/* Transport Section */}
              <div className="border rounded-lg">
                <button
                  onClick={() => toggleSection('transport')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">TRANSPORT</span>
                  {expandedSections.transport ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSections.transport && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-600">
                      <p><strong>Standard Shipping:</strong> 5-7 business days - Free over $100</p>
                      <p><strong>Express Shipping:</strong> 2-3 business days - $15</p>
                      <p><strong>International:</strong> 10-14 business days - $25</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Return Section */}
              <div className="border rounded-lg">
                <button
                  onClick={() => toggleSection('returns')}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">RETURN</span>
                  {expandedSections.returns ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {expandedSections.returns && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="space-y-3 text-sm text-gray-600">
                      <p><strong>Return Policy:</strong> 30-day return guarantee</p>
                      <p><strong>Condition:</strong> Items must be in original condition</p>
                      <p><strong>Process:</strong> Contact our support team to initiate return</p>
                      <p><strong>Refund:</strong> Full refund within 5-7 business days</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Crystal Properties */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <p className="text-sm text-amber-800 font-medium mb-2">
                strength • protection • meditation • harmony • healing
              </p>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed">
              Angels are our divine helpers from the spiritual world who help us on our journey through life. 
              Their job is to support us, protect us, help and accompany us in every area of our lives, regardless 
              of how we behave. They are a powerful symbol of a protector, guardian and enlightenment that 
              has protection from everything bad in life. Although we cannot see them as a whole being, they 
              at least show themselves to us in various forms. In the form of light, color, feeling, symbol, object 
              or some human form. Their wings are made of rays of light.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              We can divide them into three basic groups: guardian angels, angelic helpers and archangels. In 
              each of these groups there are countless angels and each of them has its own place and role. 
              Those angels who are closest to us are our guardian angels. Each of us has at least one guardian 
              angel who stands by us in good and bad times and loves us unconditionally. He constantly helps
            </p>
          </div>
        </div>

        {/* Suggested Products */}
        {suggestedProducts.length > 0 && (
          <div className="mt-16">
            <ProductSlider 
              products={suggestedProducts}
              title="You might also like"
              subtitle="Discover more crystals from our collection"
            />
          </div>
        )}
      </div>
    </div>
  );
}
