# FILE: database-schema.md

# Database Design

## Overview

The Alostaz platform uses a PostgreSQL database managed by Supabase. This document outlines the database schema, relationships, and key design decisions.

## Schema

### Core Tables

#### Users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role USER_ROLE NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Students
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  grade_id UUID REFERENCES grades(id),
  track_id UUID REFERENCES tracks(id),
  group_id UUID REFERENCES groups(id),
  parent_name TEXT,
  parent_phone TEXT,
  address TEXT,
  notes TEXT
);
```

#### Attendance
```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status ATTENDANCE_STATUS NOT NULL,
  notes TEXT,
  recorded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

#### Payments
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_type PAYMENT_TYPE NOT NULL,
  month INTEGER,
  year INTEGER,
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

## Relationships

- One-to-One: `users` ↔ `students`
- One-to-Many: `students` → `attendance`
- One-to-Many: `students` → `payments`
- Many-to-One: `students` → `grades`
- Many-to-One: `students` → `tracks`
- Many-to-One: `students` → `groups`

## Indexes

```sql
-- Improve query performance for common lookups
CREATE INDEX idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX idx_payments_student_date ON payments(student_id, payment_date);
CREATE INDEX idx_students_grade ON students(grade_id);
CREATE INDEX idx_students_track ON students(track_id);
```

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:
- Admins have full access
- Students can only access their own data
- Teachers can access data for their assigned groups

## Migrations

Database changes are managed through migration files in `supabase/migrations/`:

```
migrations/
├── 00000000000000_initial_schema.sql
├── 00000000000001_add_attendance_table.sql
└── 00000000000002_add_payments_table.sql
```

To apply migrations:
```bash
supabase db push
```

## Backup and Recovery

1. **Automatic Backups**
   - Daily backups retained for 7 days
   - Weekly backups retained for 4 weeks
   - Monthly backups retained for 12 months

2. **Manual Backup**
```bash
pg_dump -h db.your-supabase-url.com -p 5432 -U postgres -d postgres -f backup.sql
```

## Performance Considerations

- Large tables are partitioned by date where appropriate
- Frequently accessed data is denormalized for performance
- Complex queries are optimized and tested with `EXPLAIN ANALYZE`
- Connection pooling is used to manage database connections efficiently
