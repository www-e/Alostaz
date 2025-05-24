-- 02_grades_schema.sql
-- This file contains the schema for grades and tracks

-- Create enum for grade levels
CREATE TYPE grade_level AS ENUM (
  'الصف الأول الثانوي',
  'الصف الثاني الثانوي',
  'الصف الثالث الثانوي'
);

-- Create enum for tracks
CREATE TYPE track_type AS ENUM (
  'علمي',
  'أدبي'
);

-- Create enum for days of the week in Arabic
CREATE TYPE day_of_week AS ENUM (
  'السبت',
  'الأحد',
  'الاثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة'
);

-- Create grades table
CREATE TABLE IF NOT EXISTS public.grades (
  id SERIAL PRIMARY KEY,
  name grade_level NOT NULL,
  has_tracks BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(name)
);

-- Create tracks table
CREATE TABLE IF NOT EXISTS public.tracks (
  id SERIAL PRIMARY KEY,
  grade_id INTEGER REFERENCES public.grades(id) ON DELETE CASCADE,
  name track_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(grade_id, name)
);

-- Enable Row Level Security
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;

-- Create policies for grades table
-- Allow anyone to read grades
CREATE POLICY "Anyone can view grades" 
  ON public.grades 
  FOR SELECT 
  USING (true);

-- Allow admins to manage grades
CREATE POLICY "Admins can manage grades" 
  ON public.grades 
  FOR ALL 
  USING (public.is_admin());

-- Create policies for tracks table
-- Allow anyone to read tracks
CREATE POLICY "Anyone can view tracks" 
  ON public.tracks 
  FOR SELECT 
  USING (true);

-- Allow admins to manage tracks
CREATE POLICY "Admins can manage tracks" 
  ON public.tracks 
  FOR ALL 
  USING (public.is_admin());

-- Insert initial grade data
INSERT INTO public.grades (name, has_tracks) VALUES
  ('الصف الأول الثانوي', false),
  ('الصف الثاني الثانوي', true),
  ('الصف الثالث الثانوي', true)
ON CONFLICT (name) DO NOTHING;

-- Insert tracks for grades that have tracks
INSERT INTO public.tracks (grade_id, name)
SELECT g.id, 'علمي'
FROM public.grades g
WHERE g.has_tracks = true
ON CONFLICT (grade_id, name) DO NOTHING;

INSERT INTO public.tracks (grade_id, name)
SELECT g.id, 'أدبي'
FROM public.grades g
WHERE g.has_tracks = true
ON CONFLICT (grade_id, name) DO NOTHING;
