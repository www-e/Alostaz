// Attendance related types
import { AttendanceStatus } from './enums';

export interface Attendance {
  id: number;
  student_id: string;
  attendance_date: string;
  status: AttendanceStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface AttendanceRecord {
  attendance_date: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface StudentAttendance {
  student_id: string;
  student_name: string;
  status?: AttendanceStatus;
  notes?: string;
}

export interface AttendanceByDate {
  [date: string]: {
    [studentId: string]: {
      status: AttendanceStatus;
      notes?: string;
    };
  };
}

export interface UpdateAttendanceRequest {
  student_id: string;
  attendance_date: string;
  status: AttendanceStatus;
  notes?: string;
}
