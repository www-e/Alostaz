/**
 * Attendance Table Component
 * Displays student attendance for a specific group and month
 * Allows admins to toggle attendance status
 */

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  getGroupAttendanceForMonth, 
  updateAttendanceStatus, 
  formatDateWithArabicDay 
} from '@/features/attendance/api/attendance-service';
import { AttendanceStatus, StudentWithAttendance } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ClockIcon,
  ChevronRightIcon,
  ChevronLeftIcon
} from '@heroicons/react/24/outline';

interface AttendanceTableProps {
  groupDayId: number;
  gradeName: string;
  trackName?: string;
}

const AttendanceTable: React.FC<AttendanceTableProps> = ({ 
  groupDayId,
  gradeName,
  trackName
}) => {
  const toast = useToastContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<StudentWithAttendance[]>([]);
  const [groupDates, setGroupDates] = useState<Date[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<Map<string, any>>(new Map());
  const [updatingAttendance, setUpdatingAttendance] = useState<string | null>(null);

  // Fetch attendance data for the current month
  useEffect(() => {
    fetchAttendanceData();
  }, [groupDayId, currentMonth]);

  const fetchAttendanceData = async () => {
    try {
      setLoading(true);
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1; // JavaScript months are 0-indexed
      
      const data = await getGroupAttendanceForMonth(groupDayId, year, month);
      
      setStudents(data.students);
      setGroupDates(data.groupDates);
      setAttendanceMap(data.attendanceMap);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات الحضور');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to the previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => subMonths(prevMonth, 1));
  };

  // Navigate to the next month
  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => addMonths(prevMonth, 1));
  };

  // Toggle attendance status for a student on a specific date
  const toggleAttendanceStatus = async (studentId: string, date: Date) => {
    try {
      const mapKey = `${studentId}_${format(date, 'yyyy-MM-dd')}`;
      setUpdatingAttendance(mapKey);
      
      // Get current status or default to 'غاب'
      const currentRecord = attendanceMap.get(mapKey);
      const currentStatus = currentRecord?.status || 'غاب';
      
      // Determine next status in the cycle: غاب -> حضر -> تأخر -> غاب
      let nextStatus: AttendanceStatus;
      switch (currentStatus) {
        case 'غاب':
          nextStatus = 'حضر';
          break;
        case 'حضر':
          nextStatus = 'تأخر';
          break;
        case 'تأخر':
          nextStatus = 'غاب';
          break;
        default:
          nextStatus = 'حضر';
      }
      
      // Update the status in the database
      await updateAttendanceStatus(studentId, date, nextStatus);
      
      // Update local state
      const newMap = new Map(attendanceMap);
      newMap.set(mapKey, {
        student_id: studentId,
        attendance_date: format(date, 'yyyy-MM-dd'),
        status: nextStatus
      });
      setAttendanceMap(newMap);
      
      toast.success(`تم تحديث حالة الحضور بنجاح`);
    } catch (error) {
      console.error('Error updating attendance status:', error);
      toast.error('حدث خطأ أثناء تحديث حالة الحضور');
    } finally {
      setUpdatingAttendance(null);
    }
  };

  // Render attendance status icon
  const renderAttendanceStatus = (studentId: string, date: Date) => {
    const mapKey = `${studentId}_${format(date, 'yyyy-MM-dd')}`;
    const isUpdating = updatingAttendance === mapKey;
    const record = attendanceMap.get(mapKey);
    const status = record?.status || 'غاب';
    
    if (isUpdating) {
      return (
        <div className="flex justify-center items-center">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      );
    }
    
    switch (status) {
      case 'حضر':
        return (
          <div className="flex justify-center">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
          </div>
        );
      case 'غاب':
        return (
          <div className="flex justify-center">
            <XCircleIcon className="h-6 w-6 text-red-500" />
          </div>
        );
      case 'تأخر':
        return (
          <div className="flex justify-center">
            <ClockIcon className="h-6 w-6 text-amber-500" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            جدول الحضور: {gradeName} {trackName && `(${trackName})`}
          </h2>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Previous month"
            >
              <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {format(currentMonth, 'MMMM yyyy', { locale: ar })}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Next month"
            >
              <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : groupDates.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            لا توجد مواعيد للمجموعة في هذا الشهر
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  اسم الطالب
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الشعبة
                </th>
                {groupDates.map((date, index) => (
                  <th 
                    key={index} 
                    scope="col" 
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {formatDateWithArabicDay(date)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {students.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {student.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {trackName || '-'}
                  </td>
                  {groupDates.map((date, dateIndex) => (
                    <td 
                      key={dateIndex} 
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => toggleAttendanceStatus(student.id, date)}
                    >
                      {renderAttendanceStatus(student.id, date)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-end space-x-4 rtl:space-x-reverse">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-500 ml-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400">حضر</span>
          </div>
          <div className="flex items-center">
            <XCircleIcon className="h-5 w-5 text-red-500 ml-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400">غاب</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-5 w-5 text-amber-500 ml-1" />
            <span className="text-sm text-gray-600 dark:text-gray-400">تأخر</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
