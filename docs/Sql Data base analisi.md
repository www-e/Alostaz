# SQL Database Analysis

## 01_auth_schema.sql
- **Purpose**: Handles user authentication and authorization
- **Key Tables**:
  - `public.profiles`: Stores user profiles with role-based access
- **Security**:
  - Uses Row Level Security (RLS) for fine-grained access control
  - Separate policies for users (own data) and admins (all data)
  - Fixed recursive policy issue using JWT claims

## 02_grades_schema.sql
- **Purpose**: Manages educational grades and tracks
- **Key Tables**:
  - `grades`: Stores grade levels (1st, 2nd, 3rd secondary)
  - `tracks`: Stores tracks (scientific, literary) for 2nd/3rd grades
- **Enums**:
  - `grade_level`: Grade levels in Arabic
  - `track_type`: Scientific/Literary tracks
  - `day_of_week`: Days in Arabic

## 03_group_days_schema.sql
- **Purpose**: Manages group scheduling
- **Key Tables**:
  - `group_configurations`: Defines day pairs (e.g., Sat-Tue)
  - `group_times`: Available time slots
  - `group_days`: Links grades/tracks with configurations and times

## 04_students_schema.sql
- **Purpose**: Manages student records
- **Key Tables**:
  - `students`: Core student information
- **Features**:
  - References auth.users for authentication
  - Links to grades, tracks, and group schedules
  - Helper functions for student data retrieval

## 05_attendance_schema.sql
- **Purpose**: Tracks student attendance
- **Key Tables**:
  - `attendance`: Records attendance with status (present/absent/late)
- **Features**:
  - Daily attendance tracking
  - Monthly attendance reports
  - Group attendance views

## 06_payments_schema.sql
- **Purpose**: Handles financial transactions
- **Key Tables**:
  - `payment_settings`: Configures prices by grade/track
  - `payments`: Records all financial transactions
- **Features**:
  - Monthly fee tracking
  - Book payment tracking
  - Payment history and reporting

## 07_homework_schema.sql
- **Purpose**: Manages homework assignments
- **Key Tables**:
  - `homework`: Assignment details
  - `homework_submissions`: Student submissions
- **Features**:
  - Assignment tracking
  - Submission status
  - Teacher feedback

## Security Model
- Row Level Security (RLS) on all tables
- Role-based access control (admin/student)
- JWT-based authentication
- Recursion-safe policy checks