-- 04_students_schema.sql
-- This file contains the schema for students and their enrollments

-- Create students table
CREATE TABLE IF NOT EXISTS public.students (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  parent_phone TEXT NOT NULL,
  grade_id INTEGER REFERENCES public.grades(id) ON DELETE RESTRICT,
  track_id INTEGER REFERENCES public.tracks(id) ON DELETE RESTRICT NULL,
  group_day_id INTEGER REFERENCES public.group_days(id) ON DELETE RESTRICT,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create function to get student track name
CREATE OR REPLACE FUNCTION public.get_student_track(student_id UUID)
RETURNS TEXT AS $$
DECLARE
  track_name TEXT;
BEGIN
  SELECT t.name INTO track_name
  FROM public.students s
  JOIN public.tracks t ON s.track_id = t.id
  WHERE s.id = student_id;
  
  RETURN track_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get student grade name
CREATE OR REPLACE FUNCTION public.get_student_grade(student_id UUID)
RETURNS TEXT AS $$
DECLARE
  grade_name TEXT;
BEGIN
  SELECT g.name INTO grade_name
  FROM public.students s
  JOIN public.grades g ON s.grade_id = g.id
  WHERE s.id = student_id;
  
  RETURN grade_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get student group days
CREATE OR REPLACE FUNCTION public.get_student_group_days(student_id UUID)
RETURNS TABLE (day1 day_of_week, day2 day_of_week, friday_included BOOLEAN) AS $$
BEGIN
  RETURN QUERY
  SELECT gc.day1, gc.day2, gc.is_science_friday
  FROM public.students s
  JOIN public.group_days gd ON s.group_day_id = gd.id
  JOIN public.group_configurations gc ON gd.group_config_id = gc.id
  WHERE s.id = student_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get student group time
CREATE OR REPLACE FUNCTION public.get_student_group_time(student_id UUID)
RETURNS TEXT AS $$
DECLARE
  time_label TEXT;
BEGIN
  SELECT gt.time_label INTO time_label
  FROM public.students s
  JOIN public.group_days gd ON s.group_day_id = gd.id
  JOIN public.group_times gt ON gd.group_time_id = gt.id
  WHERE s.id = student_id;
  
  RETURN time_label;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for students table
-- Allow students to read their own data
CREATE POLICY "Students can view their own data" 
  ON public.students 
  FOR SELECT 
  USING (auth.uid() = id);

-- Allow admins to manage all students
CREATE POLICY "Admins can manage all students" 
  ON public.students 
  FOR ALL 
  USING (public.is_admin());
