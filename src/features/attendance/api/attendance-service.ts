/**
 * Attendance Service
 * Handles all attendance-related API calls to Supabase
 */

import { supabase } from '@/lib/supabase/client';
import { AttendanceStatus } from '@/types/database';
import { format, parse, isValid } from 'date-fns';
import { ar } from 'date-fns/locale';

/**
 * Get all students for a specific group with their attendance status for a specific date
 */
export const getGroupAttendanceForDate = async (groupDayId: number, date: Date) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    const { data, error } = await supabase.rpc('get_group_attendance', {
      p_group_day_id: groupDayId,
      p_date: formattedDate
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching group attendance:', error);
    throw error;
  }
};

/**
 * Get all attendance records for a group in a specific month
 */
export const getGroupAttendanceForMonth = async (groupDayId: number, year: number, month: number) => {
  try {
    // Get all students in the group
    const { data: students, error: studentsError } = await supabase
      .from('students')
      .select('id, full_name')
      .eq('group_day_id', groupDayId)
      .eq('active', true);

    if (studentsError) throw studentsError;
    if (!students) return [];

    // Get the group configuration to determine which days to show
    const { data: groupDays, error: groupDaysError } = await supabase
      .from('group_days')
      .select(`
        id,
        group_configurations:group_config_id (
          day1,
          day2,
          is_science_friday
        )
      `)
      .eq('id', groupDayId)
      .single();

    if (groupDaysError) throw groupDaysError;
    if (!groupDays) return [];

    // Get all attendance records for these students in the specified month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    const { data: attendanceRecords, error: attendanceError } = await supabase
      .from('attendance')
      .select('student_id, attendance_date, status, notes')
      .in('student_id', students.map(s => s.id))
      .gte('attendance_date', format(startDate, 'yyyy-MM-dd'))
      .lte('attendance_date', format(endDate, 'yyyy-MM-dd'));

    if (attendanceError) throw attendanceError;

    // Create a map of attendance records by student and date
    const attendanceMap = new Map();
    
    if (attendanceRecords) {
      attendanceRecords.forEach(record => {
        const key = `${record.student_id}_${record.attendance_date}`;
        attendanceMap.set(key, record);
      });
    }

    // Get all dates in the month that match the group's days
    const groupDates = getDatesForGroupInMonth(
      year, 
      month, 
      groupDays.group_configurations.day1,
      groupDays.group_configurations.day2,
      groupDays.group_configurations.is_science_friday
    );

    // Construct the result
    return {
      students,
      groupDates,
      attendanceMap
    };
  } catch (error) {
    console.error('Error fetching group attendance for month:', error);
    throw error;
  }
};

/**
 * Update attendance status for a student on a specific date
 */
export const updateAttendanceStatus = async (
  studentId: string, 
  date: Date, 
  status: AttendanceStatus,
  notes?: string
) => {
  try {
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Check if an attendance record already exists
    const { data: existingRecord, error: checkError } = await supabase
      .from('attendance')
      .select('id')
      .eq('student_id', studentId)
      .eq('attendance_date', formattedDate)
      .maybeSingle();
    
    if (checkError) throw checkError;
    
    if (existingRecord) {
      // Update existing record
      const { data, error } = await supabase
        .from('attendance')
        .update({ 
          status, 
          notes,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingRecord.id)
        .select();
      
      if (error) throw error;
      return data;
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('attendance')
        .insert({
          student_id: studentId,
          attendance_date: formattedDate,
          status,
          notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();
      
      if (error) throw error;
      return data;
    }
  } catch (error) {
    console.error('Error updating attendance status:', error);
    throw error;
  }
};

/**
 * Get all dates in a month that match the group's days
 */
export const getDatesForGroupInMonth = (
  year: number, 
  month: number, 
  day1: string, 
  day2: string,
  includeFriday: boolean
) => {
  const result: Date[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  
  // Map Arabic day names to JavaScript day indices (0 = Sunday, 1 = Monday, etc.)
  const dayNameToIndex: Record<string, number> = {
    'الأحد': 0,
    'الاثنين': 1,
    'الثلاثاء': 2,
    'الأربعاء': 3,
    'الخميس': 4,
    'الجمعة': 5,
    'السبت': 6
  };
  
  const day1Index = dayNameToIndex[day1];
  const day2Index = dayNameToIndex[day2];
  const fridayIndex = 5; // Friday is 5
  
  // Loop through all days in the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    
    // Check if the day matches any of the group days
    if (dayOfWeek === day1Index || dayOfWeek === day2Index || (includeFriday && dayOfWeek === fridayIndex)) {
      result.push(date);
    }
  }
  
  return result;
};

/**
 * Format date as Arabic day name with date
 */
export const formatDateWithArabicDay = (date: Date) => {
  if (!isValid(date)) return '';
  
  return format(date, "EEEE d MMMM", { locale: ar });
};
