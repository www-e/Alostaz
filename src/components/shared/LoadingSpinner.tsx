import React from 'react';
import { Flex, Spinner, Text, Box } from '@chakra-ui/react';

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullPage?: boolean;
}

/**
 * A reusable loading spinner component with optional text
 * Can be used as a full-page loader or inline
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  text = 'جاري التحميل...',
  size = 'xl',
  fullPage = false
}) => {
  const content = (
    <Flex direction="column" align="center" justify="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary.500"
        size={size}
      />
      {text && (
        <Text mt={4} fontSize="md" color="gray.600" fontWeight="medium">
          {text}
        </Text>
      )}
    </Flex>
  );

  if (fullPage) {
    return (
      <Flex
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="rgba(255, 255, 255, 0.9)"
        zIndex="9999"
        align="center"
        justify="center"
      >
        {content}
      </Flex>
    );
  }

  return <Box py={8}>{content}</Box>;
};

export default LoadingSpinner;
