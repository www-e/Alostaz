-- 06_payments_schema.sql
-- This file contains the schema for payments and financial settings

-- Create payment_type enum
CREATE TYPE payment_type AS ENUM (
  'monthly',
  'book'
);

-- Create payment_settings table for configuring prices
CREATE TABLE IF NOT EXISTS public.payment_settings (
  id SERIAL PRIMARY KEY,
  grade_id INTEGER REFERENCES public.grades(id) ON DELETE CASCADE,
  track_id INTEGER REFERENCES public.tracks(id) ON DELETE CASCADE NULL,
  monthly_amount DECIMAL(10, 2) NOT NULL,
  book_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  UNIQUE(grade_id, track_id)
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id SERIAL PRIMARY KEY,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
  payment_type payment_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  month INTEGER, -- For monthly payments (1-12)
  year INTEGER, -- For monthly payments
  book_name TEXT, -- For book payments
  receipt_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create function to get student monthly payments for a specific year
CREATE OR REPLACE FUNCTION public.get_student_monthly_payments(
  p_student_id UUID,
  p_year INTEGER
)
RETURNS TABLE (
  month INTEGER,
  amount DECIMAL(10, 2),
  payment_date DATE,
  receipt_number TEXT,
  notes TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.month, p.amount, p.payment_date, p.receipt_number, p.notes
  FROM public.payments p
  WHERE p.student_id = p_student_id
    AND p.year = p_year
    AND p.payment_type = 'monthly'
  ORDER BY p.month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get student book payments
CREATE OR REPLACE FUNCTION public.get_student_book_payments(
  p_student_id UUID
)
RETURNS TABLE (
  book_name TEXT,
  amount DECIMAL(10, 2),
  payment_date DATE,
  receipt_number TEXT,
  notes TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT p.book_name, p.amount, p.payment_date, p.receipt_number, p.notes
  FROM public.payments p
  WHERE p.student_id = p_student_id
    AND p.payment_type = 'book'
  ORDER BY p.payment_date DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if a student has paid for a specific month
CREATE OR REPLACE FUNCTION public.has_paid_monthly(
  p_student_id UUID,
  p_year INTEGER,
  p_month INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  has_paid BOOLEAN;
BEGIN
  SELECT EXISTS (
    SELECT 1
    FROM public.payments
    WHERE student_id = p_student_id
      AND year = p_year
      AND month = p_month
      AND payment_type = 'monthly'
  ) INTO has_paid;
  
  RETURN has_paid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get the appropriate payment amount for a student
CREATE OR REPLACE FUNCTION public.get_student_payment_amount(
  p_student_id UUID,
  p_payment_type payment_type
)
RETURNS DECIMAL(10, 2) AS $$
DECLARE
  amount DECIMAL(10, 2);
BEGIN
  SELECT 
    CASE 
      WHEN p_payment_type = 'monthly' THEN ps.monthly_amount
      WHEN p_payment_type = 'book' THEN ps.book_amount
    END INTO amount
  FROM public.students s
  JOIN public.payment_settings ps ON s.grade_id = ps.grade_id AND (s.track_id = ps.track_id OR (s.track_id IS NULL AND ps.track_id IS NULL))
  WHERE s.id = p_student_id;
  
  RETURN amount;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE public.payment_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payment_settings table
-- Allow anyone to read payment settings
CREATE POLICY "Anyone can view payment settings" 
  ON public.payment_settings 
  FOR SELECT 
  USING (true);

-- Allow admins to manage payment settings
CREATE POLICY "Admins can manage payment settings" 
  ON public.payment_settings 
  FOR ALL 
  USING (public.is_admin());

-- Create policies for payments table
-- Allow students to read their own payments
CREATE POLICY "Students can view their own payments" 
  ON public.payments 
  FOR SELECT 
  USING (auth.uid() = student_id);

-- Allow admins to manage all payments
CREATE POLICY "Admins can manage all payments" 
  ON public.payments 
  FOR ALL 
  USING (public.is_admin());

-- Create triggers for updating modified columns
CREATE TRIGGER update_payment_settings_modtime
BEFORE UPDATE ON public.payment_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_columns();

CREATE TRIGGER update_payments_modtime
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_modified_columns();

-- Insert initial payment settings for each grade and track
INSERT INTO public.payment_settings (grade_id, track_id, monthly_amount, book_amount, created_by)
SELECT g.id, t.id, 
  CASE 
    WHEN g.name = 'الصف الأول الثانوي' THEN 300.00
    WHEN g.name = 'الصف الثاني الثانوي' AND t.name = 'علمي' THEN 350.00
    WHEN g.name = 'الصف الثاني الثانوي' AND t.name = 'أدبي' THEN 325.00
    WHEN g.name = 'الصف الثالث الثانوي' AND t.name = 'علمي' THEN 400.00
    WHEN g.name = 'الصف الثالث الثانوي' AND t.name = 'أدبي' THEN 375.00
  END,
  CASE 
    WHEN g.name = 'الصف الأول الثانوي' THEN 50.00
    WHEN g.name = 'الصف الثاني الثانوي' AND t.name = 'علمي' THEN 60.00
    WHEN g.name = 'الصف الثاني الثانوي' AND t.name = 'أدبي' THEN 55.00
    WHEN g.name = 'الصف الثالث الثانوي' AND t.name = 'علمي' THEN 70.00
    WHEN g.name = 'الصف الثالث الثانوي' AND t.name = 'أدبي' THEN 65.00
  END,
  (SELECT id FROM auth.users WHERE email = 'admin@alostaz.edu')
FROM public.grades g
JOIN public.tracks t ON g.id = t.grade_id
WHERE g.has_tracks = true
ON CONFLICT (grade_id, track_id) DO NOTHING;

-- Insert for first grade (no tracks)
INSERT INTO public.payment_settings (grade_id, track_id, monthly_amount, book_amount, created_by)
SELECT g.id, NULL, 300.00, 50.00, (SELECT id FROM auth.users WHERE email = 'admin@alostaz.edu')
FROM public.grades g
WHERE g.name = 'الصف الأول الثانوي'
ON CONFLICT (grade_id, track_id) DO NOTHING;
