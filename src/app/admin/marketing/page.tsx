'use client';

import { useState, useEffect } from 'react';
import {
  GiftIcon,
  MegaphoneIcon,
  EnvelopeIcon,
  TagIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

interface DiscountCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minOrderAmount?: number;
  maxUses: number;
  currentUses: number;
  validFrom: string;
  validUntil: string;
  status: 'active' | 'inactive' | 'expired';
  description: string;
}

interface Campaign {
  id: string;
  name: string;
  type: 'email' | 'banner' | 'popup' | 'social';
  status: 'draft' | 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  targetAudience: string;
  impressions: number;
  clicks: number;
  conversions: number;
  budget: number;
  spent: number;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  type: 'welcome' | 'promotional' | 'abandoned_cart' | 'newsletter';
  lastUsed: string;
  opens: number;
  clicks: number;
  conversions: number;
}

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState<'discounts' | 'campaigns' | 'email' | 'seo'>('discounts');
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    // Mock data
    const mockDiscounts: DiscountCode[] = [
      {
        id: 'DISC-001',
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrderAmount: 500,
        maxUses: 100,
        currentUses: 23,
        validFrom: '2024-01-01T00:00:00Z',
        validUntil: '2024-12-31T23:59:59Z',
        status: 'active',
        description: 'Welcome discount for new customers'
      },
      {
        id: 'DISC-002',
        code: 'CRYSTAL25',
        type: 'percentage',
        value: 25,
        minOrderAmount: 2000,
        maxUses: 50,
        currentUses: 12,
        validFrom: '2024-01-10T00:00:00Z',
        validUntil: '2024-01-31T23:59:59Z',
        status: 'active',
        description: 'January crystal sale'
      },
      {
        id: 'DISC-003',
        code: 'FREESHIP',
        type: 'free_shipping',
        value: 0,
        minOrderAmount: 1000,
        maxUses: 200,
        currentUses: 67,
        validFrom: '2024-01-01T00:00:00Z',
        validUntil: '2024-02-29T23:59:59Z',
        status: 'active',
        description: 'Free shipping promotion'
      }
    ];

    const mockCampaigns: Campaign[] = [
      {
        id: 'CAMP-001',
        name: 'New Year Crystal Sale',
        type: 'email',
        status: 'active',
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-01-31T23:59:59Z',
        targetAudience: 'All customers',
        impressions: 1250,
        clicks: 89,
        conversions: 12,
        budget: 5000,
        spent: 2300
      },
      {
        id: 'CAMP-002',
        name: 'Valentine\'s Day Jewelry',
        type: 'banner',
        status: 'draft',
        startDate: '2024-02-01T00:00:00Z',
        endDate: '2024-02-14T23:59:59Z',
        targetAudience: 'Jewelry buyers',
        impressions: 0,
        clicks: 0,
        conversions: 0,
        budget: 3000,
        spent: 0
      }
    ];

    const mockEmailTemplates: EmailTemplate[] = [
      {
        id: 'EMAIL-001',
        name: 'Welcome Series - Email 1',
        subject: 'Welcome to LARIMARITA • MILENA ODA',
        type: 'welcome',
        lastUsed: '2024-01-15T10:30:00Z',
        opens: 156,
        clicks: 23,
        conversions: 8
      },
      {
        id: 'EMAIL-002',
        name: 'Abandoned Cart Reminder',
        subject: 'You left something magical behind...',
        type: 'abandoned_cart',
        lastUsed: '2024-01-14T16:45:00Z',
        opens: 89,
        clicks: 34,
        conversions: 12
      },
      {
        id: 'EMAIL-003',
        name: 'Monthly Newsletter',
        subject: 'Crystal Energy for January',
        type: 'newsletter',
        lastUsed: '2024-01-01T09:00:00Z',
        opens: 445,
        clicks: 67,
        conversions: 15
      }
    ];

    setDiscountCodes(mockDiscounts);
    setCampaigns(mockCampaigns);
    setEmailTemplates(mockEmailTemplates);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDiscountTypeDisplay = (type: string, value: number) => {
    switch (type) {
      case 'percentage':
        return `${value}% off`;
      case 'fixed':
        return `${formatCurrency(value)} off`;
      case 'free_shipping':
        return 'Free shipping';
      default:
        return 'Unknown';
    }
  };

  const DiscountForm = ({ discount, onSave, onCancel }: any) => {
    const [formData, setFormData] = useState(discount || {
      code: '',
      type: 'percentage',
      value: 0,
      minOrderAmount: 0,
      maxUses: 100,
      validFrom: '',
      validUntil: '',
      description: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSave({ ...formData, id: discount?.id || `DISC-${Date.now()}`, currentUses: discount?.currentUses || 0, status: 'active' });
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full m-4">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              {discount ? 'Edit Discount Code' : 'Create Discount Code'}
            </h3>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Code</label>
              <input
                type="text"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <option value="percentage">Percentage Off</option>
                <option value="fixed">Fixed Amount Off</option>
                <option value="free_shipping">Free Shipping</option>
              </select>
            </div>

            {formData.type !== 'free_shipping' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {formData.type === 'percentage' ? 'Percentage' : 'Amount (CZK)'}
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">Minimum Order Amount (CZK)</label>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: Number(e.target.value) })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Max Uses</label>
              <input
                type="number"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.maxUses}
                onChange={(e) => setFormData({ ...formData, maxUses: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid From</label>
                <input
                  type="datetime-local"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.validFrom}
                  onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Valid Until</label>
                <input
                  type="datetime-local"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                  value={formData.validUntil}
                  onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
              >
                {discount ? 'Update' : 'Create'} Code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleSaveDiscount = (discountData: DiscountCode) => {
    if (editingItem) {
      setDiscountCodes(discountCodes.map(d => d.id === editingItem.id ? discountData : d));
    } else {
      setDiscountCodes([...discountCodes, discountData]);
    }
    setShowAddModal(false);
    setEditingItem(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Marketing Tools</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage promotions, campaigns, and marketing communications
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Create Campaign
          </button>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GiftIcon className="h-6 w-6 text-amber-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Active Discounts</p>
                <p className="text-2xl font-bold text-gray-900">{discountCodes.filter(d => d.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MegaphoneIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Active Campaigns</p>
                <p className="text-2xl font-bold text-gray-900">{campaigns.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email Open Rate</p>
                <p className="text-2xl font-bold text-gray-900">24.5%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TagIcon className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-900">3.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'discounts', label: 'Discount Codes', icon: GiftIcon },
              { id: 'campaigns', label: 'Campaigns', icon: MegaphoneIcon },
              { id: 'email', label: 'Email Marketing', icon: EnvelopeIcon },
              { id: 'seo', label: 'SEO Tools', icon: TagIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
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

        {/* Discount Codes Tab */}
        {activeTab === 'discounts' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Discount Codes</h3>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setShowAddModal(true);
                }}
                className="bg-amber-600 text-white px-3 py-1 rounded text-sm hover:bg-amber-700"
              >
                <PlusIcon className="h-4 w-4 inline mr-1" />
                Add Code
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valid Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {discountCodes.map((discount) => (
                    <tr key={discount.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900 font-mono">{discount.code}</div>
                          <div className="text-sm text-gray-500">{discount.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{getDiscountTypeDisplay(discount.type, discount.value)}</div>
                        {discount.minOrderAmount && (
                          <div className="text-sm text-gray-500">Min: {formatCurrency(discount.minOrderAmount)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{discount.currentUses} / {discount.maxUses}</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-amber-600 h-2 rounded-full"
                            style={{ width: `${(discount.currentUses / discount.maxUses) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{formatDate(discount.validFrom)}</div>
                        <div>{formatDate(discount.validUntil)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(discount.status)}`}>
                          {discount.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingItem(discount);
                              setShowAddModal(true);
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Marketing Campaigns</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.targetAudience}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {campaign.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{formatDate(campaign.startDate)}</div>
                        <div>{formatDate(campaign.endDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Impressions: {campaign.impressions.toLocaleString()}</div>
                        <div>Clicks: {campaign.clicks} ({campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(1) : 0}%)</div>
                        <div>Conversions: {campaign.conversions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-amber-600 hover:text-amber-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Marketing Tab */}
        {activeTab === 'email' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Email Templates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Used</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {emailTemplates.map((template) => (
                    <tr key={template.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.subject}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                          {template.type.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Opens: {template.opens} ({template.opens > 0 ? ((template.clicks / template.opens) * 100).toFixed(1) : 0}%)</div>
                        <div>Clicks: {template.clicks}</div>
                        <div>Conversions: {template.conversions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(template.lastUsed)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button className="text-amber-600 hover:text-amber-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <EnvelopeIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SEO Tools Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">SEO Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">87</p>
                  <p className="text-sm text-gray-500">SEO Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">1,234</p>
                  <p className="text-sm text-gray-500">Organic Traffic</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">23</p>
                  <p className="text-sm text-gray-500">Keywords Ranking</p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Meta Tags Management</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Homepage Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                    defaultValue="LARIMARITA • MILENA ODA - Premium Crystals & Jewelry"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Homepage Description</label>
                  <textarea
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                    defaultValue="Discover the magic of crystals with our carefully curated collection of premium crystals, minerals, and healing stones from around the world."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Keywords</label>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-amber-500 focus:border-amber-500"
                    defaultValue="crystals, healing stones, minerals, jewelry, spiritual"
                  />
                </div>
                <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                  Update SEO Settings
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showAddModal && activeTab === 'discounts' && (
          <DiscountForm
            discount={editingItem}
            onSave={handleSaveDiscount}
            onCancel={() => {
              setShowAddModal(false);
              setEditingItem(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MarketingPage;
