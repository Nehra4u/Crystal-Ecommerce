'use client';

import { useState, useEffect } from 'react';
import {
  DocumentChartBarIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ShoppingBagIcon,
  CubeIcon
} from '@heroicons/react/24/outline';

interface ReportData {
  sales: {
    daily: { date: string; revenue: number; orders: number }[];
    monthly: { month: string; revenue: number; orders: number }[];
    yearly: { year: string; revenue: number; orders: number }[];
  };
  products: {
    topSelling: { id: string; name: string; sold: number; revenue: number }[];
    categories: { name: string; revenue: number; percentage: number }[];
    lowPerforming: { id: string; name: string; sold: number; revenue: number }[];
  };
  customers: {
    acquisition: { date: string; newCustomers: number; totalCustomers: number }[];
    demographics: { ageGroup: string; count: number; percentage: number }[];
    geography: { country: string; customers: number; revenue: number }[];
  };
  financial: {
    profitLoss: { period: string; revenue: number; costs: number; profit: number }[];
    cashFlow: { date: string; income: number; expenses: number; balance: number }[];
  };
}

const ReportsPage = () => {
  const [activeReport, setActiveReport] = useState<'sales' | 'products' | 'customers' | 'financial'>('sales');
  const [dateRange, setDateRange] = useState('30days');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Mock report data
    const mockData: ReportData = {
      sales: {
        daily: [
          { date: '2024-01-15', revenue: 25400, orders: 12 },
          { date: '2024-01-14', revenue: 18900, orders: 9 },
          { date: '2024-01-13', revenue: 31200, orders: 15 },
          { date: '2024-01-12', revenue: 22800, orders: 11 },
          { date: '2024-01-11', revenue: 19600, orders: 8 },
          { date: '2024-01-10', revenue: 27300, orders: 13 },
          { date: '2024-01-09', revenue: 24700, orders: 10 }
        ],
        monthly: [
          { month: 'January 2024', revenue: 487500, orders: 234 },
          { month: 'December 2023', revenue: 523200, orders: 267 },
          { month: 'November 2023', revenue: 445600, orders: 198 }
        ],
        yearly: [
          { year: '2024', revenue: 487500, orders: 234 },
          { year: '2023', revenue: 5234000, orders: 2456 },
          { year: '2022', revenue: 4123000, orders: 1987 }
        ]
      },
      products: {
        topSelling: [
          { id: '1', name: 'Velká ametystová drúza Brazílie', sold: 45, revenue: 220050 },
          { id: '3', name: 'Křišťálová koule čirý křišťál AAA', sold: 32, revenue: 65600 },
          { id: '5', name: 'Ametystový náhrdelník stříbro 925', sold: 28, revenue: 65240 },
          { id: '4', name: 'Citrínová pyramida zlatá Brazílie', sold: 18, revenue: 58680 },
          { id: '2', name: 'Růženínové srdce extra kvalita', sold: 24, revenue: 28560 }
        ],
        categories: [
          { name: 'Raw Crystals', revenue: 245600, percentage: 45 },
          { name: 'Polished Stones', revenue: 163700, percentage: 30 },
          { name: 'Jewelry', revenue: 109100, percentage: 20 },
          { name: 'Home Decor', revenue: 27300, percentage: 5 }
        ],
        lowPerforming: [
          { id: '6', name: 'Black Tourmaline Bracelet', sold: 2, revenue: 70 },
          { id: '7', name: 'Labradorite Ring', sold: 1, revenue: 66 },
          { id: '8', name: 'Achátové geody podpěry knih pár', sold: 3, revenue: 12210 }
        ]
      },
      customers: {
        acquisition: [
          { date: '2024-01-15', newCustomers: 8, totalCustomers: 892 },
          { date: '2024-01-14', newCustomers: 12, totalCustomers: 884 },
          { date: '2024-01-13', newCustomers: 6, totalCustomers: 872 },
          { date: '2024-01-12', newCustomers: 15, totalCustomers: 866 },
          { date: '2024-01-11', newCustomers: 9, totalCustomers: 851 }
        ],
        demographics: [
          { ageGroup: '25-34', count: 285, percentage: 32 },
          { ageGroup: '35-44', count: 249, percentage: 28 },
          { ageGroup: '45-54', count: 178, percentage: 20 },
          { ageGroup: '18-24', count: 125, percentage: 14 },
          { ageGroup: '55+', count: 55, percentage: 6 }
        ],
        geography: [
          { country: 'Czech Republic', customers: 567, revenue: 456700 },
          { country: 'Slovakia', customers: 123, revenue: 98400 },
          { country: 'Germany', customers: 89, revenue: 78900 },
          { country: 'Austria', customers: 67, revenue: 54300 },
          { country: 'Other', customers: 46, revenue: 34200 }
        ]
      },
      financial: {
        profitLoss: [
          { period: 'January 2024', revenue: 487500, costs: 312000, profit: 175500 },
          { period: 'December 2023', revenue: 523200, costs: 334000, profit: 189200 },
          { period: 'November 2023', revenue: 445600, costs: 298000, profit: 147600 }
        ],
        cashFlow: [
          { date: '2024-01-15', income: 25400, expenses: 12800, balance: 156300 },
          { date: '2024-01-14', income: 18900, expenses: 15200, balance: 143700 },
          { date: '2024-01-13', income: 31200, expenses: 18600, balance: 140000 }
        ]
      }
    };

    setReportData(mockData);
  }, [dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const generateReport = async (type: string, format: 'pdf' | 'excel' | 'csv') => {
    setIsGenerating(true);
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, this would generate and download the actual report
    const fileName = `${type}-report-${dateRange}.${format}`;
    alert(`Generated report: ${fileName}`);
    
    setIsGenerating(false);
  };

  const ReportCard = ({ title, value, change, icon: Icon }: any) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '+' : ''}{change}% from last period
            </p>
          )}
        </div>
      </div>
    </div>
  );

  if (!reportData) {
    return <div className="flex-1 flex items-center justify-center">Loading reports...</div>;
  }

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Generate comprehensive business reports and insights
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <ReportCard
            title="Total Revenue"
            value={formatCurrency(487500)}
            change={12.5}
            icon={CurrencyDollarIcon}
          />
          <ReportCard
            title="Total Orders"
            value="234"
            change={8.3}
            icon={ShoppingBagIcon}
          />
          <ReportCard
            title="Active Customers"
            value="892"
            change={15.2}
            icon={UsersIcon}
          />
          <ReportCard
            title="Avg Order Value"
            value={formatCurrency(2081)}
            change={-2.1}
            icon={ChartBarIcon}
          />
        </div>

        {/* Report Type Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'sales', label: 'Sales Reports', icon: ChartBarIcon },
              { id: 'products', label: 'Product Reports', icon: CubeIcon },
              { id: 'customers', label: 'Customer Reports', icon: UsersIcon },
              { id: 'financial', label: 'Financial Reports', icon: CurrencyDollarIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveReport(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeReport === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Sales Reports */}
        {activeReport === 'sales' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Daily Sales Performance</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => generateReport('daily-sales', 'pdf')}
                    disabled={isGenerating}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                  >
                    <PrinterIcon className="h-4 w-4 inline mr-1" />
                    PDF
                  </button>
                  <button
                    onClick={() => generateReport('daily-sales', 'excel')}
                    disabled={isGenerating}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 inline mr-1" />
                    Excel
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Order Value</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.sales.daily.map((day, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(day.date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(day.revenue)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.orders}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(day.revenue / day.orders)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Product Reports */}
        {activeReport === 'products' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Top Selling Products</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {reportData.products.topSelling.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.sold} units sold</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Category Performance</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {reportData.products.categories.map((category, index) => (
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
                        <div className="text-sm text-gray-500 mt-1">{formatCurrency(category.revenue)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Reports */}
        {activeReport === 'customers' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Customer Demographics</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Age Distribution</h4>
                    <div className="space-y-3">
                      {reportData.customers.demographics.map((demo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{demo.ageGroup}</span>
                          <div className="flex items-center">
                            <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${demo.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{demo.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Geographic Distribution</h4>
                    <div className="space-y-3">
                      {reportData.customers.geography.map((geo, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{geo.country}</span>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{geo.customers} customers</p>
                            <p className="text-sm text-gray-500">{formatCurrency(geo.revenue)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financial Reports */}
        {activeReport === 'financial' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Profit & Loss Statement</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Costs</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Margin</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {reportData.financial.profitLoss.map((period, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{period.period}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatCurrency(period.revenue)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(period.costs)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(period.profit)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{((period.profit / period.revenue) * 100).toFixed(1)}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
