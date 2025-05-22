import { supabase, handleSupabaseError } from './client';
import { GroupConfiguration, GroupTime, GroupDay, GroupDayWithDetails } from '../types';

/**
 * Get all group configurations
 */
export const getGroupConfigurations = async (): Promise<{ 
  configurations: GroupConfiguration[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('group_configurations')
      .select('*')
      .order('id');

    if (error) {
      return { configurations: [], error: handleSupabaseError(error) };
    }

    return { configurations: data || [], error: null };
  } catch (error) {
    return { configurations: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get all group times
 */
export const getGroupTimes = async (): Promise<{ 
  times: GroupTime[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('group_times')
      .select('*')
      .order('id');

    if (error) {
      return { times: [], error: handleSupabaseError(error) };
    }

    return { times: data || [], error: null };
  } catch (error) {
    return { times: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get group days by grade and optional track
 */
export const getGroupDaysByGrade = async (
  gradeId: number, 
  trackId?: number
): Promise<{ 
  groupDays: GroupDay[]; 
  error: string | null 
}> => {
  try {
    let query = supabase
      .from('group_days')
      .select('*')
      .eq('grade_id', gradeId);
    
    if (trackId) {
      query = query.eq('track_id', trackId);
    } else {
      query = query.is('track_id', null);
    }
    
    const { data, error } = await query.order('id');

    if (error) {
      return { groupDays: [], error: handleSupabaseError(error) };
    }

    return { groupDays: data || [], error: null };
  } catch (error) {
    return { groupDays: [], error: handleSupabaseError(error) };
  }
};

/**
 * Get group days with detailed information
 */
export const getGroupDaysWithDetails = async (): Promise<{ 
  groupDays: GroupDayWithDetails[]; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .select(`
        *,
        grades:grade_id (name),
        tracks:track_id (name),
        group_configurations:group_config_id (name, day1, day2, is_science_friday),
        group_times:group_time_id (time_label)
      `)
      .order('grade_id');

    if (error) {
      return { groupDays: [], error: handleSupabaseError(error) };
    }

    // Transform the data to match our GroupDayWithDetails interface
    const transformedData: GroupDayWithDetails[] = data.map(item => ({
      id: item.id,
      grade_id: item.grade_id,
      track_id: item.track_id,
      group_config_id: item.group_config_id,
      group_time_id: item.group_time_id,
      created_at: item.created_at,
      updated_at: item.updated_at,
      grade_name: item.grades.name,
      track_name: item.tracks?.name,
      config_name: item.group_configurations.name,
      day1: item.group_configurations.day1,
      day2: item.group_configurations.day2,
      is_science_friday: item.group_configurations.is_science_friday,
      time_label: item.group_times.time_label
    }));

    return { groupDays: transformedData, error: null };
  } catch (error) {
    return { groupDays: [], error: handleSupabaseError(error) };
  }
};

/**
 * Create a new group day configuration
 */
export const createGroupDay = async (
  groupDay: Omit<GroupDay, 'id' | 'created_at' | 'updated_at'>
): Promise<{ 
  groupDay: GroupDay | null; 
  error: string | null 
}> => {
  try {
    const { data, error } = await supabase
      .from('group_days')
      .insert(groupDay)
      .select()
      .single();

    if (error) {
      return { groupDay: null, error: handleSupabaseError(error) };
    }

    return { groupDay: data, error: null };
  } catch (error) {
    return { groupDay: null, error: handleSupabaseError(error) };
  }
};
