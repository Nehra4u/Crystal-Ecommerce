'use client';

import { useState } from 'react';
import {
  CogIcon,
  BellIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  TruckIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'LARIMARITA • MILENA ODA',
      siteDescription: 'Premium Crystals & Jewelry',
      contactEmail: 'admin@larimarita.com',
      supportPhone: '+420 123 456 789',
      timezone: 'Europe/Prague',
      currency: 'CZK'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      orderAlerts: true,
      lowStockAlerts: true,
      customerRegistrations: true,
      paymentFailures: true
    },
    shipping: {
      freeShippingThreshold: 2000,
      standardShippingRate: 150,
      expressShippingRate: 300,
      internationalShipping: true,
      estimatedDelivery: '3-5 business days'
    },
    payments: {
      acceptCreditCards: true,
      acceptPayPal: true,
      acceptBankTransfer: true,
      acceptCash: false,
      paymentFeePercentage: 2.5,
      minimumOrderAmount: 500
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 60,
      passwordPolicy: 'Strong',
      loginAttempts: 5
    }
  });

  const handleSaveSettings = () => {
    // In a real app, save to API
    alert('Settings saved successfully!');
  };

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const SettingSection = ({ icon: Icon, title, children }: any) => (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center">
          <Icon className="h-5 w-5 text-gray-400 mr-3" />
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="px-6 py-4 space-y-4">
        {children}
      </div>
    </div>
  );

  const InputField = ({ label, value, onChange, type = 'text' }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }: any) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const CheckboxField = ({ label, checked, onChange }: any) => (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
      />
      <label className="ml-2 text-sm text-gray-700">{label}</label>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configure your store settings and preferences
            </p>
          </div>
          <button
            onClick={handleSaveSettings}
            className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-8">
          {/* General Settings */}
          <SettingSection icon={CogIcon} title="General Settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Site Name"
                value={settings.general.siteName}
                onChange={(e: any) => updateSetting('general', 'siteName', e.target.value)}
              />
              <InputField
                label="Site Description"
                value={settings.general.siteDescription}
                onChange={(e: any) => updateSetting('general', 'siteDescription', e.target.value)}
              />
              <InputField
                label="Contact Email"
                type="email"
                value={settings.general.contactEmail}
                onChange={(e: any) => updateSetting('general', 'contactEmail', e.target.value)}
              />
              <InputField
                label="Support Phone"
                value={settings.general.supportPhone}
                onChange={(e: any) => updateSetting('general', 'supportPhone', e.target.value)}
              />
              <SelectField
                label="Timezone"
                value={settings.general.timezone}
                onChange={(e: any) => updateSetting('general', 'timezone', e.target.value)}
                options={[
                  { value: 'Europe/Prague', label: 'Europe/Prague (CET)' },
                  { value: 'Europe/London', label: 'Europe/London (GMT)' },
                  { value: 'America/New_York', label: 'America/New_York (EST)' },
                ]}
              />
              <SelectField
                label="Currency"
                value={settings.general.currency}
                onChange={(e: any) => updateSetting('general', 'currency', e.target.value)}
                options={[
                  { value: 'CZK', label: 'Czech Koruna (CZK)' },
                  { value: 'EUR', label: 'Euro (EUR)' },
                  { value: 'USD', label: 'US Dollar (USD)' },
                ]}
              />
            </div>
          </SettingSection>

          {/* Notification Settings */}
          <SettingSection icon={BellIcon} title="Notifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                label="Email Notifications"
                checked={settings.notifications.emailNotifications}
                onChange={(e: any) => updateSetting('notifications', 'emailNotifications', e.target.checked)}
              />
              <CheckboxField
                label="SMS Notifications"
                checked={settings.notifications.smsNotifications}
                onChange={(e: any) => updateSetting('notifications', 'smsNotifications', e.target.checked)}
              />
              <CheckboxField
                label="Order Alerts"
                checked={settings.notifications.orderAlerts}
                onChange={(e: any) => updateSetting('notifications', 'orderAlerts', e.target.checked)}
              />
              <CheckboxField
                label="Low Stock Alerts"
                checked={settings.notifications.lowStockAlerts}
                onChange={(e: any) => updateSetting('notifications', 'lowStockAlerts', e.target.checked)}
              />
              <CheckboxField
                label="Customer Registrations"
                checked={settings.notifications.customerRegistrations}
                onChange={(e: any) => updateSetting('notifications', 'customerRegistrations', e.target.checked)}
              />
              <CheckboxField
                label="Payment Failures"
                checked={settings.notifications.paymentFailures}
                onChange={(e: any) => updateSetting('notifications', 'paymentFailures', e.target.checked)}
              />
            </div>
          </SettingSection>

          {/* Shipping Settings */}
          <SettingSection icon={TruckIcon} title="Shipping">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Free Shipping Threshold (CZK)"
                type="number"
                value={settings.shipping.freeShippingThreshold}
                onChange={(e: any) => updateSetting('shipping', 'freeShippingThreshold', Number(e.target.value))}
              />
              <InputField
                label="Standard Shipping Rate (CZK)"
                type="number"
                value={settings.shipping.standardShippingRate}
                onChange={(e: any) => updateSetting('shipping', 'standardShippingRate', Number(e.target.value))}
              />
              <InputField
                label="Express Shipping Rate (CZK)"
                type="number"
                value={settings.shipping.expressShippingRate}
                onChange={(e: any) => updateSetting('shipping', 'expressShippingRate', Number(e.target.value))}
              />
              <InputField
                label="Estimated Delivery"
                value={settings.shipping.estimatedDelivery}
                onChange={(e: any) => updateSetting('shipping', 'estimatedDelivery', e.target.value)}
              />
              <div className="md:col-span-2">
                <CheckboxField
                  label="Enable International Shipping"
                  checked={settings.shipping.internationalShipping}
                  onChange={(e: any) => updateSetting('shipping', 'internationalShipping', e.target.checked)}
                />
              </div>
            </div>
          </SettingSection>

          {/* Payment Settings */}
          <SettingSection icon={CurrencyDollarIcon} title="Payments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Payment Methods</label>
                <CheckboxField
                  label="Credit Cards"
                  checked={settings.payments.acceptCreditCards}
                  onChange={(e: any) => updateSetting('payments', 'acceptCreditCards', e.target.checked)}
                />
                <CheckboxField
                  label="PayPal"
                  checked={settings.payments.acceptPayPal}
                  onChange={(e: any) => updateSetting('payments', 'acceptPayPal', e.target.checked)}
                />
                <CheckboxField
                  label="Bank Transfer"
                  checked={settings.payments.acceptBankTransfer}
                  onChange={(e: any) => updateSetting('payments', 'acceptBankTransfer', e.target.checked)}
                />
                <CheckboxField
                  label="Cash on Delivery"
                  checked={settings.payments.acceptCash}
                  onChange={(e: any) => updateSetting('payments', 'acceptCash', e.target.checked)}
                />
              </div>
              <div className="space-y-4">
                <InputField
                  label="Payment Fee Percentage (%)"
                  type="number"
                  step="0.1"
                  value={settings.payments.paymentFeePercentage}
                  onChange={(e: any) => updateSetting('payments', 'paymentFeePercentage', Number(e.target.value))}
                />
                <InputField
                  label="Minimum Order Amount (CZK)"
                  type="number"
                  value={settings.payments.minimumOrderAmount}
                  onChange={(e: any) => updateSetting('payments', 'minimumOrderAmount', Number(e.target.value))}
                />
              </div>
            </div>
          </SettingSection>

          {/* Security Settings */}
          <SettingSection icon={ShieldCheckIcon} title="Security">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CheckboxField
                label="Two-Factor Authentication"
                checked={settings.security.twoFactorAuth}
                onChange={(e: any) => updateSetting('security', 'twoFactorAuth', e.target.checked)}
              />
              <InputField
                label="Session Timeout (minutes)"
                type="number"
                value={settings.security.sessionTimeout}
                onChange={(e: any) => updateSetting('security', 'sessionTimeout', Number(e.target.value))}
              />
              <SelectField
                label="Password Policy"
                value={settings.security.passwordPolicy}
                onChange={(e: any) => updateSetting('security', 'passwordPolicy', e.target.value)}
                options={[
                  { value: 'Basic', label: 'Basic (6+ characters)' },
                  { value: 'Strong', label: 'Strong (8+ chars, mixed case, numbers)' },
                  { value: 'Very Strong', label: 'Very Strong (12+ chars, symbols)' },
                ]}
              />
              <InputField
                label="Max Login Attempts"
                type="number"
                value={settings.security.loginAttempts}
                onChange={(e: any) => updateSetting('security', 'loginAttempts', Number(e.target.value))}
              />
            </div>
          </SettingSection>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
