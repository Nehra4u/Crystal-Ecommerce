'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { state, removeItem, updateQuantity, updateOptions, getTotalPrice, setStep } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Czech Republic'
  });

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-stone-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-gray-900 mb-8">
              Your Shopping Cart
            </h1>
            <p className="text-gray-600 mb-8">Your cart is currently empty.</p>
            <Link 
              href="/"
              className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const renderCartStep = () => (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-8 mb-12">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            1
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Shopping cart</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="ml-2 text-sm text-gray-500">Shipping & payment</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="ml-2 text-sm text-gray-500">Information about you</span>
        </div>
      </div>

      {/* Cart Items Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-700">
            <div className="col-span-1"></div>
            <div className="col-span-5">Product</div>
            <div className="col-span-2 text-center">Availability</div>
            <div className="col-span-1 text-center">Number</div>
            <div className="col-span-2 text-center">Price per unit</div>
            <div className="col-span-1 text-center">Total</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {state.items.map((item) => (
            <div key={item.id} className="px-6 py-6">
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Product Image */}
                <div className="col-span-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-stone-50 via-amber-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">💎</span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="col-span-5">
                  <h3 className="font-medium text-gray-900 mb-1">{item.product.name}</h3>
                  <p className="text-sm text-gray-500">{item.product.weight}</p>
                </div>

                {/* Availability */}
                <div className="col-span-2 text-center">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded">
                    In stock
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="col-span-1">
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <MinusIcon className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Price per unit */}
                <div className="col-span-2 text-center">
                  <span className="font-medium">{formatPrice(item.product.price)} / pcs</span>
                </div>

                {/* Total */}
                <div className="col-span-1 text-center">
                  <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gift Options */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">For your energy, mind or personal space</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="giftBag"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              onChange={(e) => {
                // Update all items with gift bag option
                state.items.forEach(item => {
                  updateOptions(item.id, { ...item.selectedOptions, giftBag: e.target.checked });
                });
              }}
            />
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-200 rounded flex items-center justify-center">
                <span className="text-xl">🎁</span>
              </div>
              <div>
                <label htmlFor="giftBag" className="text-sm font-medium text-gray-900">
                  LARIMARITA GIFT BAG
                </label>
                <p className="text-sm text-green-600 font-medium">59 CZK</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="giftBox"
              className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
              onChange={(e) => {
                // Update all items with gift box option
                state.items.forEach(item => {
                  updateOptions(item.id, { ...item.selectedOptions, giftBox: e.target.checked });
                });
              }}
            />
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-stone-200 rounded flex items-center justify-center">
                <span className="text-xl">📦</span>
              </div>
              <div>
                <label htmlFor="giftBox" className="text-sm font-medium text-gray-900">
                  COURAGE GIFT BOX
                </label>
                <p className="text-sm text-green-600 font-medium">990 CZK</p>
                <p className="text-xs text-gray-500">
                  You can find gift contents by adding it to the cart
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center text-amber-600 hover:text-amber-700">
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
        <button
          onClick={() => setStep('shipping')}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
        >
          Continue to Shipping
        </button>
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-8 mb-12">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Shopping cart</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            2
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Shipping & payment</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="ml-2 text-sm text-gray-500">Information about you</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Shipping & Payment Method</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Shipping Method</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="shipping" defaultChecked className="text-amber-600" />
                <div>
                  <div className="font-medium">Standard Shipping</div>
                  <div className="text-sm text-gray-500">5-7 business days - Free over $100</div>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="shipping" className="text-amber-600" />
                <div>
                  <div className="font-medium">Express Shipping</div>
                  <div className="text-sm text-gray-500">2-3 business days - $15</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Payment Method</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" defaultChecked className="text-amber-600" />
                <div>
                  <div className="font-medium">Credit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, American Express</div>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input type="radio" name="payment" className="text-amber-600" />
                <div>
                  <div className="font-medium">PayPal</div>
                  <div className="text-sm text-gray-500">Pay securely with your PayPal account</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep('cart')}
          className="flex items-center text-amber-600 hover:text-amber-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Cart
        </button>
        <button
          onClick={() => setStep('payment')}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-center space-x-8 mb-12">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Shopping cart</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            ✓
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Shipping & payment</span>
        </div>
        <div className="flex-1 h-px bg-gray-300"></div>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
            3
          </div>
          <span className="ml-2 text-sm font-medium text-gray-900">Information about you</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Your Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={shippingInfo.email}
                onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={shippingInfo.address}
                onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input
                  type="text"
                  value={shippingInfo.postalCode}
                  onChange={(e) => setShippingInfo({...shippingInfo, postalCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              {state.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x {item.quantity}</span>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setStep('shipping')}
          className="flex items-center text-amber-600 hover:text-amber-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Shipping
        </button>
        <button
          onClick={() => {
            // Process payment and redirect to confirmation
            window.location.href = '/order-confirmation';
          }}
          className="bg-green-600 hover:bg-green-700 text-white font-medium px-8 py-3 rounded transition-colors duration-200"
        >
          Complete Order
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 py-8">
      {/* Top Banner */}
      <div className="bg-stone-800 text-white text-center py-2 mb-8">
        <p className="text-sm">WE HAVE OVER 1,000 VERIFIED REVIEWS</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {state.step === 'cart' && renderCartStep()}
        {state.step === 'shipping' && renderShippingStep()}
        {state.step === 'payment' && renderPaymentStep()}
      </div>
    </div>
  );
}