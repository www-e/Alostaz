import { supabase, handleSupabaseError } from './client';
import { Grade, Track, GradeWithTracks } from '../types';

/**
 * Get all grades
 */
export const getGrades = async (): Promise<{ grades: Grade[]; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('id');

    if (error) {
      return { grades: [], error: handleSupabaseError(error) };
    }

    return { grades: data || [], error: null };
  } catch (error) {
    return { grades: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get all tracks for a specific grade
 */
export const getTracksByGradeId = async (gradeId: number): Promise<{ tracks: Track[]; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('grade_id', gradeId)
      .order('id');

    if (error) {
      return { tracks: [], error: handleSupabaseError(error) };
    }

    return { tracks: data || [], error: null };
  } catch (error) {
    return { tracks: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get all grades with their tracks
 */
export const getGradesWithTracks = async (): Promise<{ gradesWithTracks: GradeWithTracks[]; error: string | null }> => {
  try {
    // First get all grades
    const { grades, error: gradesError } = await getGrades();
    
    if (gradesError) {
      return { gradesWithTracks: [], error: gradesError };
    }

    // Then get tracks for each grade that has tracks
    const gradesWithTracks: GradeWithTracks[] = await Promise.all(
      grades.map(async (grade) => {
        if (grade.has_tracks) {
          const { tracks } = await getTracksByGradeId(grade.id);
          return { ...grade, tracks };
        }
        return { ...grade, tracks: [] };
      })
    );

    return { gradesWithTracks, error: null };
  } catch (error) {
    return { gradesWithTracks: [], error: handleSupabaseError(error) };
  }
};
