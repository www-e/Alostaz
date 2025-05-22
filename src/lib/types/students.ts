// Student related types
import { DayOfWeek } from './enums';

export interface Student {
  id: string;
  full_name: string;
  phone: string;
  parent_phone: string;
  grade_id: number;
  track_id?: number;
  group_day_id: number;
  active: boolean;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface StudentWithDetails extends Student {
  grade_name: string;
  track_name?: string;
  group_days: {
    day1: DayOfWeek;
    day2: DayOfWeek;
    friday_included: boolean;
  };
  group_time: string;
}

export interface CreateStudentRequest {
  full_name: string;
  phone: string;
  parent_phone: string;
  grade_id: number;
  track_id?: number;
  group_day_id: number;
  email: string; // For user account
  password: string; // For user account
  notes?: string;
}

export interface UpdateStudentRequest {
  full_name?: string;
  phone?: string;
  parent_phone?: string;
  grade_id?: number;
  track_id?: number;
  group_day_id?: number;
  active?: boolean;
  notes?: string;
}
