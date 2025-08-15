'use client';

import { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
  };
  amount: number;
  method: 'Credit Card' | 'Bank Transfer' | 'PayPal' | 'Cash';
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded';
  transactionId: string;
  paymentDate: string;
  refundAmount?: number;
  refundDate?: string;
  currency: string;
  fees: number;
  netAmount: number;
}

const PaymentsPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [dateRange, setDateRange] = useState('All');

  useEffect(() => {
    // Mock payment data
    const mockPayments: Payment[] = [
      {
        id: 'PAY-001',
        orderId: '1001',
        customer: {
          name: 'Anna Johnson',
          email: 'anna@example.com'
        },
        amount: 7270,
        method: 'Credit Card',
        status: 'Completed',
        transactionId: 'TXN-CC-001234',
        paymentDate: '2024-01-15T10:30:00Z',
        currency: 'CZK',
        fees: 145.40,
        netAmount: 7124.60
      },
      {
        id: 'PAY-002',
        orderId: '1002',
        customer: {
          name: 'Michael Chen',
          email: 'michael@example.com'
        },
        amount: 2050,
        method: 'PayPal',
        status: 'Completed',
        transactionId: 'TXN-PP-567890',
        paymentDate: '2024-01-14T14:15:00Z',
        currency: 'CZK',
        fees: 82.00,
        netAmount: 1968.00
      },
      {
        id: 'PAY-003',
        orderId: '1003',
        customer: {
          name: 'Sarah Wilson',
          email: 'sarah@example.com'
        },
        amount: 5590,
        method: 'Bank Transfer',
        status: 'Pending',
        transactionId: 'TXN-BT-111213',
        paymentDate: '2024-01-13T09:20:00Z',
        currency: 'CZK',
        fees: 25.00,
        netAmount: 5565.00
      },
      {
        id: 'PAY-004',
        orderId: '1004',
        customer: {
          name: 'David Brown',
          email: 'david@example.com'
        },
        amount: 4070,
        method: 'Credit Card',
        status: 'Failed',
        transactionId: 'TXN-CC-141516',
        paymentDate: '2024-01-12T16:45:00Z',
        currency: 'CZK',
        fees: 0,
        netAmount: 0
      },
      {
        id: 'PAY-005',
        orderId: '1005',
        customer: {
          name: 'Emma Davis',
          email: 'emma@example.com'
        },
        amount: 1190,
        method: 'Credit Card',
        status: 'Refunded',
        transactionId: 'TXN-CC-171819',
        paymentDate: '2024-01-10T11:30:00Z',
        refundAmount: 1190,
        refundDate: '2024-01-11T09:15:00Z',
        currency: 'CZK',
        fees: 23.80,
        netAmount: -23.80
      }
    ];

    setPayments(mockPayments);
    setFilteredPayments(mockPayments);
  }, []);

  useEffect(() => {
    let filtered = payments;

    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(payment => payment.status === statusFilter);
    }

    if (methodFilter !== 'All') {
      filtered = filtered.filter(payment => payment.method === methodFilter);
    }

    if (dateRange !== 'All') {
      const now = new Date();
      let startDate = new Date();
      
      switch (dateRange) {
        case 'Today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'Week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'Month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'Quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
      }

      filtered = filtered.filter(payment => 
        new Date(payment.paymentDate) >= startDate
      );
    }

    setFilteredPayments(filtered);
  }, [searchTerm, statusFilter, methodFilter, dateRange, payments]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'Credit Card':
        return 'bg-blue-100 text-blue-800';
      case 'PayPal':
        return 'bg-purple-100 text-purple-800';
      case 'Bank Transfer':
        return 'bg-indigo-100 text-indigo-800';
      case 'Cash':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateTotals = () => {
    const completedPayments = filteredPayments.filter(p => p.status === 'Completed');
    const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalFees = completedPayments.reduce((sum, p) => sum + p.fees, 0);
    const netRevenue = totalRevenue - totalFees;
    
    return { totalRevenue, totalFees, netRevenue, count: completedPayments.length };
  };

  const totals = calculateTotals();

  const exportToCSV = () => {
    const headers = ['Payment ID', 'Order ID', 'Customer', 'Amount', 'Method', 'Status', 'Date', 'Transaction ID'];
    const csvData = [
      headers,
      ...filteredPayments.map(payment => [
        payment.id,
        payment.orderId,
        payment.customer.name,
        payment.amount,
        payment.method,
        payment.status,
        formatDate(payment.paymentDate),
        payment.transactionId
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment History</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all payment transactions
            </p>
          </div>
          <button
            onClick={exportToCSV}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center"
          >
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export CSV
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 text-sm font-medium">₭</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-medium">₭</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Net Revenue</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.netRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-sm font-medium">₭</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Fees</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.totalFees)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600 text-sm font-medium">#</span>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Transactions</p>
                <p className="text-2xl font-bold text-gray-900">{totals.count}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments, orders, customers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <FunnelIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <select
              className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
            >
              <option value="All">All Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
            <div className="flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              <select
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="All">All Time</option>
                <option value="Today">Today</option>
                <option value="Week">Last 7 Days</option>
                <option value="Month">Last 30 Days</option>
                <option value="Quarter">Last 3 Months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{payment.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{payment.customer.name}</div>
                        <div className="text-sm text-gray-500">{payment.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getMethodColor(payment.method)}`}>
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {payment.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(payment.fees)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(payment.netAmount)}
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

export default PaymentsPage;
