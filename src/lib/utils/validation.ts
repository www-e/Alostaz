/**
 * Validation utility functions for the educational center system
 */

/**
 * Validate an email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a phone number (Egyptian format)
 */
export const isValidEgyptianPhone = (phone: string): boolean => {
  // Remove any non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Egyptian phone numbers are 11 digits and start with 01
  return digitsOnly.length === 11 && digitsOnly.startsWith('01');
};

/**
 * Validate a password (minimum 8 characters, at least one letter and one number)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);
};

/**
 * Validate required fields in an object
 */
export const validateRequiredFields = (data: Record<string, any>, requiredFields: string[]): string[] => {
  const missingFields: string[] = [];
  
  for (const field of requiredFields) {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      missingFields.push(field);
    }
  }
  
  return missingFields;
};

/**
 * Get validation error message for a field
 */
export const getValidationErrorMessage = (field: string): string => {
  const fieldMessages: Record<string, string> = {
    full_name: 'الاسم الكامل مطلوب',
    email: 'البريد الإلكتروني مطلوب وبصيغة صحيحة',
    password: 'كلمة المرور مطلوبة (8 أحرف على الأقل، حرف وأرقام)',
    phone: 'رقم الهاتف مطلوب وبصيغة صحيحة',
    parent_phone: 'رقم هاتف ولي الأمر مطلوب وبصيغة صحيحة',
    grade_id: 'الصف الدراسي مطلوب',
    group_day_id: 'مجموعة الأيام مطلوبة',
    track_id: 'الشعبة مطلوبة',
    amount: 'المبلغ مطلوب',
    payment_date: 'تاريخ الدفع مطلوب',
    book_name: 'اسم المذكرة مطلوب',
    title: 'العنوان مطلوب',
    due_date: 'تاريخ التسليم مطلوب'
  };
  
  return fieldMessages[field] || `${field} مطلوب`;
};
