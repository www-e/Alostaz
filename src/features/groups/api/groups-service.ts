/**
 * Groups Service
 * Handles API operations related to groups and group days
 */

import { supabase } from '@/lib/supabase';
import { GroupDay, GroupTime } from '@/types/database';

/**
 * Get all group days
 * @returns Array of group days
 */
export const getGroupDays = async (): Promise<GroupDay[]> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .select(`
        id,
        name,
        day,
        time,
        grade_id,
        track_id,
        active,
        grades (
          id,
          name,
          level
        ),
        tracks (
          id,
          name
        )
      `)
      .eq('active', true)
      .order('name');

    if (error) {
      console.error('Error fetching group days:', error);
      throw new Error(error.message);
    }

    // Add track_name for easier display
    return (data || []).map(group => ({
      ...group,
      track_name: group.tracks?.name
    }));
  } catch (error) {
    console.error('Error in getGroupDays:', error);
    throw error;
  }
};

/**
 * Get group days by grade
 * @param gradeId - The grade ID
 * @returns Array of group days for the specified grade
 */
export const getGroupDaysByGrade = async (gradeId: number): Promise<GroupDay[]> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .select(`
        id,
        name,
        day,
        time,
        grade_id,
        track_id,
        active,
        tracks (
          id,
          name
        )
      `)
      .eq('grade_id', gradeId)
      .eq('active', true)
      .order('name');

    if (error) {
      console.error('Error fetching group days by grade:', error);
      throw new Error(error.message);
    }

    // Add track_name for easier display
    return (data || []).map(group => ({
      ...group,
      track_name: group.tracks?.name
    }));
  } catch (error) {
    console.error('Error in getGroupDaysByGrade:', error);
    throw error;
  }
};

/**
 * Get group day by ID
 * @param groupDayId - The group day ID
 * @returns Group day details
 */
export const getGroupDayById = async (groupDayId: number): Promise<GroupDay | null> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .select(`
        id,
        name,
        day,
        time,
        grade_id,
        track_id,
        active,
        grades (
          id,
          name,
          level
        ),
        tracks (
          id,
          name
        )
      `)
      .eq('id', groupDayId)
      .single();

    if (error) {
      console.error('Error fetching group day by ID:', error);
      throw new Error(error.message);
    }

    // Add track_name for easier display
    if (data) {
      return {
        ...data,
        track_name: data.tracks?.name
      };
    }

    return null;
  } catch (error) {
    console.error('Error in getGroupDayById:', error);
    throw error;
  }
};

/**
 * Get group times
 * @returns Array of group times
 */
export const getGroupTimes = async (): Promise<GroupTime[]> => {
  try {
    const { data, error } = await supabase
      .from('group_times')
      .select('*')
      .order('time');

    if (error) {
      console.error('Error fetching group times:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGroupTimes:', error);
    throw error;
  }
};

/**
 * Create a new group day
 * @param groupDay - Group day data
 * @returns The newly created group day
 */
export const createGroupDay = async (
  groupDay: Omit<GroupDay, 'id' | 'created_at' | 'updated_at' | 'grades' | 'tracks' | 'track_name'>
): Promise<GroupDay> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .insert([groupDay])
      .select()
      .single();

    if (error) {
      console.error('Error creating group day:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in createGroupDay:', error);
    throw error;
  }
};

/**
 * Create a new group time
 * @param groupTime - Group time data
 * @returns The newly created group time
 */
export const createGroupTime = async (
  groupTime: Omit<GroupTime, 'id' | 'created_at' | 'updated_at'>
): Promise<GroupTime> => {
  try {
    const { data, error } = await supabase
      .from('group_times')
      .insert([groupTime])
      .select()
      .single();

    if (error) {
      console.error('Error creating group time:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in createGroupTime:', error);
    throw error;
  }
};

/**
 * Update group day details
 * @param groupDayId - The group day ID
 * @param groupDay - Updated group day data
 * @returns The updated group day
 */
export const updateGroupDay = async (
  groupDayId: number,
  groupDay: Partial<Omit<GroupDay, 'id' | 'created_at' | 'updated_at' | 'grades' | 'tracks' | 'track_name'>>
): Promise<GroupDay> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .update(groupDay)
      .eq('id', groupDayId)
      .select()
      .single();

    if (error) {
      console.error('Error updating group day:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateGroupDay:', error);
    throw error;
  }
};

/**
 * Update group time details
 * @param groupTimeId - The group time ID
 * @param groupTime - Updated group time data
 * @returns The updated group time
 */
export const updateGroupTime = async (
  groupTimeId: number,
  groupTime: Partial<Omit<GroupTime, 'id' | 'created_at' | 'updated_at'>>
): Promise<GroupTime> => {
  try {
    const { data, error } = await supabase
      .from('group_times')
      .update(groupTime)
      .eq('id', groupTimeId)
      .select()
      .single();

    if (error) {
      console.error('Error updating group time:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateGroupTime:', error);
    throw error;
  }
};

/**
 * Deactivate a group day (soft delete)
 * @param groupDayId - The group day ID
 */
export const deactivateGroupDay = async (groupDayId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('group_days')
      .update({ active: false })
      .eq('id', groupDayId);

    if (error) {
      console.error('Error deactivating group day:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deactivateGroupDay:', error);
    throw error;
  }
};

/**
 * Delete a group time
 * @param groupTimeId - The group time ID
 */
export const deleteGroupTime = async (groupTimeId: number): Promise<void> => {
  try {
    const { error } = await supabase
      .from('group_times')
      .delete()
      .eq('id', groupTimeId);

    if (error) {
      console.error('Error deleting group time:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deleteGroupTime:', error);
    throw error;
  }
};

export default {
  getGroupDays,
  getGroupDaysByGrade,
  getGroupDayById,
  getGroupTimes,
  createGroupDay,
  createGroupTime,
  updateGroupDay,
  updateGroupTime,
  deactivateGroupDay,
  deleteGroupTime
};
