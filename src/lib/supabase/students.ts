import { supabase, handleSupabaseError } from './client';
import { Student, StudentWithDetails, CreateStudentRequest, UpdateStudentRequest } from '../types';

/**
 * Get all students
 */
export const getAllStudents = async (): Promise<{ 
  students: Student[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('full_name');

    if (error) {
      return { students: [], error: handleSupabaseError(error) };
    }

    return { students: data || [], error: null };
  } catch (error) {
    return { students: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get students by grade and optional track
 */
export const getStudentsByGrade = async (
  gradeId: number,
  trackId?: number
): Promise<{ 
  students: Student[]; 
  error: string | null 
}> => {
  try {
    let query = supabase
      .from('students')
      .select('*')
      .eq('grade_id', gradeId)
      .eq('active', true);
    
    if (trackId) {
      query = query.eq('track_id', trackId);
    }
    
    const { data, error } = await query.order('full_name');

    if (error) {
      return { students: [], error: handleSupabaseError(error) };
    }

    return { students: data || [], error: null };
  } catch (error) {
    return { students: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get students by group day
 */
export const getStudentsByGroupDay = async (
  groupDayId: number
): Promise<{ 
  students: Student[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .eq('group_day_id', groupDayId)
      .eq('active', true)
      .order('full_name');

    if (error) {
      return { students: [], error: handleSupabaseError(error) };
    }

    return { students: data || [], error: null };
  } catch (error) {
    return { students: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get a student by ID with detailed information
 */
export const getStudentWithDetails = async (
  studentId: string
): Promise<{ 
  student: StudentWithDetails | null; 
  error: string | null 
}> => {
  try {
    // First get the student
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .select('*')
      .eq('id', studentId)
      .single();

    if (studentError) {
      return { student: null, error: handleSupabaseError(studentError) };
    }

    // Get the grade name
    const { data: gradeName, error: gradeError } = await supabase
      .rpc('get_student_grade', { student_id: studentId });

    if (gradeError) {
      return { student: null, error: handleSupabaseError(gradeError) };
    }

    // Get the track name if applicable
    let trackName = null;
    if (studentData.track_id) {
      const { data: trackData, error: trackError } = await supabase
        .rpc('get_student_track', { student_id: studentId });

      if (trackError) {
        return { student: null, error: handleSupabaseError(trackError) };
      }
      trackName = trackData;
    }

    // Get the group days
    const { data: groupDaysData, error: groupDaysError } = await supabase
      .rpc('get_student_group_days', { student_id: studentId });

    if (groupDaysError) {
      return { student: null, error: handleSupabaseError(groupDaysError) };
    }

    // Get the group time
    const { data: groupTimeData, error: groupTimeError } = await supabase
      .rpc('get_student_group_time', { student_id: studentId });

    if (groupTimeError) {
      return { student: null, error: handleSupabaseError(groupTimeError) };
    }

    // Combine all the data
    const studentWithDetails: StudentWithDetails = {
      ...studentData,
      grade_name: gradeName,
      track_name: trackName,
      group_days: {
        day1: groupDaysData[0].day1,
        day2: groupDaysData[0].day2,
        friday_included: groupDaysData[0].friday_included
      },
      group_time: groupTimeData
    };

    return { student: studentWithDetails, error: null };
  } catch (error) {
    return { student: null, error: handleSupabaseError(error) };
  }
};

/**
 * Create a new student with a user account
 */
export const createStudent = async (
  request: CreateStudentRequest
): Promise<{ 
  student: Student | null; 
  error: string | null 
}> => {
  try {
    // Start a transaction
    const { data: userData, error: userError } = await supabase.auth.admin.createUser({
      email: request.email,
      password: request.password,
      email_confirm: true
    });

    if (userError) {
      return { student: null, error: handleSupabaseError(userError) };
    }

    if (!userData.user) {
      return { student: null, error: 'Failed to create user account' };
    }

    // Create the profile
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: userData.user.id,
        role: 'student',
        full_name: request.full_name,
        phone: request.phone,
        parent_phone: request.parent_phone
      });

    if (profileError) {
      // Rollback: delete the user
      await supabase.auth.admin.deleteUser(userData.user.id);
      return { student: null, error: handleSupabaseError(profileError) };
    }

    // Create the student record
    const { data: studentData, error: studentError } = await supabase
      .from('students')
      .insert({
        id: userData.user.id,
        full_name: request.full_name,
        phone: request.phone,
        parent_phone: request.parent_phone,
        grade_id: request.grade_id,
        track_id: request.track_id,
        group_day_id: request.group_day_id,
        notes: request.notes,
        active: true
      })
      .select()
      .single();

    if (studentError) {
      // Rollback: delete the user and profile
      await supabase.auth.admin.deleteUser(userData.user.id);
      return { student: null, error: handleSupabaseError(studentError) };
    }

    return { student: studentData, error: null };
  } catch (error) {
    return { student: null, error: handleSupabaseError(error) };
  }
};

/**
 * Update a student's information
 */
export const updateStudent = async (
  studentId: string,
  request: UpdateStudentRequest
): Promise<{ 
  success: boolean; 
  error: string | null 
}> => {
  try {
    const { error } = await supabase
      .from('students')
      .update(request)
      .eq('id', studentId);

    if (error) {
      return { success: false, error: handleSupabaseError(error) };
    }

    // If the name is being updated, also update the profile
    if (request.full_name) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ full_name: request.full_name })
        .eq('id', studentId);

      if (profileError) {
        return { success: false, error: handleSupabaseError(profileError) };
      }
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: handleSupabaseError(error) };
  }
};
