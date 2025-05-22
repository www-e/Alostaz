-- 03_group_days_schema.sql
-- This file contains the schema for group days and times

-- Create group_configurations table to store group day pairs
CREATE TABLE IF NOT EXISTS public.group_configurations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  day1 day_of_week NOT NULL,
  day2 day_of_week NOT NULL,
  is_science_friday BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(day1, day2)
);

-- Create group_times table
CREATE TABLE IF NOT EXISTS public.group_times (
  id SERIAL PRIMARY KEY,
  time_label TEXT NOT NULL, -- e.g. "الساعة ٤ مساءاً"
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(time_label)
);

-- Create group_days table that links grades, group configurations, and times
CREATE TABLE IF NOT EXISTS public.group_days (
  id SERIAL PRIMARY KEY,
  grade_id INTEGER REFERENCES public.grades(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES public.tracks(id) ON DELETE CASCADE NULL,
  group_config_id INTEGER REFERENCES public.group_configurations(id) ON DELETE CASCADE,
  group_time_id INTEGER REFERENCES public.group_times(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(grade_id, track_id, group_config_id, group_time_id)
);

-- Enable Row Level Security
ALTER TABLE public.group_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_times ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_days ENABLE ROW LEVEL SECURITY;

-- Create policies for group_configurations table
-- Allow anyone to read group configurations
CREATE POLICY "Anyone can view group configurations" 
  ON public.group_configurations 
  FOR SELECT 
  USING (true);

-- Allow admins to manage group configurations
CREATE POLICY "Admins can manage group configurations" 
  ON public.group_configurations 
  FOR ALL 
  USING (public.is_admin());

-- Create policies for group_times table
-- Allow anyone to read group times
CREATE POLICY "Anyone can view group times" 
  ON public.group_times 
  FOR SELECT 
  USING (true);

-- Allow admins to manage group times
CREATE POLICY "Admins can manage group times" 
  ON public.group_times 
  FOR ALL 
  USING (public.is_admin());

-- Create policies for group_days table
-- Allow anyone to read group days
CREATE POLICY "Anyone can view group days" 
  ON public.group_days 
  FOR SELECT 
  USING (true);

-- Allow admins to manage group days
CREATE POLICY "Admins can manage group days" 
  ON public.group_days 
  FOR ALL 
  USING (public.is_admin());

-- Insert initial group configurations
INSERT INTO public.group_configurations (name, day1, day2, is_science_friday) VALUES
  ('السبت والثلاثاء', 'السبت', 'الثلاثاء', false),
  ('الأحد والأربعاء', 'الأحد', 'الأربعاء', false),
  ('الاثنين والخميس', 'الاثنين', 'الخميس', false),
  ('السبت والثلاثاء والجمعة', 'السبت', 'الثلاثاء', true),
  ('الأحد والأربعاء والجمعة', 'الأحد', 'الأربعاء', true),
  ('الاثنين والخميس والجمعة', 'الاثنين', 'الخميس', true)
ON CONFLICT (day1, day2) DO NOTHING;

-- Insert initial group times
INSERT INTO public.group_times (time_label) VALUES
  ('الساعة ٢ مساءاً'),
  ('الساعة ٤ مساءاً'),
  ('الساعة ٦ مساءاً'),
  ('الساعة ٨ مساءاً')
ON CONFLICT (time_label) DO NOTHING;
