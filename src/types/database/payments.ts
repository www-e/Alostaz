/**
 * Payments types for the educational center system
 * Based on the schema defined in 06_payments_schema.sql
 */

// Payment type enum from the database
export type PaymentType = 'monthly' | 'book';

// Payment settings type matching the payment_settings table
export interface PaymentSettings {
  id: number;
  grade_id: number;
  track_id: number | null;
  monthly_amount: number;
  book_amount: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  created_by?: string; // UUID
  updated_by?: string; // UUID
}

// Payment record type matching the payments table
export interface Payment {
  id: number;
  student_id: string; // UUID
  payment_type: PaymentType;
  amount: number;
  payment_date: string; // ISO date string
  month?: number; // For monthly payments (1-12)
  year?: number; // For monthly payments
  book_name?: string; // For book payments
  receipt_number?: string;
  notes?: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  created_by?: string; // UUID
  updated_by?: string; // UUID
}

// Student with payment status
export interface StudentWithPayment {
  id: string;
  full_name: string;
  track_name?: string;
  payment?: {
    id: number;
    amount: number;
    payment_date: string;
    receipt_number?: string;
    notes?: string;
  };
}

// Monthly payment status for a student
export interface MonthlyPaymentStatus {
  student_id: string;
  student_name: string;
  track_name?: string;
  has_paid: boolean;
  payment?: {
    id: number;
    amount: number;
    payment_date: string;
    receipt_number?: string;
    notes?: string;
  };
}

// Book payment record
export interface BookPayment {
  id: number;
  student_id: string;
  student_name: string;
  track_name?: string;
  book_name: string;
  amount: number;
  payment_date: string;
  receipt_number?: string;
  notes?: string;
}

// Book option for selection in forms
export interface BookOption {
  id: number;
  name: string;
  price: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}
