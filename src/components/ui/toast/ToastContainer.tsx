/**
 * Toast container component
 * Manages and displays multiple toast notifications
 */

import React from 'react';
import { createPortal } from 'react-dom';
import Toast from './Toast';
import { Toast as ToastType } from '@/hooks/useToast';

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onDismiss,
  position = 'top-right',
}) => {
  // Only run on client side
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'top-right':
      default:
        return 'top-0 right-0';
    }
  };

  if (!isMounted) return null;

  // Use createPortal to render toasts at the document level
  return createPortal(
    <div
      className={`fixed z-50 p-4 max-h-screen overflow-hidden pointer-events-none flex flex-col ${getPositionClasses()}`}
      aria-live="assertive"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onDismiss={onDismiss} />
        </div>
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
