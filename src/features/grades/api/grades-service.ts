/**
 * Grades Service
 * Handles API operations related to grades and tracks
 */

import { supabase } from '@/lib/supabase';
import { Grade, Track } from '@/types/database';

/**
 * Get all grades
 * @returns Array of grades
 */
export const getGrades = async (): Promise<Grade[]> => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('level');

    if (error) {
      console.error('Error fetching grades:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGrades:', error);
    throw error;
  }
};

/**
 * Get grade by ID
 * @param gradeId - The grade ID
 * @returns Grade details
 */
export const getGradeById = async (gradeId: number): Promise<Grade | null> => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .eq('id', gradeId)
      .single();

    if (error) {
      console.error('Error fetching grade by ID:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in getGradeById:', error);
    throw error;
  }
};

/**
 * Get all tracks
 * @returns Array of tracks
 */
export const getTracks = async (): Promise<Track[]> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching tracks:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTracks:', error);
    throw error;
  }
};

/**
 * Get tracks by grade
 * @param gradeId - The grade ID
 * @returns Array of tracks for the specified grade
 */
export const getTracksByGrade = async (gradeId: number): Promise<Track[]> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('grade_id', gradeId)
      .order('name');

    if (error) {
      console.error('Error fetching tracks by grade:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getTracksByGrade:', error);
    throw error;
  }
};

/**
 * Get track by ID
 * @param trackId - The track ID
 * @returns Track details
 */
export const getTrackById = async (trackId: number): Promise<Track | null> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('id', trackId)
      .single();

    if (error) {
      console.error('Error fetching track by ID:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in getTrackById:', error);
    throw error;
  }
};

/**
 * Create a new grade
 * @param grade - Grade data
 * @returns The newly created grade
 */
export const createGrade = async (grade: Omit<Grade, 'id' | 'created_at' | 'updated_at'>): Promise<Grade> => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .insert([grade])
      .select()
      .single();

    if (error) {
      console.error('Error creating grade:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in createGrade:', error);
    throw error;
  }
};

/**
 * Create a new track
 * @param track - Track data
 * @returns The newly created track
 */
export const createTrack = async (track: Omit<Track, 'id' | 'created_at' | 'updated_at'>): Promise<Track> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .insert([track])
      .select()
      .single();

    if (error) {
      console.error('Error creating track:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in createTrack:', error);
    throw error;
  }
};

/**
 * Update grade details
 * @param gradeId - The grade ID
 * @param grade - Updated grade data
 * @returns The updated grade
 */
export const updateGrade = async (
  gradeId: number,
  grade: Partial<Omit<Grade, 'id' | 'created_at' | 'updated_at'>>
): Promise<Grade> => {
  try {
    const { data, error } = await supabase
      .from('grades')
      .update(grade)
      .eq('id', gradeId)
      .select()
      .single();

    if (error) {
      console.error('Error updating grade:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateGrade:', error);
    throw error;
  }
};

/**
 * Update track details
 * @param trackId - The track ID
 * @param track - Updated track data
 * @returns The updated track
 */
export const updateTrack = async (
  trackId: number,
  track: Partial<Omit<Track, 'id' | 'created_at' | 'updated_at'>>
): Promise<Track> => {
  try {
    const { data, error } = await supabase
      .from('tracks')
      .update(track)
      .eq('id', trackId)
      .select()
      .single();

    if (error) {
      console.error('Error updating track:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateTrack:', error);
    throw error;
  }
};

/**
 * Delete a grade
 * @param gradeId - The grade ID
 */
export const deleteGrade = async (gradeId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('grades')
      .delete()
      .eq('id', gradeId);

    if (error) {
      console.error('Error deleting grade:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deleteGrade:', error);
    throw error;
  }
};

/**
 * Delete a track
 * @param trackId - The track ID
 */
export const deleteTrack = async (trackId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('tracks')
      .delete()
      .eq('id', trackId);

    if (error) {
      console.error('Error deleting track:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deleteTrack:', error);
    throw error;
  }
};

export default {
  getGrades,
  getGradeById,
  getTracks,
  getTracksByGrade,
  getTrackById,
  createGrade,
  createTrack,
  updateGrade,
  updateTrack,
  deleteGrade,
  deleteTrack
};
