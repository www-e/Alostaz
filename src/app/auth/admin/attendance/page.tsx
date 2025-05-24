/**
 * Admin Attendance Page
 * Displays attendance records for students by group and allows marking attendance
 */

'use client';

import React, { useState } from 'react';
import GroupSelector from '@/components/features/attendance/GroupSelector';
import AttendanceTable from '@/components/features/attendance/AttendanceTable';

const AdminAttendancePage: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<{
    id: number;
    gradeName: string;
    trackName?: string;
  } | null>(null);

  // Handle group selection from the GroupSelector component
  const handleGroupSelect = (groupId: number, gradeName: string, trackName?: string) => {
    setSelectedGroup({
      id: groupId,
      gradeName,
      trackName
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          سجل الحضور
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          قم بإدارة سجل الحضور للطلاب حسب المجموعة والتاريخ
        </p>
      </div>

      {/* Group selector */}
      <GroupSelector onGroupSelect={handleGroupSelect} />

      {/* Attendance table */}
      {selectedGroup ? (
        <AttendanceTable 
          groupDayId={selectedGroup.id} 
          gradeName={selectedGroup.gradeName}
          trackName={selectedGroup.trackName}
        />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            يرجى اختيار مجموعة لعرض سجل الحضور
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminAttendancePage;
