/**
 * Auth-related types for the educational center system
 * Based on the auth schema defined in 01_auth_schema.sql
 */

// User role enum type from the database
export type UserRole = 'admin' | 'student';

// Profile type matching the profiles table
export interface Profile {
  id: string; // UUID
  role: UserRole;
  full_name: string;
  phone?: string;
  parent_phone?: string;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}

// Auth user type with Supabase auth properties
export interface AuthUser {
  id: string;
  email?: string;
  app_metadata: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  aud: string;
  created_at: string;
}

// Combined user type with auth and profile data
export interface User {
  auth: AuthUser;
  profile: Profile;
}

// Login credentials type
export interface LoginCredentials {
  email: string;
  password: string;
}

// Auth state type
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
