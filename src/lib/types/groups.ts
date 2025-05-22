// Group configurations, times, and days related types
import { DayOfWeek } from './enums';

export interface GroupConfiguration {
  id: number;
  name: string;
  day1: DayOfWeek;
  day2: DayOfWeek;
  is_science_friday: boolean;
  created_at: string;
  updated_at: string;
}

export interface GroupTime {
  id: number;
  time_label: string;
  created_at: string;
  updated_at: string;
}

export interface GroupDay {
  id: number;
  grade_id: number;
  track_id?: number;
  group_config_id: number;
  group_time_id: number;
  created_at: string;
  updated_at: string;
}

export interface GroupDayWithDetails extends GroupDay {
  grade_name: string;
  track_name?: string;
  config_name: string;
  day1: DayOfWeek;
  day2: DayOfWeek;
  is_science_friday: boolean;
  time_label: string;
}
