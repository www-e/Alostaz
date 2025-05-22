'use client';

import React, { ReactNode } from 'react';
import { Box, Flex, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import StudentHeader from './StudentHeader';
import StudentSidebar from './StudentSidebar';

interface StudentLayoutProps {
  children: ReactNode;
}

/**
 * Main layout component for the student dashboard
 * Includes responsive sidebar and header
 */
export default function StudentLayout({ children }: StudentLayoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });
  
  // Close sidebar on mobile when clicking outside
  const handleContentClick = () => {
    if (isMobile && isOpen) {
      onClose();
    }
  };
  
  return (
    <Flex h="100vh" flexDirection="column">
      {/* Header */}
      <StudentHeader onMenuToggle={isMobile ? (isOpen ? onClose : onOpen) : undefined} />
      
      {/* Main content area with sidebar */}
      <Flex flex="1" overflow="hidden">
        {/* Sidebar */}
        <StudentSidebar 
          isOpen={isMobile ? isOpen : true} 
          onClose={onClose} 
        />
        
        {/* Main content */}
        <Box
          flex="1"
          p={4}
          overflowY="auto"
          onClick={handleContentClick}
          mr={{ base: 0, lg: '240px' }}
          mt="16"
          transition="margin-right 0.3s"
          bg="gray.50"
        >
          {children}
        </Box>
      </Flex>
    </Flex>
  );
}
