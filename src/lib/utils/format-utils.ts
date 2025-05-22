/**
 * Formatting utility functions for the educational center system
 */

/**
 * Format a number as currency (EGP)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a number in Arabic numerals
 */
export const formatNumberArabic = (num: number): string => {
  return new Intl.NumberFormat('ar-EG').format(num);
};

/**
 * Convert Western numerals to Arabic numerals
 */
export const westernToArabicNumerals = (str: string): string => {
  const numerals: Record<string, string> = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
  };
  
  return str.replace(/[0-9]/g, match => numerals[match]);
};

/**
 * Convert Arabic numerals to Western numerals
 */
export const arabicToWesternNumerals = (str: string): string => {
  const numerals: Record<string, string> = {
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9'
  };
  
  return str.replace(/[٠-٩]/g, match => numerals[match]);
};

/**
 * Get the appropriate payment status label
 */
export const getPaymentStatusLabel = (isPaid: boolean): string => {
  return isPaid ? 'مدفوع ✓' : 'غير مدفوع ✗';
};

/**
 * Get the appropriate attendance status label and color
 */
export const getAttendanceStatusInfo = (status: string | null): { label: string; color: string } => {
  switch (status) {
    case 'حضر':
      return { label: 'حضر', color: 'green.500' };
    case 'غاب':
      return { label: 'غاب', color: 'red.500' };
    case 'تأخر':
      return { label: 'تأخر', color: 'orange.500' };
    default:
      return { label: 'غير مسجل', color: 'gray.500' };
  }
};
