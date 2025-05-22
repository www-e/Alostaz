// Grade and track related types
import { GradeLevel, TrackType } from './enums';

export interface Grade {
  id: number;
  name: GradeLevel;
  has_tracks: boolean;
  created_at: string;
  updated_at: string;
}

export interface Track {
  id: number;
  grade_id: number;
  name: TrackType;
  created_at: string;
  updated_at: string;
}

export interface GradeWithTracks extends Grade {
  tracks: Track[];
}
