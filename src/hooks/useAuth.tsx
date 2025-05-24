import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { AuthState, LoginCredentials, User, UserRole } from '@/types/database';
import { signInWithEmailPassword, signOut, getCurrentUser } from '@/lib/auth/auth-service';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

// Define the auth context type
type AuthContextType = {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  hasRole: (role: UserRole) => boolean;
};

// Create auth context with proper typing
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider props
type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Auth provider component to wrap the application
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const router = useRouter();

  // Check if user has a specific role
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return authState.user?.profile.role === role;
    },
    [authState.user]
  );

  // Login function
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
      console.log('Login attempt with:', credentials.email);
      
      const user = await signInWithEmailPassword(credentials);
      
      if (!user) {
        console.error('Login failed: No user returned from signInWithEmailPassword');
        throw new Error('فشل تسجيل الدخول. يرجى التحقق من بيانات الاعتماد الخاصة بك.');
      }

      console.log('Login successful for user with role:', user.profile.role);
      
      setAuthState({
        user,
        isLoading: false,
        error: null,
      });

      // Redirect based on role - only after explicit login
      if (user.profile.role === 'admin') {
        console.log('Redirecting to admin dashboard after successful login');
        router.push('/auth/admin/dashboard');
      } else if (user.profile.role === 'student') {
        console.log('Redirecting to student dashboard after successful login');
        router.push('/auth/student/dashboard');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ غير متوقع';
      console.error('Login error:', errorMessage);
      
      setAuthState({
        user: null,
        isLoading: false,
        error: errorMessage,
      });
      throw error; // Re-throw to allow error handling in components
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await signOut();
      
      setAuthState({
        user: null,
        isLoading: false,
        error: null,
      });
      
      router.push('/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الخروج';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error; // Re-throw to allow error handling in components
    }
  };

  // Effect to initialize auth state and set up auth listener
  useEffect(() => {
    console.log('Login page loaded, auth state:', 
      authState.isLoading ? 'loading' : (authState.user ? 'authenticated' : 'unauthenticated'));
      
    // Restore auto-redirect for authenticated users, but only after loading is complete
    if (authState.user && !authState.isLoading) {
      console.log('User already authenticated, redirecting to dashboard');
      // Redirect based on user role
      if (authState.user.profile.role === 'admin') {
        router.push('/auth/admin/dashboard');
      } else if (authState.user.profile.role === 'student') {
        router.push('/auth/student/dashboard');
      }
    }
  }, [authState.user, authState.isLoading, router]);

  useEffect(() => {
    let isInitialMount = true;
    
    // Get initial session
    const initializeAuth = async () => {
      try {
        // For login page, we'll intentionally not restore the session to prevent flash redirects
        const isLoginPage = window.location.pathname.includes('/login');
        
        if (isLoginPage) {
          console.log('On login page - not restoring session automatically');
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
          return;
        }
        
        const user = await getCurrentUser();
        // Only update state with user if it's not null
        setAuthState({
          user: user, // This will be null if no valid session exists
          isLoading: false,
          error: null,
        });
        
        // Log authentication state for debugging
        console.log('Auth initialized:', user ? 'User authenticated' : 'No user session');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'حدث خطأ أثناء تحميل بيانات الجلسة';
        console.error('Auth initialization error:', errorMessage);
        setAuthState({
          user: null,
          isLoading: false,
          error: errorMessage,
        });
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        
        // Ignore INITIAL_SESSION events on login page to prevent flash redirects
        const isLoginPage = window.location.pathname.includes('/login');
        if (event === 'INITIAL_SESSION' && isLoginPage) {
          console.log('Ignoring INITIAL_SESSION event on login page');
          return;
        }
        
        if (event === 'SIGNED_IN' && session) {
          try {
            const user = await getCurrentUser();
            if (user) {
              console.log('User authenticated after sign in');
              setAuthState({
                user,
                isLoading: false,
                error: null,
              });
              
              // Only redirect after explicit sign in, not on initial load
              if (!isInitialMount && !isLoginPage) {
                // Redirect based on role
                if (user.profile.role === 'admin') {
                  router.push('/dashboard');
                } else if (user.profile.role === 'student') {
                  router.push('/student/dashboard');
                }
              }
            } else {
              console.warn('Sign in event occurred but no user data found');
              setAuthState({
                user: null,
                isLoading: false,
                error: 'فشل في الحصول على بيانات المستخدم',
              });
            }
          } catch (error) {
            console.error('Error getting user after sign in:', error);
            setAuthState({
              user: null,
              isLoading: false,
              error: 'حدث خطأ أثناء تحميل بيانات المستخدم',
            });
          }
        } else if (event === 'SIGNED_OUT') {
          console.log('User signed out');
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      }
    );
    
    // After first mount, set isInitialMount to false
    isInitialMount = false;

    // Clean up subscription on unmount
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue: AuthContextType = {
    authState,
    login,
    logout,
    hasRole,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;