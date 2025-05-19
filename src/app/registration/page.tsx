'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FaPaperPlane } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function Registration() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  // Form state
  const [formData, setFormData] = useState({
    studentName: '',
    studentPhone: '',
    parentPhone: '',
    grade: '',
    section: '',
    group: '',
    time: '',
  });
  
  // Validation state
  const [errors, setErrors] = useState({
    studentName: '',
    studentPhone: '',
    parentPhone: '',
    grade: '',
    section: '',
    group: '',
    time: '',
  });
  
  // UI state
  const [showSection, setShowSection] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear validation error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Show section dropdown only for second grade
    if (name === 'grade') {
      setShowSection(value === 'second');
      
      // Reset section value if not second grade
      if (value !== 'second') {
        setFormData(prev => ({
          ...prev,
          section: '',
        }));
      }
    }
    
    // Update available times based on selected group
    if (name === 'group') {
      if (value === 'sat_tue') {
        setAvailableTimes(['2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM']);
      } else if (value === 'sun_wed') {
        setAvailableTimes(['2:00 PM', '4:00 PM', '6:00 PM', '8:00 PM']);
      } else {
        setAvailableTimes([]);
      }
      
      // Reset time when group changes
      setFormData(prev => ({
        ...prev,
        time: '',
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // Validate student name
    if (!formData.studentName.trim()) {
      newErrors.studentName = 'يرجى إدخال اسم الطالب';
      isValid = false;
    }
    
    // Validate student phone (must be Egyptian number)
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(formData.studentPhone)) {
      newErrors.studentPhone = 'يرجى إدخال رقم هاتف صحيح (11 رقم يبدأ بـ 01)';
      isValid = false;
    }
    
    // Validate parent phone (must be Egyptian number)
    if (!phoneRegex.test(formData.parentPhone)) {
      newErrors.parentPhone = 'يرجى إدخال رقم هاتف صحيح (11 رقم يبدأ بـ 01)';
      isValid = false;
    }
    
    // Validate grade
    if (!formData.grade) {
      newErrors.grade = 'يرجى اختيار الصف الدراسي';
      isValid = false;
    }
    
    // Validate section (only if second grade is selected)
    if (formData.grade === 'second' && !formData.section) {
      newErrors.section = 'يرجى اختيار الشعبة';
      isValid = false;
    }
    
    // Validate group
    if (!formData.group) {
      newErrors.group = 'يرجى اختيار المجموعة';
      isValid = false;
    }
    
    // Validate time
    if (!formData.time) {
      newErrors.time = 'يرجى اختيار الموعد';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            student_name: formData.studentName,
            student_phone: formData.studentPhone,
            parent_phone: formData.parentPhone,
            grade: formData.grade,
            section: formData.section || null,
            group: formData.group,
            time: formData.time,
            registration_date: new Date().toISOString(),
          },
        ]);
      
      if (error) {
        throw error;
      }
      
      // Show success message and reset form
      setSubmitSuccess(true);
      setFormData({
        studentName: '',
        studentPhone: '',
        parentPhone: '',
        grade: '',
        section: '',
        group: '',
        time: '',
      });
      
      // Redirect to thank you page or home after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ أثناء تسجيل البيانات. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main>
      <Navbar />
      
      <div className="min-h-screen pt-32 pb-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-center text-primary dark:text-primary-light mb-8">حجز الترم الثاني</h1>
            
            {submitSuccess ? (
              <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg text-center">
                <p className="text-lg font-bold">تم التسجيل بنجاح!</p>
                <p className="mt-2">سيتم التواصل معك قريباً.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Name */}
                <div className="form-group">
                  <label htmlFor="studentName" className="block text-gray-700 dark:text-gray-300 mb-2">
                    اسم الطالب
                  </label>
                  <input
                    type="text"
                    id="studentName"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.studentName ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.studentName && (
                    <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>
                  )}
                </div>
                
                {/* Student Phone */}
                <div className="form-group">
                  <label htmlFor="studentPhone" className="block text-gray-700 dark:text-gray-300 mb-2">
                    رقم الطالب
                  </label>
                  <input
                    type="tel"
                    id="studentPhone"
                    name="studentPhone"
                    value={formData.studentPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.studentPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.studentPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.studentPhone}</p>
                  )}
                </div>
                
                {/* Parent Phone */}
                <div className="form-group">
                  <label htmlFor="parentPhone" className="block text-gray-700 dark:text-gray-300 mb-2">
                    رقم ولي الأمر
                  </label>
                  <input
                    type="tel"
                    id="parentPhone"
                    name="parentPhone"
                    value={formData.parentPhone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.parentPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  />
                  {errors.parentPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>
                  )}
                </div>
                
                {/* Grade */}
                <div className="form-group">
                  <label htmlFor="grade" className="block text-gray-700 dark:text-gray-300 mb-2">
                    الصف الدراسي
                  </label>
                  <select
                    id="grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.grade ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">اختر الصف</option>
                    <option value="first">الصف الأول الثانوي</option>
                    <option value="second">الصف الثاني الثانوي</option>
                    <option value="third">الصف الثالث الثانوي</option>
                  </select>
                  {errors.grade && (
                    <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
                  )}
                </div>
                
                {/* Section (only for second grade) */}
                {showSection && (
                  <div className="form-group">
                    <label htmlFor="section" className="block text-gray-700 dark:text-gray-300 mb-2">
                      الشعبة
                    </label>
                    <select
                      id="section"
                      name="section"
                      value={formData.section}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.section ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                      } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                    >
                      <option value="">اختر الشعبة</option>
                      <option value="scientific">علمي</option>
                      <option value="literary">أدبي</option>
                    </select>
                    {errors.section && (
                      <p className="text-red-500 text-sm mt-1">{errors.section}</p>
                    )}
                  </div>
                )}
                
                {/* Group */}
                <div className="form-group">
                  <label htmlFor="group" className="block text-gray-700 dark:text-gray-300 mb-2">
                    المجموعة
                  </label>
                  <select
                    id="group"
                    name="group"
                    value={formData.group}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.group ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary`}
                  >
                    <option value="">اختر المجموعة</option>
                    <option value="sat_tue">السبت والثلاثاء</option>
                    <option value="sun_wed">الأحد والأربعاء</option>
                  </select>
                  {errors.group && (
                    <p className="text-red-500 text-sm mt-1">{errors.group}</p>
                  )}
                </div>
                
                {/* Time */}
                <div className="form-group">
                  <label htmlFor="time" className="block text-gray-700 dark:text-gray-300 mb-2">
                    الموعد
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={!formData.group}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.time ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary ${
                      !formData.group ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <option value="">اختر الموعد</option>
                    {availableTimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                  )}
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-lg transition-colors duration-300 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  <FaPaperPlane />
                  {isSubmitting ? 'جاري التسجيل...' : 'تسجيل'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
