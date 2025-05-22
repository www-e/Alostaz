import { supabase, handleSupabaseError } from './client';
import { PaymentSetting, Payment, MonthlyPayment, BookPayment, CreatePaymentRequest, PaymentType } from '../types';

/**
 * Get payment settings for a specific grade and optional track
 */
export const getPaymentSettings = async (
  gradeId: number,
  trackId?: number
): Promise<{ 
  settings: PaymentSetting | null; 
  error: string | null 
}> => {
  try {
    let query = supabase
      .from('payment_settings')
      .select('*')
      .eq('grade_id', gradeId);
    
    if (trackId) {
      query = query.eq('track_id', trackId);
    } else {
      query = query.is('track_id', null);
    }
    
    const { data, error } = await query.single();

    if (error) {
      return { settings: null, error: handleSupabaseError(error) };
    }

    return { settings: data, error: null };
  } catch (error) {
    return { settings: null, error: handleSupabaseError(error) };
  }
};

/**
 * Get all payment settings
 */
export const getAllPaymentSettings = async (): Promise<{ 
  settings: PaymentSetting[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('payment_settings')
      .select('*')
      .order('grade_id');

    if (error) {
      return { settings: [], error: handleSupabaseError(error) };
    }

    return { settings: data || [], error: null };
  } catch (error) {
    return { settings: [], error: handleSupabaseError(error) };
  }
};

/**
 * Update payment settings
 */
export const updatePaymentSettings = async (
  settingId: number,
  monthlyAmount: number,
  bookAmount: number
): Promise<{ 
  success: boolean; 
  error: string | null 
}> => {
  try {
    const { error } = await supabase
      .from('payment_settings')
      .update({
        monthly_amount: monthlyAmount,
        book_amount: bookAmount
      })
      .eq('id', settingId);

    if (error) {
      return { success: false, error: handleSupabaseError(error) };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: handleSupabaseError(error) };
  }
};

/**
 * Get monthly payments for a student in a specific year
 */
export const getStudentMonthlyPayments = async (
  studentId: string,
  year: number
): Promise<{ 
  payments: MonthlyPayment[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_student_monthly_payments', { 
        p_student_id: studentId,
        p_year: year
      });

    if (error) {
      return { payments: [], error: handleSupabaseError(error) };
    }

    return { payments: data || [], error: null };
  } catch (error) {
    return { payments: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get book payments for a student
 */
export const getStudentBookPayments = async (
  studentId: string
): Promise<{ 
  payments: BookPayment[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_student_book_payments', { 
        p_student_id: studentId
      });

    if (error) {
      return { payments: [], error: handleSupabaseError(error) };
    }

    return { payments: data || [], error: null };
  } catch (error) {
    return { payments: [], error: handleSupabaseError(error) };
  }
};

/**
 * Check if a student has paid for a specific month
 */
export const hasStudentPaidMonthly = async (
  studentId: string,
  year: number,
  month: number
): Promise<{ 
  hasPaid: boolean; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('has_paid_monthly', { 
        p_student_id: studentId,
        p_year: year,
        p_month: month
      });

    if (error) {
      return { hasPaid: false, error: handleSupabaseError(error) };
    }

    return { hasPaid: data, error: null };
  } catch (error) {
    return { hasPaid: false, error: handleSupabaseError(error) };
  }
};

/**
 * Get the appropriate payment amount for a student
 */
export const getStudentPaymentAmount = async (
  studentId: string,
  paymentType: PaymentType
): Promise<{ 
  amount: number | null; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_student_payment_amount', { 
        p_student_id: studentId,
        p_payment_type: paymentType
      });

    if (error) {
      return { amount: null, error: handleSupabaseError(error) };
    }

    return { amount: data, error: null };
  } catch (error) {
    return { amount: null, error: handleSupabaseError(error) };
  }
};

/**
 * Create a new payment
 */
export const createPayment = async (
  request: CreatePaymentRequest
): Promise<{ 
  payment: Payment | null; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('payments')
      .insert(request)
      .select()
      .single();

    if (error) {
      return { payment: null, error: handleSupabaseError(error) };
    }

    return { payment: data, error: null };
  } catch (error) {
    return { payment: null, error: handleSupabaseError(error) };
  }
};
