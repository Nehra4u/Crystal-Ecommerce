'use client';

import Link from 'next/link';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

export default function OrderConfirmationPage() {
  const orderNumber = 'LM-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  
  return (
    <div className="min-h-screen bg-stone-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-6" />
          
          <h1 className="text-3xl font-serif text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Order Details
            </h2>
            <p className="text-gray-600">
              <strong>Order Number:</strong> {orderNumber}
            </p>
            <p className="text-gray-600">
              <strong>Order Date:</strong> {new Date().toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <strong>Estimated Delivery:</strong> 5-7 business days
            </p>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              We've sent a confirmation email with your order details and tracking information.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </Link>
              <Link
                href="/"
                className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Back to Home
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What's Next?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-medium text-gray-900">Confirmation Email</h4>
                <p>Check your inbox for order details</p>
              </div>
              <div>
                <div className="text-2xl mb-2">📦</div>
                <h4 className="font-medium text-gray-900">Processing</h4>
                <p>We'll prepare your crystals with care</p>
              </div>
              <div>
                <div className="text-2xl mb-2">🚚</div>
                <h4 className="font-medium text-gray-900">Shipping</h4>
                <p>Track your package en route to you</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
