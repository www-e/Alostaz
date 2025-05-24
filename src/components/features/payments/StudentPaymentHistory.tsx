/**
 * Student Payment History Component
 * Displays payment history for a specific student
 */

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { getStudentPaymentHistory } from '@/features/payments/api/payments-service';
import { Payment } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { 
  DocumentTextIcon,
  CurrencyDollarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface StudentPaymentHistoryProps {
  studentId: string;
  studentName: string;
}

const StudentPaymentHistory: React.FC<StudentPaymentHistoryProps> = ({ 
  studentId,
  studentName
}) => {
  const toast = useToastContext();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<Payment[]>([]);
  
  // Fetch payment history for the student
  useEffect(() => {
    if (studentId) {
      fetchPaymentHistory();
    }
  }, [studentId]);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      const data = await getStudentPaymentHistory(studentId);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payment history:', error);
      toast.error('حدث خطأ أثناء تحميل سجل المدفوعات');
    } finally {
      setLoading(false);
    }
  };

  // Format month name in Arabic
  const formatMonthName = (month: number) => {
    const date = new Date(2000, month - 1, 1);
    return format(date, 'MMMM', { locale: ar });
  };

  // View receipt (placeholder for future implementation)
  const viewReceipt = (receiptNumber: string) => {
    toast.info(`عرض الإيصال رقم ${receiptNumber} - سيتم تنفيذ هذه الميزة في المستقبل`);
  };

  // Group payments by year for better display
  const paymentsByYear = payments.reduce((acc, payment) => {
    const year = payment.year || new Date(payment.payment_date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(payment);
    return acc;
  }, {} as Record<number, Payment[]>);

  // Sort years in descending order
  const sortedYears = Object.keys(paymentsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            سجل المدفوعات: {studentName}
          </h2>
          <button
            onClick={fetchPaymentHistory}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 focus:outline-none"
          >
            تحديث
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            لا توجد مدفوعات مسجلة لهذا الطالب
          </div>
        ) : (
          <div className="space-y-6">
            {sortedYears.map(year => (
              <div key={year} className="space-y-2">
                <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 pb-2">
                  {year}
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          التاريخ
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          نوع الدفعة
                        </th>
                        <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          التفاصيل
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          المبلغ
                        </th>
                        <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          رقم الإيصال
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {paymentsByYear[year]
                        .sort((a, b) => new Date(b.payment_date).getTime() - new Date(a.payment_date).getTime())
                        .map(payment => (
                          <tr key={payment.id}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                              {format(new Date(payment.payment_date), 'yyyy-MM-dd')}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {payment.payment_type === 'monthly' ? (
                                <div className="flex items-center">
                                  <CurrencyDollarIcon className="ml-1.5 h-5 w-5 text-green-500" />
                                  <span className="text-sm text-gray-900 dark:text-white">مصاريف شهرية</span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <BookOpenIcon className="ml-1.5 h-5 w-5 text-blue-500" />
                                  <span className="text-sm text-gray-900 dark:text-white">كتاب</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                              {payment.payment_type === 'monthly' && payment.month ? (
                                <span>شهر {formatMonthName(payment.month)}</span>
                              ) : payment.payment_type === 'book' && payment.book_name ? (
                                <span>{payment.book_name}</span>
                              ) : (
                                <span>-</span>
                              )}
                              {payment.notes && (
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                  {payment.notes}
                                </p>
                              )}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-900 dark:text-white">
                              {payment.amount} ج.م
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                              {payment.receipt_number ? (
                                <button
                                  onClick={() => viewReceipt(payment.receipt_number!)}
                                  className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
                                >
                                  <DocumentTextIcon className="ml-1 h-4 w-4" />
                                  {payment.receipt_number}
                                </button>
                              ) : (
                                <span className="text-gray-500 dark:text-gray-400">-</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPaymentHistory;
