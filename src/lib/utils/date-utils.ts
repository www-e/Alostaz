/**
 * Date utility functions for the educational center system
 */

// Arabic month names
export const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

// Arabic day names
export const ARABIC_DAYS = [
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

/**
 * Format a date in Arabic format (DD/MM/YYYY)
 */
export const formatDateArabic = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

/**
 * Get the Arabic month name for a given date
 */
export const getArabicMonth = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return ARABIC_MONTHS[d.getMonth()];
};

/**
 * Get the Arabic day name for a given date
 */
export const getArabicDay = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return ARABIC_DAYS[d.getDay()];
};

/**
 * Get the first and last day of a month
 */
export const getMonthRange = (year: number, month: number): { firstDay: Date; lastDay: Date } => {
  // Month is 1-indexed in the function parameters but Date constructor uses 0-indexed months
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  return { firstDay, lastDay };
};

/**
 * Get all days in a month
 */
export const getDaysInMonth = (year: number, month: number): Date[] => {
  const { firstDay, lastDay } = getMonthRange(year, month);
  const days: Date[] = [];
  
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month - 1, day));
  }
  
  return days;
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date | string): boolean => {
  const d = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Format a date as YYYY-MM-DD (for database operations)
 */
export const formatDateForDB = (date: Date): string => {
  return date.toISOString().split('T')[0];
};
