/**
 * Custom hook for toast notifications
 * Provides a simple API for displaying toast messages
 */

import { useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Generate a unique ID for each toast
  const generateId = () => `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Add a new toast
  const showToast = useCallback(
    (message: string, type: ToastType = 'info', duration = 5000) => {
      const id = generateId();
      const toast: Toast = { id, message, type, duration };
      
      setToasts((prevToasts) => [...prevToasts, toast]);
      
      // Automatically remove toast after duration
      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
      
      return id;
    },
    []
  );

  // Remove a toast by ID
  const dismissToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Shorthand methods for different toast types
  const success = useCallback(
    (message: string, duration?: number) => showToast(message, 'success', duration),
    [showToast]
  );

  const error = useCallback(
    (message: string, duration?: number) => showToast(message, 'error', duration),
    [showToast]
  );

  const info = useCallback(
    (message: string, duration?: number) => showToast(message, 'info', duration),
    [showToast]
  );

  const warning = useCallback(
    (message: string, duration?: number) => showToast(message, 'warning', duration),
    [showToast]
  );

  return {
    toasts,
    showToast,
    dismissToast,
    success,
    error,
    info,
    warning,
  };
};

export default useToast;
