'use client';

import React from 'react';
import {
  Box,
  Flex,
  VStack,
  Icon,
  Text,
  Divider,
  CloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FiHome, 
  FiCalendar, 
  FiDollarSign, 
  FiBook, 
  FiSettings 
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  children: string;
  href: string;
  isActive?: boolean;
}

/**
 * Navigation item component for the sidebar
 */
const NavItem = ({ icon, children, href, isActive }: NavItemProps) => {
  return (
    <Link href={href} passHref style={{ width: '100%' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'primary.500' : 'transparent'}
        color={isActive ? 'white' : 'inherit'}
        _hover={{
          bg: isActive ? 'primary.600' : 'primary.100',
          color: isActive ? 'white' : 'primary.800',
        }}
        transition="all 0.3s"
      >
        <Icon
          mr="4"
          fontSize="16"
          as={icon}
        />
        <Text fontWeight={isActive ? 'bold' : 'medium'}>
          {children}
        </Text>
      </Flex>
    </Link>
  );
};

/**
 * Sidebar component for the student dashboard
 */
export default function StudentSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  // Navigation items
  const navItems = [
    { name: 'الرئيسية', icon: FiHome, href: '/student' },
    { name: 'الحضور', icon: FiCalendar, href: '/student/attendance' },
    { name: 'المدفوعات', icon: FiDollarSign, href: '/student/payments' },
    { name: 'الواجبات', icon: FiBook, href: '/student/homework' },
    { name: 'الإعدادات', icon: FiSettings, href: '/student/settings' },
  ];
  
  return (
    <Box
      bg={bgColor}
      borderLeft="1px"
      borderLeftColor={borderColor}
      w={{ base: 'full', lg: '240px' }}
      pos="fixed"
      h="full"
      display={{ base: isOpen ? 'block' : 'none', lg: 'block' }}
      zIndex={{ base: 20, lg: 1 }}
      right={0}
      top={0}
      pt="20"
      transition="all 0.3s"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold" color="primary.500">
          منصة الطالب
        </Text>
        <CloseButton display={{ base: 'flex', lg: 'none' }} onClick={onClose} />
      </Flex>
      
      <Divider mb={4} />
      
      <VStack align="stretch" spacing={1}>
        {navItems.map((item) => (
          <NavItem 
            key={item.name} 
            icon={item.icon} 
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
}
