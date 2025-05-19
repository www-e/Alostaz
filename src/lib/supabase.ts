import { createClient } from '@supabase/supabase-js';

// These environment variables need to be set in a .env.local file
// NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
// NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for the entire application
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database tables
export type Registration = {
  id: number;
  student_name: string;
  student_phone: string;
  parent_phone: string;
  grade: string;
  section: string | null;
  group: string;
  time: string;
  registration_date: string;
  created_at: string;
};

export type Tables = {
  registrations: Registration;
};

// Helper functions for database operations
export async function saveRegistration(data: Omit<Registration, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('registrations')
    .insert([data])
    .select();
  
  if (error) {
    throw error;
  }
  
  return result;
}

export async function getRegistrations() {
  const { data, error } = await supabase
    .from('registrations')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return data;
}
