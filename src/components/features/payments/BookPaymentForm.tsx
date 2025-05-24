/**
 * Book Payment Form Component
 * Form for adding or editing book payments
 */

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { recordBookPayment } from '@/features/payments/api/payments-service';
import { getAvailableBooks } from '@/features/payments/api/books-service';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface BookPaymentFormProps {
  studentId: string;
  studentName: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface BookOption {
  id: number;
  name: string;
  price: number;
}

const BookPaymentForm: React.FC<BookPaymentFormProps> = ({
  studentId,
  studentName,
  onClose,
  onSuccess
}) => {
  const toast = useToastContext();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [books, setBooks] = useState<BookOption[]>([]);
  
  // Form state
  const [selectedBookId, setSelectedBookId] = useState<number | ''>('');
  const [customBookName, setCustomBookName] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'));
  const [receiptNumber, setReceiptNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [isCustomBook, setIsCustomBook] = useState(false);

  // Fetch available books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const booksData = await getAvailableBooks();
        setBooks(booksData);
        
        // Set default book if available
        if (booksData.length > 0) {
          setSelectedBookId(booksData[0].id);
          setAmount(booksData[0].price);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        toast.error('حدث خطأ أثناء تحميل قائمة الكتب');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Handle book selection change
  const handleBookChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bookId = e.target.value;
    
    if (bookId === 'custom') {
      setIsCustomBook(true);
      setSelectedBookId('');
      setCustomBookName('');
      setAmount(0);
    } else {
      setIsCustomBook(false);
      setSelectedBookId(Number(bookId));
      
      // Update amount based on selected book
      const selectedBook = books.find(book => book.id === Number(bookId));
      if (selectedBook) {
        setAmount(selectedBook.price);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId) {
      toast.error('يرجى اختيار طالب أولاً');
      return;
    }
    
    if (!isCustomBook && !selectedBookId) {
      toast.error('يرجى اختيار كتاب');
      return;
    }
    
    if (isCustomBook && !customBookName) {
      toast.error('يرجى إدخال اسم الكتاب');
      return;
    }
    
    if (amount <= 0) {
      toast.error('يرجى إدخال مبلغ صحيح');
      return;
    }
    
    try {
      setSubmitting(true);
      
      await recordBookPayment(
        studentId,
        isCustomBook ? customBookName : String(selectedBookId),
        amount,
        new Date(paymentDate),
        receiptNumber,
        notes
      );
      
      toast.success('تم تسجيل دفعة الكتاب بنجاح');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error recording book payment:', error);
      toast.error('حدث خطأ أثناء تسجيل دفعة الكتاب');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 left-0 pt-4 pl-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-white dark:bg-gray-800 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span className="sr-only">إغلاق</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-right sm:w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                  تسجيل دفعة كتاب جديدة
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    الطالب: {studentName || 'يرجى اختيار طالب'}
                  </p>

                  {loading ? (
                    <div className="flex justify-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="book-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          الكتاب
                        </label>
                        <select
                          id="book-select"
                          value={isCustomBook ? 'custom' : selectedBookId}
                          onChange={handleBookChange}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                          disabled={!studentId}
                        >
                          {books.map(book => (
                            <option key={book.id} value={book.id}>
                              {book.name} - {book.price} ج.م
                            </option>
                          ))}
                          <option value="custom">كتاب آخر (إدخال يدوي)</option>
                        </select>
                      </div>

                      {isCustomBook && (
                        <div>
                          <label htmlFor="custom-book-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            اسم الكتاب
                          </label>
                          <input
                            type="text"
                            id="custom-book-name"
                            value={customBookName}
                            onChange={(e) => setCustomBookName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                            required={isCustomBook}
                            disabled={!studentId}
                          />
                        </div>
                      )}

                      <div>
                        <label htmlFor="payment-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          المبلغ (ج.م)
                        </label>
                        <input
                          type="number"
                          id="payment-amount"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                          required
                          min="0"
                          step="0.01"
                          disabled={!studentId}
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
                          disabled={!studentId}
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
                          disabled={!studentId}
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
                          disabled={!studentId}
                        ></textarea>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !studentId}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
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
              onClick={onClose}
              disabled={submitting}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              إلغاء
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPaymentForm;
