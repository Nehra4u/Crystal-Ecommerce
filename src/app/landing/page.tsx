'use client';

import Link from 'next/link';
import { ShoppingBagIcon, CogIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-stone-100 to-amber-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6">
            LARIMARITA • MILENA ODA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Premium Crystals & Jewelry - Choose your access level
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Client Access */}
          <Link href="/home">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingBagIcon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Store</h2>
                <p className="text-gray-600 mb-6">
                  Browse our premium collection of crystals, minerals, and jewelry. Shop with confidence.
                </p>
                <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-lg font-medium">
                  Shop Now →
                </div>
              </div>
            </div>
          </Link>

          {/* Admin Access */}
          <Link href="/admin">
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 cursor-pointer transform hover:-translate-y-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <CogIcon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Panel</h2>
                <p className="text-gray-600 mb-6">
                  Manage orders, products, payments, and analytics. Full administrative control.
                </p>
                <div className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium">
                  Admin Dashboard →
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500">
            Need help? Contact support at admin@larimarita.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
