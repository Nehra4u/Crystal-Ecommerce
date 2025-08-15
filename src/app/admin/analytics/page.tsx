'use client';

import { useState, useEffect } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  revenue: {
    current: number;
    previous: number;
    change: number;
  };
  orders: {
    current: number;
    previous: number;
    change: number;
  };
  customers: {
    current: number;
    previous: number;
    change: number;
  };
  conversionRate: {
    current: number;
    previous: number;
    change: number;
  };
}

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeframe, setTimeframe] = useState('30days');

  useEffect(() => {
    // Mock analytics data
    const mockData: AnalyticsData = {
      revenue: {
        current: 245890,
        previous: 198750,
        change: 23.7
      },
      orders: {
        current: 247,
        previous: 203,
        change: 21.7
      },
      customers: {
        current: 189,
        previous: 156,
        change: 21.2
      },
      conversionRate: {
        current: 3.2,
        previous: 2.8,
        change: 14.3
      }
    };

    setAnalyticsData(mockData);
  }, [timeframe]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const MetricCard = ({ title, current, previous, change, prefix = '', suffix = '' }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{typeof current === 'number' && prefix === '₭' ? formatCurrency(current) : current}{suffix}
          </p>
        </div>
        <div className="flex items-center">
          {change >= 0 ? (
            <ArrowTrendingUpIcon className="h-5 w-5 text-green-500 mr-1" />
          ) : (
            <ArrowTrendingDownIcon className="h-5 w-5 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-500">
        vs previous period: {prefix}{typeof previous === 'number' && prefix === '₭' ? formatCurrency(previous) : previous}{suffix}
      </div>
    </div>
  );

  // Mock chart data
  const salesData = [
    { date: '2024-01-01', sales: 12000 },
    { date: '2024-01-02', sales: 15000 },
    { date: '2024-01-03', sales: 18000 },
    { date: '2024-01-04', sales: 14000 },
    { date: '2024-01-05', sales: 16000 },
    { date: '2024-01-06', sales: 22000 },
    { date: '2024-01-07', sales: 19000 },
  ];

  const topProducts = [
    { name: 'Velká ametystová drúza Brazílie', sales: 45, revenue: 220050 },
    { name: 'Křišťálová koule čirý křišťál AAA', sales: 32, revenue: 65600 },
    { name: 'Ametystový náhrdelník stříbro 925', sales: 28, revenue: 65240 },
    { name: 'Citrínová pyramida zlatá Brazílie', sales: 18, revenue: 58680 },
    { name: 'Růženínové srdce extra kvalita', sales: 24, revenue: 28560 },
  ];

  const topCategories = [
    { name: 'Raw Crystals', percentage: 45, revenue: 110650 },
    { name: 'Polished Stones', percentage: 30, revenue: 73770 },
    { name: 'Jewelry', percentage: 20, revenue: 49178 },
    { name: 'Home Decor', percentage: 5, revenue: 12292 },
  ];

  if (!analyticsData) {
    return <div className="flex-1 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your business performance and insights
            </p>
          </div>
          <select
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            current={analyticsData.revenue.current}
            previous={analyticsData.revenue.previous}
            change={analyticsData.revenue.change}
            prefix="₭"
          />
          <MetricCard
            title="Total Orders"
            current={analyticsData.orders.current}
            previous={analyticsData.orders.previous}
            change={analyticsData.orders.change}
          />
          <MetricCard
            title="New Customers"
            current={analyticsData.customers.current}
            previous={analyticsData.customers.previous}
            change={analyticsData.customers.change}
          />
          <MetricCard
            title="Conversion Rate"
            current={analyticsData.conversionRate.current}
            previous={analyticsData.conversionRate.previous}
            change={analyticsData.conversionRate.change}
            suffix="%"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Sales Trend</h3>
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {salesData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-amber-200 rounded-t"
                    style={{
                      height: `${(day.sales / Math.max(...salesData.map(d => d.sales))) * 200}px`
                    }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(day.date).getDate()}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              Daily Sales (Last 7 Days)
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Sales by Category</h3>
            <div className="space-y-4">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-500">{category.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-amber-600 h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatCurrency(category.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Units Sold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-gradient-to-br from-crystal-300 to-crystal-500 rounded-lg flex items-center justify-center">
                            <span className="text-lg">💎</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.sales}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm text-green-600">+{(Math.random() * 20 + 5).toFixed(1)}%</span>
                      </div>
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

export default AnalyticsPage;
