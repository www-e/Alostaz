'use client';

import React from 'react';
import { AdminLayout } from '@/components/admin/layout';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/shared';
import { Box, Text, Button } from '@chakra-ui/react';

/**
 * Layout wrapper for all admin pages
 * Handles authentication check and provides consistent layout
 */
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated or not an admin
  React.useEffect(() => {
    if (!isLoading && (!user || !isAdmin())) {
      router.push('/auth/login');
    }
  }, [user, isLoading, isAdmin, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner fullPage text="جاري التحقق من الصلاحيات..." />;
  }

  // Show access denied message if not an admin
  if (!user || !isAdmin()) {
    return (
      <Box 
        minH="100vh" 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        p={4}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={4} textAlign="center">
          غير مصرح بالدخول
        </Text>
        <Text mb={6} textAlign="center">
          ليس لديك صلاحية الوصول إلى لوحة تحكم المدير.
        </Text>
        <Button 
          colorScheme="primary" 
          onClick={() => router.push('/auth/login')}
        >
          العودة إلى تسجيل الدخول
        </Button>
      </Box>
    );
  }

  // Render admin layout with the page content
  return <AdminLayout>{children}</AdminLayout>;
}
