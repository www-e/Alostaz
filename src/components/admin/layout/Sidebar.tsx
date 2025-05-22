'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Divider,
  Tooltip,
  IconButton,
  useColorModeValue,
  useMediaQuery,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiUsers, 
  FiCalendar, 
  FiDollarSign, 
  FiBook, 
  FiSettings, 
  FiMenu, 
  FiX 
} from 'react-icons/fi';

// Navigation items for the admin dashboard
const navItems = [
  { name: 'الرئيسية', icon: FiHome, path: '/admin' },
  { name: 'الطلاب', icon: FiUsers, path: '/admin/students' },
  { name: 'الحضور', icon: FiCalendar, path: '/admin/attendance' },
  { name: 'المدفوعات الشهرية', icon: FiDollarSign, path: '/admin/payments' },
  { name: 'المذكرات', icon: FiBook, path: '/admin/books' },
  { name: 'الإعدادات', icon: FiSettings, path: '/admin/settings' },
];

/**
 * Admin sidebar navigation component
 * Provides navigation links for all admin dashboard sections
 * Responsive design with collapsible sidebar on mobile
 */
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  
  // Colors for the sidebar
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  // Determine if the sidebar should be collapsed
  const shouldCollapse = isMobile || isCollapsed;
  
  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      right="0"
      h="100vh"
      w={shouldCollapse ? '60px' : '240px'}
      bg={bgColor}
      borderLeft="1px"
      borderColor={borderColor}
      transition="width 0.3s ease"
      zIndex="10"
      overflowX="hidden"
      overflowY="auto"
      py={4}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center" px={4} mb={6}>
        {!shouldCollapse && (
          <Text 
            fontSize="xl" 
            fontWeight="bold"
            bgGradient="linear(to-l, primary.500, secondary.500)"
            bgClip="text"
          >
            لوحة التحكم
          </Text>
        )}
        <IconButton
          aria-label={shouldCollapse ? 'توسيع القائمة' : 'طي القائمة'}
          icon={shouldCollapse ? <FiMenu /> : <FiX />}
          variant="ghost"
          onClick={toggleSidebar}
          size="sm"
        />
      </Flex>
      
      <Divider mb={4} />
      
      <VStack spacing={1} align="stretch">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);
          
          return (
            <Tooltip
              key={item.path}
              label={shouldCollapse ? item.name : ''}
              placement="left"
              hasArrow
              isDisabled={!shouldCollapse}
            >
              <Link href={item.path} passHref>
                <Flex
                  py={3}
                  px={4}
                  borderRadius="md"
                  role="group"
                  cursor="pointer"
                  bg={isActive ? 'primary.50' : 'transparent'}
                  color={isActive ? 'primary.600' : 'gray.600'}
                  fontWeight={isActive ? 'bold' : 'normal'}
                  _hover={{
                    bg: 'primary.50',
                    color: 'primary.600',
                  }}
                  transition="all 0.2s"
                >
                  <Icon
                    as={item.icon}
                    boxSize={5}
                    ml={shouldCollapse ? 0 : 2}
                    flexShrink={0}
                  />
                  {!shouldCollapse && (
                    <Text>{item.name}</Text>
                  )}
                </Flex>
              </Link>
            </Tooltip>
          );
        })}
      </VStack>
      
      <Box position="absolute" bottom="4" width="100%" px={4}>
        <Divider mb={4} />
        <Text fontSize="xs" color="gray.500" textAlign={shouldCollapse ? 'center' : 'right'}>
          {shouldCollapse ? '' : 'مركز الأستاذ التعليمي'}
        </Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
