import { supabase, handleSupabaseError } from './client';
import { Homework, HomeworkSubmission, HomeworkWithSubmission, CreateHomeworkRequest, SubmitHomeworkRequest } from '../types';

/**
 * Get homework assignments for a specific grade, track, and group
 */
export const getHomeworkByGrade = async (
  gradeId: number,
  trackId?: number,
  groupDayId?: number
): Promise<{ 
  homework: Homework[]; 
  error: string | null 
}> => {
  try {
    let query = supabase
      .from('homework')
      .select('*')
      .eq('grade_id', gradeId);
    
    if (trackId) {
      query = query.eq('track_id', trackId);
    } else {
      query = query.is('track_id', null);
    }
    
    if (groupDayId) {
      query = query.eq('group_day_id', groupDayId);
    }
    
    const { data, error } = await query.order('due_date', { ascending: false });

    if (error) {
      return { homework: [], error: handleSupabaseError(error) };
    }

    return { homework: data || [], error: null };
  } catch (error) {
    return { homework: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get homework submissions for a student
 */
export const getStudentHomeworkSubmissions = async (
  studentId: string
): Promise<{ 
  submissions: HomeworkWithSubmission[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_student_homework_submissions', { 
        p_student_id: studentId
      });

    if (error) {
      return { submissions: [], error: handleSupabaseError(error) };
    }

    return { submissions: data || [], error: null };
  } catch (error) {
    return { submissions: [], error: handleSupabaseError(error) };
  }
};

/**
 * Create a new homework assignment
 */
export const createHomework = async (
  request: CreateHomeworkRequest
): Promise<{ 
  homework: Homework | null; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('homework')
      .insert(request)
      .select()
      .single();

    if (error) {
      return { homework: null, error: handleSupabaseError(error) };
    }

    return { homework: data, error: null };
  } catch (error) {
    return { homework: null, error: handleSupabaseError(error) };
  }
};

/**
 * Submit homework
 */
export const submitHomework = async (
  request: SubmitHomeworkRequest
): Promise<{ 
  submission: HomeworkSubmission | null; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('homework_submissions')
      .insert({
        homework_id: request.homework_id,
        student_id: request.student_id,
        status: 'مقدم'
      })
      .select()
      .single();

    if (error) {
      return { submission: null, error: handleSupabaseError(error) };
    }

    return { submission: data, error: null };
  } catch (error) {
    return { submission: null, error: handleSupabaseError(error) };
  }
};

/**
 * Update homework submission status and feedback
 */
export const updateHomeworkSubmission = async (
  submissionId: number,
  status: 'مقدم' | 'مصحح',
  feedback?: string
): Promise<{ 
  success: boolean; 
  error: string | null 
}> => {
  try {
    const { error } = await supabase
      .from('homework_submissions')
      .update({
        status,
        feedback
      })
      .eq('id', submissionId);

    if (error) {
      return { success: false, error: handleSupabaseError(error) };
    }

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: handleSupabaseError(error) };
  }
};
