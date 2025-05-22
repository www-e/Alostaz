-- 07_homework_schema.sql
-- This file contains the schema for homework tracking (future feature)

-- Create homework status enum
CREATE TYPE homework_status AS ENUM (
  'مطلوب',
  'مقدم',
  'مصحح'
);

-- Create homework table
CREATE TABLE IF NOT EXISTS public.homework (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  grade_id INTEGER REFERENCES public.grades(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES public.tracks(id) ON DELETE CASCADE NULL,
  group_day_id INTEGER REFERENCES public.group_days(id) ON DELETE CASCADE NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create homework_submissions table
CREATE TABLE IF NOT EXISTS public.homework_submissions (
  id SERIAL PRIMARY KEY,
  homework_id INTEGER REFERENCES public.homework(id) ON DELETE CASCADE,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  submission_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  status homework_status NOT NULL DEFAULT 'مقدم',
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(homework_id, student_id)
);

-- Create function to get student homework submissions
CREATE OR REPLACE FUNCTION public.get_student_homework_submissions(
  p_student_id UUID
)
RETURNS TABLE (
  homework_title TEXT,
  submission_date TIMESTAMP WITH TIME ZONE,
  status homework_status,
  feedback TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT h.title, hs.submission_date, hs.status, hs.feedback
  FROM public.homework_submissions hs
  JOIN public.homework h ON hs.homework_id = h.id
  WHERE hs.student_id = p_student_id
  ORDER BY hs.submission_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE public.homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homework_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for homework table
-- Allow students to view homework assigned to their grade/track/group
CREATE POLICY "Students can view their homework" 
  ON public.homework 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = auth.uid()
        AND (
          (s.grade_id = homework.grade_id)
          AND (s.track_id = homework.track_id OR homework.track_id IS NULL)
          AND (s.group_day_id = homework.group_day_id OR homework.group_day_id IS NULL)
        )
    )
  );

-- Allow admins to manage all homework
CREATE POLICY "Admins can manage all homework" 
  ON public.homework 
  FOR ALL 
  USING (public.is_admin());

-- Create policies for homework_submissions table
-- Allow students to view and submit their own homework
CREATE POLICY "Students can view their own homework submissions" 
  ON public.homework_submissions 
  FOR SELECT 
  USING (auth.uid() = student_id);

CREATE POLICY "Students can submit their own homework" 
  ON public.homework_submissions 
  FOR INSERT 
  WITH CHECK (auth.uid() = student_id);

-- Allow admins to manage all homework submissions
CREATE POLICY "Admins can manage all homework submissions" 
  ON public.homework_submissions 
  FOR ALL 
  USING (public.is_admin());

-- Create triggers for updating modified columns
CREATE TRIGGER update_homework_modtime
BEFORE UPDATE ON public.homework
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_columns();
