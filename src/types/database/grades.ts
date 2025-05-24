/**
 * Grade and track types for the educational center system
 * Based on the schema defined in 02_grades_schema.sql
 */

// Grade level enum type from the database
export type GradeLevel = 
  | 'الصف الأول الثانوي'
  | 'الصف الثاني الثانوي'
  | 'الصف الثالث الثانوي';

// Track type enum from the database
export type TrackType = 'علمي' | 'أدبي';

// Day of week enum from the database
export type DayOfWeek = 
  | 'السبت'
  | 'الأحد'
  | 'الاثنين'
  | 'الثلاثاء'
  | 'الأربعاء'
  | 'الخميس'
  | 'الجمعة';

// Grade type matching the grades table
export interface Grade {
  id: number;
  name: GradeLevel;
  has_tracks: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Track type matching the tracks table
export interface Track {
  id: number;
  grade_id: number;
  name: TrackType;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}
