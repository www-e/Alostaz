import React from 'react';
import { Badge, BadgeProps } from '@chakra-ui/react';
import { AttendanceStatus, PaymentType } from '@/lib/types';

interface StatusBadgeProps extends Omit<BadgeProps, 'colorScheme'> {
  status: string;
  type: 'attendance' | 'payment' | 'homework';
}

/**
 * A reusable badge component for displaying status with appropriate colors
 * Used for attendance status, payment status, and homework status
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type, ...props }) => {
  // Get color scheme based on status type and value
  const getColorScheme = () => {
    if (type === 'attendance') {
      switch (status as AttendanceStatus) {
        case 'حضر':
          return 'green';
        case 'غاب':
          return 'red';
        case 'تأخر':
          return 'orange';
        default:
          return 'gray';
      }
    } else if (type === 'payment') {
      return status === 'مدفوع' ? 'green' : 'red';
    } else if (type === 'homework') {
      switch (status) {
        case 'مطلوب':
          return 'blue';
        case 'مقدم':
          return 'yellow';
        case 'مصحح':
          return 'green';
        default:
          return 'gray';
      }
    }
    
    return 'gray';
  };

  return (
    <Badge
      colorScheme={getColorScheme()}
      borderRadius="full"
      px={3}
      py={1}
      fontSize="0.8em"
      fontWeight="medium"
      textTransform="none"
      {...props}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
