// Authentication related types
import { UserRole } from './enums';

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string;
  phone?: string;
  parent_phone?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: Profile | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAdmin: () => boolean;
}
