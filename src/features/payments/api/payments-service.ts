/**
 * Payments Service
 * Handles all payment-related API calls to Supabase
 */

import { supabase } from '@/lib/supabase';
import { PaymentType, MonthlyPaymentStatus, BookPayment } from '@/types/database';
import { format } from 'date-fns';

/**
 * Get monthly payment status for all students in a group
 */
export const getMonthlyPaymentsForGroup = async (
  groupDayId: number,
  year: number,
  month: number
) => {
  try {
    // Get all students in the group
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        track_id,
        tracks:track_id (name)
      `)
      .eq('group_day_id', groupDayId)
      .eq('active', true);

    if (studentsError) throw studentsError;
    if (!students) return [];

    // Get all monthly payments for these students in the specified month and year
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .in('student_id', students.map(s => s.id))
      .eq('payment_type', 'monthly')
      .eq('year', year)
      .eq('month', month);

    if (paymentsError) throw paymentsError;

    // Create a map of payments by student ID
    const paymentMap = new Map();
    if (payments) {
      payments.forEach(payment => {
        paymentMap.set(payment.student_id, payment);
      });
    }

    // Construct the result
    const result: MonthlyPaymentStatus[] = students.map(student => ({
      student_id: student.id,
      student_name: student.full_name,
      track_name: student.tracks?.name,
      has_paid: paymentMap.has(student.id),
      payment: paymentMap.get(student.id)
    }));

    return result;
  } catch (error) {
    console.error('Error fetching monthly payments for group:', error);
    throw error;
  }
};

/**
 * Get book payments for all students in a group
 */
export const getBookPaymentsForGroup = async (groupDayId: number) => {
  try {
    // Get all students in the group
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        track_id,
        tracks:track_id (name)
      `)
      .eq('group_day_id', groupDayId)
      .eq('active', true);

    if (studentsError) throw studentsError;
    if (!students) return [];

    // Get all book payments for these students
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .in('student_id', students.map(s => s.id))
      .eq('payment_type', 'book')
      .order('payment_date', { ascending: false });

    if (paymentsError) throw paymentsError;

    // Construct the result by joining payment data with student data
    const result: BookPayment[] = payments ? payments.map(payment => {
      const student = students.find(s => s.id === payment.student_id);
      return {
        id: payment.id,
        student_id: payment.student_id,
        student_name: student?.full_name || '',
        track_name: student?.tracks?.name,
        book_name: payment.book_name || '',
        amount: payment.amount,
        payment_date: payment.payment_date,
        receipt_number: payment.receipt_number,
        notes: payment.notes
      };
    }) : [];

    return result;
  } catch (error) {
    console.error('Error fetching book payments for group:', error);
    throw error;
  }
};

/**
 * Record a new monthly payment for a student
 */
export const recordMonthlyPayment = async (
  studentId: string,
  year: number,
  month: number,
  amount: number,
  paymentDate: Date,
  receiptNumber?: string,
  notes?: string
) => {
  try {
    // Check if a payment already exists for this student, month, and year
    const { data: existingPayment, error: checkError } = await supabase
      .from('payments')
      .select('id')
      .eq('student_id', studentId)
      .eq('payment_type', 'monthly')
      .eq('year', year)
      .eq('month', month)
      .maybeSingle();

    if (checkError) throw checkError;

    if (existingPayment) {
      // Update existing payment
      const { data, error } = await supabase
        .from('payments')
        .update({
          amount,
          payment_date: format(paymentDate, 'yyyy-MM-dd'),
          receipt_number: receiptNumber,
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingPayment.id)
        .select();

      if (error) throw error;
      return data;
    } else {
      // Create new payment
      const { data, error } = await supabase
        .from('payments')
        .insert({
          student_id: studentId,
          payment_type: 'monthly',
          amount,
          payment_date: format(paymentDate, 'yyyy-MM-dd'),
          month,
          year,
          receipt_number: receiptNumber,
          notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();

      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error recording monthly payment:', error);
    throw error;
  }
};

/**
 * Record a new book payment for a student
 */
export const recordBookPayment = async (
  studentId: string,
  bookName: string,
  amount: number,
  paymentDate: Date,
  receiptNumber?: string,
  notes?: string
) => {
  try {
    // Create new book payment
    const { data, error } = await supabase
      .from('payments')
      .insert({
        student_id: studentId,
        payment_type: 'book',
        book_name: bookName,
        amount,
        payment_date: format(paymentDate, 'yyyy-MM-dd'),
        receipt_number: receiptNumber,
        notes,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error recording book payment:', error);
    throw error;
  }
};

/**
 * Delete a payment record
 */
export const deletePayment = async (paymentId: number) => {
  try {
    const { error } = await supabase
      .from('payments')
      .delete()
      .eq('id', paymentId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting payment:', error);
    throw error;
  }
};

/**
 * Get payment settings for a grade and track
 */
export const getPaymentSettings = async (gradeId: number, trackId?: number) => {
  try {
    let query = supabase
      .from('payment_settings')
      .select(`
        id,
        grade_id,
        track_id,
        monthly_amount,
        book_amount,
        created_at,
        updated_at,
        grades:grade_id (name),
        tracks:track_id (name)
      `)
      .eq('grade_id', gradeId);

    if (trackId) {
      query = query.eq('track_id', trackId);
    } else {
      query = query.is('track_id', null);
    }

    const { data, error } = await query.single();

    if (error) {
      // If no settings found, return null instead of throwing an error
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    // Add grade_name and track_name for easier display
    if (data) {
      return {
        ...data,
        grade_name: data.grades?.name,
        track_name: data.tracks?.name
      };
    }

    return data;
  } catch (error) {
    console.error('Error fetching payment settings:', error);
    throw error;
  }
};

/**
 * Create new payment settings
 */
export const createPaymentSettings = async (settings: {
  grade_id: number;
  track_id: number | null;
  monthly_amount: number;
  book_amount: number;
}) => {
  try {
    const { data, error } = await supabase
      .from('payment_settings')
      .insert({
        ...settings,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating payment settings:', error);
    throw error;
  }
};

/**
 * Update payment settings
 */
export const updatePaymentSettings = async (
  settingId: number,
  updates: Partial<{
    monthly_amount: number;
    book_amount: number;
  }>
) => {
  try {
    const { data, error } = await supabase
      .from('payment_settings')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', settingId)
      .select();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating payment settings:', error);
    throw error;
  }
};

/**
 * Get payment amount for a student based on their grade and track
 */
export const getStudentPaymentAmount = async (studentId: string, paymentType: PaymentType) => {
  try {
    const { data, error } = await supabase.rpc('get_student_payment_amount', {
      p_student_id: studentId,
      p_payment_type: paymentType
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching student payment amount:', error);
    throw error;
  }
};

/**
 * Get payment history for a student
 */
export const getStudentPaymentHistory = async (studentId: string) => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('student_id', studentId)
      .order('payment_date', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching student payment history:', error);
    throw error;
  }
};

/**
 * Get payment statistics for a student
 */
export const getStudentPaymentStats = async (studentId: string) => {
  try {
    const { data, error } = await supabase.rpc('get_student_payment_stats', {
      p_student_id: studentId
    });

    if (error) throw error;
    return data || {
      total_paid: 0,
      monthly_paid: 0,
      books_paid: 0,
      last_payment_date: null
    };
  } catch (error) {
    console.error('Error fetching student payment stats:', error);
    throw error;
  }
};
