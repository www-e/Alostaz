/**
 * Monthly Payments Table Component
 * Displays and manages monthly tuition payments for students
 */

import React, { useState, useEffect } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  getMonthlyPaymentsForGroup, 
  recordMonthlyPayment,
  deletePayment
} from '@/features/payments/api/payments-service';
import { MonthlyPaymentStatus } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { 
  CheckCircleIcon, 
  XCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface MonthlyPaymentsTableProps {
  groupDayId: number;
  gradeName: string;
  trackName?: string;
}

const MonthlyPaymentsTable: React.FC<MonthlyPaymentsTableProps> = ({ 
  groupDayId,
  gradeName,
  trackName
}) => {
  const toast = useToastContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState<MonthlyPaymentStatus[]>([]);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  
  // Payment form state
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<MonthlyPaymentStatus | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [receiptNumber, setReceiptNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Fetch payments data for the current month
  useEffect(() => {
    fetchPaymentsData();
  }, [groupDayId, currentMonth]);

  const fetchPaymentsData = async () => {
    try {
      setLoading(true);
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1; // JavaScript months are 0-indexed
      
      const data = await getMonthlyPaymentsForGroup(groupDayId, year, month);
      setPayments(data);
    } catch (error) {
      console.error('Error fetching payments data:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات المدفوعات');
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

  // Open payment form for a student
  const openPaymentForm = (student: MonthlyPaymentStatus) => {
    setSelectedStudent(student);
    setPaymentAmount(student.payment?.amount || 0);
    setPaymentDate(student.payment?.payment_date || format(new Date(), 'yyyy-MM-dd'));
    setReceiptNumber(student.payment?.receipt_number || '');
    setNotes(student.payment?.notes || '');
    setShowPaymentForm(true);
  };

  // Close payment form
  const closePaymentForm = () => {
    setShowPaymentForm(false);
    setSelectedStudent(null);
    setPaymentAmount(0);
    setPaymentDate(format(new Date(), 'yyyy-MM-dd'));
    setReceiptNumber('');
    setNotes('');
  };

  // Submit payment form
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStudent) return;
    
    try {
      setProcessingPayment(selectedStudent.student_id);
      
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;
      
      await recordMonthlyPayment(
        selectedStudent.student_id,
        year,
        month,
        paymentAmount,
        new Date(paymentDate),
        receiptNumber,
        notes
      );
      
      // Refresh payments data
      await fetchPaymentsData();
      
      toast.success('تم تسجيل الدفعة بنجاح');
      closePaymentForm();
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('حدث خطأ أثناء تسجيل الدفعة');
    } finally {
      setProcessingPayment(null);
    }
  };

  // Delete a payment
  const handleDeletePayment = async (studentId: string, paymentId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدفعة؟')) return;
    
    try {
      setProcessingPayment(studentId);
      
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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            المدفوعات الشهرية: {gradeName} {trackName && `(${trackName})`}
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
        ) : payments.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            لا توجد بيانات للطلاب في هذه المجموعة
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
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  دفع؟
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  المبلغ المدفوع
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  التاريخ
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {payments.map((payment, index) => (
                <tr key={payment.student_id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {payment.student_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {payment.track_name || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    {processingPayment === payment.student_id ? (
                      <div className="flex justify-center">
                        <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                      </div>
                    ) : payment.has_paid ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500 mx-auto" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                    {payment.payment ? `${payment.payment.amount} ج.م` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                    {payment.payment ? format(new Date(payment.payment.payment_date), 'yyyy-MM-dd') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <div className="flex justify-center space-x-2 rtl:space-x-reverse">
                      <button
                        onClick={() => openPaymentForm(payment)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        title={payment.has_paid ? "تعديل الدفعة" : "تسجيل دفعة"}
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      {payment.has_paid && payment.payment && (
                        <button
                          onClick={() => handleDeletePayment(payment.student_id, payment.payment!.id)}
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

      {/* Payment Form Modal */}
      {showPaymentForm && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-right sm:w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      {selectedStudent.has_paid ? "تعديل دفعة" : "تسجيل دفعة جديدة"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        الطالب: {selectedStudent.student_name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        الشهر: {format(currentMonth, 'MMMM yyyy', { locale: ar })}
                      </p>

                      <form onSubmit={handlePaymentSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="payment-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            المبلغ (ج.م)
                          </label>
                          <input
                            type="number"
                            id="payment-amount"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                            min="0"
                            step="0.01"
                          />
                        </div>

                        <div>
                          <label htmlFor="payment-date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            تاريخ الدفع
                          </label>
                          <input
                            type="date"
                            id="payment-date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required
                          />
                        </div>

                        <div>
                          <label htmlFor="receipt-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            رقم الإيصال (اختياري)
                          </label>
                          <input
                            type="text"
                            id="receipt-number"
                            value={receiptNumber}
                            onChange={(e) => setReceiptNumber(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          />
                        </div>

                        <div>
                          <label htmlFor="payment-notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ملاحظات (اختياري)
                          </label>
                          <textarea
                            id="payment-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          ></textarea>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handlePaymentSubmit}
                  disabled={processingPayment !== null}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingPayment !== null ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      جاري المعالجة...
                    </>
                  ) : (
                    'حفظ'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closePaymentForm}
                  disabled={processingPayment !== null}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlyPaymentsTable;
