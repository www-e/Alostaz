import { supabase, handleSupabaseError } from './client';
import { LoginCredentials, Profile } from '../types';

/**
 * Sign in with email and password
 */
export const signIn = async (credentials: LoginCredentials): Promise<{ user: Profile | null; error: string | null }> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) {
      return { user: null, error: handleSupabaseError(authError) };
    }

    if (!authData.user) {
      return { user: null, error: 'User not found' };
    }

    // Get the user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      return { user: null, error: handleSupabaseError(profileError) };
    }

    return { user: profileData, error: null };
  } catch (error) {
    return { user: null, error: handleSupabaseError(error) };
  }
};

/**
 * Sign out the current user
 */
export const signOut = async (): Promise<{ error: string | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { error: handleSupabaseError(error) };
    }

    return { error: null };
  } catch (error) {
    return { error: handleSupabaseError(error) };
  }
};

/**
 * Get the current user profile
 */
export const getCurrentUser = async (): Promise<{ user: Profile | null; error: string | null }> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      return { user: null, error: handleSupabaseError(authError) };
    }

    if (!authData.user) {
      return { user: null, error: null }; // No error, just no user
    }

    // Get the user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      return { user: null, error: handleSupabaseError(profileError) };
    }

    return { user: profileData, error: null };
  } catch (error) {
    return { user: null, error: handleSupabaseError(error) };
  }
};

/**
 * Check if the current user is an admin
 */
export const isAdmin = async (): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('is_admin');
    
    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return data || false;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
};
