import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, getCurrentUser, isAdmin as checkIsAdmin } from '../supabase/auth';
import { LoginCredentials, Profile, AuthContextType } from '../types';
import { supabase } from '../supabase/client';

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app and makes auth available
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [authInitialized, setAuthInitialized] = useState<boolean>(false);
  const router = useRouter();

  // Function to fetch user data - extracted to be reusable
  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('Fetching current user data');
      const { user: currentUser, error: userError } = await getCurrentUser();
      
      if (userError) {
        console.error('Error fetching user data:', userError);
        setError(userError);
        setUser(null);
      } else {
        console.log('User data retrieved:', currentUser ? 'User found' : 'No user');
        setUser(currentUser);
        setError(null);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
      setError('حدث خطأ أثناء التحقق من تسجيل الدخول');
    } finally {
      setIsLoading(false);
      setAuthInitialized(true);
    }
  }, []);

  // Check if user is authenticated on mount
  useEffect(() => {
    fetchUserData();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session ? 'Session exists' : 'No session');
        
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          fetchUserData();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setError(null);
        }
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserData]);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Attempting to log in user');
      const { user: authUser, error: authError } = await signIn(credentials);
      
      if (authError) {
        console.error('Login error:', authError);
        setError(authError);
        setUser(null);
        return;
      }
      
      if (!authUser) {
        console.error('No user returned after login');
        setError('فشل تسجيل الدخول');
        return;
      }
      
      console.log('User logged in successfully');
      setUser(authUser);
      
      // Redirect based on user role
      if (authUser.role === 'admin') {
        console.log('Redirecting to admin dashboard');
        router.push('/admin');
      } else {
        console.log('Redirecting to student dashboard');
        router.push('/student');
      }
    } catch (err) {
      console.error('Unexpected login error:', err);
      setError('حدث خطأ أثناء تسجيل الدخول');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      console.log('Attempting to log out user');
      const { error: logoutError } = await signOut();
      
      if (logoutError) {
        console.error('Logout error:', logoutError);
        setError(logoutError);
        return;
      }
      
      console.log('User logged out successfully');
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Unexpected logout error:', err);
      setError('حدث خطأ أثناء تسجيل الخروج');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Context value
  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    isAdmin
  };

  // Only render children once auth is initialized to prevent flash of unauthenticated content
  return (
    <AuthContext.Provider value={value}>
      {authInitialized ? children : null}
    </AuthContext.Provider>
  );
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
