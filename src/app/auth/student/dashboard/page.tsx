/**
 * Student dashboard page
 * Displays key information and upcoming events for students
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  CalendarIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase/client';
import { DayOfWeek } from '@/types/database';

const StudentDashboardPage: React.FC = () => {
  const { authState } = useAuth();
  const [studentDetails, setStudentDetails] = useState<{
    grade?: string;
    track?: string;
    groupDays?: { day1: DayOfWeek; day2: DayOfWeek; friday_included: boolean };
    groupTime?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (!authState.user) return;

      try {
        setIsLoading(true);
        
        // Get student grade
        const { data: gradeData } = await supabase.rpc('get_student_grade', {
          student_id: authState.user.auth.id
        });
        
        // Get student track (if applicable)
        const { data: trackData } = await supabase.rpc('get_student_track', {
          student_id: authState.user.auth.id
        });
        
        // Get student group days
        const { data: groupDaysData } = await supabase.rpc('get_student_group_days', {
          student_id: authState.user.auth.id
        });
        
        // Get student group time
        const { data: groupTimeData } = await supabase.rpc('get_student_group_time', {
          student_id: authState.user.auth.id
        });
        
        setStudentDetails({
          grade: gradeData,
          track: trackData,
          groupDays: groupDaysData?.[0],
          groupTime: groupTimeData
        });
      } catch (error) {
        console.error('Error fetching student details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentDetails();
  }, [authState.user]);

  // Format days for display
  const formatGroupDays = () => {
    if (!studentDetails.groupDays) return '';
    
    const { day1, day2, friday_included } = studentDetails.groupDays;
    return friday_included 
      ? `${day1}، ${day2}، الجمعة` 
      : `${day1}، ${day2}`;
  };

  // Quick stats for student
  const stats = [
    { 
      name: 'الصف الدراسي', 
      value: isLoading ? '...' : (studentDetails.grade || 'غير محدد'),
      subValue: studentDetails.track ? `شعبة ${studentDetails.track}` : '',
      icon: BookOpenIcon, 
      color: 'bg-blue-500' 
    },
    { 
      name: 'أيام المجموعة', 
      value: isLoading ? '...' : formatGroupDays(),
      icon: CalendarIcon, 
      color: 'bg-green-500' 
    },
    { 
      name: 'موعد المجموعة', 
      value: isLoading ? '...' : (studentDetails.groupTime || 'غير محدد'),
      icon: ClockIcon, 
      color: 'bg-amber-500' 
    },
    { 
      name: 'حالة المدفوعات', 
      value: 'مدفوع',
      subValue: 'حتى شهر مايو',
      icon: CurrencyDollarIcon, 
      color: 'bg-purple-500' 
    },
  ];

  // Upcoming classes (would be dynamically generated in a real implementation)
  const today = new Date();
  const dayNames = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const currentDayName = dayNames[today.getDay()];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          مرحباً، {authState.user?.profile.full_name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          مرحباً بك في منصة الأستاذ التعليمية. يمكنك متابعة حضورك ومدفوعاتك والواجبات من هنا.
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
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  {stat.subValue && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">{stat.subValue}</p>
                  )}
                </div>
              </div>
            </div>
            <div className={`h-1 ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Today's class */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">حصة اليوم ({currentDayName})</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : studentDetails.groupDays?.day1 === currentDayName || 
               studentDetails.groupDays?.day2 === currentDayName || 
               (studentDetails.groupDays?.friday_included && currentDayName === 'الجمعة') ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 text-green-500 ml-3" />
                <div>
                  <h3 className="text-md font-medium text-green-800 dark:text-green-200">
                    لديك حصة اليوم
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {studentDetails.groupTime} - {studentDetails.grade} {studentDetails.track ? `(${studentDetails.track})` : ''}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center">
                <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 ml-3" />
                <div>
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">
                    لا توجد حصص اليوم
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    الحصة القادمة: {studentDetails.groupDays?.day1 === currentDayName ? studentDetails.groupDays?.day2 : studentDetails.groupDays?.day1}، {studentDetails.groupTime}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">آخر النشاطات</h2>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { icon: CalendarIcon, text: 'تم تسجيل حضورك', time: 'أمس', color: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300' },
            { icon: CurrencyDollarIcon, text: 'تم تسجيل دفعة شهر مايو', time: 'منذ 3 أيام', color: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300' },
            { icon: BookOpenIcon, text: 'تم تسليم واجب الفصل الثالث', time: 'منذ أسبوع', color: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300' },
          ].map((activity, index) => (
            <div key={index} className="px-6 py-4">
              <div className="flex items-center">
                <div className={`h-8 w-8 rounded-full ${activity.color} flex items-center justify-center`}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="mr-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.text}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
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

export default StudentDashboardPage;
