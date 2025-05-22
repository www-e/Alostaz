import React from 'react';
import { Box, Container, Flex, Heading } from '@chakra-ui/react';
import LoadingSpinner from './LoadingSpinner';

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
  actions?: React.ReactNode;
  isLoading?: boolean;
}

/**
 * A consistent page container component with title and optional action buttons
 * Used across the application to maintain consistent layout and spacing
 */
const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  maxWidth = '1200px',
  actions,
  isLoading = false
}) => {
  return (
    <Box as="main" py={6} px={4}>
      <Container maxW={maxWidth} w="full">
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          justify="space-between" 
          align={{ base: 'flex-start', md: 'center' }}
          mb={6}
        >
          <Heading 
            as="h1" 
            size="xl" 
            mb={{ base: 4, md: 0 }}
            bgGradient="linear(to-l, primary.500, secondary.500)"
            bgClip="text"
          >
            {title}
          </Heading>
          
          {actions && (
            <Box>
              {actions}
            </Box>
          )}
        </Flex>
        
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          p={6}
          position="relative"
          zIndex={1}
          _before={{
            content: '""',
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            bottom: '-10px',
            left: '-10px',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: 'xl',
            zIndex: -1
          }}
        >
          {isLoading ? (
            <LoadingSpinner text="جاري تحميل البيانات..." />
          ) : (
            children
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PageContainer;
