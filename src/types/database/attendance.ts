/**
 * Attendance types for the educational center system
 * Based on the schema defined in 05_attendance_schema.sql
 */

// Attendance status enum from the database
export type AttendanceStatus = 'حضر' | 'غاب' | 'تأخر';

// Attendance record type matching the attendance table
export interface AttendanceRecord {
  id: number;
  student_id: string; // UUID
  attendance_date: string; // ISO date string
  status: AttendanceStatus;
  notes?: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  created_by?: string; // UUID
  updated_by?: string; // UUID
}

// Student attendance for a specific date
export interface StudentAttendance {
  student_id: string; // UUID
  student_name: string;
  status?: AttendanceStatus;
  notes?: string;
}

// Group attendance for a specific month
export interface GroupMonthlyAttendance {
  students: {
    id: string;
    full_name: string;
  }[];
  groupDates: Date[];
  attendanceMap: Map<string, {
    student_id: string;
    attendance_date: string;
    status: AttendanceStatus;
    notes?: string;
  }>;
}

// Student with attendance status for a specific date
export interface StudentWithAttendance {
  id: string;
  full_name: string;
  track_name?: string;
  attendance?: {
    status: AttendanceStatus;
    notes?: string;
  };
}
