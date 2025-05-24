/**
 * Student Payments Page
 * Displays payment history and status for the logged-in student
 */

'use client';

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useAuth } from '@/hooks/useAuth';
import { getStudentById } from '@/features/students/api/students-service';
import { getStudentPaymentHistory, getStudentPaymentStats } from '@/features/payments/api/payments-service';
import { Student, Payment } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import StudentPaymentHistory from '@/components/features/payments/StudentPaymentHistory';
import { 
  CurrencyDollarIcon,
  BookOpenIcon,
  CalendarIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface PaymentStats {
  total_paid: number;
  monthly_paid: number;
  books_paid: number;
  last_payment_date: string | null;
}

const StudentPaymentsPage: React.FC = () => {
  const { user } = useAuth();
  const toast = useToastContext();
  
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<Student | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats>({
    total_paid: 0,
    monthly_paid: 0,
    books_paid: 0,
    last_payment_date: null
  });

  // Fetch student data and payment history
  useEffect(() => {
    if (user?.id) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      // Get student data
      const studentData = await getStudentById(user.id);
      setStudent(studentData);
      
      // Get payment history
      const paymentsData = await getStudentPaymentHistory(user.id);
      setPayments(paymentsData);
      
      // Get payment statistics
      const statsData = await getStudentPaymentStats(user.id);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching student data:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات الطالب');
    } finally {
      setLoading(false);
    }
  };

  // Get current month's payment status
  const getCurrentMonthPaymentStatus = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    const currentMonthPayment = payments.find(payment => 
      payment.payment_type === 'monthly' && 
      payment.year === currentYear && 
      payment.month === currentMonth
    );
    
    return {
      paid: !!currentMonthPayment,
      amount: currentMonthPayment?.amount || 0,
      date: currentMonthPayment?.payment_date || null
    };
  };

  const currentMonthStatus = getCurrentMonthPaymentStatus();
  const currentMonthName = format(new Date(), 'MMMM yyyy', { locale: ar });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">المدفوعات</h1>
        <p className="text-gray-600 dark:text-gray-400">
          عرض سجل المدفوعات وحالة المدفوعات الشهرية
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">جاري تحميل البيانات...</p>
          </div>
        </div>
      ) : !student ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            لم يتم العثور على بيانات الطالب
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Payment Stats Cards */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Current Month Payment Status */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-r-4 ${
              currentMonthStatus.paid ? 'border-green-500' : 'border-red-500'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    حالة دفع شهر {currentMonthName}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {currentMonthStatus.paid ? (
                      <span className="text-green-600 dark:text-green-400">تم الدفع</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400">لم يتم الدفع</span>
                    )}
                  </h3>
                  {currentMonthStatus.paid && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      المبلغ: {currentMonthStatus.amount} ج.م
                      <br />
                      بتاريخ: {format(new Date(currentMonthStatus.date!), 'yyyy-MM-dd')}
                    </p>
                  )}
                </div>
                <div className={`p-3 rounded-full ${
                  currentMonthStatus.paid ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'
                }`}>
                  <CurrencyDollarIcon className={`h-6 w-6 ${
                    currentMonthStatus.paid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`} />
                </div>
              </div>
            </div>

            {/* Total Paid */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-r-4 border-blue-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    إجمالي المدفوعات
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {stats.total_paid} ج.م
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    شهرية: {stats.monthly_paid} ج.م
                    <br />
                    كتب: {stats.books_paid} ج.م
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/20">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </div>

            {/* Last Payment */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-r-4 border-purple-500">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    آخر دفعة
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-gray-900 dark:text-white">
                    {stats.last_payment_date ? (
                      format(new Date(stats.last_payment_date), 'yyyy-MM-dd')
                    ) : (
                      'لا توجد مدفوعات'
                    )}
                  </h3>
                  {stats.last_payment_date && (
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      منذ {Math.floor((new Date().getTime() - new Date(stats.last_payment_date).getTime()) / (1000 * 60 * 60 * 24))} يوم
                    </p>
                  )}
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/20">
                  <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="col-span-1 md:col-span-3">
            <StudentPaymentHistory 
              studentId={user!.id} 
              studentName={student.full_name}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPaymentsPage;
