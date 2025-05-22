'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin dashboard layout component
 * Combines the sidebar and header with the main content area
 * Provides consistent layout for all admin pages
 */
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.50">
      {/* Sidebar navigation */}
      <Sidebar />
      
      {/* Header with breadcrumbs and user menu */}
      <Header />
      
      {/* Main content area */}
      <Box
        as="main"
        mr={{ base: '60px', md: '240px' }}
        mt="64px"
        p={6}
        transition="all 0.3s ease"
      >
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;
