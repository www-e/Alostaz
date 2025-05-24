/**
 * Payment Settings Form Component
 * Allows admins to configure payment amounts for different grades and tracks
 */

import React, { useState, useEffect } from 'react';
import { getGrades, getTracks } from '@/features/grades/api/grades-service';
import { 
  getPaymentSettings, 
  updatePaymentSettings, 
  createPaymentSettings 
} from '@/features/payments/api/payments-service';
import { Grade, Track, PaymentSettings } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';
import { 
  ArrowPathIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface PaymentSettingsFormProps {
  onSuccess?: () => void;
}

const PaymentSettingsForm: React.FC<PaymentSettingsFormProps> = ({ onSuccess }) => {
  const toast = useToastContext();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [settings, setSettings] = useState<PaymentSettings[]>([]);
  
  // Selected grade and track for adding new settings
  const [selectedGradeId, setSelectedGradeId] = useState<number | ''>('');
  const [selectedTrackId, setSelectedTrackId] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(0);
  const [bookAmount, setBookAmount] = useState<number>(0);
  
  // Fetch grades, tracks, and payment settings
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch grades
      const gradesData = await getGrades();
      setGrades(gradesData);
      
      // Fetch tracks
      const tracksData = await getTracks();
      setTracks(tracksData);
      
      // Fetch payment settings
      const settingsData = await fetchAllPaymentSettings(gradesData);
      setSettings(settingsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment settings for all grades and tracks
  const fetchAllPaymentSettings = async (gradesData: Grade[]): Promise<PaymentSettings[]> => {
    const allSettings: PaymentSettings[] = [];
    
    for (const grade of gradesData) {
      try {
        // Get default settings for the grade (without track)
        const defaultSettings = await getPaymentSettings(grade.id);
        if (defaultSettings) {
          allSettings.push({
            ...defaultSettings,
            grade_name: grade.name
          });
        }
        
        // Get settings for each track in the grade
        const gradeTracks = tracks.filter(track => track.grade_id === grade.id);
        for (const track of gradeTracks) {
          try {
            const trackSettings = await getPaymentSettings(grade.id, track.id);
            if (trackSettings) {
              allSettings.push({
                ...trackSettings,
                grade_name: grade.name,
                track_name: track.name
              });
            }
          } catch (error) {
            console.error(`Error fetching settings for grade ${grade.id} and track ${track.id}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error fetching settings for grade ${grade.id}:`, error);
      }
    }
    
    return allSettings;
  };

  // Handle form submission for adding new payment settings
  const handleAddSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedGradeId) {
      toast.error('يرجى اختيار الصف الدراسي');
      return;
    }
    
    // Check if settings already exist for this grade and track
    const existingSettings = settings.find(
      s => s.grade_id === Number(selectedGradeId) && s.track_id === selectedTrackId
    );
    
    if (existingSettings) {
      toast.error('توجد إعدادات بالفعل لهذا الصف والشعبة');
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Create new payment settings
      await createPaymentSettings({
        grade_id: Number(selectedGradeId),
        track_id: selectedTrackId,
        monthly_amount: monthlyAmount,
        book_amount: bookAmount
      });
      
      toast.success('تم إضافة إعدادات الدفع بنجاح');
      
      // Reset form
      setSelectedGradeId('');
      setSelectedTrackId(null);
      setMonthlyAmount(0);
      setBookAmount(0);
      
      // Refresh data
      await fetchData();
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding payment settings:', error);
      toast.error('حدث خطأ أثناء إضافة إعدادات الدفع');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle updating existing payment settings
  const handleUpdateSettings = async (settingId: number, field: 'monthly_amount' | 'book_amount', value: number) => {
    try {
      const settingToUpdate = settings.find(s => s.id === settingId);
      if (!settingToUpdate) return;
      
      await updatePaymentSettings(settingId, {
        [field]: value
      });
      
      // Update local state
      setSettings(prevSettings => 
        prevSettings.map(s => 
          s.id === settingId ? { ...s, [field]: value } : s
        )
      );
      
      toast.success('تم تحديث إعدادات الدفع بنجاح');
    } catch (error) {
      console.error('Error updating payment settings:', error);
      toast.error('حدث خطأ أثناء تحديث إعدادات الدفع');
    }
  };

  // Handle deleting payment settings
  const handleDeleteSettings = async (settingId: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الإعدادات؟')) return;
    
    try {
      await deletePaymentSettings(settingId);
      
      // Update local state
      setSettings(prevSettings => prevSettings.filter(s => s.id !== settingId));
      
      toast.success('تم حذف إعدادات الدفع بنجاح');
    } catch (error) {
      console.error('Error deleting payment settings:', error);
      toast.error('حدث خطأ أثناء حذف إعدادات الدفع');
    }
  };

  // Delete payment settings (function to be implemented in payments-service.ts)
  const deletePaymentSettings = async (settingId: number) => {
    try {
      const { error } = await fetch(`/api/payment-settings/${settingId}`, {
        method: 'DELETE'
      }).then(res => res.json());
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting payment settings:', error);
      throw error;
    }
  };

  // Get filtered tracks based on selected grade
  const filteredTracks = selectedGradeId 
    ? tracks.filter(track => track.grade_id === Number(selectedGradeId))
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            إعدادات المدفوعات
          </h2>
          <button
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="animate-spin ml-1.5 h-4 w-4" />
                جاري التحميل...
              </>
            ) : (
              <>
                <ArrowPathIcon className="ml-1.5 h-4 w-4" />
                تحديث
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add New Settings Form */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">
          إضافة إعدادات جديدة
        </h3>
        
        <form onSubmit={handleAddSettings} className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-1">
            <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الصف الدراسي
            </label>
            <select
              id="grade-select"
              value={selectedGradeId}
              onChange={(e) => setSelectedGradeId(e.target.value ? Number(e.target.value) : '')}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={submitting}
            >
              <option value="">اختر الصف</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>
                  {grade.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="track-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الشعبة (اختياري)
            </label>
            <select
              id="track-select"
              value={selectedTrackId || ''}
              onChange={(e) => setSelectedTrackId(e.target.value ? Number(e.target.value) : null)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              disabled={submitting || !selectedGradeId}
            >
              <option value="">بدون شعبة (افتراضي)</option>
              {filteredTracks.map(track => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="monthly-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المبلغ الشهري (ج.م)
            </label>
            <input
              type="number"
              id="monthly-amount"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              min="0"
              step="0.01"
              disabled={submitting}
            />
          </div>
          
          <div className="md:col-span-1">
            <label htmlFor="book-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              مبلغ الكتب (ج.م)
            </label>
            <input
              type="number"
              id="book-amount"
              value={bookAmount}
              onChange={(e) => setBookAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              min="0"
              step="0.01"
              disabled={submitting}
            />
          </div>
          
          <div className="md:col-span-1 flex items-end">
            <button
              type="submit"
              disabled={submitting || !selectedGradeId}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <ArrowPathIcon className="animate-spin ml-1.5 h-4 w-4" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <PlusIcon className="ml-1.5 h-4 w-4" />
                  إضافة
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Settings Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : settings.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            لا توجد إعدادات دفع مسجلة
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الصف الدراسي
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الشعبة
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  المبلغ الشهري (ج.م)
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  مبلغ الكتب (ج.م)
                </th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {settings.map((setting, index) => (
                <tr key={setting.id} className={index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {setting.grade_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {setting.track_name || 'افتراضي (جميع الشعب)'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <input
                      type="number"
                      value={setting.monthly_amount}
                      onChange={(e) => handleUpdateSettings(setting.id, 'monthly_amount', Number(e.target.value))}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <input
                      type="number"
                      value={setting.book_amount}
                      onChange={(e) => handleUpdateSettings(setting.id, 'book_amount', Number(e.target.value))}
                      className="w-24 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <button
                      onClick={() => handleDeleteSettings(setting.id)}
                      className="inline-flex items-center p-1.5 border border-transparent rounded-full text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 focus:outline-none"
                      title="حذف"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
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

export default PaymentSettingsForm;
