/**
 * Admin Settings Page
 * Allows administrators to configure various system settings
 */

'use client';

import React, { useState } from 'react';
import PaymentSettingsForm from '@/components/features/payments/PaymentSettingsForm';
import { 
  CurrencyDollarIcon,
  UserGroupIcon,
  CalendarIcon,
  BookOpenIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

// Tab types for settings sections
type SettingsTab = 'payments' | 'groups' | 'schedule' | 'books' | 'general';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('payments');

  // Handle tab change
  const handleTabChange = (tab: SettingsTab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">إعدادات النظام</h1>
        <p className="text-gray-600 dark:text-gray-400">
          إدارة إعدادات المركز التعليمي
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-1 mb-6">
        <div className="flex flex-wrap">
          <button
            onClick={() => handleTabChange('payments')}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              activeTab === 'payments'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <CurrencyDollarIcon className="ml-2 h-5 w-5" />
            المدفوعات
          </button>
          <button
            onClick={() => handleTabChange('groups')}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              activeTab === 'groups'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <UserGroupIcon className="ml-2 h-5 w-5" />
            المجموعات
          </button>
          <button
            onClick={() => handleTabChange('schedule')}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              activeTab === 'schedule'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <CalendarIcon className="ml-2 h-5 w-5" />
            الجدول الزمني
          </button>
          <button
            onClick={() => handleTabChange('books')}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              activeTab === 'books'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <BookOpenIcon className="ml-2 h-5 w-5" />
            الكتب
          </button>
          <button
            onClick={() => handleTabChange('general')}
            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-md ${
              activeTab === 'general'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            <Cog6ToothIcon className="ml-2 h-5 w-5" />
            إعدادات عامة
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'payments' && (
          <PaymentSettingsForm />
        )}
        
        {activeTab === 'groups' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              إعدادات المجموعات
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              سيتم تنفيذ هذه الميزة قريبًا. ستتمكن من إدارة المجموعات وتكوينها هنا.
            </p>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              إعدادات الجدول الزمني
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              سيتم تنفيذ هذه الميزة قريبًا. ستتمكن من إدارة أوقات الحصص والجداول الزمنية هنا.
            </p>
          </div>
        )}
        
        {activeTab === 'books' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              إعدادات الكتب
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              سيتم تنفيذ هذه الميزة قريبًا. ستتمكن من إدارة الكتب وأسعارها هنا.
            </p>
          </div>
        )}
        
        {activeTab === 'general' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              الإعدادات العامة
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              سيتم تنفيذ هذه الميزة قريبًا. ستتمكن من إدارة الإعدادات العامة للنظام هنا.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
