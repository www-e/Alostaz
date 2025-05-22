import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  type?: 'danger' | 'warning' | 'info';
}

/**
 * A reusable confirmation dialog component
 * Used for confirming potentially destructive actions
 */
const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'تأكيد',
  cancelText = 'إلغاء',
  isLoading = false,
  type = 'danger'
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  // Get button color based on dialog type
  const getButtonColorScheme = () => {
    switch (type) {
      case 'danger':
        return 'red';
      case 'warning':
        return 'orange';
      case 'info':
        return 'blue';
      default:
        return 'red';
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
    >
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="lg" mx={4}>
          <AlertDialogHeader
            fontSize="lg"
            fontWeight="bold"
            borderBottomWidth="1px"
            pb={3}
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogBody py={6}>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant="outline"
              mr={3}
              isDisabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              colorScheme={getButtonColorScheme()}
              onClick={onConfirm}
              isLoading={isLoading}
              loadingText="جاري التنفيذ..."
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmDialog;
