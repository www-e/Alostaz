/**
 * Book Payments Table Component
 * Displays and manages book payments for students
 */

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  getBookPaymentsForGroup, 
  recordBookPayment,
  deletePayment
} from '@/features/payments/api/payments-service';
import { BookPayment } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { 
  DocumentTextIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface BookPaymentsTableProps {
  groupDayId: number;
  gradeName: string;
  trackName?: string;
  onSelectStudent: (studentId: string, studentName: string) => void;
}

const BookPaymentsTable: React.FC<BookPaymentsTableProps> = ({ 
  groupDayId,
  gradeName,
  trackName,
  onSelectStudent
}) => {
  const toast = useToastContext();
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<BookPayment[]>([]);
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);
  
  // Fetch book payments data
  useEffect(() => {
    fetchPaymentsData();
  }, [groupDayId]);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const data = await getBookPaymentsForGroup(groupDayId);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching book payments data:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات مدفوعات الكتب');
    } finally {
      setLoading(false);
    }
  };

  // Delete a payment
  const handleDeletePayment = async (paymentId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدفعة؟')) return;
    
    try {
      setProcessingPayment(paymentId);
      
      await deletePayment(paymentId);
      
      // Refresh payments data
      await fetchPaymentsData();
      
      toast.success('تم حذف الدفعة بنجاح');
    } catch (error) {
      console.error('Error deleting payment:', error);
      toast.error('حدث خطأ أثناء حذف الدفعة');
    } finally {
      setProcessingPayment(null);
    }
  };

  // View receipt (placeholder for future implementation)
  const viewReceipt = (receiptNumber: string) => {
    toast.info(`عرض الإيصال رقم ${receiptNumber} - سيتم تنفيذ هذه الميزة في المستقبل`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            مدفوعات الكتب: {gradeName} {trackName && `(${trackName})`}
          </h2>
          <button
            onClick={() => onSelectStudent('', '')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="ml-2 -mr-1 h-5 w-5" />
            تسجيل دفعة جديدة
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            لا توجد مدفوعات كتب مسجلة لهذه المجموعة
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
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  اسم الكتاب
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  المبلغ
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  رقم الإيصال
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payments.map((payment, index) => (
                <tr key={payment.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {payment.student_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {payment.track_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {payment.book_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                    {payment.amount} ج.م
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                    {format(new Date(payment.payment_date), 'yyyy-MM-dd')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {payment.receipt_number ? (
                      <button
                        onClick={() => viewReceipt(payment.receipt_number!)}
                        className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-xs font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30"
                      >
                        <DocumentTextIcon className="ml-1 h-4 w-4" />
                        {payment.receipt_number}
                      </button>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => onSelectStudent(payment.student_id, payment.student_name)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title="تسجيل دفعة جديدة"
                      >
                        <PlusIcon className="h-5 w-5" />
                      </button>
                      {processingPayment === payment.id ? (
                        <div className="p-1">
                          <div className="animate-spin h-5 w-5 border-2 border-red-500 rounded-full border-t-transparent"></div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeletePayment(payment.id)}
                          className="p-1 rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
                          title="حذف الدفعة"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BookPaymentsTable;
