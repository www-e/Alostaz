// Payment related types
import { PaymentType } from './enums';

export interface PaymentSetting {
  id: number;
  grade_id: number;
  track_id?: number;
  monthly_amount: number;
  book_amount: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface Payment {
  id: number;
  student_id: string;
  payment_type: PaymentType;
  amount: number;
  payment_date: string;
  month?: number;
  year?: number;
  book_name?: string;
  receipt_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface MonthlyPayment {
  month: number;
  amount: number;
  payment_date: string;
  receipt_number?: string;
  notes?: string;
}

export interface BookPayment {
  book_name: string;
  amount: number;
  payment_date: string;
  receipt_number?: string;
  notes?: string;
}

export interface CreatePaymentRequest {
  student_id: string;
  payment_type: PaymentType;
  amount: number;
  payment_date: string;
  month?: number;
  year?: number;
  book_name?: string;
  receipt_number?: string;
  notes?: string;
}
