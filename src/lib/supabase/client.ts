import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 * This creates a single client instance for the entire application
 */

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: Missing Supabase environment variables');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

/**
 * Helper function to handle Supabase errors consistently
 */
export const handleSupabaseError = (error: any): string => {
  console.error('Supabase error:', error);
  
  // Extract the most useful error message
  if (error.message) {
    return error.message;
  }
  
  if (error.error_description) {
    return error.error_description;
  }
  
  return 'An unexpected error occurred';
};
