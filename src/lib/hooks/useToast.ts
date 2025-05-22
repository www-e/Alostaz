import { useCallback } from 'react';
import { useToast as useChakraToast } from '@chakra-ui/react';

/**
 * Custom hook for displaying toast notifications with consistent styling
 */
export const useToast = () => {
  const chakraToast = useChakraToast();

  const showToast = useCallback(
    (
      title: string,
      status: 'info' | 'success' | 'warning' | 'error' = 'info',
      description?: string,
      duration = 5000
    ) => {
      chakraToast({
        title,
        description,
        status,
        duration,
        isClosable: true,
        position: 'top',
        variant: 'solid',
        dir: 'rtl'
      });
    },
    [chakraToast]
  );

  const showSuccessToast = useCallback(
    (title: string, description?: string) => {
      showToast(title, 'success', description);
    },
    [showToast]
  );

  const showErrorToast = useCallback(
    (title: string, description?: string) => {
      showToast(title, 'error', description);
    },
    [showToast]
  );

  const showWarningToast = useCallback(
    (title: string, description?: string) => {
      showToast(title, 'warning', description);
    },
    [showToast]
  );

  const showInfoToast = useCallback(
    (title: string, description?: string) => {
      showToast(title, 'info', description);
    },
    [showToast]
  );

  return {
    showToast,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast
  };
};
