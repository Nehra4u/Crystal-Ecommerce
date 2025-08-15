'use client';

import { useState, useEffect } from 'react';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  TruckIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
  pendingOrders: number;
  revenueChange: number;
  ordersChange: number;
  customersChange: number;
  pendingChange: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    revenueChange: 0,
    ordersChange: 0,
    customersChange: 0,
    pendingChange: 0,
  });

  const [recentOrders] = useState([
    { id: '1001', customer: 'Anna Johnson', amount: 2450, status: 'Completed', date: '2024-01-15' },
    { id: '1002', customer: 'Michael Chen', amount: 1890, status: 'Processing', date: '2024-01-15' },
    { id: '1003', customer: 'Sarah Wilson', amount: 3260, status: 'Pending', date: '2024-01-14' },
    { id: '1004', customer: 'David Brown', amount: 4070, status: 'Shipped', date: '2024-01-14' },
    { id: '1005', customer: 'Emma Davis', amount: 1190, status: 'Completed', date: '2024-01-13' },
  ]);

  useEffect(() => {
    // Simulate loading stats
    const loadStats = () => {
      setStats({
        totalRevenue: 245890,
        totalOrders: 1247,
        totalCustomers: 892,
        pendingOrders: 23,
        revenueChange: 12.5,
        ordersChange: 8.2,
        customersChange: 15.7,
        pendingChange: -4.3,
      });
    };

    loadStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Pending':
        return 'bg-orange-100 text-orange-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, change, icon: Icon, prefix = '' }: {
    title: string;
    value: string | number;
    change: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    prefix?: string;
  }) => (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className="h-6 w-6 text-gray-400" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
              <dd className="text-lg font-medium text-gray-900">
                {prefix}{typeof value === 'number' && prefix ? formatCurrency(value) : value}
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <div className={`flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? (
              <ArrowTrendingUpIcon className="w-4 h-4 mr-1" />
            ) : (
              <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">{Math.abs(change)}%</span>
            <span className="text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your crystal e-commerce business
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            change={stats.revenueChange}
            icon={CurrencyDollarIcon}
            prefix="currency"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            change={stats.ordersChange}
            icon={ShoppingBagIcon}
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            change={stats.customersChange}
            icon={UserGroupIcon}
          />
          <StatCard
            title="Pending Orders"
            value={stats.pendingOrders}
            change={stats.pendingChange}
            icon={TruckIcon}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors">
                Add New Product
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Process Orders
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                View Analytics
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Today&apos;s Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">New Orders:</span>
                <span className="font-medium">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">{formatCurrency(12450)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Customers:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Products Sold:</span>
                <span className="font-medium">15</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Website:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Gateway:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-sm text-green-600">Active</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Inventory Sync:</span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                  <span className="text-sm text-yellow-600">Syncing</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
