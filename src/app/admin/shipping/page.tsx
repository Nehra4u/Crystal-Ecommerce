'use client';

import { useState, useEffect } from 'react';
import {
  TruckIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface ShippingRate {
  id: string;
  name: string;
  type: 'standard' | 'express' | 'overnight' | 'free';
  baseRate: number;
  freeShippingThreshold?: number;
  estimatedDays: string;
  zones: string[];
  isActive: boolean;
  description: string;
}

interface ShippingProvider {
  id: string;
  name: string;
  apiKey: string;
  isActive: boolean;
  supportedServices: string[];
  trackingUrl: string;
  logo?: string;
}

interface DeliveryZone {
  id: string;
  name: string;
  countries: string[];
  shippingRates: { [serviceType: string]: number };
  estimatedDays: { [serviceType: string]: string };
  isActive: boolean;
}

interface ShipmentTracking {
  id: string;
  orderId: string;
  trackingNumber: string;
  provider: string;
  status: 'preparing' | 'shipped' | 'in_transit' | 'delivered' | 'exception';
  currentLocation: string;
  estimatedDelivery: string;
  updates: {
    timestamp: string;
    location: string;
    status: string;
    description: string;
  }[];
}

const ShippingPage = () => {
  const [activeTab, setActiveTab] = useState<'rates' | 'providers' | 'zones' | 'tracking'>('rates');
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [providers, setProviders] = useState<ShippingProvider[]>([]);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);
  const [trackingData, setTrackingData] = useState<ShipmentTracking[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Mock data
    const mockRates: ShippingRate[] = [
      {
        id: 'RATE-001',
        name: 'Standard Shipping',
        type: 'standard',
        baseRate: 150,
        freeShippingThreshold: 2000,
        estimatedDays: '3-5 business days',
        zones: ['CZ', 'SK', 'AT'],
        isActive: true,
        description: 'Standard delivery for domestic and EU customers'
      },
      {
        id: 'RATE-002',
        name: 'Express Shipping',
        type: 'express',
        baseRate: 350,
        estimatedDays: '1-2 business days',
        zones: ['CZ', 'SK'],
        isActive: true,
        description: 'Fast delivery for urgent orders'
      },
      {
        id: 'RATE-003',
        name: 'International Shipping',
        type: 'standard',
        baseRate: 500,
        estimatedDays: '7-14 business days',
        zones: ['INTL'],
        isActive: true,
        description: 'International delivery worldwide'
      }
    ];

    const mockProviders: ShippingProvider[] = [
      {
        id: 'PROV-001',
        name: 'Czech Post',
        apiKey: 'cp_live_****',
        isActive: true,
        supportedServices: ['Standard', 'Express'],
        trackingUrl: 'https://www.postaonline.cz/trackandtrace',
        logo: '🏃'
      },
      {
        id: 'PROV-002',
        name: 'DHL Express',
        apiKey: 'dhl_live_****',
        isActive: true,
        supportedServices: ['Express', 'Overnight'],
        trackingUrl: 'https://www.dhl.com/en/express/tracking.html',
        logo: '🚛'
      },
      {
        id: 'PROV-003',
        name: 'FedEx',
        apiKey: 'fedex_live_****',
        isActive: false,
        supportedServices: ['Standard', 'Express', 'Overnight'],
        trackingUrl: 'https://www.fedex.com/apps/fedextrack/',
        logo: '✈️'
      }
    ];

    const mockZones: DeliveryZone[] = [
      {
        id: 'ZONE-001',
        name: 'Czech Republic',
        countries: ['CZ'],
        shippingRates: {
          standard: 150,
          express: 350
        },
        estimatedDays: {
          standard: '2-3 business days',
          express: '1 business day'
        },
        isActive: true
      },
      {
        id: 'ZONE-002',
        name: 'Central Europe',
        countries: ['SK', 'AT', 'HU', 'PL'],
        shippingRates: {
          standard: 250,
          express: 450
        },
        estimatedDays: {
          standard: '3-5 business days',
          express: '1-2 business days'
        },
        isActive: true
      },
      {
        id: 'ZONE-003',
        name: 'Western Europe',
        countries: ['DE', 'FR', 'IT', 'ES', 'NL', 'BE'],
        shippingRates: {
          standard: 400,
          express: 650
        },
        estimatedDays: {
          standard: '5-7 business days',
          express: '2-3 business days'
        },
        isActive: true
      }
    ];

    const mockTracking: ShipmentTracking[] = [
      {
        id: 'SHIP-001',
        orderId: '1001',
        trackingNumber: 'CP123456789CZ',
        provider: 'Czech Post',
        status: 'in_transit',
        currentLocation: 'Prague Distribution Center',
        estimatedDelivery: '2024-01-18T17:00:00Z',
        updates: [
          {
            timestamp: '2024-01-16T09:15:00Z',
            location: 'Prague Sorting Facility',
            status: 'in_transit',
            description: 'Package sorted and in transit to destination'
          },
          {
            timestamp: '2024-01-15T14:30:00Z',
            location: 'Prague Main Post Office',
            status: 'shipped',
            description: 'Package accepted and processed'
          },
          {
            timestamp: '2024-01-15T10:00:00Z',
            location: 'Crystal Store Warehouse',
            status: 'preparing',
            description: 'Shipping label created'
          }
        ]
      },
      {
        id: 'SHIP-002',
        orderId: '1002',
        trackingNumber: 'DHL987654321',
        provider: 'DHL Express',
        status: 'delivered',
        currentLocation: 'Delivered to recipient',
        estimatedDelivery: '2024-01-16T12:00:00Z',
        updates: [
          {
            timestamp: '2024-01-16T11:45:00Z',
            location: 'Brno, Czech Republic',
            status: 'delivered',
            description: 'Package delivered to recipient'
          },
          {
            timestamp: '2024-01-16T08:30:00Z',
            location: 'Brno Distribution Center',
            status: 'in_transit',
            description: 'Out for delivery'
          },
          {
            timestamp: '2024-01-15T16:20:00Z',
            location: 'Prague Hub',
            status: 'in_transit',
            description: 'Package in transit'
          }
        ]
      }
    ];

    setShippingRates(mockRates);
    setProviders(mockProviders);
    setDeliveryZones(mockZones);
    setTrackingData(mockTracking);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('cs-CZ', {
      style: 'currency',
      currency: 'CZK',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800';
      case 'exception':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      case 'express':
        return 'bg-purple-100 text-purple-800';
      case 'overnight':
        return 'bg-red-100 text-red-800';
      case 'free':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Shipping & Logistics</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage shipping rates, providers, delivery zones, and track shipments
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Shipping Rate
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <TruckIcon className="h-6 w-6 text-blue-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Active Shipments</p>
                <p className="text-2xl font-bold text-gray-900">{trackingData.filter(t => t.status === 'in_transit').length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <MapPinIcon className="h-6 w-6 text-green-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Delivery Zones</p>
                <p className="text-2xl font-bold text-gray-900">{deliveryZones.filter(z => z.isActive).length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-6 w-6 text-purple-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Shipping Cost</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(275)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="h-6 w-6 text-amber-600 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Delivery Time</p>
                <p className="text-2xl font-bold text-gray-900">3.2 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'rates', label: 'Shipping Rates', icon: CurrencyDollarIcon },
              { id: 'providers', label: 'Providers', icon: TruckIcon },
              { id: 'zones', label: 'Delivery Zones', icon: MapPinIcon },
              { id: 'tracking', label: 'Tracking', icon: ClockIcon }
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

        {/* Shipping Rates Tab */}
        {activeTab === 'rates' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Shipping Rates</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Free Shipping</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zones</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {shippingRates.map((rate) => (
                    <tr key={rate.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rate.name}</div>
                          <div className="text-sm text-gray-500">{rate.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(rate.type)}`}>
                          {rate.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(rate.baseRate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.freeShippingThreshold ? formatCurrency(rate.freeShippingThreshold) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.estimatedDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {rate.zones.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          rate.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {rate.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
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

        {/* Providers Tab */}
        {activeTab === 'providers' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Shipping Providers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tracking URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {providers.map((provider) => (
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-2xl mr-3">{provider.logo}</span>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{provider.name}</div>
                            <div className="text-sm text-gray-500 font-mono">{provider.apiKey}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Connected
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {provider.supportedServices.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                        <a href={provider.trackingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          Track Package
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          provider.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {provider.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            Test API
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

        {/* Delivery Zones Tab */}
        {activeTab === 'zones' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Delivery Zones</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Countries</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Express Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {deliveryZones.map((zone) => (
                    <tr key={zone.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                        <div className="text-sm text-gray-500">Zone ID: {zone.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {zone.countries.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(zone.shippingRates.standard || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(zone.shippingRates.express || 0)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>Standard: {zone.estimatedDays.standard}</div>
                        <div>Express: {zone.estimatedDays.express}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          zone.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {zone.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
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

        {/* Tracking Tab */}
        {activeTab === 'tracking' && (
          <div className="space-y-6">
            {trackingData.map((shipment) => (
              <div key={shipment.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Order #{shipment.orderId} - {shipment.trackingNumber}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Shipped via {shipment.provider} • Current: {shipment.currentLocation}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('_', ' ')}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      Est. Delivery: {formatDate(shipment.estimatedDelivery)}
                    </p>
                  </div>
                </div>

                <div className="border-l-2 border-gray-200 pl-6 ml-3">
                  {shipment.updates.map((update, index) => (
                    <div key={index} className="relative mb-4 last:mb-0">
                      <div className="absolute -left-8 w-3 h-3 bg-white border-2 border-gray-300 rounded-full"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{update.description}</p>
                          <p className="text-sm text-gray-500">{update.location}</p>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(update.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingPage;
