/**
 * Admin dashboard page
 * Displays key metrics and information for administrators
 */

'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  UsersIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

const AdminDashboardPage: React.FC = () => {
  const { authState } = useAuth();

  // Dashboard stats (would be fetched from API in a real implementation)
  const stats = [
    { name: 'إجمالي الطلاب', value: '120', icon: UsersIcon, color: 'bg-blue-500' },
    { name: 'نسبة الحضور', value: '85%', icon: CalendarIcon, color: 'bg-green-500' },
    { name: 'المدفوعات الشهرية', value: '25,000 ج.م', icon: CurrencyDollarIcon, color: 'bg-amber-500' },
    { name: 'الواجبات المقدمة', value: '45', icon: BookOpenIcon, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          مرحباً، {authState.user?.profile.full_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          هذه هي لوحة تحكم مدير النظام. يمكنك إدارة الطلاب والحضور والمدفوعات من هنا.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className={`rounded-md p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </div>
            </div>
            <div className={`h-1 ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">النشاط الأخير</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UsersIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    تم تسجيل طالب جديد
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    منذ {5 - index} {index === 4 ? 'دقيقة' : 'ساعات'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
