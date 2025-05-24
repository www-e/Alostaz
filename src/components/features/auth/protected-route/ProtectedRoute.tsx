/**
 * Protected route component for role-based access control
 * Redirects unauthorized users to the login page
 */

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/database';
import { useToastContext } from '@/components/ui/toast/ToastProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { authState, hasRole } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToastContext();

  useEffect(() => {
    // If auth is still loading, wait
    if (authState.isLoading) return;

    // If user is not logged in, redirect to login
    if (!authState.user) {
      router.push('/login');
      return;
    }

    // If allowedRoles is empty, any authenticated user is allowed
    if (allowedRoles.length === 0) return;

    // Check if user has any of the allowed roles
    const hasAllowedRole = allowedRoles.some(role => hasRole(role));
    
    if (!hasAllowedRole) {
      // Redirect based on user's role
      if (hasRole('admin')) {
        router.push('/admin/dashboard');
      } else if (hasRole('student')) {
        router.push('/student/dashboard');
      } else {
        // Fallback to login if role is unknown
        router.push('/login');
      }
      
      toast.error('ليس لديك صلاحية للوصول إلى هذه الصفحة');
    }
  }, [authState.isLoading, authState.user, allowedRoles, hasRole, router, pathname, toast]);

  // Show loading state while checking authentication
  if (authState.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If user is not authenticated, don't render children
  if (!authState.user) {
    return null;
  }

  // If allowedRoles is specified and user doesn't have any of them, don't render children
  if (allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) {
    return null;
  }

  // User is authenticated and authorized, render children
  return <>{children}</>;
};

export default ProtectedRoute;
