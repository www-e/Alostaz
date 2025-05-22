'use client';

import React, { useState } from 'react';
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
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FiMenu, FiChevronDown, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { useAuth } from '@/lib/hooks';

interface StudentHeaderProps {
  onMenuToggle?: () => void;
}

/**
 * Header component for the student dashboard
 */
export default function StudentHeader({ onMenuToggle }: StudentHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };
  
  const handleProfileClick = () => {
    router.push('/student/settings');
  };
  
  return (
    <Flex
      as="header"
      pos="fixed"
      top="0"
      w="full"
      h="16"
      bg={bgColor}
      borderBottom="1px"
      borderBottomColor={borderColor}
      zIndex="10"
      align="center"
      px={4}
      boxShadow="sm"
    >
      <Flex w="full" align="center" justify="space-between">
        {/* Left side - Menu toggle and logo */}
        <HStack spacing={4}>
          {onMenuToggle && (
            <IconButton
              aria-label="Toggle Menu"
              icon={<FiMenu />}
              onClick={onMenuToggle}
              variant="ghost"
              size="md"
              display={{ base: 'flex', lg: 'none' }}
            />
          )}
          
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="primary.500"
            display={{ base: 'none', md: 'flex' }}
          >
            مركز الأستاذ التعليمي
          </Text>
        </HStack>
        
        {/* Right side - User menu */}
        <HStack spacing={3}>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rightIcon={<FiChevronDown />}
              py={2}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={user?.full_name || 'طالب'}
                  src={user?.avatar_url || undefined}
                />
                <Text display={{ base: 'none', md: 'flex' }}>
                  {user?.full_name || 'طالب'}
                </Text>
              </HStack>
            </MenuButton>
            <MenuList zIndex={100}>
              <MenuItem icon={<FiUser />} onClick={handleProfileClick}>
                الملف الشخصي
              </MenuItem>
              <MenuItem icon={<FiSettings />} onClick={() => router.push('/student/settings')}>
                الإعدادات
              </MenuItem>
              <MenuDivider />
              <MenuItem icon={<FiLogOut />} onClick={handleLogout}>
                تسجيل الخروج
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Flex>
  );
}
