/**
 * Permission gate component for component-level access control
 * Conditionally renders children based on user role
 */

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/types/database';

interface PermissionGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

const PermissionGate: React.FC<PermissionGateProps> = ({
  children,
  allowedRoles,
  fallback = null,
}) => {
  const { authState, hasRole } = useAuth();

  // If auth is still loading, don't render anything
  if (authState.isLoading) {
    return null;
  }

  // If user is not authenticated, render fallback
  if (!authState.user) {
    return <>{fallback}</>;
  }

  // Check if user has any of the allowed roles
  const hasAllowedRole = allowedRoles.some(role => hasRole(role));

  // If user has an allowed role, render children, otherwise render fallback
  return <>{hasAllowedRole ? children : fallback}</>;
};

export default PermissionGate;
