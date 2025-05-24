-- 01_auth_schema.sql
-- Authentication schema for the educational center system

-- 1. Create the 'auth' schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- 2. Create custom ENUM type for user roles
CREATE TYPE user_role AS ENUM ('admin', 'student');

-- 3. Create the 'profiles' table in the public schema
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role NOT NULL DEFAULT 'student',
  full_name TEXT NOT NULL,
  phone TEXT,
  parent_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS) on 'profiles' table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 5. Policies for regular users (students) to access their own data
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- 6. Policies for admins to access and manage all profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can insert profiles" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Admins can update all profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 7. Link existing admin user (already created via Authentication tab) to profiles
INSERT INTO public.profiles (id, role, full_name)
SELECT id, 'admin', 'Admin User'
FROM auth.users
WHERE email = 'admin@alostaz.edu'
ON CONFLICT (id) DO NOTHING;

-- 8. Utility function to check if the current user is an admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
