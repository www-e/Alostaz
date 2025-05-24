/**
 * Group configurations, times, and days types
 * Based on the schema defined in 03_group_days_schema.sql
 */

import { DayOfWeek } from './grades';

// Group configuration type matching the group_configurations table
export interface GroupConfiguration {
  id: number;
  name: string;
  day1: DayOfWeek;
  day2: DayOfWeek;
  is_science_friday: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Group time type matching the group_times table
export interface GroupTime {
  id: number;
  time_label: string; // e.g. "الساعة ٤ مساءاً"
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Group day type matching the group_days table
export interface GroupDay {
  id: number;
  grade_id: number;
  track_id: number | null;
  group_config_id: number;
  group_time_id: number;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Extended group day type with related data
export interface GroupDayWithDetails extends GroupDay {
  grade_name?: string;
  track_name?: string | null;
  config_name?: string;
  day1?: DayOfWeek;
  day2?: DayOfWeek;
  is_science_friday?: boolean;
  time_label?: string;
}
