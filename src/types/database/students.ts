/**
 * Student types for the educational center system
 * Based on the schema defined in 04_students_schema.sql
 */

import { DayOfWeek } from './grades';

// Student type matching the students table
export interface Student {
  id: string; // UUID
  full_name: string;
  phone: string;
  parent_phone: string;
  grade_id: number;
  track_id: number | null;
  group_day_id: number;
  active: boolean;
  notes?: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Extended student type with related data
export interface StudentWithDetails extends Student {
  grade_name?: string;
  track_name?: string | null;
  group_days?: {
    day1: DayOfWeek;
    day2: DayOfWeek;
    friday_included: boolean;
  };
  group_time?: string;
}
