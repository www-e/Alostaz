import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signOut, getCurrentUser, isAdmin as checkIsAdmin } from '../supabase/auth';
import { LoginCredentials, Profile, AuthContextType } from '../types';

// Create a context for authentication
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps the app and makes auth available
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const { user: currentUser, error: userError } = await getCurrentUser();
        
        if (userError) {
          setError(userError);
          setUser(null);
        } else {
          setUser(currentUser);
          setError(null);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setUser(null);
        setError('حدث خطأ أثناء التحقق من تسجيل الدخول');
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user: authUser, error: authError } = await signIn(credentials);
      
      if (authError) {
        setError(authError);
        setUser(null);
        return;
      }
      
      setUser(authUser);
      
      // Redirect based on user role
      if (authUser?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/student');
      }
    } catch (err) {
      console.error('Login error:', err);
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
      const { error: logoutError } = await signOut();
      
      if (logoutError) {
        setError(logoutError);
        return;
      }
      
      setUser(null);
      router.push('/auth/login');
    } catch (err) {
      console.error('Logout error:', err);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
