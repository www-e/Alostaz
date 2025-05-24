/**
 * Auth-protected layout component
 * Provides the layout structure for authenticated routes with proper authorization
 */

'use client';

import React from 'react';
import { AuthProvider } from '@/hooks/useAuth';
import { ToastProvider } from '@/components/ui/toast/ToastProvider';
import ProtectedRoute from '@/components/features/auth/protected-route';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <ProtectedRoute>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {children}
          </div>
        </ProtectedRoute>
      </ToastProvider>
    </AuthProvider>
  );
};

export default AuthLayout;
