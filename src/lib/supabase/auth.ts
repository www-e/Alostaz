import { supabase, handleSupabaseError } from './client';
import { LoginCredentials, Profile } from '../types';

/**
 * Sign in with email and password
 */
export const signIn = async (credentials: LoginCredentials): Promise<{ user: Profile | null; error: string | null }> => {
  try {
    // Input validation
    if (!credentials.email || !credentials.password) {
      return { user: null, error: 'البريد الإلكتروني وكلمة المرور مطلوبان' };
    }

    // Clean input data
    const email = credentials.email.trim().toLowerCase();
    
    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: credentials.password,
    });

    // Handle authentication errors
    if (authError) {
      if (authError.message.includes('Invalid login credentials')) {
        return { user: null, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
      }
      return { user: null, error: handleSupabaseError(authError) };
    }

    // Verify auth data exists
    if (!authData || !authData.user) {
      return { user: null, error: 'لم يتم العثور على المستخدم' };
    }

    // Get user profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Handle profile errors
    if (profileError) {
      // Check if the error is because the profile doesn't exist
      if (profileError.code === 'PGRST116') {
        // Create a new profile for the user
        const isAdmin = email === 'admin@alostaz.edu';
        
        // Prepare profile data
        const newProfile = {
          id: authData.user.id,
          role: isAdmin ? 'admin' : 'student',
          full_name: isAdmin ? 'Admin User' : (authData.user.email?.split('@')[0] || 'New User'),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Insert the new profile
        const { data: insertedProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
          
        if (insertError) {
          return { user: null, error: 'خطأ في إنشاء الملف الشخصي' };
        }
        
        return { user: insertedProfile, error: null };
      }
      
      return { user: null, error: handleSupabaseError(profileError) };
    }

    // Verify profile data exists
    if (!profileData) {
      return { user: null, error: 'لم يتم العثور على الملف الشخصي' };
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
    console.log('Signing out user');
    
    // Sign out with scope: 'local' to only remove session from current device
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    
    if (error) {
      console.error('Error during sign out:', error);
      return { error: handleSupabaseError(error) };
    }

    console.log('User signed out successfully');
    return { error: null };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return { error: handleSupabaseError(error) };
  }
};

/**
 * Get the current user profile
 */
export const getCurrentUser = async (): Promise<{ user: Profile | null; error: string | null }> => {
  try {
    // Check for active session
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      return { user: null, error: handleSupabaseError(sessionError) };
    }
    
    if (!sessionData.session) {
      return { user: null, error: null }; // No error, just no session
    }
    
    // Get authenticated user data
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      return { user: null, error: handleSupabaseError(authError) };
    }

    if (!authData || !authData.user) {
      return { user: null, error: null }; // No error, just no user
    }

    // Get user profile from database
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      // If profile doesn't exist, create one
      if (profileError.code === 'PGRST116') {
        // Determine if this is the admin user
        const isAdmin = authData.user.email === 'admin@alostaz.edu';
        
        // Create new profile
        const newProfile = {
          id: authData.user.id,
          role: isAdmin ? 'admin' : 'student',
          full_name: isAdmin ? 'Admin User' : (authData.user.email?.split('@')[0] || 'New User'),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Insert profile into database
        const { data: insertedProfile, error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile)
          .select()
          .single();
          
        if (insertError) {
          return { user: null, error: handleSupabaseError(insertError) };
        }
        
        return { user: insertedProfile, error: null };
      }
      
      return { user: null, error: handleSupabaseError(profileError) };
    }

    if (!profileData) {
      return { user: null, error: null };
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
