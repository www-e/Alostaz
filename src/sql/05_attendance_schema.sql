-- 05_attendance_schema.sql
-- This file contains the schema for attendance tracking

-- Create attendance status enum
CREATE TYPE attendance_status AS ENUM (
  'حضر',
  'غاب',
  'تأخر'
);

-- Create attendance table
CREATE TABLE IF NOT EXISTS public.attendance (
  id SERIAL PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  attendance_date DATE NOT NULL,
  status attendance_status NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(student_id, attendance_date)
);

-- Create function to get student attendance for a specific month
CREATE OR REPLACE FUNCTION public.get_student_attendance(
  p_student_id UUID,
  p_year INTEGER,
  p_month INTEGER
)
RETURNS TABLE (
  attendance_date DATE,
  status attendance_status,
  notes TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT a.attendance_date, a.status, a.notes
  FROM public.attendance a
  WHERE a.student_id = p_student_id
    AND EXTRACT(YEAR FROM a.attendance_date) = p_year
    AND EXTRACT(MONTH FROM a.attendance_date) = p_month
  ORDER BY a.attendance_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get attendance for a specific group on a specific date
CREATE OR REPLACE FUNCTION public.get_group_attendance(
  p_group_day_id INTEGER,
  p_date DATE
)
RETURNS TABLE (
  student_id UUID,
  student_name TEXT,
  status attendance_status,
  notes TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.id, s.full_name, a.status, a.notes
  FROM public.students s
  LEFT JOIN public.attendance a ON s.id = a.student_id AND a.attendance_date = p_date
  WHERE s.group_day_id = p_group_day_id
    AND s.active = TRUE
  ORDER BY s.full_name;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create policies for attendance table
-- Allow students to read their own attendance
CREATE POLICY "Students can view their own attendance" 
  ON public.attendance 
  FOR SELECT 
  USING (auth.uid() = student_id);

-- Allow admins to manage all attendance records
CREATE POLICY "Admins can manage all attendance records" 
  ON public.attendance 
  FOR ALL 
  USING (public.is_admin());

-- Create trigger to update the updated_at and updated_by fields
CREATE OR REPLACE FUNCTION public.update_modified_columns()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  NEW.updated_by = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_attendance_modtime
BEFORE UPDATE ON public.attendance
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_columns();
