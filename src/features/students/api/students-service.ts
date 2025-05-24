/**
 * Students Service
 * Handles API operations related to students
 */

import { supabase } from '@/lib/supabase';
import { Student } from '@/types/database';

/**
 * Get all students
 * @returns Array of students
 */
export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        phone_number,
        parent_phone,
        email,
        address,
        grade_id,
        track_id,
        group_day_id,
        active,
        grades (
          id,
          name
        ),
        tracks (
          id,
          name
        ),
        group_days (
          id,
          name,
          day,
          time
        )
      `)
      .eq('active', true)
      .order('full_name');

    if (error) {
      console.error('Error fetching students:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllStudents:', error);
    throw error;
  }
};

/**
 * Get students by group
 * @param groupDayId - The group day ID
 * @returns Array of students in the specified group
 */
export const getStudentsByGroup = async (groupDayId: number): Promise<Student[]> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        phone_number,
        parent_phone,
        email,
        address,
        grade_id,
        track_id,
        group_day_id,
        active,
        grades (
          id,
          name
        ),
        tracks (
          id,
          name
        )
      `)
      .eq('group_day_id', groupDayId)
      .eq('active', true)
      .order('full_name');

    if (error) {
      console.error('Error fetching students by group:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getStudentsByGroup:', error);
    throw error;
  }
};

/**
 * Get students by grade
 * @param gradeId - The grade ID
 * @returns Array of students in the specified grade
 */
export const getStudentsByGrade = async (gradeId: number): Promise<Student[]> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        phone_number,
        parent_phone,
        email,
        address,
        grade_id,
        track_id,
        group_day_id,
        active,
        tracks (
          id,
          name
        ),
        group_days (
          id,
          name,
          day,
          time
        )
      `)
      .eq('grade_id', gradeId)
      .eq('active', true)
      .order('full_name');

    if (error) {
      console.error('Error fetching students by grade:', error);
      throw new Error(error.message);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getStudentsByGrade:', error);
    throw error;
  }
};

/**
 * Get student by ID
 * @param studentId - The student ID
 * @returns Student details
 */
export const getStudentById = async (studentId: string): Promise<Student | null> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .select(`
        id,
        full_name,
        phone_number,
        parent_phone,
        email,
        address,
        grade_id,
        track_id,
        group_day_id,
        active,
        grades (
          id,
          name
        ),
        tracks (
          id,
          name
        ),
        group_days (
          id,
          name,
          day,
          time
        )
      `)
      .eq('id', studentId)
      .single();

    if (error) {
      console.error('Error fetching student by ID:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in getStudentById:', error);
    throw error;
  }
};

/**
 * Create a new student
 * @param student - Student data
 * @returns The newly created student
 */
export const createStudent = async (student: Omit<Student, 'id' | 'created_at' | 'updated_at'>): Promise<Student> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .insert([student])
      .select()
      .single();

    if (error) {
      console.error('Error creating student:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in createStudent:', error);
    throw error;
  }
};

/**
 * Update student details
 * @param studentId - The student ID
 * @param student - Updated student data
 * @returns The updated student
 */
export const updateStudent = async (
  studentId: string,
  student: Partial<Omit<Student, 'id' | 'created_at' | 'updated_at'>>
): Promise<Student> => {
  try {
    const { data, error } = await supabase
      .from('students')
      .update(student)
      .eq('id', studentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating student:', error);
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error in updateStudent:', error);
    throw error;
  }
};

/**
 * Deactivate a student (soft delete)
 * @param studentId - The student ID
 */
export const deactivateStudent = async (studentId: string): Promise<void> => {
  try {
    const { error } = await supabase
      .from('students')
      .update({ active: false })
      .eq('id', studentId);

    if (error) {
      console.error('Error deactivating student:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Error in deactivateStudent:', error);
    throw error;
  }
};

export default {
  getAllStudents,
  getStudentsByGroup,
  getStudentsByGrade,
  getStudentById,
  createStudent,
  updateStudent,
  deactivateStudent
};
