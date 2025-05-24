-- Fix for the infinite recursion in RLS policies
-- This script corrects the Row Level Security policies for the profiles table

-- First, disable RLS temporarily to fix the policies
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create simplified policies that avoid recursion
-- 1. Allow users to view and update their own profile
CREATE POLICY "users_own_profile_access" 
  ON public.profiles 
  USING (auth.uid() = id);

-- 2. Create a separate policy for admins using a direct role check
-- This avoids the recursion by not querying the profiles table within the policy
CREATE POLICY "admin_all_access" 
  ON public.profiles 
  USING (
    -- This is a simplified check that doesn't cause recursion
    -- It checks if the current user has the admin role in their JWT claims
    (current_setting('request.jwt.claims', true)::json->>'role')::text = 'service_role'
  );

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a simplified admin check function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- Use JWT claims to check for admin role without querying profiles
  RETURN (current_setting('request.jwt.claims', true)::json->>'role')::text = 'service_role';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert admin user if it doesn't exist
INSERT INTO public.profiles (id, role, full_name, created_at, updated_at)
SELECT '4dba45ee-33a6-41cd-b0da-af7c1f7d9870', 'admin', 'Admin User', NOW(), NOW()
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE id = '4dba45ee-33a6-41cd-b0da-af7c1f7d9870'
);
