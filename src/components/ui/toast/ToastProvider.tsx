/**
 * Toast provider component
 * Makes toast notifications available throughout the application
 */

import React, { createContext, useContext } from 'react';
import ToastContainer from './ToastContainer';
import useToast, { ToastType } from '@/hooks/useToast';

// Create context for toast functionality
interface ToastContextValue {
  showToast: (message: string, type?: ToastType, duration?: number) => string;
  dismissToast: (id: string) => void;
  success: (message: string, duration?: number) => string;
  error: (message: string, duration?: number) => string;
  info: (message: string, duration?: number) => string;
  warning: (message: string, duration?: number) => string;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider
      value={{
        showToast: toast.showToast,
        dismissToast: toast.dismissToast,
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
      }}
    >
      {children}
      <ToastContainer toasts={toast.toasts} onDismiss={toast.dismissToast} />
    </ToastContext.Provider>
  );
};

// Custom hook to use toast context
export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;
