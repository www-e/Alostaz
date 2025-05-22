'use client';

import React from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiLogOut, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/hooks';

// Map of route paths to their Arabic names
const routeNames: Record<string, string> = {
  '/admin': 'الرئيسية',
  '/admin/students': 'الطلاب',
  '/admin/attendance': 'الحضور',
  '/admin/payments': 'المدفوعات الشهرية',
  '/admin/books': 'المذكرات',
  '/admin/settings': 'الإعدادات',
};

/**
 * Admin header component
 * Provides breadcrumb navigation, notifications, and user menu
 */
const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  
  // Colors for the header
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    let currentPath = '';
    
    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`;
      
      // Skip the first segment (admin)
      if (i === 0) continue;
      
      const isLast = i === pathSegments.length - 1;
      const name = routeNames[currentPath] || pathSegments[i];
      
      breadcrumbs.push({
        name,
        path: currentPath,
        isLast,
      });
    }
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      left="0"
      right={{ base: '60px', md: '240px' }}
      h="64px"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      zIndex="5"
      transition="all 0.3s ease"
      px={4}
    >
      <Flex h="100%" align="center" justify="space-between">
        <Breadcrumb separator="›">
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/admin">
              الرئيسية
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {breadcrumbs.map((breadcrumb, index) => (
            <BreadcrumbItem key={index} isCurrentPage={breadcrumb.isLast}>
              {breadcrumb.isLast ? (
                <Text color="primary.500" fontWeight="bold">
                  {breadcrumb.name}
                </Text>
              ) : (
                <BreadcrumbLink as={Link} href={breadcrumb.path}>
                  {breadcrumb.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        
        <HStack spacing={4}>
          <IconButton
            aria-label="الإشعارات"
            icon={<FiBell />}
            variant="ghost"
            colorScheme="gray"
            fontSize="20px"
          />
          
          <Menu>
            <MenuButton
              as={Box}
              cursor="pointer"
              _hover={{ textDecoration: 'none' }}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={user?.full_name || 'المدير'}
                  src=""
                  bg="primary.500"
                />
                <Text display={{ base: 'none', md: 'block' }}>
                  {user?.full_name || 'المدير'}
                </Text>
                <Box display={{ base: 'none', md: 'block' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            
            <MenuList zIndex="dropdown">
              <MenuItem icon={<FiUser />}>الملف الشخصي</MenuItem>
              <MenuDivider />
              <MenuItem 
                icon={<FiLogOut />} 
                onClick={() => logout()}
                color="red.500"
              >
                تسجيل الخروج
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Header;
