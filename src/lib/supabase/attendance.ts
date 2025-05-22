import { supabase, handleSupabaseError } from './client';
import { Attendance, AttendanceRecord, StudentAttendance, UpdateAttendanceRequest } from '../types';

/**
 * Get attendance records for a student in a specific month
 */
export const getStudentAttendance = async (
  studentId: string,
  year: number,
  month: number
): Promise<{ 
  attendance: AttendanceRecord[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_student_attendance', { 
        p_student_id: studentId,
        p_year: year,
        p_month: month
      });

    if (error) {
      return { attendance: [], error: handleSupabaseError(error) };
    }

    return { 
      attendance: data.map(item => ({
        attendance_date: item.attendance_date,
        status: item.status,
        notes: item.notes
      })) || [], 
      error: null 
    };
  } catch (error) {
    return { attendance: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get attendance for a specific group on a specific date
 */
export const getGroupAttendance = async (
  groupDayId: number,
  date: string
): Promise<{ 
  attendance: StudentAttendance[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_group_attendance', { 
        p_group_day_id: groupDayId,
        p_date: date
      });

    if (error) {
      return { attendance: [], error: handleSupabaseError(error) };
    }

    return { attendance: data || [], error: null };
  } catch (error) {
    return { attendance: [], error: handleSupabaseError(error) };
  }
};

/**
 * Update or create an attendance record
 */
export const updateAttendance = async (
  request: UpdateAttendanceRequest
): Promise<{ 
  attendance: Attendance | null; 
  error: string | null 
}> => {
  try {
    // Check if an attendance record already exists for this student and date
    const { data: existingData, error: checkError } = await supabase
      .from('attendance')
      .select('id')
      .eq('student_id', request.student_id)
      .eq('attendance_date', request.attendance_date)
      .maybeSingle();

    if (checkError) {
      return { attendance: null, error: handleSupabaseError(checkError) };
    }

    let result;
    
    if (existingData) {
      // Update existing record
      result = await supabase
        .from('attendance')
        .update({
          status: request.status,
          notes: request.notes
        })
        .eq('id', existingData.id)
        .select()
        .single();
    } else {
      // Create new record
      result = await supabase
        .from('attendance')
        .insert({
          student_id: request.student_id,
          attendance_date: request.attendance_date,
          status: request.status,
          notes: request.notes
        })
        .select()
        .single();
    }

    if (result.error) {
      return { attendance: null, error: handleSupabaseError(result.error) };
    }

    return { attendance: result.data, error: null };
  } catch (error) {
    return { attendance: null, error: handleSupabaseError(error) };
  }
};

/**
 * Get attendance statistics for a student
 * Returns the count of each attendance status for a given time period
 */
export const getStudentAttendanceStats = async (
  studentId: string,
  startDate: string,
  endDate: string
): Promise<{ 
  stats: { status: string; count: number }[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('attendance')
      .select('status')
      .eq('student_id', studentId)
      .gte('attendance_date', startDate)
      .lte('attendance_date', endDate);

    if (error) {
      return { stats: [], error: handleSupabaseError(error) };
    }

    // Count occurrences of each status
    const statusCounts: Record<string, number> = {};
    data.forEach(item => {
      statusCounts[item.status] = (statusCounts[item.status] || 0) + 1;
    });

    // Convert to array format
    const stats = Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count
    }));

    return { stats, error: null };
  } catch (error) {
    return { stats: [], error: handleSupabaseError(error) };
  }
};
