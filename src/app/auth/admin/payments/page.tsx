/**
 * Admin Payments Page
 * Manages student payments for monthly tuition and books
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getGroupDays } from '@/features/groups/api/groups-service';
import { getGrades } from '@/features/grades/api/grades-service';
import { GroupDay, Grade } from '@/types/database';
import MonthlyPaymentsTable from '@/components/features/payments/MonthlyPaymentsTable';
import BookPaymentsTable from '@/components/features/payments/BookPaymentsTable';
import BookPaymentForm from '@/components/features/payments/BookPaymentForm';
import StudentSelector from '@/components/features/payments/StudentSelector';
import { 
  ArrowPathIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';

const PaymentsPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for filters and data
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [groupDays, setGroupDays] = useState<GroupDay[]>([]);
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(null);
  const [selectedGroupDayId, setSelectedGroupDayId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'monthly' | 'books'>('monthly');
  
  // State for book payment form
  const [showBookPaymentForm, setShowBookPaymentForm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [selectedStudentName, setSelectedStudentName] = useState('');

  // Get grade and group from URL params
  useEffect(() => {
    const gradeId = searchParams.get('grade');
    const groupId = searchParams.get('group');
    const tab = searchParams.get('tab');
    
    if (gradeId) {
      setSelectedGradeId(Number(gradeId));
    }
    
    if (groupId) {
      setSelectedGroupDayId(Number(groupId));
    }
    
    if (tab === 'books') {
      setActiveTab('books');
    } else {
      setActiveTab('monthly');
    }
  }, [searchParams]);

  // Fetch grades and groups on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch grades
        const gradesData = await getGrades();
        setGrades(gradesData);
        
        // Set default grade if none selected
        if (!selectedGradeId && gradesData.length > 0) {
          setSelectedGradeId(gradesData[0].id);
        }
        
        // Fetch group days
        const groupDaysData = await getGroupDays();
        setGroupDays(groupDaysData);
        
        // Set default group if none selected and we have a grade selected
        if (!selectedGroupDayId && selectedGradeId && groupDaysData.length > 0) {
          const groupsForGrade = groupDaysData.filter(g => g.grade_id === selectedGradeId);
          if (groupsForGrade.length > 0) {
            setSelectedGroupDayId(groupsForGrade[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter groups when grade changes
  useEffect(() => {
    if (selectedGradeId) {
      const groupsForGrade = groupDays.filter(g => g.grade_id === selectedGradeId);
      
      // If no group is selected or the selected group doesn't belong to the selected grade,
      // select the first group of the grade
      if (
        !selectedGroupDayId || 
        !groupsForGrade.some(g => g.id === selectedGroupDayId)
      ) {
        if (groupsForGrade.length > 0) {
          setSelectedGroupDayId(groupsForGrade[0].id);
        } else {
          setSelectedGroupDayId(null);
        }
      }
    }
  }, [selectedGradeId, groupDays]);

  // Update URL when filters change
  useEffect(() => {
    if (selectedGradeId && selectedGroupDayId) {
      const params = new URLSearchParams();
      params.set('grade', selectedGradeId.toString());
      params.set('group', selectedGroupDayId.toString());
      params.set('tab', activeTab);
      
      router.push(`/payments?${params.toString()}`);
    }
  }, [selectedGradeId, selectedGroupDayId, activeTab, router]);

  // Handle grade change
  const handleGradeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gradeId = Number(e.target.value);
    setSelectedGradeId(gradeId);
  };

  // Handle group change
  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const groupId = Number(e.target.value);
    setSelectedGroupDayId(groupId);
  };

  // Handle tab change
  const handleTabChange = (tab: 'monthly' | 'books') => {
    setActiveTab(tab);
  };

  // Handle student selection for book payment
  const handleSelectStudent = (studentId: string, studentName: string) => {
    setSelectedStudentId(studentId);
    setSelectedStudentName(studentName);
    setShowBookPaymentForm(true);
  };

  // Get selected grade name
  const getSelectedGradeName = (): string => {
    if (!selectedGradeId) return '';
    const grade = grades.find(g => g.id === selectedGradeId);
    return grade ? grade.name : '';
  };

  // Get selected group track name
  const getSelectedGroupTrackName = (): string | undefined => {
    if (!selectedGroupDayId) return undefined;
    const group = groupDays.find(g => g.id === selectedGroupDayId);
    return group?.track_name;
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">إدارة المدفوعات</h1>
        <p className="text-gray-600 dark:text-gray-400">
          إدارة المدفوعات الشهرية ومدفوعات الكتب للطلاب
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الصف الدراسي
            </label>
            <select
              id="grade-select"
              value={selectedGradeId || ''}
              onChange={handleGradeChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading}
            >
              <option value="" disabled>اختر الصف الدراسي</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="group-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المجموعة
            </label>
            <select
              id="group-select"
              value={selectedGroupDayId || ''}
              onChange={handleGroupChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={loading || !selectedGradeId}
            >
              <option value="" disabled>اختر المجموعة</option>
              {groupDays
                .filter(group => group.grade_id === selectedGradeId)
                .map(group => (
                  <option key={group.id} value={group.id}>
                    {group.name} {group.track_name && `(${group.track_name})`}
                  </option>
                ))
              }
            </select>
          </div>

          <div className="flex items-end">
            <div className="w-full">
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
                <button
                  onClick={() => handleTabChange('monthly')}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    activeTab === 'monthly'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <CurrencyDollarIcon className="ml-2 h-5 w-5" />
                    المدفوعات الشهرية
                  </div>
                </button>
                <button
                  onClick={() => handleTabChange('books')}
                  className={`flex-1 py-2 px-4 text-sm font-medium ${
                    activeTab === 'books'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    <DocumentTextIcon className="ml-2 h-5 w-5" />
                    مدفوعات الكتب
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</p>
          </div>
        </div>
      ) : !selectedGradeId || !selectedGroupDayId ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            يرجى اختيار الصف الدراسي والمجموعة لعرض المدفوعات
          </p>
        </div>
      ) : (
        <div>
          {activeTab === 'monthly' ? (
            <MonthlyPaymentsTable
              groupDayId={selectedGroupDayId}
              gradeName={getSelectedGradeName()}
              trackName={getSelectedGroupTrackName()}
            />
          ) : (
            <>
              {/* Student selector for book payments */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      اختر طالب لتسجيل دفعة كتاب جديدة
                    </label>
                    <StudentSelector
                      groupDayId={selectedGroupDayId}
                      selectedStudentId={selectedStudentId}
                      onSelectStudent={handleSelectStudent}
                      placeholder="اختر طالب لتسجيل دفعة كتاب"
                    />
                  </div>
                </div>
              </div>
              
              <BookPaymentsTable
                groupDayId={selectedGroupDayId}
                gradeName={getSelectedGradeName()}
                trackName={getSelectedGroupTrackName()}
                onSelectStudent={handleSelectStudent}
              />
            </>
          )}
        </div>
      )}

      {/* Book Payment Form Modal */}
      {showBookPaymentForm && (
        <BookPaymentForm
          studentId={selectedStudentId}
          studentName={selectedStudentName}
          onClose={() => setShowBookPaymentForm(false)}
          onSuccess={() => {
            // Refresh the book payments table
            setShowBookPaymentForm(false);
            setSelectedStudentId('');
            setSelectedStudentName('');
          }}
        />
      )}
    </div>
  );
};

export default PaymentsPage;
