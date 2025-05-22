// Homework related types
import { HomeworkStatus } from './enums';

export interface Homework {
  id: number;
  title: string;
  description?: string;
  due_date: string;
  grade_id: number;
  track_id?: number;
  group_day_id?: number;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
}

export interface HomeworkSubmission {
  id: number;
  homework_id: number;
  student_id: string;
  submission_date: string;
  status: HomeworkStatus;
  feedback?: string;
  created_at: string;
  updated_at: string;
}

export interface HomeworkWithSubmission {
  homework_title: string;
  submission_date: string;
  status: HomeworkStatus;
  feedback?: string;
}

export interface CreateHomeworkRequest {
  title: string;
  description?: string;
  due_date: string;
  grade_id: number;
  track_id?: number;
  group_day_id?: number;
}

export interface SubmitHomeworkRequest {
  homework_id: number;
  student_id: string;
}
