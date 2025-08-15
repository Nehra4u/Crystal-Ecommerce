'use client';

import { useState } from 'react';
import { UserIcon, MapPinIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline';
import Button from '@/components/ui/Button';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: '/images/avatar-placeholder.jpg',
    joinDate: 'March 2024',
    orders: 12,
    wishlistItems: 5
  };

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-08-10',
      status: 'delivered',
      total: 189.99,
      items: 3
    },
    {
      id: 'ORD-002',
      date: '2024-08-05',
      status: 'shipped',
      total: 245.50,
      items: 2
    },
    {
      id: 'ORD-003',
      date: '2024-07-28',
      status: 'processing',
      total: 78.99,
      items: 1
    }
  ];

  const addresses = [
    {
      id: '1',
      type: 'shipping',
      name: 'Sarah Johnson',
      street: '123 Crystal Lane',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      isDefault: true
    },
    {
      id: '2',
      type: 'billing',
      name: 'Sarah Johnson',
      street: '456 Healing Ave',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      isDefault: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-accent-600 bg-accent-100';
    }
  };

  return (
    <div className="min-h-screen bg-accent-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-accent-900 mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-accent-200 p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-accent-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <UserIcon className="h-10 w-10 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-accent-900">{user.name}</h3>
                <p className="text-accent-600">{user.email}</p>
                <p className="text-sm text-accent-500 mt-1">Member since {user.joinDate}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-accent-700 hover:bg-accent-100'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'orders' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-accent-700 hover:bg-accent-100'
                  }`}
                >
                  Order History
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-primary-100 text-primary-700' 
                      : 'text-accent-700 hover:bg-accent-100'
                  }`}
                >
                  Addresses
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-accent-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-accent-900">{user.orders}</p>
                    <p className="text-sm text-accent-600">Orders</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent-900">{user.wishlistItems}</p>
                    <p className="text-sm text-accent-600">Wishlist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg border border-accent-200 p-6">
                <h2 className="text-xl font-semibold text-accent-900 mb-6">Profile Information</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-accent-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Sarah"
                        className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-accent-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Johnson"
                        className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-accent-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full border border-accent-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <Button>Save Changes</Button>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg border border-accent-200 p-6">
                <h2 className="text-xl font-semibold text-accent-900 mb-6">Order History</h2>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-accent-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-accent-900">Order {order.id}</h3>
                          <p className="text-sm text-accent-600">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-accent-600">
                          {order.items} item{order.items > 1 ? 's' : ''}
                        </p>
                        <p className="font-semibold text-accent-900">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg border border-accent-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-accent-900">Saved Addresses</h2>
                  <Button>Add New Address</Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div key={address.id} className="border border-accent-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-accent-900 capitalize">
                          {address.type} Address
                        </h3>
                        {address.isDefault && (
                          <span className="bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="text-accent-600 space-y-1">
                        <p>{address.name}</p>
                        <p>{address.street}</p>
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-600">Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
