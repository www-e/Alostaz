/**
 * Authentication service for the educational center system
 * Handles login, logout, and session management
 */

import { supabase } from '../supabase/client';
import { LoginCredentials, Profile, User } from '@/types/database';

/**
 * Sign in with email and password
 * @param credentials User login credentials
 * @returns User object if login successful, null otherwise
 */
export const signInWithEmailPassword = async (credentials: LoginCredentials) => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (authError) throw authError;
    if (!authData.user) return null;

    // Fetch the user's profile from the profiles table
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) throw profileError;
    if (!profileData) return null;

    // Return the combined user object
    return {
      auth: authData.user,
      profile: profileData as Profile,
    } as User;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get the current user session
 * @returns User object if valid session exists, null otherwise
 */
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    // Get the current session
    const { data: sessionData } = await supabase.auth.getSession();
    
    // Check if session exists and is valid
    if (!sessionData.session || !sessionData.session.user) {
      console.log('No active session found');
      return null;
    }

    // Check if session is expired
    const now = new Date().getTime();
    const expiresAt = sessionData.session.expires_at * 1000; // Convert to milliseconds
    
    if (now >= expiresAt) {
      console.log('Session has expired');
      return null;
    }

    // Fetch the user's profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single();

    if (profileError) {
      console.error('Error fetching profile:', profileError.message);
      return null;
    }

    if (!profileData) {
      console.error('No profile found for user:', sessionData.session.user.id);
      return null;
    }

    // Return the combined user object with auth and profile data
    return {
      auth: sessionData.session.user,
      profile: profileData as Profile,
    } as User;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};
